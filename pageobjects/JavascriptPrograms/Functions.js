function add(a,b){
    return a+b
}
let sum=add(2,3)
console.log(sum)
//Create annonymouss functions
let sumOfIntegers=function(a,b)
{
    return a+b
}
console.log(sumOfIntegers)

//With fat pipe operator
let sum2=(a,b)=>a+b
console.log(sum2(2,3))