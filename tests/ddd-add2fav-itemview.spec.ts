import { test, expect } from '@playwright/test';
import { AvitoItemView } from '../pages/ddd-page';

test('link works and it\'s DDD item', async ({ page }) => {
    const avitoDDD = new AvitoItemView(page);
    await avitoDDD.goto();
    await avitoDDD.checkAvitoItemView();
});

/* try to add it to fav from it's own page */
test('DDD can be added to favourites', async  ({ page }) => {
    const avitoDDD = new AvitoItemView(page);
    await avitoDDD.goto();

    // check if by anyhow item is NOT in favourites (for this i changed config)
    await expect(page.getByTestId("false")).toBeTruthy();
    // there is no such thing as a best locator but it's better to use the ones working even with worst case scenarios
    await page.locator('//*[@id="app"]/div/div[3]/div[1]/div/div[2]/div[3]/div[1]/div[1]/div/div[3]/div/div/div/div[1]/button').click();
    await page.getByRole('link', { name: 'Избранное', exact: true }).click();
    await page.locator('favorite-items-list').getByRole('link').first().click();
    await expect(page.locator('button').filter({ hasText: 'В избранном' })).toBeVisible();
    // check if item is in favourites 
    await expect(page.getByTestId("true")).toBeTruthy();

    // check that the link we've got brought us back to our item
    await avitoDDD.checkAvitoItemView();
});
