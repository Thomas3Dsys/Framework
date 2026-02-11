import { Page, Locator } from "@playwright/test";
import { RegistrationPage } from "./RegistrationPage";

export class LoginPage {
  private readonly page: Page;

  // Locators
  private readonly textEmailAddress: Locator;
  private readonly textPassword: Locator;
  private readonly buttonLogin: Locator;
  private readonly textErrorMessage: Locator;
  private readonly buttonContinue: Locator;
  private readonly newCustomerSectionHeader: Locator;
  private readonly returningCustomerSectionHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.textEmailAddress = page.locator("#input-email");
    this.textPassword = page.locator("#input-password");
    this.buttonLogin = page.locator('input[value="Login"]');
    this.textErrorMessage = page.locator(
      ".alert.alert-danger.alert-dismissible",
    );
    this.buttonContinue = page.locator('a.btn:has-text("Continue")');
    this.newCustomerSectionHeader = page.getByRole("heading", {
      name: "New Customer",
    });
    this.returningCustomerSectionHeader = page.getByRole("heading", {
      name: "Returning Customer",
    });
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

  /**
   * Sets the password in the password field
   * @param pwd - Password to enter
   */
  async setPassword(pwd: string) {
    await this.textPassword.fill(pwd);
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
  async login(email: string, password: string) {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLogin();
  }

  async getloginErrorMessage(): Promise<null | string> {
    return this.textErrorMessage.textContent();
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
}
