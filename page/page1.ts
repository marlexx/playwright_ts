import { expect, Locator, Page } from "@playwright/test";
export default class page1 {

    button: Locator;

    constructor(public page: Page) { 
     this.button = page.getByRole('button', { name: 'Get Checked value' });
    }

    async EnterValue(value: string) {
        await this.page.locator("input[id=user-message]").fill(value); // :: placeholder selector
    }

    async Submit() {
       
        await this.button.click();


        await this.page.locator('xpath = //*[@id="message"]').waitFor();
        return await this.page.locator('xpath = //*[@id="message"]').innerHTML();
    }

    async checkvalue(value1: string, value2: string){
        console.log(value1 + " " + value2);
        expect(value1).toMatch(value2);
        
    }

    
}