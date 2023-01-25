import { test, expect } from "@playwright/test";
//const {RandStr, Randint, RandId} = require('./randomf/rand');
import {RandStr, RandId , Randint} from './randomf/rand'

var ime;

test('rand2', async ({ page }) => {
    await page.goto('https://www.blazedemo.com');

    await page.locator('select[name="fromPort"]').selectOption({ index: 3 });
    await page.locator('select[name="toPort"]').selectOption({ index: 2 });

    //console.log(RandStr(6));

    await page.getByRole('button', { name: 'Find Flights' }).click();
    await page.locator('xpath = /html/body/div[2]/table/tbody/tr[1]/td[1]/input').click();

    ime = await page.getByPlaceholder('First Last').getAttribute('name');
    console.log(ime);

    await page.pause();
    
    await page.getByPlaceholder('First Last').fill(ime);
    await page.getByPlaceholder('First Last').fill('branko');
    ime = await page.getByPlaceholder('First Last').inputValue();
    
    //dvime ne radi, bar na js
    //const dvime = page.getByPlaceholder('First Last');

    //console.log(dvime.inputValue);
    console.log(ime);

    await page.getByPlaceholder('123 Main St.').fill(RandStr(10)+' '+Randint(1,110));
    await page.getByPlaceholder('Anytown').fill(RandStr(Randint(3,9)));
    await page.getByPlaceholder('State').fill(RandStr(Randint(3,9)));
    await page.getByPlaceholder('12345').fill(Randint(10000, 99999).toString());
    await page.locator('#cardType').selectOption('dinersclub');
    await page.getByPlaceholder('Credit Card Number').fill(Randint(1000000000, 9999999999).toString());
    await page.getByPlaceholder('John Smith').fill(RandStr(Randint(3,9)));
    await page.getByRole('button', { name: 'Purchase Flight' }).click();

    await expect(page.getByRole('heading', { name: 'Thank you for your purchase today!' })).toHaveCount(1);
})