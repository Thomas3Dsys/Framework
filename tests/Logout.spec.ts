import { test, expect, Page } from "@playwright/test";
import { TestConfig } from "../test.config";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LogoutPage } from "../pages/LogoutPage";
import { setTestCaseId } from "../utils/testcaseid";
import { UiMessages } from "../data/expectedMessages";
import { PageDetails } from "../data/pageDetails";
import { Compare } from "../utils/compare";

/** Test Where the user that expected user to be logged in and at the my account page. */

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
  logoutPage = new LogoutPage(page);

  loginPage = await homePage.topMenuSection.myAccountMenu.navigateLogin();
  await loginPage.waitForPageHeader();
  myAccountPage = await loginPage.login(config.email, config.password);
  myAccountPage.waitForPageHeader();
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close the browser tab (helps keep tests clean)
});

test("Validate Logging out by selecting Logout option from 'My Account' dropmenu @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_001");

  expect(await myAccountPage.doesPageExist()).toBeTruthy();

  // Step 5: Click Logout, which returns LogoutPage instance
  logoutPage = await myAccountPage.clickLogout();

  // Step 6: Verify "Continue" button is visible before clicking
  expect(await logoutPage.isContinueButtonVisible()).toBe(true);

  // Step 7: Click Continue and verify redirection to HomePage
  homePage = await logoutPage.clickContinue();
  expect(await homePage.isHomePageExists()).toBe(true);
});

test("Validate Logging out by selecting Logout option from 'Right Column' options", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_002");
  expect(await myAccountPage.doesPageExist()).toBeTruthy();
  //	"1. Click on 'Logout' option from the Right Column  (Verify ER-1)
  //          "ER-1. User should be taken to the 'Account Logout' page and User should see Login option inplace of Logout under the 'My Account' dropmenu

  logoutPage = await myAccountPage.myAccountRightLinks.clickLogout();
  await logoutPage.waitForPageHeader();
  expect(await logoutPage.hasExpectedHeader()).toBeTruthy();
  const pageContents = await logoutPage.getContent();
  expect(pageContents).toContain(UiMessages.logoutPageMessage1);
  expect(pageContents).toContain(UiMessages.logoutPageMessage2);

  //2. Click on 'Continue' button (Verify ER-2)"
  //       ER-2. User should be taken to the Home page"
  homePage = await logoutPage.clickContinue();
  expect(await homePage.isHomePageExists()).toBeTruthy();
});



//in Playwright, the user does get logged out when the browser is closed.
test.fail("Validate the Application session status, after logging and closing the Browser without logging out", async ({
  page,
  browser,
}, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_003");
  expect(await myAccountPage.doesPageExist()).toBeTruthy();
  //	"1. Close the Browser without Logging out

  await myAccountPage.waitForPageHeader();
  await page.close();
  //2. Open the Browser and navigate the application (Verify ER-1)"

  let newPage: Page = await browser.newPage();
  await newPage.goto(config.appUrl);

  //    ER-1. Application should not get logged out, instead the user loggedin session need to be mainitained
  homePage = new HomePage(newPage);
  expect(
    await homePage.topMenuSection.myAccountMenu.hasAllLoggedInUserLinks(),
  ).toBeTruthy();
});
test("Validate logging out and browsing back", async ({ page }, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_004");
  expect(await myAccountPage.doesPageExist()).toBeTruthy();
  //	"1. Click on 'My Account' Dropmenu
  // 2. Select 'Logout' option

  logoutPage = await myAccountPage.topMenuSection.myAccountMenu.doLogout();

  // 3. Click on Browser back button (Verify ER-1)"
  await page.goBack();

  //    ER-1. User should not get logged in
  expect(
    await homePage.topMenuSection.myAccountMenu.hasAllLoggedOutUserLinks(),
  ).toBeTruthy();
});

