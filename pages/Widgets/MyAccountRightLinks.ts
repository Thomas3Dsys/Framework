
import { Page, Locator} from '@playwright/test';
import { LoginPage } from '../LoginPage';
import { RegistrationPage } from '../RegistrationPage';

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

  constructor(page: Page) {
    this.page = page;
    this.linkLogin = page.locator("a.list-group-item:has-text('Login')");
    this.linkRegister = page.locator("a.list-group-item:has-text('Register')");
    this.linkForgottenPassword = page.locator("a.list-group-item:has-text('Forgotten Password')");
    this.linkMyAccount = page.locator("a.list-group-item:has-text('My Account')");
    this.linkAddressBook = page.locator("a.list-group-item:has-text('Address Book')");
    this.linkWishList = page.locator("a.list-group-item:has-text('Wish List')");
    this.linkOrderHistory = page.locator("a.list-group-item:has-text('Order History')");
    this.linkDownloads = page.locator("a.list-group-item:has-text('Downloads')");
    this.linkRecurringpayments = page.locator("a.list-group-item:has-text('Recurring payments')");
    this.linkRewardPoints = page.locator("a.list-group-item:has-text('Reward Points')");
    this.linkReturns = page.locator("a.list-group-item:has-text('Returns')");
    this.linkTransactions = page.locator("a.list-group-item:has-text('Transactions')");
    this.linkNewsletter = page.locator("a.list-group-item:has-text('Newsletter')");

  }

async clickLogin(): Promise<LoginPage> {
    await this.linkLogin.click();
    return new LoginPage(this.page);
  } 

  async clickRegister(): Promise<RegistrationPage> {
    await this.linkRegister.click();
    return new RegistrationPage(this.page);
  }


  async hasAllLinks(): Promise<boolean> {
    if(!this.linkLogin.isVisible()) return false;
    if(!this.linkRegister.isVisible()) return false;
    if(!this.linkForgottenPassword.isVisible()) return false;
    if(!this.linkMyAccount.isVisible()) return false;
    if(!this.linkAddressBook.isVisible()) return false;
    if(!this.linkWishList.isVisible()) return false;
    if(!this.linkOrderHistory.isVisible()) return false;
    if(!this.linkDownloads.isVisible()) return false;
    if(!this.linkRecurringpayments.isVisible()) return false;
    if(!this.linkRewardPoints.isVisible()) return false;
    if(!this.linkReturns.isVisible()) return false;
    if(!this.linkTransactions.isVisible()) return false;
    if(!this.linkNewsletter.isVisible()) return false;
    return true;
  }

}
