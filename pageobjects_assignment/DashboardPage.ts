import{Page,Locator} from '@playwright/test'

export class DashboardPage{

    page:Page;
    productText:Locator;
    addToCart:Locator;
    cartButton:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.productText=page.locator(".card-body" ).first();
        this.addToCart=page.locator(".card-body");
        this.cartButton=page.getByRole("listitem").getByRole("button",{name:"Cart"});


    }

    async searchProductAndAddToCart(productName:string)
    {
        await this.productText.waitFor();
        await this.addToCart.filter({hasText:productName})
    .getByRole("button",{name:"Add To Cart"}).click();
       
    }
    async navigateToCart(){
         await this.cartButton.click();
    }
}