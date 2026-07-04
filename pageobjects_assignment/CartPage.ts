import{Page,Locator} from '@playwright/test'
export class CartPage{

    page:Page;
    myCart:Locator;
    checkOut:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.myCart=page.locator(".cart");
        this.checkOut=page.getByRole("button",{name:"Checkout"});


    }
    async clickOnCheckOut()
    {
        await this.myCart.waitFor();
        await this.checkOut.click();
    }
}