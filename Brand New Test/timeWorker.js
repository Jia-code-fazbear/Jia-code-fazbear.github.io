onconnect = function(event) {
  const port = event.ports[0];
  let timerInterval;
  let remainingTime;

  port.onmessage = function(event) {
    const { action, duration } = event.data;

    if (action === 'start') {
      remainingTime = duration * 1000; // Convert minutes to milliseconds
      timerInterval = setInterval(() => {
        if (remainingTime > 0) {
          remainingTime -= 1000; // Decrement by 1 second (1000 milliseconds)
          const minutes = Math.floor(remainingTime / 60000);
          const seconds = Math.floor((remainingTime % 60000) / 1000);
          port.postMessage(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          clearInterval(timerInterval);
          port.postMessage("Time's Up!");
        }
      }, 1000); 
    } else if (action === 'stop') {
      clearInterval(timerInterval);
    }
  };
};