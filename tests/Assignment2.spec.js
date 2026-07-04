
const{test,expect}=require('@playwright/test');

test('More Validations',async({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //1)Select a dropdown value
    await page.locator("select.form-control").selectOption("Student");

    //2)Click on the Agree checkbox – Validate if its checked
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    //3)Unselect the checkbox – Validate if its unchecked
   // await page.locator("#terms").click();
   // expect(await page.locator("#terms").isChecked).toBeFalsy();

    //4)Click on the User radio box and click on the Ok button in the pop up
    await page.locator("#usertype").last().click();
    await page.locator("#okayBtn").click();

   // 5)Validate if the blinking text is displayed in the home page(Assertions)
    await expect(page.locator(".blinkingText").first()).toBeVisible();

    //6)Click on the blinking text, it will open up a new window(Child window)
    //7)Switch to child window, write code for it
    //8)Validate the text displayed in the child window(Please email us at….)
    //9)Extract the email id from the child window and enter the same in the parent window username field
     
   const [newPage]= await Promise.all(
    [context.waitForEvent('page'),page.locator(".blinkingText").first().click()]);

    const fullText=await newPage.locator("[href*='mailto']").textContent();
    console.log(fullText);

    const emailId= fullText.split("@")[1].split(" ")[0];
    console.log(emailId);




});
