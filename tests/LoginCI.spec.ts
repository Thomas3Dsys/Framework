import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { setTestCaseId } from "../utils/testcaseid";
import { Database } from "../utils/database";
import { ForgottenPasswordPage } from "../pages/ForgottenPasswordPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { TopMenuSection } from "../pages/Widgets/TopMenuSection";
import { RegistrationPage } from "../pages/RegistrationPage";
import { UiMessages } from "../data/expectedMessages";
import { PageDetails } from "../data/pageDetails";
import { Compare } from "../utils/compare";

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrlCi);

  homePage = new HomePage(page);
  loginPage = await homePage.topMenuSection.myAccountMenu.navigateLogin();
  await loginPage.waitForPageHeader();
});

test.afterEach(async ({ page }) => {
  const topMenuSection = new TopMenuSection(page);

  if (await topMenuSection.myAccountMenu.hasLogoutLink()) {
    if (await topMenuSection.myAccountMenu.tryLogout()) {
      const logoutPage = new LogoutPage(page);
      await logoutPage.waitForPageHeader();
    }
  }
  await page.close();
});

test(`Create config Expected User @ci`, async ({ page }) => {
  
  const registrationPage =  await homePage.topMenuSection.myAccountMenu.navigateRegister();
  await registrationPage.setFirstName(config.firstName);
  await registrationPage.setLastName(config.lastName);
  await registrationPage.setEmail(config.email);
  await registrationPage.setTelephone(config.telephone);
  await registrationPage.setPassword(config.password);
  await registrationPage.setConfirmPassword(config.password);
  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinueRegistration();

  await page.waitForTimeout(1000);

  const alertShown =
    await registrationPage.topMenuSection.alerts.getAlertDangerMessage();
  
    if (alertShown?.includes(UiMessages.emailAreadyExistsWarning)) {
        console.log("User Already Created.");
      }
    else{
    //Validate the confirmation message
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain("Your Account Has Been Created!");
  }
});

test("Validate login into the Application using valid credentials @ci ", async ({}, testInfo) => {
  const myAccountPage = await loginPage.login(config.email,config.password);
  const isLoggedIn = await myAccountPage.doesPageExist();
  expect(isLoggedIn).toBeTruthy();
});
