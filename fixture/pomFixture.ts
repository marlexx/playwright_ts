import {test as baseTest} from "@playwright/test";
import page1 from "../page/page1";

type pages = {
    mainpage: page1
}

const ppage = baseTest.extend<pages>({
mainpage: async({page}, use)=>{
    await use(new page1(page))
}
})

export const test = ppage;
export const expect = ppage.expect;