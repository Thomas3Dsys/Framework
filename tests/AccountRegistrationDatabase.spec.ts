
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { setTestCaseId } from "../utils/testcaseid";
import { Database } from "../utils/database";
import {ICustomer} from "../utils/database";
import {OpenShopCryptography} from "../utils/cryptography"
import { TopMenuSection } from "../pages/Widgets/TopMenuSection";

let homePage: HomePage;
let registrationPage: RegistrationPage;
let myAccountPage: MyAccountPage;
let config: TestConfig;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl); //Navigate to application URL
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  const topMenuSection = new TopMenuSection(page);
  if (await topMenuSection.myAccountMenu.Logout()) {
    const logoutPage = new LogoutPage(page);
    await logoutPage.waitForPageHeader();
  }
  //await page.waitForTimeout(3000);//remove once aboce logout call is returning validated page.
  await page.close();
});

test.afterAll(async () => {
    Database.Disconnect();
});



test("Test Salting and Encryption Proces @diagnostic", async () => {

  //Debug salting and encryption methods with known values.
  const pPass="test@123"
  const ePass="901aef5a78f03301bad5698b4e4a953c2802f44d"
  const salt="1epv0GVRh"
  
  const actualePass = OpenShopCryptography.generateHashedPassword(pPass, salt);
  expect(ePass).toBe(actualePass);

});


test("Validate the details that are provided while Registering an Account are stored in the Database  @master @sanity @regression", async ({
  browser,
}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_015");


  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getlastName();
  const email = RandomDataUtil.getEmail();
  const phoneNumber = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword();
  const newsletter = true;

  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

  await registrationPage.completeRegistration({
    firstName: firstName,
    lastName: lastName,
    email: email,
    telephone: phoneNumber,
    password: password,
    newsletter: newsletter
  });

  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");

  const newCustomer : ICustomer =  await Database.getUserDetails(email);
    expect(newCustomer.firstname).toBe(firstName);
    expect(newCustomer.lastname).toBe(lastName);
    expect(newCustomer.telephone).toBe(phoneNumber);
    expect(Boolean(newCustomer.newsletter)).toBe(newsletter);
    const hashedPassword = OpenShopCryptography.generateHashedPassword(password, newCustomer.salt);
    expect(newCustomer.password).toBe(hashedPassword);

});