/* 
test.describe("firefox only test", () => {
  test.use({ browserName: "firefox" });
  test("Validate logout from an Account from a single place after logging into it from different places", async ({
    browserName,
  }, testInfo) => {
    test.skip(browserName !== "firefox", "This test is only for Firefox");
    setTestCaseId(testInfo, "TC_LG_007");
    expect(await myAccountPage.doesPageExist()).toBeTruthy();
    //	"1. Click on 'My Account' Dropmenu in Firefox Browser
    // 2. Select 'Logout' option
    // 3. Perform any operation which requires the user to log, say navigating to Address Book page in the Chrome Browser of Mobile device (Verify ER-1)"
    //        ER-1. User be logged out in Mobile device too, instead of getting navigated to the Address book page
    //	1. User be logged out in Mobile device too, instead of getting navigated to the Address book page
  });
}); */

test("Validate logging out and loggin in immediately after logout", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_008");
  expect(await myAccountPage.doesPageExist()).toBeTruthy();
  //	"1. Click on 'My Account' Dropmenu
  // 2. Select 'Logout' optionawait
  logoutPage = await myAccountPage.topMenuSection.myAccountMenu.doLogout();

  // 3. Login immediately again with same or different account (Verify ER-1)"

  loginPage = await logoutPage.topMenuSection.myAccountMenu.navigateLogin();
  await loginPage.waitForPageHeader();
  myAccountPage = await loginPage.login(config.email, config.password);

  //        ER-1. Same Account or Differnet Account should get loggedin

  expect(await myAccountPage.doesPageExist()).toBeTruthy();
  expect(
    await myAccountPage.topMenuSection.myAccountMenu.hasAllLoggedInUserLinks(),
  ).toBeTruthy();
});

//Breadcrumbs not implemented yet
test("Validate 'Account Logout' page", async ({ page }, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_009");
  expect(await myAccountPage.doesPageExist()).toBeTruthy();
  logoutPage = await myAccountPage.topMenuSection.myAccountMenu.doLogout();

  logoutPage.hasExpectedHeader();
  expect(await page.title()).toBe(PageDetails.logout.title);
  expect(await page.url()).toContain(PageDetails.logout.url);
  
  const actualBreadcrumbs = await logoutPage.breadcumbs.getBreadcrumbs();
  expect(
    Compare.CheckBreadcrumbs(PageDetails.logout.breadcrumb, actualBreadcrumbs),
  ).toBeTruthy();
});

test("Validate the UI of the Logout option and the 'Account Logout' page", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_LG_010");
  expect(await myAccountPage.doesPageExist()).toBeTruthy();
  //	"1. Click on 'My Account' Dropmenu
  // 2. Select 'Logout' option (Verify ER-1)"
  logoutPage = await myAccountPage.topMenuSection.myAccountMenu.doLogout();
  //        ER-1. Proper UI adhering to the UI checklist should be displayed for Logout option (My Account DropMenu and Right Column) and 'Account Logout' page
  expect(
    await logoutPage.topMenuSection.myAccountMenu.hasAllLoggedOutUserLinks(),
  ).toBeTruthy();
  expect(await logoutPage.myAccountRightLinks.hasAllLinks()).toBeTruthy();

  const pageContents = await logoutPage.getContent();
  expect(pageContents).toContain(UiMessages.logoutPageMessage1);
  expect(pageContents).toContain(UiMessages.logoutPageMessage2);
});

const browsers = ["chromium", "firefox", "webkit"] as const;
browsers.forEach((browser, index) => {
  test.use({ browserName: browser });
  test(`Validate the Logout functionality in all the supported environments :  ${browser}`, async ({}, testInfo) => {
    setTestCaseId(testInfo, "TC_LG_011");
    expect(await myAccountPage.doesPageExist()).toBeTruthy();
    //	"1. Click on 'My Account' Dropmenu
    // 2. Select 'Logout' option (Verify ER-1)"
    logoutPage = await myAccountPage.topMenuSection.myAccountMenu.doLogout();
    //        ER-1. Logout functionality should work correctly in all the supported environments

    expect(await logoutPage.hasExpectedHeader()).toBeTruthy();
  });
});
