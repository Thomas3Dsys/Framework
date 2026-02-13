import { Page, Locator, expect } from "@playwright/test";


export class ForgottenPasswordPage {

  private readonly page: Page;
private readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
   
    this.pageHeader = page.locator("//h1[contains(text(), 'Forgot Your Password?')]");
  }

  /*
   waits for the expected page header to be visible, indicating that the logout page has loaded successfully
  */
async waitForPageHeader(timeout:number = 5000): Promise<void> {
    await this.pageHeader.waitFor({ state: "visible", timeout: timeout });
  }

  /**
   * Verifies if My Account page is displayed
   * @returns Promise<boolean> - Returns true if heading is visible
   */
  async doesPageExist(): Promise<boolean> {
    try {
      const isVisible = await this.pageHeader.isVisible();
      return isVisible;
    } catch (error) {
      console.log(
        `Error checking My Account page heading visibility: ${error}`,
      );
      return false;
    }
  }
}