import { expect, type Locator, type Page } from '@playwright/test';

let message1:string="hello";
console.log(message1);

let age1:number=20;
console.log(age1);

let numArray1:number[]=[1,2,3]
console.log(numArray1)

function add(a:number,b:number)
{
    return a+b;
}
console.log(add(2,3))

class CartPage
{
    page:Page;
    cartProducts:Locator;
    productsText:Locator;
constructor(page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}
