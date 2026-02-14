import { Page, expect, Locator } from "@playwright/test";
import { MyAccountPage } from "./MyAccountPage";
import { RegistrationPage } from "./RegistrationPage";
import { LoginPage } from "./LoginPage";
import { LogoutPage } from "./LogoutPage";
import { TopMenuSection } from "./Widgets/TopMenuSection";
import { Breadcrumbs } from "./Widgets/Breadcrumbs";

export class HomePage {
  private readonly page: Page;
  public readonly topMenuSection: TopMenuSection;
  public readonly breadcumbs: Breadcrumbs;

  // Locators
  private readonly textSearchbox: Locator;
  private readonly buttonSearch: Locator;
  private readonly divSlideshow: Locator;
  constructor(page: Page) {
    this.page = page;
    this.topMenuSection = new TopMenuSection(this.page);
    this.breadcumbs = new Breadcrumbs(this.page);
    this.divSlideshow = page.locator("div.slideshow");

    this.textSearchbox = page.locator('input[placeholder="Search"]');
    this.buttonSearch = page.locator('#search button[type="button"]');
  }

  async waitForPageHeader(timeout: number = 5000): Promise<void> {
    try {
      await this.divSlideshow.waitFor({ state: "visible", timeout: timeout });
    } catch (error) {
      console.log(`Error waiting for page header: ${error}`);
      throw error;
    }
  }

  // Check if HomePage exists
  async isHomePageExists() {
     try { let title: string = await this.page.title();
    if (title) {
      return true;
    }
    return false; } catch (error) {
      console.log(`Error waiting for page title: ${error}`);
      throw error;
    }
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
