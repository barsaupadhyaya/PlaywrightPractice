// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { worker } from 'node:cluster';
import { TIMEOUT } from 'node:dns';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  testMatch:'**/*.spec.js',
  retries:1,
  workers:1,
  timeout: 40000,
  expect:{
    timeout:5000,
  },
  reporter:'html',
    use: {

      browserName:'chromium',
      headless:false,
      screenshot:'only-on-failure',
      trace:'on',
      
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   
  },

  
});
module.exports=config;

