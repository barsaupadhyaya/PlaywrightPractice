import{test,expect} from '@playwright/test'

test('LoginPage e2e test',async({browser})=>{

// 1)	Select value in the student dropdown
const context=await browser.newContext();
const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.locator(".container select").selectOption("Teacher");

// 2)	Click on the Agree checkbox – Validate if its checked
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();


// 3)	Unselect the checkbox – Validate if its unchecked
await page.locator("#terms").uncheck()
await expect(page.locator("#terms")).not.toBeChecked();

// 4)	Click on the User radio box and click on the Ok button in the pop up
// (It will be a web based pop up so it will have locators.
await page.locator(".radiotextsty").nth(1).click();
await page.locator("#okayBtn").click();

// 5)	Validate if the blinking text is displayed in the home page(Assertions)
const blinkText=await page.locator("[href*='documents-request']");
await expect(blinkText).toHaveAttribute("class","blinkingText");

// 6)	Click on the blinking text, it will open up a new window(Child window)
const[newPage]=await Promise.all([
   context.waitForEvent('page'),
   blinkText.click() 
])
// 7)	Switch to child window, write code for it
// 8)	Validate the text displayed in the child window(Please email us at….)
// 9)	Extract the email id from the child window and enter the same in the parent window username field

const emailid=await newPage.locator(".container strong a").textContent();
console.log(emailid!.split('@')[1].split('.')[0]);
await page.locator("#username").fill(emailid!.split('@')[1].split('.')[0]);

});