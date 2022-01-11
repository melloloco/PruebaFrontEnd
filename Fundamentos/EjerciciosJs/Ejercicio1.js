function RandomNumber(min,max){
    return Math.floor((Math.random() * (max-min)) +min);
}

console.log("1st try: "+RandomNumber(2,9));
console.log("2nd try: "+RandomNumber(2,9));
console.log("3rd try: "+RandomNumber(2,9));
