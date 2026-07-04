const{chromium}=require('@playwright/test');
const {POManager} = require('../../pageobjects/POManager');
const{Before,After,BeforeStep,AfterStep,Status}=require('@cucumber/cucumber');

Before(async function () {
            const browser=await chromium.launch();
            const context=await browser.newContext();
            this.page=await context.newPage();
            this.poManager = new POManager(this.page);
});

After(async function () {
  console.log("I am the last one to execute");
});

BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path:"screenshot1.png"});
  }
});