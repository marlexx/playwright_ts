import { test, expect } from '@playwright/test';
var fs = require('fs'); //npm install fsw

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
   // page.waitForEvent("download"); ne treba

    await fs.readFile("Lambdainfo.txt",'utf8', (err, data) => {
        if (err) test.fail();

        expect(data).toEqual("hello");
        console.log(data);
    })

     try {
        await fs.unlinkSync('Lambdainfo.txt');
      
        console.log("Deleted File successfully.");
      } catch (error) {
        console.log(error);
      }
})

test("upload", async ({page})=>{

  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
  //await page.pause();
  await page.setInputFiles('input[type=file]', ["uploaditem/dog.png", "uploaditem/cat.png"]);

  await page.locator(".start").nth(0).click();

})

test("upload2", async({page})=>{
  await page.goto("https://blueimp.github.io/jQuery-File-Upload/");

  //await page.pause();

  const [uploadfiles] = await Promise.all([ //[] je obavezno
    page.waitForEvent("filechooser"),
    page.locator("input[type=file]").click()
  ])

  const isMultiple = uploadfiles.isMultiple();

  console.log(isMultiple);

  uploadfiles.setFiles(["uploaditem/dog.png", "uploaditem/cat.png"]);

  await page.locator(".start").nth(0).click();
})