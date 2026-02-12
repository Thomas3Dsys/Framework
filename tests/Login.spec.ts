import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { setTestCaseId } from "../utils/testcaseid";
import { Database } from "../utils/database";
import { ForgottenPasswordPage} from "../pages/ForgottenPasswordPage"

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);
  expect(Database.doesUserExist(config.email)).toBeTruthy();

  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

test.afterEach(async ({ page }) => {
  if (await homePage.Logout()) {
    const logoutPage = new LogoutPage(page);
    await logoutPage.waitForPageHeader();
  }
  await page.close();
});

test("Validate login into the Application using valid credentials @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_001");

  loginPage = await homePage.navigateLogin();

  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password);
  await loginPage.clickLogin();

  await myAccountPage.waitForPageHeader();
  const isLoggedIn = await myAccountPage.doesPageExist();
  expect(isLoggedIn).toBeTruthy();
});

test("Validate Forgotten Password link is available in the Login page and is working @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_006");

  loginPage = await homePage.navigateLogin();
  await loginPage.waitForPageHeader();
  const forgottenPasswordPage : ForgottenPasswordPage = await loginPage.clickForgottenPasswordLink();
  
  expect(forgottenPasswordPage.doesPageExist()).toBeTruthy();

});


test("Validate logging into the Application using Keyboard keys (Tab and Enter) @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_007");
});
test("Validate E-Mail Address and Password text fields in the Login page have the placeholder text  @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_008");
});
test("Validate Logging into the Application and browsing back using Browser back button  @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_009");
});

test("Validate Logging out from the Application and browsing back using Browser back button @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_010");
});

test("Validate the text into the Password field is toggled to hide its visibility @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_013");

 loginPage = await homePage.navigateLogin();

 expect(await loginPage.getPasswordFieldAttribute("type")).toBe("password");
 expect( await loginPage.getPasswordWebkitTextSecurityValue()).toBe('disc');

});
test("Validate the copying of the text entered into the Password field @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_014");
});
test("Validate the Password is not visible in the Page Source @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_015");
});
test("Validate Logging into the Application after changing the password @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_016");
});
test("Validate Logging into the Application, closing the Browser without loggingout and opening the application in the Browser again @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_017");
});
test("Validate timeout of the Login Session @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_018");
});
test("Validate user is able to navigate to different pages from Login page @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_019");
});
test("Validate the different ways of navigating to the Login page @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_020");
});
test("Validate the Breakcrumb, Page Heading, Page Title and Page URL of Login page @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_021");
});
test("Validate the UI of the Login page @master  @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_022");
});

const browsers = ["chromium", "firefox", "webkit"] as const;
browsers.forEach((browser, index) => {
  test.use({ browserName: browser });
  test(`Validate the Login page functionality in multiple browsers: ${browser} @sanity @master @regression`, async ({}, testInfo) => {
    setTestCaseId(testInfo, `TC_LF_023 [${index + 1}/${browsers.length}]`);

    loginPage = await homePage.navigateLogin();
    myAccountPage = await loginPage.login(config.email, config.password);

    const isLoggedIn = await myAccountPage.doesPageExist();
    expect(isLoggedIn).toBeTruthy();
  });
});
