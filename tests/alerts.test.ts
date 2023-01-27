import { test, expect } from '@playwright/test';

test('alert1', async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/");

    await page.locator("text = Javascript Alerts").click();

    page.on("dialog", async (alert) => {
        const alert1 = await alert.message();
        console.log(alert1);
        await alert.accept();
    })

    await page.locator('button:has-text("Click Me")').nth(0).click();
   
})

test('alert2', async ({ page }) => {
    
    await page.goto("https://www.lambdatest.com/selenium-playground/");

    await page.locator("text = Javascript Alerts").click();

    page.on("dialog", async (alert) => {
        const alert2 = await alert.message();
        console.log(alert2);
        await alert.dismiss();
    })

    await page.locator('button:has-text("Click Me")').nth(1).click();

    await expect(page.locator("id=confirm-demo")).toContainText("Cancel");
})

test('alert3', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/");

    await page.locator("text = Javascript Alerts").click();

    page.on("dialog", async (alert) => {
        const alert3 = await alert.defaultValue();
        console.log(alert3);
        await alert.accept("uros");
    })

    await page.locator('button:has-text("Click Me")').nth(2).click();

    await expect(page.locator("id=prompt-demo")).toContainText("uros");
   
})