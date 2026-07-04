import{test as base,BrowserContext} from '@playwright/test'

type MyFixtures={
    webcontext:BrowserContext;
}

export const test=base.extend<MyFixtures>({

webcontext:async ({browser},use)=>{

     const logincontext=await browser.newContext();
    const page=await logincontext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    
    //Here we are storing the session storage after logging in,
    //the below line of code will create a state.json file after logging in
    await logincontext.storageState({path:"state.json"});

    //We are creating a new browser context where we are feeding the session storage
    const context=await browser.newContext({storageState:'state.json'})

    await use(context);
    await context.close();

}
})
export { expect } from '@playwright/test';