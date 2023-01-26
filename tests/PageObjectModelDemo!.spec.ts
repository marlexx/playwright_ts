import { test, expect } from "@playwright/test";
import page1 from "../page/page1";

test("Page object model test", async ({ page, baseURL }) => {
    const form = new page1(page);
    //await page.pause();
    // playwright.config.ts line: 36 baseurl
    await page.goto(`${baseURL}`); //koristi `` za lakse pravljene stringova, stringovi su stringovi a objekti su objekti :D ne treba ti "..." + "..."
    await form.EnterValue("hello");

    const output = await form.Submit();

    await page.locator("input[id=user-message]").waitFor();
    
    const input: string = await page.locator("input[id=user-message]").inputValue();

    await form.checkvalue(input, output);
})
