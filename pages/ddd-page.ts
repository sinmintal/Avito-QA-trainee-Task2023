import { expect, type Locator, type Page } from '@playwright/test';

/* This is like a template for a page
As i know it's just a simplest way to get it done while working with lot of pages
So it's good to practice even at it's smallest 
*/

export class AvitoItemView {
  readonly page: Page;
  readonly avitoLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avitoLogo = page.getByRole('link', { name: 'Авито — сайт объявлений' });
  }

  async goto() {
    await this.page.goto('https://www.avito.ru/2639542363');
  }

  async checkAvitoItemView() {
    await expect(this.avitoLogo).toBeVisible();
    // in fact that makes it too connected to this item but i think it's ok
    await expect(this.page).toHaveTitle(/^DDD.* Авито/); 
  }
}