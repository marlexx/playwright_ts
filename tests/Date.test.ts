import { test, expect } from '@playwright/test';
import moment from 'moment'; //npm install moment --save && package.json > "moment": "^2.29.4"

test('Date', async ({ page }) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

    let date = "1994-12-04"; // da vidis order console: document.getElementById("birthday").value

    //await page.pause();

    await page.fill("#birthday", date); //== id=birthday

})

test("moment", async ({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo");

    let datetoselect:string = "April 2023";

    //await page.pause();

    //za proveru da li je pre danas ili posle danas
    //let before = moment(datetoselect, "MMM YYYY").isBefore();
    //let after = moment(datetoselect, "MMM YYYY").isAfter();
    await page.click("#from");

    let dispdate:string = await page.locator("option[selected=selected]").innerText() + " " + await page.locator(".ui-datepicker-year").innerText();

    while(!moment(dispdate, "MMM YYYY").isSame(moment(datetoselect, "MMMM YYYY"))){ //mozes da koristis razlicite formate sa momentom
     dispdate = await page.locator("option[selected=selected]").innerText() + " " + await page.locator(".ui-datepicker-year").innerText();

    console.log(dispdate);

    let before = moment(datetoselect, "MMM YYYY").isBefore(moment(dispdate, "MMM YYYY"));
    let after = moment(datetoselect, "MMM YYYY").isAfter(moment(dispdate, "MMM YYYY"));

    console.log(before);
    console.log(after);

    if(after) await page.click("a[title=Next]");
    else if(before) await page.click("a[title=Prev]");
    }

    await page.locator("#ui-datepicker-div > table > tbody > tr:nth-child(1) > td:nth-child(7) > a").click();

})