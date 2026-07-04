const { text } = require('node:stream/consumers');
const {test,expect}=require('playwright/test');


test('First Playwright Test',async ({browser})=>
{
    
    const context=await browser.newContext();
    const page=await context.newPage();
    const productName='ZARA COAT 3';
    const products=page.locator(".card-body");
    const email='anshikama@gil.com';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();

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
    const rows=await page.locator("tbody tr");
    
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

