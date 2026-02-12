// Test Cases Needing CSP Bypass to execute javascript code

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { TestConfig } from "../test.config";
import { setTestCaseId } from "../utils/testcaseid";

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

test("Validate all the mandatory fields in the Register Account page are marked with red color * symbol @master @sanity @regression", async ({
  browser,
}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_014");

  config = new TestConfig();
  const context = await browser.newContext({ bypassCSP: true });
  const newPage = await context.newPage();

  //use newPage in our new context to navigate and perform actions in the registration page to be able to evaluate the ::before pseudo
  //  element which is not working in the default context due to some CSP policy of the application.
  await newPage.goto(config.appUrl); //Navigate to application URL
  homePage = new HomePage(newPage);
  
  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

  const firstNameLabelBeforeDetails =
    await registrationPage.getFirstNameLabelBeforeContents();
  expect(firstNameLabelBeforeDetails?.content).toBe("*");
  expect(firstNameLabelBeforeDetails?.style).toContain("rgb(255, 0, 0)");
});
