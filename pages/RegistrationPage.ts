import { Page, Locator, expect } from "@playwright/test";
import { Alerts } from "../pages/Widgets/Alerts";
import { MyAccountRightLinks } from "./Widgets/MyAccountRightLinks";

export class RegistrationPage {
  private readonly page: Page;
  public alerts: Alerts;
  public myAccountRightMenu: MyAccountRightLinks;

  // Locators using CSS selectors
  private readonly textFirstname: Locator;
  private readonly textLastname: Locator;
  private readonly textEmail: Locator;
  private readonly textTelephone: Locator;
  private readonly textPassword: Locator;
  private readonly textConfirmPassword: Locator;
  private readonly checkboxPolicy: Locator;
  private readonly buttonContinue: Locator;
  private readonly messageConfirmation: Locator;
  private readonly radiobuttonNewsletterYes: Locator;
  private readonly radiobuttonNewsletterNo: Locator;
  private readonly pageHeader: Locator;
  private readonly textFirstnameLabel: Locator;
  private readonly textLastnameLabel: Locator;
  private readonly textEmailLabel: Locator;
  private readonly textTelephoneLabel: Locator;
  private readonly textPasswordLabel: Locator;
  private readonly textConfirmPasswordLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alerts = new Alerts(page);
    this.myAccountRightMenu = new MyAccountRightLinks(page);
    // Initialize locators with CSS selectors
    this.textFirstname = page.locator("#input-firstname");
    this.textLastname = page.locator("#input-lastname");
    this.textEmail = page.locator("#input-email");
    this.textTelephone = page.locator("#input-telephone");
    this.textPassword = page.locator("#input-password");
    this.textConfirmPassword = page.locator("#input-confirm");
    this.checkboxPolicy = page.locator('input[name="agree"]');
    this.buttonContinue = page.locator('input[value="Continue"]');
    this.messageConfirmation = page.locator(
      'h1:has-text("Your Account Has Been Created!")',
    );
    this.radiobuttonNewsletterYes = page.getByRole("radio", { name: "Yes" });
    this.radiobuttonNewsletterNo = page.getByRole("radio", { name: "No" });

    this.pageHeader = page.getByRole("heading", { name: "Register Account" });

    this.textFirstnameLabel = page.locator("label[for='input-firstname']");
    this.textLastnameLabel = page.locator("label[for='input-lastname']");
    this.textEmailLabel = page.locator("label[for='input-email']");
    this.textTelephoneLabel = page.locator("label[for='input-telephone']");
    this.textPasswordLabel = page.locator("label[for='input-password']");
    this.textConfirmPasswordLabel = page.locator("label[for='input-confirm']");
  }

