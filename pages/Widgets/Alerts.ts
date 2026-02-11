
import { Page, Locator} from '@playwright/test';

export class Alerts {
    private readonly page: Page;
    private readonly successMessage: Locator;
    private readonly dangerMessages: Locator;
    private readonly allMessages: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successMessage = page.locator(".alert-success");
        this.dangerMessages = page.locator(".alert-danger");
        this.allMessages = page.locator(".alert");
    }

    async getAlertSuccessMessage() : Promise<string | null> {
    if(await this.successMessage.isVisible({ timeout: 500 })) {
        return (await this.successMessage.textContent())?.trim() || null;
      }
      return null;
    }

    async getAllAlertMessage() : Promise<string | null> {
    if(await this.allMessages.isVisible({ timeout: 500 })) {
        return (await this.allMessages.textContent())?.trim() || null;
      }
      return null;
    }

        async getAlertDangerMessage() : Promise<string | null> {
    if(await this.dangerMessages.isVisible({ timeout: 500 })) {
        return (await this.dangerMessages.textContent())?.trim() || null;
      }
      return null;
    }

}