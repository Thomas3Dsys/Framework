import { Page, Locator, expect } from "@playwright/test";
import { TopMenuSection } from "../Widgets/TopMenuSection";
import { MyAccountRightLinks } from "../Widgets/MyAccountRightLinks";
import { MyAccountPage } from "../MyAccountPage";

export class AddressBookPage {
  private readonly page: Page;
  public readonly topMenuSection: TopMenuSection;
  public myAccountRightLinks: MyAccountRightLinks;

  private readonly pageHeader: Locator;
  private readonly content: Locator;
  private readonly linkBack: Locator;
  private readonly buttonContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topMenuSection = new TopMenuSection(this.page);
    this.myAccountRightLinks = new MyAccountRightLinks(this.page);

    this.pageHeader = page.locator(
      "//h2[contains(text(), 'Address Book Entries')]",
    );
    this.content = page.locator("//#content p");
    this.linkBack = page.locator("a:has-text('Back')");
    this.buttonContinue = page.locator('input[value="Continue"]');
  }

  async getContent(): Promise<string[]> {
    try {
      return await this.content.allTextContents();
    } catch (error) {
      console.log(`Unable to get page content: ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }

  async clickBack(): Promise<MyAccountPage> {
    try {
      await this.linkBack.click();
      return new MyAccountPage(this.page);
    } catch (error) {
      console.log(`Unable to click Back button (link): ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }

  async clickContinue(): Promise<MyAccountPage> {
    try {
      await this.buttonContinue.click();
      return new MyAccountPage(this.page);
    } catch (error) {
      console.log(`Unable to click Continue button: ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }
}
