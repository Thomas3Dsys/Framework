import { Page, Locator } from "@playwright/test";
import { MyAccountPage } from "../MyAccountPage";
import { RegistrationPage } from "../RegistrationPage";
import { LoginPage } from "../LoginPage";
import { LogoutPage } from "../LogoutPage";

// Widget of the drop down My Account menu that is found on all pages
export class MyAccountMenu {
  private readonly page: Page;

  private readonly dropdownMyAccount: Locator;
  private readonly dropdownContainer: Locator;

  //Logged Out Menu Items
  private readonly linkRegister: Locator;
  private readonly linkLogin: Locator;

  //Logged In Menu Items
  private readonly linkMyAccount: Locator;
  private readonly linkOrderHistory: Locator;
  private readonly linkTransactions: Locator;
  private readonly linkDownloads: Locator;
  private readonly linkLogout: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.dropdownMyAccount = page.locator(
      'a.dropdown-toggle:has-text("My Account")',
    );

    this.dropdownContainer = page.locator("li.dropdown.open ul.dropdown-menu");

    this.linkMyAccount = page.locator(
      'ul.dropdown-menu li a:has-text("My Account")',
    );

    this.linkOrderHistory = page.locator(
      'ul.dropdown-menu li a:has-text("Order History")',
    );
    this.linkTransactions = page.locator(
      'ul.dropdown-menu li a:has-text("Transactions")',
    );
    this.linkDownloads = page.locator(
      'ul.dropdown-menu li a:has-text("Downloads")',
    );

    this.linkRegister = page.locator(
      'div#top-links ul.dropdown-menu li a:has-text("Register")',
    );
    this.linkLogin = page.locator(
      'div#top-links ul.dropdown-menu li a:has-text("Login")',
    );
    this.linkLogout = page.locator(
      'div#top-links ul.dropdown-menu li a:has-text("Logout")',
    );
  }

  // Expand the my drop down if not already expanded
  async expandMyAccountDropdown() {
    try {
      if (await this.dropdownContainer.isHidden()) {
        await this.dropdownMyAccount.click();
      }
    } catch (error) {
      console.log(`Exception occurred while expanding 'My Account': ${error}`);
      throw error;
    }
  }
  async collapseMyAccountDropdown() {
    try {
      if (await this.dropdownContainer.isVisible()) {
        await this.dropdownMyAccount.click();
      }
    } catch (error) {
      console.log(`Exception occurred while collapsing 'My Account': ${error}`);
      throw error;
    }
  }
  // Expand drop down and Click "Register" link
  async navigateRegister(): Promise<RegistrationPage> {
    try {
      await this.expandMyAccountDropdown();
      await this.linkRegister.click();
      return new RegistrationPage(this.page);
    } catch (error) {
      console.log(`Exception occurred while clicking 'Register': ${error}`);
      throw error;
    }
  }

  // // Expand drop down and Click "Login" link
  async navigateLogin(): Promise<LoginPage> {
    try {
      await this.expandMyAccountDropdown();
      await this.linkLogin.click();
      return new LoginPage(this.page);
    } catch (error) {
      console.log(`Exception occurred while clicking 'Login': ${error}`);
      throw error;
    }
  }

  // Expand drop down and click "My Account" link
  async navigateMyAccount(): Promise<MyAccountPage> {
    try {
      await this.expandMyAccountDropdown();
      await this.linkMyAccount.click();
      return new MyAccountPage(this.page);
    } catch (error) {
      console.log(`Exception occurred while clicking 'Register': ${error}`);
      throw error;
    }
  }

  /* Tries to logout if the logout link is visible under My Account dropdown. 
  Returns true if logout was done, false if not needed because user was not logged in.
  */
  async tryLogout(): Promise<boolean> {
    //update to return Account logout page
    try {
      let isExpanded = false;
      await this.expandMyAccountDropdown();
      if (await this.linkLogout.isVisible()) {
        isExpanded = true;
        await this.linkLogout.click();
        const logoutPage = new LogoutPage(this.page);
        return true;
      }
      if (isExpanded) await this.collapseMyAccountDropdown();
    } catch (error) {
      console.log(`Exception occurred while clicking 'Logout': ${error}`);
      throw error;
    }
    return false;
  }

  //Pre-requisite : User is logged in
  async doLogout(): Promise<LogoutPage> {
    //update to return Account logout page
    try {
      await this.expandMyAccountDropdown();
      await this.linkLogout.click();
      const logoutPage = new LogoutPage(this.page);
      await logoutPage.waitForPageHeader();
      return logoutPage;
    } catch (error) {
      console.log(
        `Exception occurred while clicking 'Logout' and returning logout page: ${error}`,
      );
      throw error;
    }
  }

  public async isLoggedOutUserMenu(): Promise<Boolean> {
    let isLoggedOut:Boolean = false;
    await this.expandMyAccountDropdown();
    isLoggedOut =  await this.linkLogin.isVisible();
    await this.collapseMyAccountDropdown();
    return isLoggedOut;
  }
  
  public async isLoggedInUserMenu(): Promise<Boolean> {
    let isLoggedIn :Boolean= false;
    await this.expandMyAccountDropdown();
    isLoggedIn =  await this.linkLogout.isVisible();
    await this.collapseMyAccountDropdown();
    return isLoggedIn;
  }

  async hasAllLoggedInUserLinks(): Promise<Boolean> {
    try {
      let isLoggedIn = true;
      await this.expandMyAccountDropdown();

      if (!(await this.linkMyAccount.isVisible())) isLoggedIn = false;
      if (!(await this.linkOrderHistory.isVisible())) isLoggedIn = false;
      if (!(await this.linkTransactions.isVisible())) isLoggedIn = false;
      if (!(await this.linkDownloads.isVisible())) isLoggedIn = false;
      if (!(await this.linkLogout.isVisible())) isLoggedIn = false;

      await this.collapseMyAccountDropdown();

      return isLoggedIn;
    } catch (error) {
      console.log(
        `Error when checking all My Account menu links is for logged out user: ${error}`,
      );
      throw error;
    }
    return false;
  }

  async hasAllLogoutLink(): Promise<boolean> {
    try {
      await this.expandMyAccountDropdown();
      const hasLogout = await this.linkLogout.isVisible();
      await this.collapseMyAccountDropdown();
      return hasLogout;
    } catch (error) {
      console.log(
        `Error when checking My Account ment has logout link: ${error}`,
      );
      throw error;
    }
    return false;
  }

  async hasAllLoggedOutUserLinks(): Promise<boolean> {
    try {
      let isLoggedOut = true;
      await this.expandMyAccountDropdown();

      if (!(await this.linkRegister.isVisible())) isLoggedOut = false;
      if (!(await this.linkLogin.isVisible())) isLoggedOut = false;

      await this.collapseMyAccountDropdown();

      return isLoggedOut;
    } catch (error) {
      console.log(
        `Error when checking all My Account menu links is for logged in user: ${error}`,
      );
      throw error;
    }
    return false;
  }
}
