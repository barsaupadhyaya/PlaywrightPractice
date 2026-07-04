import {LoginPage} from './LoginPage';
import {CartPage} from './CartPage';
import {DashboardPage} from './DashboardPage';
import {OrderReviewPage} from './OrderReviewPage';
import {OrderHistoryPage} from './OrderHistoryPage';
import { Page } from '@playwright/test';

export class POManager
{
    page:Page;
    loginpage:LoginPage;
    dashboardpage:DashboardPage;
    cartpage:CartPage;
    orderreviewpage:OrderReviewPage;
    orderhistorypage:OrderHistoryPage;

    constructor(page:Page)
    {
        this.page=page;
        this.loginpage=new LoginPage(this.page);
        this.dashboardpage=new DashboardPage(this.page);
        this.cartpage=new CartPage(this.page);
        this.orderreviewpage=new OrderReviewPage(this.page);
        this.orderhistorypage=new OrderHistoryPage(this.page);
    }

    getLoginPage()
    {
        return this.loginpage;
    }

    getDashboardPage()
    {
        return this.dashboardpage;
    }

    getCartPage()
    {
        return this.cartpage;
    }

    getOrderReviewPage()
    {
        return this.orderreviewpage;
    }

    getOrderHistoryPage()
    {
        return this.orderhistorypage;
    }
}
