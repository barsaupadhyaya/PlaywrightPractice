import{test} from '../fixtures/fixturestest'

test('Where is my candy', async({helloworld})=>{
    //Since we are returning the variable not printing it in the fixutre, so need to print that here
    //Just parse the fixture name to console.log and it will print the value
    console.log(helloworld)
    console.log("Where is my candy")
});

test('I am alive', async({helloworld})=>{
    console.log("I am alive")
});


