import { Page, expect, Locator } from "@playwright/test";
import { MyAccountPage } from "./MyAccountPage";
import { RegistrationPage } from "./RegistrationPage";
import { LoginPage } from "./LoginPage";
import { LogoutPage } from "./LogoutPage";
import { TopMenuSection } from "./Widgets/TopMenuSection";

export class HomePage {
  private readonly page: Page;
  public readonly topMenuSection: TopMenuSection;

  // Locators
  private readonly textSearchbox: Locator;
  private readonly buttonSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topMenuSection = new TopMenuSection(this.page);

    this.textSearchbox = page.locator('input[placeholder="Search"]');
    this.buttonSearch = page.locator('#search button[type="button"]');
  }

  // Check if HomePage exists
  async isHomePageExists() {
    let title: string = await this.page.title();
    if (title) {
      return true;
    }
    return false;
  }

  // Enter product name in the search box
  async enterProductName(pName: string) {
    try {
      await this.textSearchbox.fill(pName);
    } catch (error) {
      console.log(`Exception occurred while entering product name: ${error}`);
      throw error;
    }
  }

  // Click the search button
  async clickSearch() {
    try {
      await this.buttonSearch.click();
    } catch (error) {
      console.log(`Exception occurred while clicking 'Search': ${error}`);
      throw error;
    }
  }
}
