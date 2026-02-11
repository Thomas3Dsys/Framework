/**
 * Test Case: Account Registration
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Navigate to application URL
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from "../utils/randomDataGenerator";
import { TestConfig } from "../test.config";
import { MyAccountPage } from "../pages/MyAccountPage";
//import { NewsletterSubscriptionPage } from "../pages/MyAccount/NewsletterSubscription";
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";

let homePage: HomePage;
let registrationPage: RegistrationPage;
let myAccountPage: MyAccountPage;
let config: TestConfig;
let loginPage: LoginPage;

const alertPrivacy = "Warning: You must agree to the Privacy Policy!";

const inputValidationMessageFirstName =
  "First Name must be between 1 and 32 characters!";
const inputValidationMessageLastName =
  "Last Name must be between 1 and 32 characters!";
const inputValidationMessageEmail =
  "E-Mail Address does not appear to be valid!";
const inputValidationMessageTelephone =
  "Telephone must be between 3 and 32 characters!";
const inputValidationMessagePassword =
  "Password must be between 4 and 20 characters!";
const inputValidationMessageConfirmPassword =
  "Password confirmation does not match password!";

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl); //Navigate to application URL
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  if (await homePage.Logout()) {
    const logoutPage = new LogoutPage(page);
    await logoutPage.waitForPageHeader();
  }
  //await page.waitForTimeout(3000);//remove once aboce logout call is returning validated page.
  await page.close();
});

test("Validate Registering an Account by providing only the Mandatory fields @master @sanity @regression", async () => {
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.navigateRegister();

  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getlastName();
  const email = RandomDataUtil.getEmail();
  const phoneNumber = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword();

  //Log the registration details
  console.log("Creating accoutn with the following details:");
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Phone Number: ${phoneNumber}`);
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
});

test("Validate Registering an Account by providing all the fields @master @regression", async () => {
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.navigateRegister();

  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getlastName();
  const email = RandomDataUtil.getEmail();
  const phoneNumber = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword();

  await registrationPage.completeRegistration({
    firstName: firstName,
    lastName: lastName,
    email: email,
    telephone: phoneNumber,
    password: password,
    newsletter: true,
  });
  //Log the registration details
  console.log("Creating account with the following details:");
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Password: ${password}`);
  console.log(`Newsletter: Yes`);

  //Validate the confirmation message
  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");
});

test("Validate registration with yes to subscription @master @regression", async () => {
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.navigateRegister();

  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getlastName();
  const email = RandomDataUtil.getEmail();
  const phoneNumber = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword();

  await registrationPage.completeRegistration({
    firstName: firstName,
    lastName: lastName,
    email: email,
    telephone: phoneNumber,
    password: password,
    newsletter: true,
  });
  //Log the registration details
  console.log("Creating account with the following details:");
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Password: ${password}`);
  console.log(`Newsletter: Yes`);

  //Validate the confirmation message
  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");
});

test("Validate newsletter is subscribed after registration @master @regression", async () => {
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.navigateRegister();

  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getlastName();
  const email = RandomDataUtil.getEmail();
  const phoneNumber = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword();

  await registrationPage.completeRegistration({
    firstName: firstName,
    lastName: lastName,
    email: email,
    telephone: phoneNumber,
    password: password,
    newsletter: true,
  });
  //Log the registration details
  console.log("Creating account with the following details:");
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Password: ${password}`);
  console.log(`Newsletter: Yes`);

  //Validate the confirmation message
  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");

  myAccountPage = await homePage.navigateMyAccount();

  const newsletterSubscriptionPage =
    await myAccountPage.clickNewsletterSubscription();
  const isSubscribed =
    await newsletterSubscriptionPage.getSubsciriptionStatus();

  expect(isSubscribed).toBeTruthy();
});

test("Validate newsletter is not subscribed after registration @master @regression", async () => {
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.navigateRegister();

  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getlastName();
  const email = RandomDataUtil.getEmail();
  const phoneNumber = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword();

  await registrationPage.completeRegistration({
    firstName: firstName,
    lastName: lastName,
    email: email,
    telephone: phoneNumber,
    password: password,
    newsletter: false,
  });
  //Log the registration details
  console.log("Creating account with the following details:");
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Email: ${email}`);
  console.log(`Phone Number: ${phoneNumber}`);
  console.log(`Password: ${password}`);
  console.log(`Newsletter: No`);

  //Validate the confirmation message
  const confirmationMsg = await registrationPage.getConfirmationMsg();
  expect(confirmationMsg).toContain("Your Account Has Been Created!");

  myAccountPage = await homePage.navigateMyAccount();

  const newsletterSubscriptionPage =
    await myAccountPage.clickNewsletterSubscription();
  const isSubscribed =
    await newsletterSubscriptionPage.getSubsciriptionStatus();

  expect(isSubscribed).toBeFalsy();
});

test("Validate messages on submit with no informaiton entered @negative @master @regression", async () => {
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.navigateRegister();
  await registrationPage.clickContinue();

  const alertMessage = await registrationPage.alerts.getAlertDangerMessage();
  expect(alertMessage).toContain(alertPrivacy);

  expect(
    registrationPage.hasInputAlertMessage(inputValidationMessageFirstName),
  ).toBeTruthy();
  expect(
    registrationPage.hasInputAlertMessage(inputValidationMessageLastName),
  ).toBeTruthy();
  expect(
    registrationPage.hasInputAlertMessage(inputValidationMessageEmail),
  ).toBeTruthy();
  expect(
    registrationPage.hasInputAlertMessage(inputValidationMessageTelephone),
  ).toBeTruthy();
  expect(
    registrationPage.hasInputAlertMessage(inputValidationMessagePassword),
  ).toBeTruthy();
  //expect(registrationPage.hasInputAlertMessage(inputValidationMessageConfirmPassword)).toBeTruthy();
});

test("Navigate to RegistrationPage @master @sanity @regression", async () => {
  registrationPage = await homePage.navigateRegister();
  expect(registrationPage.hasExpectedPageHeader()).toBeTruthy();

  loginPage = await homePage.navigateLogin();
  registrationPage = await loginPage.newCustomerClickContinue();
  expect(await registrationPage.hasExpectedPageHeader()).toBeTruthy();
});

/**
 * 
 * code for updating newsleter subscription status
 * 

  myAccountPage = await homePage.navigateMyAccount();

  const successMessage = await myAccountPage.alerts.getAlertSuccessMessage();

  expect(successMessage).toContain(
    "Success: Your newsletter subscription has been successfully updated!",
  );
});
 *  */
