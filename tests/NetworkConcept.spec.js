const { create } = require('node:domain');
const{test,expect, request}=require('playwright/test');
const loginPayload={userEmail:"anshika@gmail.com",userPassword:"Iamking@000"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const APIUtils=require('../utils/APIUtils');
const fakePayLoadOrders = { data: [], message: "No Orders" };
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
    //First argument would be which url we need to route
    //2nd argument would be how we want to route
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
        ,
        async route=>{
            //We are first making this api call on the page
            //Since the url is already stored in route so by route.request method it will call the above api
           const response=await page.request.fetch(route.request());

            //The fake response is in the form of java object, converting that to json format
           let body=JSON.stringify(fakePayLoadOrders);

            //route.fulfill is going to intercept the fake response by replacing the actual response
           route.fulfill(
            {
                response,
                body,
            }
           );
           //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        }
    )
    
    //The above network interception is done before clicking on the my orders page
    //Because we are trying to render the front end of myorder page where no orders should 
    //show up by injecting the fake response
    await page.locator("button[routerlink*='myorders']").click();

    //It has to wait for actual response to come before converting that to fake response
    //If faking happens before actual response has come then we will get error
    //hence wait for response method is called here
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());

});


