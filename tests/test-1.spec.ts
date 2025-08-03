import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/my-pisnicka/');
  await page.getByRole('button', { name: 'Nesouhlasím' }).click();
  await page
    .locator('#toolbar')
    .getByRole('button')
    .filter({ hasText: /^$/ })
    .click();
  await page.getByRole('button', { name: 'Rychlost posunu 1x' }).click();
  await page
    .getByRole('region', { name: 'Akordy' })
    .getByRole('button')
    .nth(2)
    .click();
  await page
    .getByRole('region', { name: 'Akordy' })
    .getByRole('button')
    .nth(2)
    .click();
  await page
    .getByRole('region', { name: 'Akordy' })
    .getByRole('button')
    .nth(2)
    .click();
  await page
    .getByRole('region', { name: 'Akordy' })
    .getByRole('button')
    .nth(2)
    .click();
  await page
    .getByRole('region', { name: 'Akordy' })
    .getByRole('button')
    .nth(2)
    .click();
  await page
    .getByRole('region', { name: 'Akordy' })
    .getByRole('button')
    .nth(2)
    .click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(2).click();
  await page.getByRole('button', { name: 'Zapni posun' }).click();
  await page.getByRole('button', { name: 'scroll back to top' }).click();
});
