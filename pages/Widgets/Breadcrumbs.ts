import { Page, Locator } from "@playwright/test";
import { HomePage } from "../HomePage";

/*
import { Breadcrumbs } from "./Widgets/Breadcrumbs";
public readonly breadcumbs: Breadcrumbs;
this.breadcumbs = new Breadcrumbs(this.page);
*/




export class Breadcrumbs {
  private readonly page: Page;
  private readonly container: Locator;
  private readonly iconHome: Locator;
  private readonly breadcrumbItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.locator("ul.breadcrumb");
    this.iconHome = page.locator("ul.breadcrumb li a i.fa-home");
    this.breadcrumbItems = page.locator(
      "ul.breadcrumb li a:not(:has(> .fa-home))",
    );
  }

  async waitForExists(timeout: number = 5000): Promise<void> {
    try {
      await this.container.waitFor({ state: "visible", timeout: timeout });
    } catch (error) {
      console.log(`Error waiting for breadcumbs container to exists: ${error}`);
      throw error;
    }
  }

  
  async clickHomeIcon(): Promise<HomePage> {
    try {
      await this.iconHome.click();
      const homePage = new HomePage(this.page);
      await homePage.waitForPageHeader();
      return homePage;
    } catch (error) {
      console.log(`Error clicking breadcumbs home icon: ${error}`);
      throw error;
    }
  }

  async getBreadcrumbs(): Promise<string[]> {
    try {
      await this.waitForExists();
      return this.breadcrumbItems.allTextContents();
    } catch (error) {
      console.log(`Error getting for breadcumbs : ${error}`);
      throw error;
    }
  }
}
