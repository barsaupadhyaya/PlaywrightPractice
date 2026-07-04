import{Page,Locator} from '@playwright/test'
export class LoginPage{
    page:Page;
    username:Locator;
    password:Locator;
    signInButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.username=page.getByPlaceholder("email@example.com");
        this.password=page.getByPlaceholder("email@example.com");
        this.signInButton=page.locator("#login");

    }

    async validLogin(email:string,pw:string)
    {
        await this.username.fill(email);
        await this.password.fill(pw);
        await this.signInButton.click();
    }

    async launchURL()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    }
  
}
