const{test,expect}=require('@playwright/test');

test('More Validations',async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

   // 1)Check if the text field is visible
   await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();

  // 2)Click on hide text box and validate that the checkbox is hidden
     await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

   // 3)Click on confirm button, alert pop up will come, handle the alert pop up to click on ok or dismiss
    await page.on("dialog",dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();

  // 4)Do a mouse hover
    await page.locator("#mousehover").hover();

   // 5)Switch to Frame, click on All access plan
   const iFrame=await page.frameLocator("#courses-iframe");
    await iFrame.locator("li a[href*='lifetime-access']:visible").click();
   const text=await iFrame.locator(".text h2").textContent();
   console.log(text);
   const noOfSubscribers=text.split(" ")[1];
   console.log(noOfSubscribers);
   
});