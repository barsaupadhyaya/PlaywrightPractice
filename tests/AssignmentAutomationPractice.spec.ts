import{test,expect} from '@playwright/test'

test('Different events e2e test',async({page})=>{

    //1) Check if the text field is visible
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();

// 2) Click on hide text box and validate that the checkbox is hidden
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    //await page.pause();

// 3) Click on confirm button, alert pop up will come, handle the alert pop up to click on ok or dismiss
    
    await page.on('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
// 4) Do a mouse hover
    await page.locator("#mousehover").hover();

// 5)	Switch to Frame, click on All access plan
    const frame=await page.frameLocator("#courses-iframe");
    frame.getByRole("listitem").getByText("All Access plan").click();

// 6)	Validate the number of subscribers displayed, just the number from the entire text
    const subscribers=await frame.locator(".text h2").textContent();
    console.log(subscribers!.split(" ")[1]);



})