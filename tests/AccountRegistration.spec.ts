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
import { LoginPage } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { setTestCaseId } from "../utils/testcaseid";
import { TopMenuSection } from "../pages/Widgets/TopMenuSection";
import {UiMessages} from "../data/expectedMessages"
import { Compare } from "../utils/compare";
import { PageDetails } from "../data/pageDetails";

let homePage: HomePage;
let registrationPage: RegistrationPage;
let myAccountPage: MyAccountPage;
let config: TestConfig;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appUrl); //Navigate to application URL
  homePage = new HomePage(page);
  registrationPage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  const topMenuSection = new TopMenuSection(page);
  if (await topMenuSection.myAccountMenu.tryLogout()) {
    const logoutPage = new LogoutPage(page);
    await logoutPage.waitForPageHeader();
  }
  //await page.waitForTimeout(3000);//remove once aboce logout call is returning validated page.
  await page.close();
});

test("Validate Registering an Account by providing only the Mandatory fields @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_001");

  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

  const firstName = RandomDataUtil.getFirstName();
  const lastName = RandomDataUtil.getlastName();
  const email = RandomDataUtil.getEmail();
  const phoneNumber = RandomDataUtil.getPhoneNumber();
  const password = RandomDataUtil.getPassword();

  //Log the registration details
  console.log("Creating account with the following details:");
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

test("Validate Registering an Account by providing all the fields @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_003");
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

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

test("Validate registration with yes to subscription @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_003");
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

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

test("Validate newsletter is subscribed after registration  @sanity @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_005");
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

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

  myAccountPage = await registrationPage.topMenuSection.myAccountMenu.navigateMyAccount();

  const newsletterSubscriptionPage =
    await myAccountPage.clickNewsletterSubscription();
  const isSubscribed =
    await newsletterSubscriptionPage.getSubsciriptionStatus();

  expect(isSubscribed).toBeTruthy(); 
});

test("Validate newsletter is not subscribed after registration  @sanity @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_006");
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

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

  myAccountPage = await registrationPage.topMenuSection.myAccountMenu.navigateMyAccount();

  const newsletterSubscriptionPage =
    await myAccountPage.clickNewsletterSubscription();
  const isSubscribed =
    await newsletterSubscriptionPage.getSubsciriptionStatus();

  expect(isSubscribed).toBeFalsy();
});

test("Validate messages on submit with no informaiton entered @negative @sanity  @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_004");
  //Go to 'My Account' and click 'Register'

  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();
  await registrationPage.tryClickContinueAccountCreated();
  await registrationPage.topMenuSection.alerts.waitForAlert();

  const alertMessage = await registrationPage.topMenuSection.alerts.getAlertDangerMessage();
  expect(alertMessage).toContain(UiMessages.privacyPolicyAgreeWarning);

  expect(
    registrationPage.hasInputAlertMessage(UiMessages.firstNameInputValidationMessage),
  ).toBeTruthy();
  expect(
    registrationPage.hasInputAlertMessage(UiMessages.lastNameInputValidationMessage),
  ).toBeTruthy();
  expect(
    registrationPage.hasInputAlertMessage(UiMessages.emailInputValidationMessage),
  ).toBeTruthy();
  expect(
    registrationPage.hasInputAlertMessage(UiMessages.telephoneInputValidationMessage),
  ).toBeTruthy();
  expect(
    registrationPage.hasInputAlertMessage(UiMessages.passwordInputValidationMessage),
  ).toBeTruthy();
});

test("Navigate to RegistrationPage @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_007");
  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();
  expect(registrationPage.hasExpectedHeader()).toBeTruthy();

  loginPage = await registrationPage.topMenuSection.myAccountMenu.navigateLogin();
  registrationPage = await loginPage.newCustomerClickContinue();
  expect(await registrationPage.hasExpectedHeader()).toBeTruthy();

  registrationPage = await registrationPage.myAccountRightLinks.clickRegister();
  expect(await registrationPage.hasExpectedHeader()).toBeTruthy();
});


test("Validate Registering an Account by entering different passwords into 'Password' and 'Password Confirm' fields @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_008");
  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();
  const password = RandomDataUtil.getPassword();

  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getlastName());
  await registrationPage.setEmail(RandomDataUtil.getEmail());
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password + "123"); //Intentionally setting different password

  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinueRegistration();
  expect(
    registrationPage.hasInputAlertMessage(
      UiMessages.confirmPasswordInputValidationMessage,
    ),
  ).toBeTruthy();
});

