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

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

const successPasswordChangeMessage =
  "Success: Your password has been successfully updated.";

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  expect(Database.doesUserExist(config.email)).toBeTruthy();

  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);

  loginPage = await homePage.topMenuSection.myAccountMenu.navigateLogin();
  await loginPage.waitForPageHeader();
});

test.afterEach(async ({ page }) => {

   const topMenuSection = new TopMenuSection(page);
    
  if (await topMenuSection.myAccountMenu.hasMyAccountMenuForLoggedInUser()) {
    if (await topMenuSection.myAccountMenu.Logout()) {
      const logoutPage = new LogoutPage(page);
      await logoutPage.waitForPageHeader();
    }
  }
  await page.close();
});

test("Validate login into the Application using valid credentials @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_001");

  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password);
  await loginPage.clickLogin();

  await myAccountPage.waitForPageHeader();
  const isLoggedIn = await myAccountPage.doesPageExist();
  expect(isLoggedIn).toBeTruthy();
});

test("Validate Forgotten Password link is available in the Login page and is working @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_006");

  expect(await loginPage.doesForgottenPasswordLinkExist).toBeTruthy();

  const forgottenPasswordPage: ForgottenPasswordPage =
    await loginPage.clickForgottenPasswordLink();
  expect(forgottenPasswordPage.doesPageExist()).toBeTruthy();
});

test("Validate logging into the Application using Keyboard keys (Tab and Enter) @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_007");
});
test("Validate E-Mail Address and Password text fields in the Login page have the placeholder text  @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_008");

  expect(await loginPage.getEmailPlaceholder()).toBe("E-Mail Address");
  expect(await loginPage.getPasswordPlaceholder()).toBe("Password");
});
test.skip("Validate Logging into the Application and browsing back using Browser back button  @master @sanity @regression", async ({
  page,
}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_009");

  myAccountPage = await loginPage.login(config.email, config.password);
  page.goBack();

  homePage = new HomePage(page);
  expect(homePage.topMenuSection.myAccountMenu.hasMyAccountMenuForLoggedInUser()).toBeTruthy();
});

test("Validate Logging out from the Application and browsing back using Browser back button @master @sanity @regression", async ({
  page,
}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_010");

  myAccountPage = await loginPage.login(config.email, config.password);
  expect(myAccountPage.topMenuSection.myAccountMenu.hasMyAccountMenuForLoggedInUser()).toBeTruthy();

  homePage.topMenuSection.myAccountMenu.Logout();
  expect(homePage.topMenuSection.myAccountMenu.hasMyAccountMenuForLoggedInUser()).toBeTruthy();

  page.goBack();
  homePage = new HomePage(page);
  expect(homePage.topMenuSection.myAccountMenu.hasMyAccountMenuForLoggedInUser()).toBeTruthy();
});

test.skip("Validate the copying of the text entered into the Password field @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_014");
});

test.skip("Validate the Password is not visible in the Page Source @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_015");
});

test("Validate Logging into the Application after changing the password @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_016");

  const registrationPage = await loginPage.newCustomerClickContinue();

  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getlastName();
  const email = RandomDataUtil.getEmail();
  const phoneNumber = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword();

  //Log the registration details
  console.log("Creating account with the following details:");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  await registrationPage.completeRegistration({
    firstName: firstName,
    lastName: lastName,
    email: email,
    telephone: phoneNumber,
    password: password,
  });

  //Validate the confirmation message
  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");

  myAccountPage = await registrationPage.clickContinueAccountCreated();

  const changePasswordPage = await myAccountPage.clickChangePassword();
  const newPassword = RandomDataUtil.getPassword();
  console.log(`Updating to new password: ${newPassword}`);
  myAccountPage = await changePasswordPage.updatePassword(newPassword);

  expect(await myAccountPage.alerts.getAlertSuccessMessage()).toContain(
    successPasswordChangeMessage,
  );

  await homePage.topMenuSection.myAccountMenu.Logout();
  expect(await homePage.topMenuSection.myAccountMenu.hasMyAccountMenuForLoggedOutUser()).toBeTruthy();

  homePage.topMenuSection.myAccountMenu.navigateLogin();

  myAccountPage = await loginPage.login(email, newPassword);
  myAccountPage.topMenuSection.myAccountMenu.hasMyAccountMenuForLoggedInUser();
});

test.fail(
  "Validate Logging into the Application, closing the Browser without loggingout and opening the application in the Browser again @master  @regression",
  async ({ browser, page }, testInfo) => {
    setTestCaseId(testInfo, "TC_LF_017");

    myAccountPage = await loginPage.login(config.email, config.password);
    await myAccountPage.waitForPageHeader();
    await page.close();

    let newPage: Page = await browser.newPage();
    await newPage.goto(config.appUrl);

    homePage = new HomePage(newPage);
    expect(await homePage.topMenuSection.myAccountMenu.hasMyAccountMenuForLoggedInUser()).toBeTruthy();
  },
);
test.skip("Validate timeout of the Login Session @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_018");
});
test.skip("Validate user is able to navigate to different pages from Login page @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_019");
});
test.skip("Validate the different ways of navigating to the Login page @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_020");
});
test.skip("Validate the Breakcrumb, Page Heading, Page Title and Page URL of Login page @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_021");
});

test.skip("Validate the UI of the Login page @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_022");
});

const browsers = ["chromium", "firefox", "webkit"] as const;
browsers.forEach((browser, index) => {
  test.use({ browserName: browser });
  test(`Validate the Login page functionality in multiple browsers: ${browser} @sanity @master @regression`, async ({}, testInfo) => {
    setTestCaseId(testInfo, `TC_LF_023 [${index + 1}/${browsers.length}]`);

    loginPage = await homePage.topMenuSection.myAccountMenu.navigateLogin();
    myAccountPage = await loginPage.login(config.email, config.password);

    const isLoggedIn = await myAccountPage.doesPageExist();
    expect(isLoggedIn).toBeTruthy();
  });
});
