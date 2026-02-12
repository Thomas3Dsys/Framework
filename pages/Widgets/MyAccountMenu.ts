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
  private readonly Transactions: Locator;
  private readonly Downloads: Locator;
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
    this.Transactions = page.locator(
      'ul.dropdown-menu li a:has-text("Transactions")',
    );
    this.Downloads = page.locator(
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
      console.log(`Exception occurred while clicking 'My Account': ${error}`);
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
  async Logout(): Promise<boolean> {
    //update to return Account logout page
    try {
      await this.expandMyAccountDropdown();
      if (await this.linkLogout.isVisible()) {
        await this.linkLogout.click();
        const logoutPage = new LogoutPage(this.page);
        return true;
      }
    } catch (error) {
      console.log(`Exception occurred while clicking 'Logout': ${error}`);
      throw error;
    }
    return false;
  }

  //Expands the drop down and checks the links found; if they match those found in a logged in account true is returned.
  async hasMyAccountMenuForLoggedInUser(): Promise<boolean> {
    try {
      let isLoggedIn = false;
      await this.expandMyAccountDropdown();

      if (await this.linkMyAccount.isVisible()) isLoggedIn = true;
      
      return isLoggedIn;
    } catch (error) {
      console.log(
        `Error when checking if My Account menu is for logged in user: ${error}`,
      );
      throw error;
    }
    return false;
  }

  async hasMyAccountMenuForLoggedOutUser(): Promise<boolean> {
    try {
      let isLoggedOut = true;
      await this.expandMyAccountDropdown();

      if (!(await this.linkLogin.isVisible())) isLoggedOut = false;

      return isLoggedOut;
    } catch (error) {
      console.log(
        `Error when checking if My Account menu is for logged out user: ${error}`,
      );
      throw error;
    }
    return false;
  }
}
