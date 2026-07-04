const{test,expect}=require('@playwright/test');

test('Replace forloop',async({page})=>
{
    
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const productName='ZARA COAT 3';
    const products=page.locator(".card-body");
    const email='anshikama@gil.com';

    //Login to the page
    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button",{name:'Login'}).click();
    
    //Wait for the next page to load properly
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();

    //Click on Add to Cart if Zara Coat 3 is displayed
    await products.filter({hasText:'ZARA COAT 3'}).getByRole('button',{name:' Add To Cart'}).click();

    //Click on Cart button
    await page.getByRole("listitem").getByRole('button',{name:'Cart'}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole('button',{name:'Checkout'}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100});
    await page.getByRole('button',{name:'India'}).nth(1).click();
    await page.getByText("Place Order ").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    
   
});