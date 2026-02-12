import { Page, Locator, expect } from "@playwright/test";
import { MyAccountPage } from "../MyAccountPage";

export class ChangePasswordPage {
  private readonly page: Page;
  private readonly header: Locator;
  private readonly linkBack: Locator;
  private readonly textPassword: Locator;
  private readonly textConfirmPassword: Locator;
  private readonly buttonContinue: Locator;

  constructor(page: Page) {
    this.page = page;

    this.header = page.locator('h1:has-text("Change Password")');
    this.linkBack = page.locator("a:has-text('Back')");
    this.textPassword = page.locator("#input-password");
    this.textConfirmPassword = page.locator("#input-confirm");
    this.buttonContinue = page.locator('input[value="Continue"]');
  }

  async waitForPageHeader(): Promise<void> {
    await this.header.waitFor({
      state: "visible",
      timeout: 5000,
    });
  }
  /* 
  Click the back button and return the MyAccountPage instance. 
  */

  async clickBack(): Promise<MyAccountPage> {
    try {
      await this.linkBack.click();
      return new MyAccountPage(this.page);
    } catch (error) {
      console.log(`Unable to click Back button (link): ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }

  async setPassword(password: string): Promise<void> {
    await this.textPassword.fill(password);
  }
  async setConfirmPassword(password: string): Promise<void> {
    await this.textConfirmPassword.fill(password);
  }

  /*
     Set the subscription status by clicking the appropriate radio button and then clicking the Continue button.
      Returns a new instance of MyAccountPage after the action is completed.
  */

  async updatePassword(password: string): Promise<MyAccountPage> {
    try {
      await this.setPassword(password);
      await this.setConfirmPassword(password);
      await this.buttonContinue.click();
      const myAccountPage = new MyAccountPage(this.page);
      await myAccountPage.waitForPageHeader();
      return myAccountPage;
    } catch (error) {
      console.log(`Unable to set newsletter subscription: ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }
}
