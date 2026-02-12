import { Page, Locator, expect } from "@playwright/test";
import { LogoutPage } from "./LogoutPage"; // Import LogoutPage if needed
import { Alerts } from "../pages/Widgets/Alerts";
import { NewsletterSubscriptionPage } from "./MyAccount/NewsletterSubscriptionPage";
import { ChangePasswordPage } from "../pages/MyAccount/ChangePasswordPage";

import { TopMenuSection } from "./Widgets/TopMenuSection";

export class MyAccountPage {
  private readonly page: Page;
  public readonly topMenuSection: TopMenuSection;
  // Locators using CSS selectors
  private readonly linkLogout: Locator;
  private readonly linkEditAccountInformation: Locator;
  private readonly linkChangePassword: Locator;
  private readonly linkModifyAddressBook: Locator;
  private readonly linkModifyWishList: Locator;
  private readonly linkViewOrderHistory: Locator;
  private readonly linkDownloads: Locator;
  private readonly linkRewardPoints: Locator;
  private readonly linkViewReturnRequests: Locator;
  private readonly linkTransactions: Locator;
  private readonly linkRecurringPayments: Locator;
  private readonly linkAffiliateAccount: Locator;
  private readonly linkNewsletter: Locator;
  private readonly pageHeader: Locator;

  public alerts: Alerts;

  constructor(page: Page) {
    this.page = page;
    this.topMenuSection = new TopMenuSection(this.page);
    
    // Initialize locators with CSS selectors
    this.pageHeader = page.locator("//h2[contains(text(), 'My Account')]");
    this.linkLogout = page.locator("text='Logout'").nth(1);

    this.linkEditAccountInformation = this.page.locator(
      "a:has-text('Edit your account information')",
    );
    this.linkChangePassword = this.page.locator(
      "a:has-text('Change your password')",
    );
    this.linkModifyAddressBook = this.page.locator(
      "a:has-text('Modify your address book entries')",
    );
    this.linkModifyWishList = this.page.locator(
      "a:has-text('Modify your wish list')",
    );
    this.linkViewOrderHistory = this.page.locator(
      "a:has-text('View your order history')",
    );
    this.linkDownloads = this.page.locator("a:has-text('Downloads')");
    this.linkRewardPoints = this.page.locator(
      "a:has-text('Your Reward Points')",
    );
    this.linkViewReturnRequests = this.page.locator(
      "a:has-text('View your return requests')",
    );
    this.linkTransactions = this.page.locator(
      "a:has-text('Your Transactions')",
    );
    this.linkRecurringPayments = this.page.locator(
      "a:has-text('Recurring payments')",
    );
    this.linkAffiliateAccount = this.page.locator(
      "a:has-text('Register for an affiliate account')",
    );
    this.linkNewsletter = this.page.locator(
      "a:has-text('Subscribe / unsubscribe to newsletter')",
    );

    this.alerts = new Alerts(page);
  }

  /*
   waits for the expected page header to be visible, indicating that the logout page has loaded successfully
  */
  async waitForPageHeader(): Promise<void> {
    await this.pageHeader.waitFor({ state: "visible", timeout: 5000 });
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

  /**
   * Clicks on Logout link
   * @returns Promise<LogoutPage> - Returns instance of LogoutPage
   */
  async clickLogout(): Promise<LogoutPage> {
    try {
      await this.linkLogout.click();
      return new LogoutPage(this.page);
    } catch (error) {
      console.log(`Unable to click Logout link: ${error}`);
      throw error; // Re-throw the error to fail the test
    }
  }

  /**
   * Alternative method to return page exists using title
   * @returns Promise<boolean> - Returns true if page title matches
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  //todo:once used in an implementation: update each to return the page object of the respective page that is navigated to

  /**
   * Clicks on Edit Account Information link
   */
  async clickEditAccountInformation(): Promise<void> {
    await this.linkEditAccountInformation.click();
  }

  /**
   * Clicks on Change Password link
   */
  async clickChangePassword(): Promise<ChangePasswordPage> {
    await this.linkChangePassword.click();
    const changePasswordPage = new ChangePasswordPage(this.page);
    changePasswordPage.waitForPageHeader();
    return changePasswordPage;
  }

  /**
   * Clicks on Modify Address Book link
   */
  async clickModifyAddressBook(): Promise<void> {
    await this.linkModifyAddressBook.click();
  }

  /**
   * Clicks on Modify Wish List link
   */
  async clickModifyWishList(): Promise<void> {
    await this.linkModifyWishList.click();
  }

  /**
   * Clicks on View Order History link
   */
  async clickViewOrderHistory(): Promise<void> {
    await this.linkViewOrderHistory.click();
  }

  /**
   * Clicks on Downloads link
   */
  async clickDownloads(): Promise<void> {
    await this.linkDownloads.click();
  }

  /**
   * Clicks on Reward Points link
   */
  async clickRewardPoints(): Promise<void> {
    await this.linkRewardPoints.click();
  }

  /**
   * Clicks on View Return Requests link
   */
  async clickViewReturnRequests(): Promise<void> {
    await this.linkViewReturnRequests.click();
  }

  /**
   * Clicks on Transactions link
   */
  async clickTransactions(): Promise<void> {
    await this.linkTransactions.click();
  }

  /**
   * Clicks on Recurring Payments link
   */
  async clickRecurringPayments(): Promise<void> {
    await this.linkRecurringPayments.click();
  }

  /**
   * Clicks on Affiliate Account link
   */
  async clickAffiliateAccount(): Promise<void> {
    await this.linkAffiliateAccount.click();
  }

  /**
   * Clicks on Newsletter link
   */
  async clickNewsletterSubscription(): Promise<NewsletterSubscriptionPage> {
    await this.linkNewsletter.click();
    return new NewsletterSubscriptionPage(this.page);
  }
}
