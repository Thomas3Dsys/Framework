import { Page, Locator, expect } from "@playwright/test";
import { LogoutPage } from "./LogoutPage";
import { AddressBookPage } from "../pages/MyAccount/AddressBookPage";
import { WishListPage } from "../pages/MyAccount/WishListPage";
import { OrderHistoryPage } from "../pages/MyAccount/OrderHistoryPage";
import { AccountDownloadsPage } from "../pages/MyAccount/AccountDownloadsPage";
import { RecurringPaymentsPage } from "../pages/MyAccount/RecurringPaymentsPage";
import { RewardPointsPage } from "../pages/MyAccount/RewardPointsPage";
import { ProductReturnsPage } from "../pages/MyAccount/ProductReturns";
import { TransactionsPage } from "../pages/MyAccount/TransactionsPage";
import { NewsletterSubscriptionPage } from "../pages/MyAccount/NewsletterSubscriptionPage";
import { ChangePasswordPage } from "../pages/MyAccount/ChangePasswordPage";
import { TopMenuSection } from "./Widgets/TopMenuSection";
import { MyAccountRightLinks } from "./Widgets/MyAccountRightLinks";
import { AffiliateInformationPage } from "./MyAccount/AffiliateInformationPage";
import { Breadcrumbs } from "./Widgets/Breadcrumbs";

export class MyAccountPage {
  private readonly page: Page;
  public readonly topMenuSection: TopMenuSection;
  public myAccountRightLinks: MyAccountRightLinks;
  public readonly breadcumbs: Breadcrumbs;

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

  constructor(page: Page) {
    this.page = page;
    this.topMenuSection = new TopMenuSection(this.page);
    this.myAccountRightLinks = new MyAccountRightLinks(this.page);
    this.breadcumbs = new Breadcrumbs(this.page);
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
      return await new LogoutPage(this.page);
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
  async clickModifyAddressBook(): Promise<AddressBookPage> {
    try {
      await this.linkModifyAddressBook.click();
      return await new AddressBookPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click AddressBookPage: ${error}`);
    }
  }

  /**
   * Clicks on Modify Wish List link
   */
  async clickModifyWishList(): Promise<WishListPage> {
    try {
      await this.linkModifyWishList.click();
      return await new WishListPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Modify Wish List: ${error}`);
    }
  }

  /**
   * Clicks on View Order History link
   */
  async clickViewOrderHistory(): Promise<OrderHistoryPage> {
    try {
      await this.linkViewOrderHistory.click();
      return await new OrderHistoryPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click View Order History: ${error}`);
    }
  }

  /**
   * Clicks on Downloads link
   */
  async clickDownloads(): Promise<AccountDownloadsPage> {
    try {
      await this.linkDownloads.click();
      return await new AccountDownloadsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Downloads: ${error}`);
    }
  }

  /**
   * Clicks on Reward Points link
   */
  async clickRewardPoints(): Promise<RewardPointsPage> {
    try {
      await this.linkRewardPoints.click();
      return await new RewardPointsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Reward Points: ${error}`);
    }
  }

  /**
   * Clicks on View Return Requests link
   */
  async clickViewReturnRequests(): Promise<ProductReturnsPage> {
    try {
      await this.linkViewReturnRequests.click();
      return await new ProductReturnsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click ViewReturn Requests: ${error}`);
    }
  }

  /**
   * Clicks on Transactions link
   */
  async clickTransactions(): Promise<TransactionsPage> {
    try {
      await this.linkTransactions.click();
      return await new TransactionsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Transactions: ${error}`);
    }
  }

  /**
   * Clicks on Recurring Payments link
   */
  async clickRecurringPayments(): Promise<RecurringPaymentsPage> {
    try {
      await this.linkRecurringPayments.click();
      return await new RecurringPaymentsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Recurring Payments: ${error}`);
    }
  }

  /**
   * Clicks on Affiliate Account link
   */
  async clickAffiliateAccount(): Promise<AffiliateInformationPage> {
    try {
      await this.linkAffiliateAccount.click();
      return await new AffiliateInformationPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Affiliate Account: ${error}`);
    }
  }

  /**
   * Clicks on Newsletter link
   */
  async clickNewsletterSubscription(): Promise<NewsletterSubscriptionPage> {
    try {
      await this.linkNewsletter.click();
      return await new NewsletterSubscriptionPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Newsletter Subscription: ${error}`);
    }
  }
}
