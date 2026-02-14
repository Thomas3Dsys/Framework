import { Page, Locator, expect } from "@playwright/test";
import { TopMenuSection } from "../Widgets/TopMenuSection";
import { MyAccountRightLinks } from "../Widgets/MyAccountRightLinks";
import { MyAccountPage } from "../MyAccountPage";

export class ProductReturnsPage {
  private readonly page: Page;
  public readonly topMenuSection: TopMenuSection;
  public myAccountRightLinks: MyAccountRightLinks;

  private readonly pageHeader: Locator;
  private readonly buttonContinue: Locator;
  private readonly content: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topMenuSection = new TopMenuSection(this.page);
    this.myAccountRightLinks = new MyAccountRightLinks(this.page);

    this.pageHeader = page.locator(
      "//h2[contains(text(), 'Product Returns')]",
    );
    this.content = page.locator("#content p");
    this.buttonContinue = page.locator("a:has-text('Continue')");
  }

  async waitForPageHeader(timeout: number = 5000): Promise<void> {
    try {
      await this.pageHeader.waitFor({
        state: "visible",
        timeout: timeout,
      });
    } catch (error) {
      console.log(`Error waiting for page header: ${error}`);
      throw error; // Re-throw the error to fail the test
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

  async clickContinue(): Promise<MyAccountPage> {
    try {
      await this.buttonContinue.click();
      return new MyAccountPage(this.page);
    } catch (error) {
      console.log(`Unable to click Continue button (link): ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }
}
