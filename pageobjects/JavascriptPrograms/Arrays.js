
//Find out the sum of the array
let marks=[10,20,30,40,50,55]
let sum=0;
for(let i=0;i<marks.length;i++)
{
    sum=sum+marks[i];
}
console.log(sum)

let total=marks.reduce((sum,mark)=>sum+mark,0);
console.log(total)
//Find out the even numbers in the array
for(let i=0;i<marks.length;i++)
{
    if(marks[i]%2==0)
    {
        console.log(marks[i])
    }
}
let oddmarks=marks.filter(mark=>mark%2!=0)
console.log(oddmarks)
//Multiply the odd number with 3 and print
console.log(oddmarks.map(mark=>mark*3))

//1. Sorting String array
let fruits=["grapes","mango","pomogranete","guava"]
console.log(fruits.sort())
console.log(fruits.reverse())
//2. Sorting int array
let scores=[12,3,19,16,14]
console.log(scores.sort((a,b)=>a-b))