import{test,expect,request} from '@playwright/test';
const loginPayload={userEmail:"barsaupadhyaya.official@gmail.com",userPassword:"b3wakoof"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eae1c941646b7a8b3ed3"}]}
let loginToken:any;
let orderID:any;

test.beforeAll(async()=>{

    const apiContext=await request.newContext();
    const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload
        }
    );
    expect(loginResponse.ok()).toBeTruthy();

    const jsonResponse=await loginResponse.json();
    loginToken=jsonResponse.token;
    console.log(loginToken);

    const orderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayload,
            headers:{
                Authorization:loginToken,
                "Content-Type":"application/json",
            },
        },
        
    )
    const orderJsonReponse=await orderResponse.json();
    orderID=orderJsonReponse.orders[0];

})

test('E2E validation',async({page})=>{
  await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
  },loginToken);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows=page.locator("tbody tr");
    
    for(let i=0;i<await rows.count();i++)
    {
        const rowOrderID=await rows.nth(i).locator("th").textContent();
        if(rowOrderID&&orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails=await page.locator(".col-text").first().textContent();
   // await page.pause();
   await expect(orderDetails).not.toBeNull();
   await expect(orderID).toContain(orderDetails!);



})