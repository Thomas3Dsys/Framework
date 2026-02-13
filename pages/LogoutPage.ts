import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";

export class LogoutPage {
  private readonly page: Page;
  private readonly btnContinue: Locator;
  private readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    // Using CSS selector with :has-text() pseudo-class for text matching
    this.btnContinue = page.locator(".btn.btn-primary");
    this.pageHeader = page.getByRole("heading", { name: "Account Logout" });
  }


  /*
   waits for the expected page header to be visible, indicating that the logout page has loaded successfully
  */
async waitForPageHeader(timeout:number = 5000): Promise<void> {
    await this.pageHeader.waitFor({ state: "visible", timeout: timeout });
  }

  /**
   * Clicks the Continue button after logout
   * @returns Promise<HomePage> - Returns instance of HomePage
   */
  async clickContinue(): Promise<HomePage> {
    await this.btnContinue.click();
    return new HomePage(this.page);
  }

  /**
   * Verifies if the Continue button is visible
   * @returns Promise<boolean> - Returns true if button is visible
   */
  async isContinueButtonVisible(): Promise<boolean> {
    return await this.btnContinue.isVisible();
  }
}
