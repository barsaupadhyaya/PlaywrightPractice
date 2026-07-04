 
import{test,expect} from '@playwright/test'
import testData from './utils_ts/placeorderTestData.json';
import{POManager} from '../pageobjects_assignment/POManager';
const dataset = JSON.parse(JSON.stringify(testData));
const confMessage=" Thankyou for the order. ";


//Since the data is in the form of array of objects, we can use for loop to iterate through the data and run the test cases for each data set. This is called Data Driven Testing.
for (const [index, data] of dataset.entries())
{
//This test case will run for each data set in the ClientAppTestData.json file. We can use the data from the json file in our test case by using the data variable.
  test(`Client App login for ${data.productName}- ${index + 1}`, async ({ page }) => {

    const poManager = new POManager(page);

    const username = data.username;
    const password = data.password;
    const productName = data.productName;

    const loginPage = poManager.getLoginPage();
    await loginPage.launchURL();
    await loginPage.validLogin(username, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.clickOnCheckOut();

    const ordersReviewPage = poManager.getOrderReviewPage();
    await ordersReviewPage.searchAndSelectCountry("ind");

    const orderId = await ordersReviewPage.placeOrder(confMessage);
    console.log(orderId);

    const ordersHistoryPage = poManager.getOrderHistoryPage();
    const id = await ordersHistoryPage.searchTheProductAndClickView(orderId);

    await ordersHistoryPage.verifyorder_emailid(id!, username);
  });
}
 



 

