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
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);

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


test("Validate login into the Application using valid credentials @ci ", async ({}, testInfo) => {

  await loginPage.setEmail(config.email);
  await loginPage.setPassword(config.password);
  await loginPage.clickLogin();

  await myAccountPage.waitForPageHeader();
  const isLoggedIn = await myAccountPage.doesPageExist();
  expect(isLoggedIn).toBeTruthy();
});
