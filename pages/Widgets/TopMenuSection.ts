import { Page, Locator } from "@playwright/test";
//currencyDropdown
import { MyAccountMenu } from "../Widgets/MyAccountMenu";
//searchbar
//productbar
//breadcrumbs
import { Alerts } from "../Widgets/Alerts";

//Represents the Top Menu Section that exists on all pages of the application
export class TopMenuSection {
  private readonly page: Page;

  public readonly myAccountMenu: MyAccountMenu;
  public readonly alerts: Alerts;

  //telephone
  //wishlistCounter
  //linkShoppingcart
  //linkCheckout
  //Logo

  constructor(page: Page) {
    this.page = page;

    this.alerts = new Alerts(this.page);
    this.myAccountMenu = new MyAccountMenu(this.page);
  }
}

/*

import { TopMenuSection } from "./Widgets/TopMenuSection";
private readonly topMenuSection : TopMenuSection;
this.topMenuSection = new TopMenuSection(this.page);



*/
