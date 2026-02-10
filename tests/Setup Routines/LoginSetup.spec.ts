/**
 * Test Case: Login with Valid Credentials
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { MyAccountPage } from "../../pages/MyAccountPage";
import { TestConfig } from "../../test.config";
import { doesUserExist } from "../../utils/database";
import { DataProvider } from "../../utils/dataProvider";
import { RegistrationPage } from "../../pages/RegistrationPage";

test.describe.configure({ mode: 'serial' });

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let registrationPage: RegistrationPage;

async function doUserCreation(
  page: Page,
  email: string,
  password: string,
): Promise<void> {
  if (await doesUserExist(email)) {
    console.log(`User with email ${email} exists already. Skipping creation.`);
    return;
  }

  await page.goto(config.appUrl); //Navigate to application URL
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);

  await homePage.clickMyAccount();
  await homePage.clickRegister();

  //Fill in registration details with random data
  await registrationPage.setFirstName(config.firstName);
  await registrationPage.setLastName(config.lastName);
  await registrationPage.setEmail(email);
  await registrationPage.setTelephone(config.phoneNumber);

  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password);

  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinue();

  //Validate the confirmation message
  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");
}

// This hook runs before each test
test.beforeEach(async ({ page }) => {
  config = new TestConfig(); // Load config (URL, credentials)
  await page.goto(config.appUrl); // Navigate to base URL

  // Initialize page objects
  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

// Optional cleanup after each test
test.afterEach(async ({ page }) => {
  await page.close(); // Close browser tab (good practice in local/dev run)
});

//Create users referenced in the data files and config.
const jsonPath = "testdata/logindata.json";
const jsonTestData = DataProvider.getTestDataFromJson(jsonPath);

for (const data of jsonTestData) {
  test(`Create Json Expected User ${data.email} @setup`, async ({ page }) => {
    if (data.expected.toLowerCase() === "success") {
      await doUserCreation(page, data.email, data.password);
    }
  });
}

const csvPath = "testdata/logindata.csv";
const csvTestData = DataProvider.getTestDataFromCsv(csvPath);
for (const data of csvTestData) {
  test(`Create CVS Expected User ${data.email} @setup`, async ({ page }) => {
    if (data.expected.toLowerCase() === "success") {
      await doUserCreation(page, data.email, data.password);
    }
  });
}

test(`Create config Expected User @setup`, async ({ page }) => {
  await doUserCreation(page, config.email, config.password);
});
