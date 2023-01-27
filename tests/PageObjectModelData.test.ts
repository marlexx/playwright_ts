import { test, expect } from "../fixture/pomFixture";
import * as data from "../test-data/data.json";
//import page1 from "../page/page1"; // ovo ide proko fixture

test.use({
    baseURL: "https://www.lambdatest.com/selenium-playground/simple-form-demo" //override the playwright.config.ts file baseURL
})

test("Page object model test", async ({ page, baseURL, mainpage }) => {
    //const form = new page1(page); //ne treba ti ovo zbog fixture

    //await page.pause();
    // playwright.config.ts line: 36 baseurl
    await page.goto(`${baseURL}`); //koristi `` za "lakse" pravljene stringova, stringovi su stringovi a objekti su ${objekti} :D ne treba ti "..." + "..."
    await mainpage.EnterValue(data.message);

    const output = await mainpage.Submit();

    await page.locator("input[id=user-message]").waitFor();

    const input: string = await page.locator("input[id=user-message]").inputValue();

    await mainpage.checkvalue(input, output);
})