private  async getLabelBeforeDetails(itemLocator: Locator): Promise<{content: string, style: string} | null> {


expect(await itemLocator.isVisible()).toBeTruthy();


// await this.page.evaluate(() => {
//     console.log("This will run");
// });

      const beforeContent = await itemLocator.evaluate((el) => {
/* 
      console.log("Evaluating ::before pseudo-element for:", el);
      console.log("Content");
      console.log(window.getComputedStyle(el, '::before').getPropertyValue('content'));
      console.log("Style")
      console.log(window.getComputedStyle(el, '::before').getPropertyValue('style'));        
      console.log("cssText")
      console.log(window.getComputedStyle(el, '::before').getPropertyValue('cssText'));      
 */
       const elementDetails = 
        {
          content:window.getComputedStyle(el, '::before').getPropertyValue('content').replace(/['"]+/g, '').trim(), // Remove quotes from content value
          style: window.getComputedStyle(el, '::before').getPropertyValue('color')
        };
        return elementDetails;
       
    });
    return beforeContent;
  }



  /*
   waits for the expected page header to be visible, indicating that the logout page has loaded successfully
  */
  async waitForPageHeader(): Promise<void> {
    await this.pageHeader.waitFor({ state: "visible", timeout: 5000 });
  }

  async hasExpectedPageHeader(): Promise<boolean> {
    try {
      return await this.pageHeader.isVisible();
    } catch (error) {
      console.log(`Error checking for Register Account page header: ${error}`);
      return false;
    }
  }

  /**
   * Sets the first name in the registration form
   * @param fname - First name to enter
   */
  async setFirstName(fname: string): Promise<void> {
    await this.textFirstname.fill(fname);
  }

  async getFirstNamePlaceholder(): Promise<string | null> {
    return await this.textFirstname.getAttribute("placeholder");
  }

  async getFirstNameLabelBeforeContents(): Promise<{content: string, style: string} | null> {
     return await this.getLabelBeforeDetails(this.textFirstnameLabel);
  }

  /**
   * Sets the last name in the registration form
   * @param lname - Last name to enter
   */
  async setLastName(lname: string): Promise<void> {
    await this.textLastname.fill(lname);
  }


  
  async getLastNameLabelBeforeContents(): Promise<{content: string, style: string} | null> {
     return await this.getLabelBeforeDetails(this.textLastnameLabel);
  }

  async getLastNamePlaceholder(): Promise<string | null> {
    return await this.textLastname.getAttribute("placeholder");
  }

  /**
   * Sets the email in the registration form
   * @param email - Email to enter
   */
  async setEmail(email: string): Promise<void> {
    await this.textEmail.fill(email);
  }

  async getEmailPlaceholder(): Promise<string | null> {
    return await this.textEmail.getAttribute("placeholder");
  }
async getEmailLabelBeforeContents(): Promise<{content: string, style: string} | null> {
     return await this.getLabelBeforeDetails(this.textEmailLabel);
  } 

  /**
   * Sets the telephone number in the registration form
   * @param tel - Telephone number to enter
   */
  async setTelephone(tel: string): Promise<void> {
    await this.textTelephone.fill(tel);
  }

  async getTelephonePlaceholder(): Promise<string | null> {
    return await this.textTelephone.getAttribute("placeholder");
  }

  async getTelephoneLabelBeforeContents(): Promise<{content: string, style: string} | null> {
     return await this.getLabelBeforeDetails(this.textTelephoneLabel);
  } 

  /**
   * Sets the password in the registration form
   * @param pwd - Password to enter
   */
  async setPassword(pwd: string): Promise<void> {
    await this.textPassword.fill(pwd);
  }

  async getPasswordPlaceholder(): Promise<string | null> {
    return await this.textPassword.getAttribute("placeholder");
  }

  async getPasswordLabelBeforeContents(): Promise<{content: string, style: string} | null> {
     return await this.getLabelBeforeDetails(this.textPasswordLabel);
  }

  /**
   * Sets the confirm password in the registration form
   * @param pwd - Password to confirm
   */
  async setConfirmPassword(pwd: string): Promise<void> {
    await this.textConfirmPassword.fill(pwd);
  }

  async getConfirmPasswordPlaceholder(): Promise<string | null> {
    return await this.textConfirmPassword.getAttribute("placeholder");
  }

  async getConfirmPasswordLabelBeforeContents(): Promise<{content: string, style: string} | null> {
     return await this.getLabelBeforeDetails(this.textConfirmPasswordLabel);
  } 

  /**
   * Checks the privacy policy checkbox
   */
  async setPrivacyPolicy(): Promise<void> {
    await this.checkboxPolicy.check();
  }

  /**
   * Sets the newsletter subscription option
   */
  async setNewsletterSubscription(subscribe: boolean): Promise<void> {
    if (subscribe) {
      await this.radiobuttonNewsletterYes.check();
    } else {
      await this.radiobuttonNewsletterNo.check();
    }
  }

  /**
   * Clicks the Continue button
   */
  async clickContinue(): Promise<void> {
    await this.buttonContinue.click();
  }

  /**
   * Gets the confirmation message text
   * @returns Promise<string> - Confirmation message text
   */
  async getConfirmationMsg(): Promise<string> {
    return (await this.messageConfirmation.textContent()) ?? "";
  }

  /**
   * Complete registration workflow
   * @param userData - Object containing registration data
   */
  async completeRegistration(userData: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    newsletter?: boolean;
  }): Promise<void> {
    await this.setFirstName(userData.firstName);
    await this.setLastName(userData.lastName);
    await this.setEmail(userData.email);
    await this.setTelephone(userData.telephone);
    await this.setPassword(userData.password);
    await this.setConfirmPassword(userData.password);

    if (userData.newsletter == true) {
      await this.setNewsletterSubscription(true);
    }

    await this.setPrivacyPolicy();

    await this.clickContinue();
    await expect(this.messageConfirmation).toBeVisible();
  }

  /* 
Checks if the red alert messages for the input boxes are shown based on thier text content 
*/

  async hasInputAlertMessage(message: string): Promise<boolean> {
    const alertLocator = this.page.locator(`.text-danger`).getByText(message);
    return await alertLocator.isVisible();
  }
}
