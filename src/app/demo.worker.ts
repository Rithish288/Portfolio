/// <reference lib="webworker" />

addEventListener('message', ({data}) => {
  let x: number, y: number = 1;
  (data.shells as number[]).forEach((shell, i) => {
    i+=1
    let radians = (Math.PI * 2) / shell;
    for (let j = 1; j <= shell; j++) {
      x = Math.cos(radians * j + data.counter * 0.02 / i) * i;
      y = Math.sin(radians * j + data.counter * 0.02 / i) * i;
    }
  })
  postMessage({x, y});
});
