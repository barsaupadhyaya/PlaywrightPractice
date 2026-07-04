import{test,expect} from '@playwright/test';

test('Ecommerce e2e test',async({page})=>{

    let productName:string="ADIDAS ORIGINAL";
    let userEmail:string="anshika@gmail.com";
    const expectedConfmessage:string=" Thankyou for the order. "
    let id:any;
    let orderID:any;

    //1)Login to the Ecommerce website 
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(userEmail);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");   
    await page.locator("#login").click();

    //2)In dashboard, products would be displayed, pass the product name to the test
    // and click on Add to Cart button for that product

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body" ).first().waitFor();
    await page.locator(".card-body").filter({hasText:productName})
    .getByRole("button",{name:"Add To Cart"}).click();

    //3)Go the cart page, 
    // validate that whatever product is added is showing up in My Cart page.

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator(".cart").waitFor();
    //await expect(page.locator(".infoWrap").filter({hasText:'ADIDAS ORIGINAL'})).toBeVisible();
    await expect(page.getByText(productName)).toBeVisible();

    //4)Click on Checkout if the product is confirmed, and in checkout page,
    //validate the same product is displaying with the correct quantity.
    // Validate the same email id is displayed what is used for login.

    await page.getByRole("button",{name:"Checkout"}).click();
    await expect(page.getByText(productName)).toBeVisible();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
    
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("Place Order").click();

    //6)Place the Order, validate the confirmation message
    //and capture the order id in a variable
    await expect(page.locator(".hero-primary")).toHaveText(expectedConfmessage);
    orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

   // 7)Click on Order history page displayed right below the confirmation message,
   //  find the same order id in the table and validate if its displaying.

   await page.getByText("Orders History Page").click();
   await page.locator(".ng-star-inserted").first().waitFor();

   const rows=await page.locator("tbody tr");
   
   for(let i:number=0;i<await rows.count();i++)
   {
        id=await rows.nth(i).locator("th").textContent();
        if(orderID.includes(id))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
   }
   await expect(page.locator(".col-text.-main")).toHaveText(id);

   await expect(page.getByText("Delivery Address").filter({hasText:userEmail})).toBeTruthy();

});