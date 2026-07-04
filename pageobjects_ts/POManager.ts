import{LoginPage} from './LoginPage';
import {DashBoardPage} from './DashBoardPage';
import {OrdersHistoryPage} from './OrdersHistoryPage';
import {OrderReviewPage} from './OrderReviewPage';
import {CartPage} from './CartPage';
import {Page} from '@playwright/test';

export class POManager
{
    loginPage:LoginPage;
    dashboardPage:DashBoardPage;
    ordersHistoryPage:OrdersHistoryPage;
    orderReviewPage:OrderReviewPage;
    cartPage:CartPage;
    page:Page
constructor(page:Page)
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
//module.exports = {POManager};