const {test,expect}=require('playwright/test');

test.describe.configure({mode:"parallel"});
test.only("@Web Pop up validation",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
       await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();
    //Handling Alert and Confirm pop up
    await page.on("dialog",dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    //Switch to frames
    const frame=await page.frameLocator("#courses-iframe");
   await frame.locator("li a[href*='lifetime-access']:visible").click();
   const text=await frame.locator(".text h2").textContent();
   console.log(text.split(" ")[1]);



});
//Below test is for screenshot and visual comparison. We are taking a screenshot of the element and then comparing it with the expected screenshot. If there is any difference, the test will fail. We can also take a screenshot of the entire page and compare it with the expected screenshot. This is useful when we want to check the UI of the application after making some changes.
test("Screenshot &Visual Comparison",async({page})=>
{
     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
      await expect(page.locator("#displayed-text")).toBeVisible();
      await page.locator("#displayed-text").screenshot({path:"partialScreenshot.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:"screenshot.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();
    
})
test('Visual Comparison',async({page})=>
{
   await page.goto("https://google.com/");
   expect(await page.screenshot()).toMatchSnapshot("google.png");
});