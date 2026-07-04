const {LoginPage} = require('./LoginPage');
const {DashBoardPage} = require('./DashBoardPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrderReviewPage} = require('./OrderReviewPage');
const {CartPage} = require('./CartPage');

class POManager
{
constructor(page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashBoardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.orderReviewPage = new OrderReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
}

getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrderReviewPage()
{
    return this.orderReviewPage;
}
}
module.exports = {POManager};