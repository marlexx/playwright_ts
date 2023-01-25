const { test, expect } = require('@playwright/test');

test('rand data', async ({ page }) => {
    await page.goto('https://www.blazedemo.com');

    await page.locator('select[name="fromPort"]').selectOption({ index: 3 });
    await page.locator('select[name="toPort"]').selectOption({ index: 2 });

    await page.getByRole('button', { name: 'Find Flights' }).click();
    await page.locator('xpath = /html/body/div[2]/table/tbody/tr[1]/td[1]/input').click();

    await page.pause();

    await page.getByPlaceholder('First Last').fill(RandStr(6)+' '+RandStr(7));
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

function Randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RandId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function RandStr(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}