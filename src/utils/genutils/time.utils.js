

// delay is an anonymous function that creates a promise
// instead of naming the new promise , we also define the promise itself anonymously
// so when we call delay and pass the miliseconds, we get the promise,
// and on it we can define the anonymous function that is passed to the setTimeout function (using resolve).
// and since we are not activating the promise's 'then', we dont need to pass a resolve, 
// and so nothing happens after the delay, besides the fact that there was a delay.

// Comment: the resolve is just for using the setTimeout syntax, 
// and due to the use of 'await', the resolve is meaningless other than that!!

// Usage example: 
// await delay(5000) // wait for 5 seconds!



// from stack-overflow:
//const delay = ms => new Promise(res => setTimeout(res, ms));

// I write it clearer
export const delay = (miliSeconds) => new Promise((resolve) => {
    setTimeout(resolve, miliSeconds)
})

// Or as a regular function instead of anonymous function
export function delay2 (miliSeconds) {
    return (
        new Promise((resolve) => {
            setTimeout(resolve, miliSeconds)
        })        
    )
}

