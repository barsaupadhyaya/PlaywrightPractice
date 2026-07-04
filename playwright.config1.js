// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { worker } from 'node:cluster';
import { TIMEOUT } from 'node:dns';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  retries:1,
  workers:1,
  timeout: 40000,
  expect:{
    timeout:5000,
  },
  reporter:'html',
  projects:[
    {
      name:'firefox',
       use: {

      browserName:'firefox',
      headless:true,
      screenshot:'off',
      trace:'on',
    }
    },
    {
      name:'chrome',
       use: {

      browserName:'chromium',
      headless:false,
      screenshot:'on',
      ignoreHttpsErrors:true, //For ssl certification errors
      permissions:['geolocation'], //When google asks to allow locations
      trace:'on',
      video:'retain-on-failure',
      ...devices['Galaxy S9+'] //For different mobile devices, playwright will automatically take care of the browser size
      //viewport:{width:720,height:720} //For defining the browser size
      
    }
  }
  ]
   
      
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   
  

  
});
module.exports=config;

