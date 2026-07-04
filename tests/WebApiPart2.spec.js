const { text } = require('node:stream/consumers');
const {test,expect}=require('playwright/test');
let webContext;

test.beforeAll(async({browser})=>
{   
    //We are putting browser fixture instead of page
    //because the session storage will be stored in browser context not on the page level
    
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    //await page.waitForURL("https://rahulshettyacademy.com/client/#/dashboard");

    //Here we are storing the session storage after logging in,
    //the below line of code will create a state.json file after logging in
    await context.storageState({path:"state.json"});

    //We are creating a new browser context where we are feeding the session storage
    webContext=await browser.newContext({storageState:'state.json'})

})

test('First Playwright Test',async ()=>
{
    const email="";
    const productName='ZARA COAT 3';
    const page=await webContext.newPage();
    
    const products=page.locator(".card-body");
    // const email='anshikama@gil.com';
    // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // await page.locator("#userEmail").fill("anshika@gmail.com");
    // await page.locator("#userPassword").fill("Iamking@000");
    // await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    // await page.locator(".card-body").first().waitFor();

    const allTitles=await page.locator(".card-body b").allTextContents();
    console.log(allTitles);

    const count=await products.count();
    for(let i=0;i<count;i++)
    {
       if(await products.nth(i).locator("b").textContent()===productName)
       {
        await products.nth(i).locator("text= Add To Cart").click();
        break
       }
    }
    await page.locator("[routerlink*='cart']").click();
   // await page.locator("div li").first().waitFor();
    const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
    const dropdown=page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount=await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;i++)
    {
        const text=await dropdown.locator("button").nth(i).textContent();
        if(text.trim()==="India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first).toHaveText(email)
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows=page.locator("tbody tr");
    
    for(let i=0;i<await rows.count();i++)
    {
        const rowOrderID=await rows.nth(i).locator("th").textContent();
        if(orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails=await page.locator(".col-text").first().textContent();
    expect(orderID.includes(orderDetails)).toBeTruthy();
    await page.pause();


});

