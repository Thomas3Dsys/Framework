import { Page, Locator } from "@playwright/test";
import { HomePage } from "./HomePage";
import { TopMenuSection } from "./Widgets/TopMenuSection";
import { Breadcrumbs } from "./Widgets/Breadcrumbs";

import { MyAccountRightLinks } from "./Widgets/MyAccountRightLinks";
export class LogoutPage {
  private readonly page: Page;
  private readonly btnContinue: Locator;
  private readonly pageHeader: Locator;
  private readonly content: Locator;
  public readonly topMenuSection: TopMenuSection;
  public readonly breadcumbs: Breadcrumbs;
  public myAccountRightLinks: MyAccountRightLinks;

  constructor(page: Page) {
    this.page = page;
    this.topMenuSection = new TopMenuSection(this.page);
    this.myAccountRightLinks = new MyAccountRightLinks(this.page);
    this.breadcumbs = new Breadcrumbs(this.page);
    this.btnContinue = page.locator(".btn.btn-primary");
    this.pageHeader = page.getByRole("heading", { name: "Account Logout" });
    this.content = page.locator("#content p");
  }

  /*
   waits for the expected page header to be visible, indicating that the logout page has loaded successfully
  */
  async waitForPageHeader(timeout: number = 5000): Promise<void> {
    await this.pageHeader.waitFor({ state: "visible", timeout: timeout });
  }

  async hasExpectedHeader(): Promise<boolean> {
    try {
      return this.pageHeader.isVisible();
    } catch (error) {
      console.log(`Error checking expected header: ${error}`);
      throw error;
    }
  }

  async getContent(): Promise<string[]> {
    try {
      return await this.content.allTextContents();
    } catch (error) {
      console.log(`Unable to get page content: ${error}`);
      throw error; // Re-throw the error to fail the test
    }
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
