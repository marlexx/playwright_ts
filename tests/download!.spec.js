import { test, expect } from '@playwright/test';
import { fs } from 'fs'; //npm install fs

test("Download", async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo");
    await page.type("#textbox", "hello");
    await page.click("id=create");

    const downloadc = await Promise.all([
        page.waitForEvent("download"),
        page.click("#link-to-download")
    ])
    const path = await downloadc[0].path();
    console.log(path);

    const filename = await downloadc[0].suggestedFilename();
    await downloadc[0].saveAs(filename);
    page.waitForEvent("download");

    fs.readFile("./Lambdainfo.txt", (err, data) => {
        if (err) test.fail();

        expect(data).toEqual("hello");
    })

    await downloadc.delete();
})