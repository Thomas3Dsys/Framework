import { Page, Locator } from "@playwright/test";
import { RegistrationPage } from "./RegistrationPage";
import { MyAccountPage } from "./MyAccountPage";
import { ForgottenPasswordPage } from "./ForgottenPasswordPage";
import { Alerts } from "../pages/Widgets/Alerts";
import { MyAccountMenu } from "./Widgets/MyAccountMenu";


export class LoginPage {
  private readonly page: Page;
  public alerts: Alerts;
  private readonly myAccountMenu: MyAccountMenu;
   
  // Locators
  private readonly textEmailAddress: Locator;
  private readonly textPassword: Locator;
  private readonly buttonLogin: Locator;

  private readonly buttonContinue: Locator;
  private readonly newCustomerSectionHeader: Locator;
  private readonly returningCustomerSectionHeader: Locator;
  private readonly linkForgottenPassword: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.alerts = new Alerts(page);
    this.myAccountMenu = new MyAccountMenu(this.page);
    // Initialize locators with CSS selectors
    this.textEmailAddress = page.locator("#input-email");
    this.textPassword = page.locator("#input-password");
    this.buttonLogin = page.locator('input[value="Login"]');

    this.buttonContinue = page.locator('a.btn:has-text("Continue")');
    this.newCustomerSectionHeader = page.getByRole("heading", {
      name: "New Customer",
    });
    this.returningCustomerSectionHeader = page.getByRole("heading", {
      name: "Returning Customer",
    });
    this.linkForgottenPassword = page.locator(
      "//div[@class='form-group']//a[normalize-space()='Forgotten Password']",
    );
  }

  /*
   waits for the expected page header to be visible, indicating that the logout page has loaded successfully
  */
  async waitForPageHeader(): Promise<void> {
    await this.newCustomerSectionHeader.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await this.returningCustomerSectionHeader.waitFor({
      state: "visible",
      timeout: 5000,
    });
  }

  /**
   * Sets the email address in the email field
   * @param email - Email address to enter
   */
  async setEmail(email: string) {
    await this.textEmailAddress.fill(email);
  }

  async getEmailFieldValue() {
    return await this.textEmailAddress.inputValue();
  }

  /**
   * Sets the password in the password field
   * @param pwd - Password to enter
   */
  async setPassword(pwd: string) {
    await this.textPassword.fill(pwd);
  }

  async getPasswordFieldAttribute(attribute: string) {
    return await this.textPassword.getAttribute(attribute);
  }
  async getPasswordFieldValue() {
    return await this.textPassword.inputValue();
  }

  async getPasswordOuterHTMLValue(): Promise<string> {
    return await this.textPassword.evaluate((node) => node.outerHTML);
  }

  async getPasswordWebkitTextSecurityValue(): Promise<string> {
    const value = await this.textPassword.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue("-webkit-text-security"),
    );
    return value;
  }

  /**
   * Clicks the login button
   */
  async clickLogin() {
    await this.buttonLogin.click();
  }

  /**
   * Performs complete login action
   * @param email - Email address to enter
   * @param password - Password to enter
   */
  async login(email: string, password: string): Promise<MyAccountPage> {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLogin();
    const newAccountPage = await new MyAccountPage(this.page);
    await newAccountPage.waitForPageHeader();
    return newAccountPage;
  }

  /*
    Click the Continue button in the New Customer section to navigate to the Registration page
  */

  async newCustomerClickContinue(): Promise<RegistrationPage> {
    try {
      await this.buttonContinue.click();
      return new RegistrationPage(this.page);
    } catch (error) {
      console.log(`Unable to click Continue button: ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }

  async doesForgottenPasswordLinkExist(): Promise<Boolean> {
    return this.linkForgottenPassword.isVisible();
  }

  async clickForgottenPasswordLink(): Promise<ForgottenPasswordPage> {
    try {
      await this.linkForgottenPassword.click();

      const forgottonPasswordPage = new ForgottenPasswordPage(this.page);
      await forgottonPasswordPage.waitForPageHeader();
      return forgottonPasswordPage;
    } catch (error) {
      console.log(`Unable to click Continue button: ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }

  async getEmailPlaceholder(): Promise<string | null> {
    return await this.textEmailAddress.getAttribute("placeholder");
  }
    async getPasswordPlaceholder(): Promise<string | null> {
    return await this.textPassword.getAttribute("placeholder");
  }


}
