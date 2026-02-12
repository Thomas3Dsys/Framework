import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { setTestCaseId } from "../utils/testcaseid";

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
const emailAndOrPasswordMisMatchMessage =
  "Warning: No match for E-Mail Address and/or Password.";

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);

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

test("Validate login into the Application using valid credentials @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_001");

  loginPage = await homePage.navigateLogin();

  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password);
  await loginPage.clickLogin();

  const isLoggedIn = await myAccountPage.doesPageExist();
  expect(isLoggedIn).toBeTruthy();
});

test("Validate logging into the Application using invalid credentials (i.e. Invalid email address and Invalid Password) @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, " TC_LF_002 ");
  loginPage = await homePage.navigateLogin();

  await loginPage.setEmail("atest" + config.email);
  await loginPage.setPassword(config.password + "xyz");
  await loginPage.clickLogin();

  expect(await loginPage.alerts.getAlertDangerMessage()).toBe(
    emailAndOrPasswordMisMatchMessage,
  );
});

test("Validate logging into the Application using invalid email address and valid Password) @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, " TC_LF_003 ");
});

test("Validate logging into the Application using valid email address and invalid Password) @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, " TC_LF_004 ");

  loginPage = await homePage.navigateLogin();

  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password + "xyz");
  await loginPage.clickLogin();

  expect(await loginPage.alerts.getAlertDangerMessage()).toBe(emailAndOrPasswordMisMatchMessage);

});
test("Validate logging into the Application without providing any credentials @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, " TC_LF_005 ");

  loginPage = await homePage.navigateLogin();

  await loginPage.clickLogin();

  expect(await loginPage.alerts.getAlertDangerMessage()).toBe(
    emailAndOrPasswordMisMatchMessage,
  );
});

test("Validate logging into the Application using inactive credentials @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, " TC_LF_011 ");
});

test("Validate the number of unsucessful login attemps  @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, " TC_LF_012 ");
}); 

test("Validate the Password is not visible in the Page Source @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, " TC_LF_015 ");

  loginPage = await homePage.navigateLogin();

  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password);

const passwordHtmnl = await loginPage.getPasswordOuterHTMLValue();

  console.log("Password outerHTML:");
  console.log(passwordHtmnl);

  expect(passwordHtmnl).not.toContain(config.password)


});
