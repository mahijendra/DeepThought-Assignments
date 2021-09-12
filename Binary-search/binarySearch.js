//push consecutive Array generate
function createArray() {
    let arr = []
    for (let i = 0; i <= 100; i = i + 2) {
        arr.push(i)
    }
    return arr;
}

//Left Index - l
//Right Index - r
//X - User inout value

function binarySearch(arr, l,  r, x ){
    // Checking whether Left Index is less < Right Index
    if (r >= l) {
        let mid = l + Math.floor((r - l) / 2); // Dividing the array/2 and saving the mid value
        if (arr[mid] ==x) // If mid value is equal to user input we'll return the mid value
            return mid;
        if (arr[mid] > x) // If mid value is greater than user input we'll
            return binarySearch(arr, l, mid - 1, x); //first search in the left side of the array, if present return the value if not
        return binarySearch(arr, mid + 1, r, x);// Search in the right side of the array
    }
    return -1;
}

let arr = createArray(); // Storing the array
let x = 10 // User Input
let n = arr.length



let result = binarySearch(arr, 0, n - 1, x); // Calling binary Search and saving the result
if (result == -1) {
    console.log("Element is not present in the array")
} else {
    console.log("Element is present at the position " + result)
}