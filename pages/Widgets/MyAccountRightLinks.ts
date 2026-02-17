import { Page, Locator } from "@playwright/test";
import { LoginPage } from "../LoginPage";
import { RegistrationPage } from "../RegistrationPage";
import { MyAccountPage } from "../MyAccountPage";
import { AddressBookPage } from "../MyAccount/AddressBookPage";
import { WishListPage } from "../MyAccount/WishListPage";
import { OrderHistoryPage } from "../MyAccount/OrderHistoryPage";
import { AccountDownloadsPage } from "../MyAccount/AccountDownloadsPage";
import { RecurringPaymentsPage } from "../MyAccount/RecurringPaymentsPage";
import { RewardPointsPage } from "../MyAccount/RewardPointsPage";
import { ProductReturnsPage } from "../MyAccount/ProductReturns";
import { TransactionsPage } from "../MyAccount/TransactionsPage";
import { NewsletterSubscriptionPage } from "../MyAccount/NewsletterSubscriptionPage";
import { LogoutPage } from "../LogoutPage";

/*Creation:
  import { MyAccountRightLinks } from "./Widgets/MyAccountRightLinks";
  public myAccountRightLinks: MyAccountRightLinks;
  this.myAccountRightLinks = new MyAccountRightLinks(this.page);
  */

export class MyAccountRightLinks {
  private readonly page: Page;

  private readonly linkLogin: Locator;
  private readonly linkRegister: Locator;
  private readonly linkForgottenPassword: Locator;
  private readonly linkMyAccount: Locator;
  private readonly linkAddressBook: Locator;
  private readonly linkWishList: Locator;
  private readonly linkOrderHistory: Locator;
  private readonly linkDownloads: Locator;
  private readonly linkRecurringpayments: Locator;
  private readonly linkRewardPoints: Locator;
  private readonly linkReturns: Locator;
  private readonly linkTransactions: Locator;
  private readonly linkNewsletter: Locator;
  private readonly linkLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.linkLogin = page.locator("a.list-group-item:has-text('Login')");
    this.linkRegister = page.locator("a.list-group-item:has-text('Register')");
    this.linkForgottenPassword = page.locator(
      "a.list-group-item:has-text('Forgotten Password')",
    );
    this.linkMyAccount = page.locator(
      "a.list-group-item:has-text('My Account')",
    );
    this.linkAddressBook = page.locator(
      "a.list-group-item:has-text('Address Book')",
    );
    this.linkWishList = page.locator("a.list-group-item:has-text('Wish List')");
    this.linkOrderHistory = page.locator(
      "a.list-group-item:has-text('Order History')",
    );
    this.linkDownloads = page.locator(
      "a.list-group-item:has-text('Downloads')",
    );
    this.linkRecurringpayments = page.locator(
      "a.list-group-item:has-text('Recurring payments')",
    );
    this.linkRewardPoints = page.locator(
      "a.list-group-item:has-text('Reward Points')",
    );
    this.linkReturns = page.locator("a.list-group-item:has-text('Returns')");
    this.linkTransactions = page.locator(
      "a.list-group-item:has-text('Transactions')",
    );
    this.linkNewsletter = page.locator(
      "a.list-group-item:has-text('Newsletter')",
    );
    this.linkLogout = page.locator("a.list-group-item:has-text('Logout')");
  }

  async clickLogin(): Promise<LoginPage> {
    await this.linkLogin.click();
    return new LoginPage(this.page);
  }

  async clickRegister(): Promise<RegistrationPage> {
    await this.linkRegister.click();
    return new RegistrationPage(this.page);
  }

  async hasAllLinks(isLoggedIn: boolean = false): Promise<boolean> {
    if (!isLoggedIn) {
      if (await !this.linkLogin.isVisible()) return false;
    }
    if (await !this.linkRegister.isVisible()) return false;
    if (await !this.linkForgottenPassword.isVisible()) return false;
    if (await !this.linkMyAccount.isVisible()) return false;
    if (await !this.linkAddressBook.isVisible()) return false;
    if (await !this.linkWishList.isVisible()) return false;
    if (await !this.linkOrderHistory.isVisible()) return false;
    if (await !this.linkDownloads.isVisible()) return false;
    if (await !this.linkRecurringpayments.isVisible()) return false;
    if (await !this.linkRewardPoints.isVisible()) return false;
    if (await !this.linkReturns.isVisible()) return false;
    if (await !this.linkTransactions.isVisible()) return false;
    if (await !this.linkNewsletter.isVisible()) return false;

    if (isLoggedIn) {
      if (await !this.linkLogout.isVisible()) return false;
    }

    return true;
  }

  async hasLogoutLink(isLoggedIn: boolean = false): Promise<boolean> {
    return await this.linkLogout.isVisible();
  }

  async clickMyAccount(): Promise<MyAccountPage> {
    try {
      await this.linkMyAccount.click();
      return new MyAccountPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click My Account: ${error}`);
    }
  }

  async clickAddressBook(): Promise<AddressBookPage> {
    try {
      await this.linkAddressBook.click();
      return new AddressBookPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Address Book: ${error}`);
    }
  }

  async clickWishList(): Promise<WishListPage> {
    try {
      await this.linkWishList.click();
      return new WishListPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Wish List: ${error}`);
    }
  }

  async clickOrderHistory(): Promise<OrderHistoryPage> {
    try {
      await this.linkOrderHistory.click();
      return new OrderHistoryPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Order History: ${error}`);
    }
  }

  async clickDownloads(): Promise<AccountDownloadsPage> {
    try {
      await this.linkDownloads.click();
      return new AccountDownloadsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Downloads: ${error}`);
    }
  }

  async clickRecurringPayments(): Promise<RecurringPaymentsPage> {
    try {
      await this.linkRecurringpayments.click();
      return new RecurringPaymentsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Recurring Payments: ${error}`);
    }
  }

  async clickRewardPoints(): Promise<RewardPointsPage> {
    try {
      await this.linkRewardPoints.click();
      return new RewardPointsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Reward Points: ${error}`);
    }
  }

  async clickReturns(): Promise<ProductReturnsPage> {
    try {
      await this.linkReturns.click();
      return new ProductReturnsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Returns: ${error}`);
    }
  }

  async clickTransactions(): Promise<TransactionsPage> {
    try {
      await this.linkTransactions.click();
      return new TransactionsPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Transactions: ${error}`);
    }
  }

  async clickNewsletter(): Promise<NewsletterSubscriptionPage> {
    try {
      await this.linkNewsletter.click();
      return new NewsletterSubscriptionPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Newsletter: ${error}`);
    }
  }

  async clickLogout(): Promise<LogoutPage> {
    try {
      await this.linkLogout.click();
      return new LogoutPage(this.page);
    } catch (error) {
      throw new Error(`Failed to click Logout: ${error}`);
    }
  }
}
