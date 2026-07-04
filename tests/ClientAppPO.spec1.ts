 
 
const dataset = JSON.parse(JSON.stringify(require('../utils/ClientAppTestData.json')));
import{test,expect,Page} from '@playwright/test';
import{POManager} from './POManager';

//Since the data is in the form of array of objects, we can use for loop to iterate through the data and run the test cases for each data set. This is called Data Driven Testing.
for(const data of dataset)
{
//This test case will run for each data set in the ClientAppTestData.json file. We can use the data from the json file in our test case by using the data variable.
 test(`@Web Client App login for $(data.productName)`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const username = data.username;
     const password = data.password;
     const productName = 'Zara Coat 4';
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();














  


    


    //Zara Coat 4





    









 });
}

 



 

