import { Page, Locator, expect } from "@playwright/test";
import { MyAccountPage } from "../MyAccountPage";

export class NewsletterSubscriptionPage {
  private readonly page: Page;
  private readonly msgHeading: Locator;
  private readonly linkBack: Locator;
  private readonly radiobuttonNewsletterYes: Locator;
  private readonly radiobuttonNewsletterNo: Locator;
  private readonly buttonContinue: Locator;

  constructor(page: Page) {
    this.page = page;

    this.msgHeading = page.locator('h1:has-text("Newsletter Subscription")');
    this.linkBack = page.locator("a:has-text('Back')");
    this.radiobuttonNewsletterYes = page.getByRole("radio", { name: "Yes" });
    this.radiobuttonNewsletterNo = page.getByRole("radio", { name: "No" });
    this.buttonContinue = page.locator('input[value="Continue"]');
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

  /* 
  Get the status of the Subscription radio buttons. Returns true if "Yes" is selected, false if "No" is selected.
   */

  async getSubsciriptionStatus(): Promise<boolean> {
    return await this.radiobuttonNewsletterYes.isChecked();
  }

  /*
     Set the subscription status by clicking the appropriate radio button and then clicking the Continue button.
      Returns a new instance of MyAccountPage after the action is completed.
  */

  async setSubscription(subscribe: boolean): Promise<MyAccountPage> {
    try {
      if (subscribe) {
        await this.radiobuttonNewsletterYes.check();
      } else {
        await this.radiobuttonNewsletterNo.check();
      }
      await this.buttonContinue.click();
      return new MyAccountPage(this.page);
    } catch (error) {
      console.log(`Unable to set newsletter subscription: ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }
}
