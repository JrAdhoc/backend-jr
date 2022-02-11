let nums = [];
let object = {};
const cant = process.argv[2]

for(let i=0;i<cant;i++){
    let num = Math.floor(Math.random()*1000);
    nums[i] = num;
}
console.log(nums)

let repetidos = {};

nums.forEach(function(numero){
  repetidos[numero] = (repetidos[numero] || 0) + 1;
});

process.send(repetidos);