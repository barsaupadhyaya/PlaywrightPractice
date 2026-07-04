const { text } = require('node:stream/consumers');
const {test,expect}=require('playwright/test');


test('First Playwright Test',async ({browser})=>
{
    
    const context=await browser.newContext();
    const page=await context.newPage();
    const productName='ZARA COAT 3';
    const products=page.locator(".card-body");
    const email='anshika@gmail.com';
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button",{name:'Login'}).click();
    
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();

    await page.locator(".card-body").filter({hasText:'ZARA COAT 3'}).getByRole("button", {name:"Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();
   await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
   await page.getByRole("button", {name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});
   await page.getByRole("button", {name:"India"}).nth(1).click();

   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
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

