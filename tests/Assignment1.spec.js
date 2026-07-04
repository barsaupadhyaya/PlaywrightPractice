const{test,expect}=require('@playwright/test');

test('Registration flow',async({page})=>
{
    //Register using all the details
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator(".text-reset").click();
    const email="anshika@gmail.com";
    const password="Iamking@000";
    await page.locator("#firstName").fill("Barsa");
    await page.locator("#lastName").fill("Upadhy");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userMobile").fill("8888888888");
    await page.locator("[formcontrolname='occupation']").selectOption('Student');
    await page.locator("#userPassword").fill(password);
    await page.locator("#confirmPassword").fill(password);
    await page.locator("[type='submit']").click();

    //Login using the same details

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();

    //Print the first product title

    const productName=await page.locator(".card-body b").first().textContent();
    console.log(productName);

});