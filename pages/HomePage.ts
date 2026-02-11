import { Page, expect, Locator } from "@playwright/test";
import { MyAccountPage } from "./MyAccountPage";
import { RegistrationPage } from "./RegistrationPage";
import { LoginPage } from "./LoginPage";
import { LogoutPage } from "./LogoutPage";

export class HomePage {
  private readonly page: Page;

  // Locators
  //todo: move MyAccount dropdown functionality to a seperate widget class
  private readonly dropdownMyAccount: Locator;
  private readonly linkMyAccount: Locator;
  private readonly lnkRegister: Locator;
  private readonly linkLogin: Locator;
  private readonly linkLogout: Locator;
  private readonly txtSearchbox: Locator;
  private readonly btnSearch: Locator;
  private readonly dropdownContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.dropdownMyAccount = page.locator(
      'a.dropdown-toggle:has-text("My Account")',
    );

    this.dropdownContainer = page.locator('li.dropdown.open ul.dropdown-menu');


    this.linkMyAccount = page.locator(
      'ul.dropdown-menu li a:has-text("My Account")',
    );
    this.lnkRegister = page.locator('div#top-links ul.dropdown-menu li a:has-text("Register")');
    this.linkLogin = page.locator('div#top-links ul.dropdown-menu li a:has-text("Login")');
    this.linkLogout = page.locator('div#top-links ul.dropdown-menu li a:has-text("Logout")');

    this.txtSearchbox = page.locator('input[placeholder="Search"]');
    this.btnSearch = page.locator('#search button[type="button"]');
  }

  // Check if HomePage exists
  async isHomePageExists() {
    let title: string = await this.page.title();
    if (title) {
      return true;
    }
    return false;
  }

  // Click "My Account" link
  async expandMyAccountDropdown() {
    try {
      if(await this.dropdownContainer.isHidden()) {
        await this.dropdownMyAccount.click();
      }
    } catch (error) {
      console.log(`Exception occurred while clicking 'My Account': ${error}`);
      throw error;
    }
  }

  // Click "Register" link
  async navigateRegister(): Promise<RegistrationPage> {
    try {
      await this.expandMyAccountDropdown();
      await this.lnkRegister.click();
      return new RegistrationPage(this.page);
    } catch (error) {
      console.log(`Exception occurred while clicking 'Register': ${error}`);
      throw error;
    }
  }

  // Click "Login" link
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

  // Enter product name in the search box
  async enterProductName(pName: string) {
    try {
      await this.txtSearchbox.fill(pName);
    } catch (error) {
      console.log(`Exception occurred while entering product name: ${error}`);
      throw error;
    }
  }

  // Click the search button
  async clickSearch() {
    try {
      await this.btnSearch.click();
    } catch (error) {
      console.log(`Exception occurred while clicking 'Search': ${error}`);
      throw error;
    }
  }

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
}
