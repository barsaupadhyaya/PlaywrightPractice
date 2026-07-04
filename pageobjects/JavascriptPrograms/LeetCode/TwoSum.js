function twoSum(nums,target)
{
    const map=new Map()
    for(let i=0;i<nums.length;i++)
    {
        const compliment=target-nums[i]
        if(map.has(compliment))
        {
            return [map.get(compliment),i]
        }
        map.set(nums[i],i)
    }
    return []
    
}
// Example
const arr = [2, 7, 11, 15];
const tar = 9;

console.log(twoSum(arr, tar));