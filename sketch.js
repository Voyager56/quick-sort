function generatenumbers(columns){
  let array = new Array(columns)
  for(let i=0;i<columns; i++){
    array[i] = Math.floor(random(columns))
  }
  return array
}

function sleep(time){
  return new Promise(resolve => setTimeout(resolve,time));
}
async function swap(arr,i,j){
  await sleep(50)
  let temp = arr[i];
  arr[i]=arr[j];
  arr[j] = temp;
}

async function partition(array,low,high){
  let pivot = array[high];
  let i = low ;
  for(let j=low;j<high;j++){
    if(array[j]<pivot){
      await swap(array,i,j)
      i++
    }
  }
  await swap(array,i,high)
  return i;
}

  
async function quicksort(array,low,high){
    if(low<high){
      let part = await partition(array,low,high);
       await quicksort(array,low,part-1);
       await quicksort(array,part+1,high)
    }
  }

const columns = 50;
let numbers;
function setup() {
  createCanvas(400, 400);
  numbers = generatenumbers(columns)
  quicksort(numbers,0,numbers.length-1)

}

function draw() {
  background(0);
  translate(0,height)
  const resolution = width / columns;
  for(let k=0;k<columns;k++){
    rect(k*resolution,0,resolution,-numbers[k])
  }
}
