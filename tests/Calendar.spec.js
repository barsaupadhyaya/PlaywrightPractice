const {test,expect}=require("@playwright/test");
test("Calendar Validation",async({page})=>{
    const date="15";
    const month="6";
    const year="2026";
    const expecteddate=[month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__wrapper").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();

    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs=await page.locator(".react-date-picker__inputGroup input");
    for(let i=0;i<expecteddate.count;i++){
       const value=await inputs.nth(i).inputValue();
       await expect(value).toBe(expecteddate[i]);
    }

});