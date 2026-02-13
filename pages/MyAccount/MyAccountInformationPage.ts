import { Page, Locator, expect } from "@playwright/test";
import { TopMenuSection } from "../Widgets/TopMenuSection";
import { MyAccountRightLinks } from "../Widgets/MyAccountRightLinks";
import { MyAccountPage } from "../MyAccountPage";

export class MyAccountInformationPage {
  private readonly page: Page;
  public readonly topMenuSection: TopMenuSection;
  public myAccountRightLinks: MyAccountRightLinks;

  private readonly pageHeader: Locator;
  private readonly linkBack: Locator;
  private readonly buttonContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topMenuSection = new TopMenuSection(this.page);
    this.myAccountRightLinks = new MyAccountRightLinks(this.page);

    this.pageHeader = page.locator("//h2[contains(text(), 'My Account Information')]");
    this.linkBack = page.locator("a:has-text('Back')");
    this.buttonContinue = page.locator('input[value="Continue"]');
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
