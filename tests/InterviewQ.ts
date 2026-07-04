import {test,chromium} from '@playwright/test'

//How do you handle multiple browser contexts in playwright
test('multiple contexts example', async()=>{

    const browser=await chromium.launch();

    //Create two independent browser contexts
    const context1=await browser.newContext();
    const context2=await browser.newContext();

    //Create two independent pages
    const page1=await context1.newPage();
    const page2=await context2.newPage();

    //Each page has independent cookie and storage
    await page1.goto("")
    await page2.goto("")

    await context1.close();
    await context2.close();

});

//How do you handle iframes in playwright?

test('Methods for switching frames', async({page})=>{

    //Method 1: By frame locator

    const iframe=await page.frameLocator("");
    await iframe.locator("").click();

    //Method 2: Using frame() for named frames
    const frame=page.frame("framename");
    await frame?.locator("").click();

    //Method 3: Using contentframe() for iframe elements
    const iframeElement=page.locator("iframe#myframe");
    const frame2=await iframeElement.contentFrame();
    await frame2.locator("").click();



});

//How do you handle file uploads in playwright
test('Methods for file upload',async({page})=>{

    //Method 1: Single file, using Setinputfiles method

    await page.locator("").setInputFiles("File path");

    //Method 2: Multiple files, using Setinputfiles method
     
    await page.locator("").setInputFiles(['file1 path', 'file2 path']);

    //Method 3: Using file chooser event
    const [fileChooser]=await Promise.all(
        [page.waitForEvent('filechooser'),
            page.locator('').click()
        ]
    )
    await fileChooser.setFiles('filepath');

    //Method 4: Buffer upload
    const csvData = `
    Name,Age
    John,30
    Smith,25
`   ;
    await page.locator("").setInputFiles(
        {
            name:'file.txt',
            mimeType:'text/plain',
            buffer: Buffer.from(csvData)
        }
    )

});