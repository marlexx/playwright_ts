import { test, expect } from '@playwright/test';

test("count", async ({ page }) => {
    await page.goto("https://letcode.in/frame");

    const allframes = page.frames();
    console.log("frames = " + allframes.length);
})

test("interaction", async ({ page }) => {
    await page.goto("https://letcode.in/frame");

    //await page.pause();

    const frame1 = await page.frame("firstFr"); //locate by name

    await frame1?.fill("input[name='fname']", "uros");
    // upitnik znaci if(frame1 != null)
    await frame1?.fill("input[name='lname']", "vidakovic");

    expect(await frame1?.locator("p.has-text-info").textContent()).toContain("uros vidakovic"); //locate by class


})

test("interaction2", async ({ page }) => {
    await page.goto("https://letcode.in/frame");

    //await page.pause();

    const frame1 = await page.frameLocator('#firstFr'); //locate by id

    await frame1?.locator("input[name='fname']").fill("uros");
    // upitnik znaci if(frame1 != null)
    await frame1?.locator("input[name='lname']").fill("vidakovic");

    expect(await frame1?.locator("p.has-text-info").textContent()).toContain("uros vidakovic"); //locate by class


})

test("nested frame", async ({ page }) => {
    await page.goto("https://letcode.in/frame");

    await page.pause();

    const frame1 = await page.frameLocator('#firstFr'); //locate by id
    const innerframe1 = await frame1.frameLocator("iframe[src='innerFrame']");
    await innerframe1.locator("input[name='email']").fill("hello");
})