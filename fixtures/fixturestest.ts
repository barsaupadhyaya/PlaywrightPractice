import{test as base} from '@playwright/test' //here base is an alias of playwright's default test object
import { LoginPage } from '../pageobjects_ts/LoginPage'

type MyFixture={
    helloworld:string
    loginPage:LoginPage
    authenticatedPage:LoginPage
}

//Why do we use base in Fixtures?

//When creating custom fixtures, we need to extend the existing Playwright fixtures.

//To use the below fixture we need to now assign it back to test from base as we have created
//our own custom fixture and we need to export it so that we can import this in our tests

export const test=base.extend<MyFixture>({
    //Now we need mention the name of the fixture with async functions with the body of the fixture
    //Fixture also require 2 arguments inside,first is object either empty object or any other fixture
    //The 2nd argument will be use, 
    //Typescript will complain about the compile time error if we dont declare the type
    //So declare the type before
    
    helloworld: async({}, use)=>{
   //Anything that we use before the use method will be executed before the test like beforehook
    //console.log("Hello World")
    //If we want to return a variable and call the same variable inside test instead of printing it in console
    //We can do that by parsing the variable inside use method
    const myWorld='Hello World'
    await use(myWorld);
    //Anything that we use before the use method will be executed before the test like beforehook

    },
    authenticatedPage:async({page},use)=>{

        await page.goto('')
        await page.locator.fill('')
        await
    }
})