test("Validate Registering an Account by providing the existing account details (i.e. existing email address) @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_009");
  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();
  await registrationPage.setFirstName(config.firstName);
  await registrationPage.setLastName(config.lastName);
  await registrationPage.setEmail(config.email);
  await registrationPage.setTelephone(config.telephone);

  await registrationPage.setPassword(config.password);
  await registrationPage.setConfirmPassword(config.password + "123"); //Intentionally setting different password

  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinueRegistration();
  await registrationPage.waitForPageHeader();

  await registrationPage.topMenuSection.alerts.waitForAlert();
  const alertMessage =
    (await registrationPage.topMenuSection.alerts.getAlertDangerMessage()) || "";
  expect(alertMessage).toContain(UiMessages.emailAreadyExistsWarning);
});

test("Validate Registering an Account by providing an invalid email address into the E-Mail field @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_010");
  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();
  const password = RandomDataUtil.getPassword();

  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getlastName());
  await registrationPage.setEmail("asdf123@f");
  await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password); //Intentionally setting different password

  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinueRegistration();

  registrationPage.waitForPageHeader();

  expect(
    registrationPage.hasInputAlertMessage(UiMessages.emailInputValidationMessage),
  ).toBeTruthy();
});

//Application does not work to test case expectations
test.skip("Validate Registering an Account by providing an invalid phone number @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_011");
  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();
  const password = RandomDataUtil.getPassword();

  await registrationPage.setFirstName(RandomDataUtil.getFirstName());
  await registrationPage.setLastName(RandomDataUtil.getlastName());
  await registrationPage.setEmail(RandomDataUtil.getEmail());
  await registrationPage.setTelephone("12");

  await registrationPage.setPassword(password);
  await registrationPage.setConfirmPassword(password); //Intentionally setting different password

  await registrationPage.setPrivacyPolicy();
  await registrationPage.clickContinueRegistration();
  expect(
    registrationPage.hasInputAlertMessage(UiMessages.telephoneInputValidationMessage),
  ).toBeTruthy();

  await registrationPage.setTelephone("111");
  await registrationPage.clickContinueRegistration();
  expect(
    registrationPage.hasInputAlertMessage(UiMessages.telephoneInputValidationMessage),
  ).toBeTruthy();

  await registrationPage.setTelephone("abcde");
  await registrationPage.clickContinueRegistration();
  expect(
    registrationPage.hasInputAlertMessage(UiMessages.telephoneInputValidationMessage),
  ).toBeTruthy();
});

test.skip("Validate Registering an Account by using the Keyboard keys @master @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_012");
});

test("Validate all the fields in the Register Account page have the proper placeholders @master @sanity @regression", async ({}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_013");
  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

  expect(await registrationPage.getFirstNamePlaceholder()).toBe("First Name");
  expect(await registrationPage.getLastNamePlaceholder()).toBe("Last Name");
  expect(await registrationPage.getEmailPlaceholder()).toBe("E-Mail");
  expect(await registrationPage.getTelephonePlaceholder()).toBe("Telephone");
  expect(await registrationPage.getPasswordPlaceholder()).toBe("Password");
  expect(await registrationPage.getConfirmPasswordPlaceholder()).toBe(
    "Password Confirm",
  );
});

test("Validate the Breadcrumb, Page Heading, Page URL, Page Title of 'Register Account' Page  @sanity @master @regression", async ({page}, testInfo) => {
  setTestCaseId(testInfo, "TC_RF_025");

  registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

  registrationPage.hasExpectedHeader();
  expect(await page.title()).toBe(PageDetails.registration.title);
  expect(await page.url()).toContain(PageDetails.registration.url);

  
  const actualBreadcrumbs = await registrationPage.breadcumbs.getBreadcrumbs();
  expect(
    Compare.CheckBreadcrumbs(PageDetails.registration.breadcrumb, actualBreadcrumbs),
  ).toBeTruthy();


});



const browsers = ["chromium", "firefox", "webkit"] as const;

browsers.forEach((browser, index) => {
  test.use({ browserName: browser});
  test(`Validate Registration in multiple browsers: ${browser} @sanity @master @regression`, async ({}, testInfo) => {
    setTestCaseId(testInfo, `TC_RF_027 [${index+1}/${browsers.length}]`);

    registrationPage = await homePage.topMenuSection.myAccountMenu.navigateRegister();

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

    //Validate the confirmation message
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain("Your Account Has Been Created!");
  });
});