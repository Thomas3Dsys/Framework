import { test, expect } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { setTestCaseId } from "../utils/testcaseid";

/** Test Where the user is not expected to be logged in already */

// Declare shared variables
let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let logoutPage: LogoutPage;

// Setup before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load test config
  await page.goto(config.appUrl); // Step 1: Navigate to app URL

  // Initialize page objects
  homePage = new HomePage(page);
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close the browser tab (helps keep tests clean)
});

test("Validate Logout option is not displayed under 'My Account' menu before logging in	 @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_005");
  //	1. Click on 'My Account' Dropmenu  (Verify ER-1)
  // //	1. Logout option should not be displayed under 'My Account' dropmenu
  expect(
    await homePage.topMenuSection.myAccountMenu.hasLogoutLink(),
  ).toBeFalsy();
});

test("Validate Logout option is not displayed under 'Right Column' options before logging in @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_006");
  //	"1. Click on 'My Account' Dropmenu
  //2. Select 'Regiser' option (Verify ER-1)"

const registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

  //	1. Logout option should not be displayed in the 'Right Column'
  expect(await registrationPage.myAccountRightLinks.hasLogoutLink()).toBeFalsy();
});
