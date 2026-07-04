import{Page,Locator,expect} from '@playwright/test'

export class OrderReviewPage{

    page:Page;
    emailId:Locator;
    country:Locator;
    selectCountry:Locator;
    submit:Locator;
    confMessage:Locator;
    orderId:Locator;
    orderHistorybtn:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.emailId=page.locator(".user__name [type='text']").first();
        this.country=page.getByPlaceholder("Select Country");
        this.selectCountry=page.getByRole("button",{name:"India"}).nth(1);
        this.submit=page.getByText("Place Order");
        this.confMessage=page.locator(".hero-primary");
        this.orderId=page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderHistorybtn=page.getByText("Orders History Page");


    }

    async verifyEmailid(userEmail:string)
    {
        await expect(this.emailId).toHaveText(userEmail);
    }

    async searchAndSelectCountry(countryName:string)
    {
        await this.country.pressSequentially(countryName,{delay:100});
        await this.selectCountry.click();
    }

    async placeOrder(confirmationMsg:string)
    {
        await this.submit.click();
        await expect(this.confMessage).toHaveText(confirmationMsg);
        return await this.orderId.textContent();
    }

    async clickOrderHistory()
    {
        
       await this.orderHistorybtn.click();
    }

    
}