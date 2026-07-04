import{Page,Locator,expect} from '@playwright/test'


export class OrderHistoryPage
{   
    page:Page;
    orders:Locator;
    rows:Locator;
    orderId:Locator;
    emailid:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.orders=page.locator(".ng-star-inserted").first();
        this.rows=page.locator("tbody tr");
        this.orderId=page.locator(".col-text.-main");
        this.emailid=page.getByText("Delivery Address");

    }

    async searchTheProductAndClickView(orderID:any)
    {
         await this.orders.waitFor();

        const count = await this.rows.count();

        for (let i = 0; i < count; i++) {

            const id = await this.rows.nth(i).locator("th").textContent();

            if (id && orderID.includes(id)) {

                await this.rows.nth(i).locator("button").first().click();

                return id;
            }
        }

        return null;
    }

    async verifyorder_emailid(id:any,userEmail:string)
    {
        await expect(this.orderId).toHaveText(id);
        await expect(this.emailid.filter({ hasText: userEmail })).toBeVisible();
    }
}