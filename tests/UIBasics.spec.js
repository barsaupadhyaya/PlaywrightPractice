const {test,expect}=require('playwright/test');


test.only('First Playwright Test',async ({browser})=>
{
    
    const context=await browser.newContext();
    const page=await context.newPage();

    //This will abort the network call made
    //Suppose we want to test if the server is down, to manually trigger that we need to abort an api call
    //For that purpose we can use the below
    //The below code is just an example how we are blocking the image
    //page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
    const userName=page.locator("#username");
    const signInBtn=page.locator("#signInBtn");
    const cardTitles=page.locator(".card-body a");

    //When we want to see the request urls and the response urls and status code to check
    //if all the calls made or anything is missing or to debug the response n status code
    //Then use the below approach
    //page.on('request',request=>console.log(request.url()));
    //page.on('response',response=>console.log(response.url(),response.status()))
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.nth(0).textContent());
    const allTiles=await cardTitles.allTextContents();
    console.log(allTiles);


});

test('@Web UI Controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator("#username");
    const signInBtn=page.locator("#signInBtn");
    const blinkText=page.locator("[href*='documents-request']");
    const dropdown=page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    //await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect(page.locator("#terms")).not.toBeChecked();
    await expect(blinkText).toHaveAttribute("class","blinkingText");
    
    //await page.pause();
});

test.only('Child Windows',async ({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkText=page.locator("[href*='documents-request']");
    const [newPage]=await Promise.all([
    context.waitForEvent('page'),
    blinkText.click(),])

    const text=await newPage.locator('.red').textContent();
    const domain=text.split("@")[1].split(" ")[0];
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());


});