import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { setTestCaseId } from "../utils/testcaseid";
import { Database } from "../utils/database";
import { TopMenuSection } from "../pages/Widgets/TopMenuSection";
import { UiMessages } from "../data/expectedMessages";

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl);

  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);

  loginPage = await homePage.topMenuSection.myAccountMenu.navigateLogin();
});

test.afterEach(async ({ page }) => {
  const topMenuSection = new TopMenuSection(page);
  if (await topMenuSection.myAccountMenu.tryLogout()) {
    const logoutPage = new LogoutPage(page);
    await logoutPage.waitForPageHeader();
  }
  await page.close();
});

test("Validate logging into the Application using invalid credentials (i.e. Invalid email address and Invalid Password) @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_002");

  await loginPage.setEmail("atest" + config.email);
  await loginPage.setPassword(config.password + "xyz");
  await loginPage.clickLogin();

  expect(await loginPage.topMenuSection.alerts.getAlertDangerMessage()).toBe(
    UiMessages.invalidLoginMessage,
  );
});

test("Validate logging into the Application using invalid email address and valid Password) @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_003");
  await loginPage.setEmail("abc" + config.email);
  await loginPage.setPassword(config.password + "xyz");
  await loginPage.clickLogin();

  expect(await loginPage.topMenuSection.alerts.getAlertDangerMessage()).toBe(
    UiMessages.invalidLoginMessage,
  );
});

test("Validate logging into the Application using valid email address and invalid Password) @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_004");

  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password + "xyz");
  await loginPage.clickLogin();

  expect(await loginPage.topMenuSection.alerts.getAlertDangerMessage()).toBe(
    UiMessages.invalidLoginMessage,
  );
});
test("Validate logging into the Application without providing any credentials @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_005");

  await loginPage.clickLogin();

  expect(await loginPage.topMenuSection.alerts.getAlertDangerMessage()).toBe(
    UiMessages.invalidLoginMessage,
  );
});

test("Validate logging into the Application using inactive credentials @master @regression", async ({
  page,
}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_012");

  //No retries
  expect(testInfo.retry).toBe(0);

  const invalidEmail = "xyzabc123@gmail.com";
  const invalidPassword = "xyzabc123";
  const hasUserInDB = await Database.doesUserExist(invalidEmail);
  expect(hasUserInDB).toBeFalsy();

  await loginPage.setEmail(invalidEmail);
  await loginPage.setPassword(invalidPassword);
  await loginPage.clickLogin();

  //May get exceededLoginAttempts message here if test case has been run recently
  expect(loginPage.topMenuSection.alerts.getAlertDangerMessage()).toContain(UiMessages.invalidLoginMessage);
  page.waitForTimeout(3000);

  await loginPage.setEmail(invalidEmail);
  await loginPage.setPassword(invalidPassword);
  await loginPage.clickLogin();

  expect(loginPage.topMenuSection.alerts.getAlertDangerMessage()).toContain(UiMessages.invalidLoginMessage);
  page.waitForTimeout(3000);

  await loginPage.setEmail(invalidEmail);
  await loginPage.setPassword(invalidPassword);
  await loginPage.clickLogin();

  expect(loginPage.topMenuSection.alerts.getAlertDangerMessage()).toContain(
    UiMessages.exceededLoginAttempts,
  );
});

test("Validate the text into the Password field is toggled to hide its visibility @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_013");

  loginPage = await homePage.topMenuSection.myAccountMenu.navigateLogin();

  expect(await loginPage.getPasswordFieldAttribute("type")).toBe("password");
  expect(await loginPage.getPasswordWebkitTextSecurityValue()).toBe("disc");
});

test("Validate the Password is not visible in the Page Source @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LF_015");

  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password);

  const passwordHtmnl = await loginPage.getPasswordOuterHTMLValue();

  console.log("Password outerHTML:");
  console.log(passwordHtmnl);

  expect(passwordHtmnl).not.toContain(config.password);
});
