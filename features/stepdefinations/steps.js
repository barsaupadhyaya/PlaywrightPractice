const { Given, When, Then } = require('@cucumber/cucumber');

const{expect}=require('@playwright/test');


 Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000},async function (username, password) {
          
                        
               const productName = 'Zara Coat 4';
               const products = this.page.locator(".card-body");
               const loginPage = this.poManager.getLoginPage();
               await loginPage.goTo();
               await loginPage.validLogin(username,password);
         });

  When('Add {string} to the cart',{timeout:100*1000}, async function (productName) {
          this.dashboardPage = this.poManager.getDashboardPage();
            await this.dashboardPage.searchProductAddCart(productName);
            await this.dashboardPage.navigateToCart();
         });

 Then('Verify {string} is displayed in the cart', {timeout:100*1000},async function (productName) {
           const cartPage = this.poManager.getCartPage();
            await cartPage.VerifyProductIsDisplayed(productName);
            await cartPage.Checkout();
         });

 When('Enter valid details and Place the order', {timeout:100*1000},async function () {
           const ordersReviewPage = this.poManager.getOrdersReviewPage();
            await ordersReviewPage.searchCountryAndSelect("ind","India");
            const orderId = await ordersReviewPage.SubmitAndGetOrderId();
            console.log(orderId);
         });

Then('Verify order is present in the Order History page',{timeout:100*1000},async function () {
           await this.dashboardPage.navigateToOrders();
            const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
            await ordersHistoryPage.searchOrderAndSelect(orderId);
            expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
         });
  Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
           
            const userName=this.page.locator("#username");
             const signInBtn=this.page.locator("#signInBtn");

            await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await userName.fill(username);
           await this.page.locator("[type='password']").fill(password);
             await this.page.locator("#signInBtn").click();
         });

Then('Verify Error message is displayed', async function () {
           console.log(await this.page.locator("[style*='block']").textContent());
            await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
         });


         
    