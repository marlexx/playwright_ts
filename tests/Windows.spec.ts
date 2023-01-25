import { test, expect } from "@playwright/test";

test("log window popup url", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");

    const [newWindow] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("'Follow on Twitter'") //link text
    ])

    console.log(newWindow.url());
})

test("log windows popup url", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");

    const [multip] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("#followboth") //id
    ])
    await multip.waitForLoadState();
    const pages = await multip.context().pages();

    console.log("pages: " + pages.length);
    pages.forEach(singlepage => {
        console.log(singlepage.url());
    })

    let facebookpage: typeof page;
    for (let i = 0; i < pages.length; i++) {
        const url = pages[i].url();
        if (url.includes("facebook")) {
            facebookpage = pages[i];
        }
    }
    const text = await facebookpage.locator("//h1").textContent();
    console.log(text);
})