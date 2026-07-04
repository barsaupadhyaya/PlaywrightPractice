//Length of the String
let day='tuesday'
console.log(day.length)

//Substring
console.log(day.slice(2,5))

//Value of an index
console.log(day[1])

//splitting the string
console.log(day.split("s"))

//trim whitespace
console.log(day.split("s")[1].trim())

//convert string to a number
let number="123"
let convertedNum=parseInt(number)
console.log(convertedNum)

//convert number to a string
let num=3456
let convertedStr=String(num)
console.log(convertedStr)

//concartenate 2 strings
let str1="Hello"
let str2="world"
console.log(str1+" "+str2)
console.log(str1.concat(" ",str2))