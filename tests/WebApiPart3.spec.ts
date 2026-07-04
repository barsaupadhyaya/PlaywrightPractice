import { test, expect } from '../fixtures/test-base';

test('First Playwright Test', async ({ webcontext }) => {
  const email = "anshika@gmail.com";
  const productName = 'ZARA COAT 3';

  const page = await webcontext.newPage();

  await page.goto("https://rahulshettyacademy.com/client/");

  const products = page.locator(".card-body");

  const allTitles = await page.locator(".card-body b").allTextContents();
  console.log(allTitles);

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator("b").textContent();

    if (title === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();

  await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

  await page.locator("text=Checkout").click();

  await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 100 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();

    if (text?.trim() === "India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator(".user__name [type='text']").first()).toHaveValue(email);

  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

  if (!orderID) {
    throw new Error("Order ID was not generated");
  }

  console.log(orderID);

  await page.locator("button[routerlink*='myorders']").click();

  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    const rowOrderID = await rows.nth(i).locator("th").textContent();

    if (rowOrderID && orderID.includes(rowOrderID)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderDetails = await page.locator(".col-text").first().textContent();

  expect(orderDetails).not.toBeNull();
  expect(orderID).toContain(orderDetails!);
});