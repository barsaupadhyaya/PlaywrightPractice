class APIUtils
{
    //We need to have apicontext and loginPayload with respect to this class
    //so that we can use them whereever applicable
    constructor(apiContext,loginPayload)
    {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

    //This method will get us the login token
    async getToken()
    {
         const loginResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayload
        })
        //First verify the status code is 200 and then extract the token from the response and save it in a global 
        // expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson=await loginResponse.json();
         const loginToken=loginResponseJson.token;
        return loginToken;

    }

    async createOrder(orderPayload)
    {
        //We are creating a response object to save the token and orderID in it and return it to the test file.
        
        let response={};

        //We can also save the token in the response object and return it to the test file.
        
        response.token=await this.getToken();

        const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                    {
                        data:orderPayload,
                        headers:{
                            Authorization:response.token,
                            "Content-Type":"application/json"
                },
               
            
        })
         const orderResponseJson=await orderResponse.json();
        console.log(orderResponseJson);
        const orderID=orderResponseJson.orders[0];
        //We can also save the orderID in the response object and return it to the test file.
        response.orderID=orderID;
        console.log(orderID);
        return response;
    }
}

//We need to export the APIUtils class so that we can use it in our test files.
module.exports=APIUtils;