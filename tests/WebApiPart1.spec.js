const { create } = require('node:domain');
const{test,expect, request}=require('playwright/test');
const loginPayload={userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const APIUtils=require('../utils/APIUtils');
let response;


//The Api url, headers and other details are taken after logging into https://rahulshettyacademy.com/client/#/dashboard/dash


test.beforeAll(async()=>
{
    //Login Api
    
    const apiContext=await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);
   
       
});

test.beforeEach(async()=>
{

});

test('Client App Login',async ({page})=>
{
    //To inject the token in the local storage of the browser, we need to use the addInitScript method of the page object. 
    // This method allows us to run a script before any other script on the page. 
    // We can use this method to set the token in the local storage before the page loads.

    
    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value);
    },response.token);
    

    
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows=page.locator("tbody tr");
    
    for(let i=0;i<await rows.count();i++)
    {
        const rowOrderID=await rows.nth(i).locator("th").textContent();
        if(response.orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails=await page.locator(".col-text").first().textContent();
   // await page.pause();
    await expect(response.orderID.includes(orderDetails)).toBeTruthy();
    


});


