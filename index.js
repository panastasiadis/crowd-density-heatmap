const ws = new WebSocket('ws://62.217.127.19:8080/stream/');
ws.addEventListener('open',(event)=>{
console.log('Connection opened');
});
ws.addEventListener('message',(event)=>{
data = JSON.parse(event.data);
for (const device of data) {
    console.log(device);
}
console.log(`Server sent the following message: ${event.data}`);

});
ws.addEventListener('close',(event)=>{
console.log('Connection closed.');
});
ws.addEventListener('error',(event)=>{
console.log(`WebSocket error: ${event}.`);
});



measuredPower = -44
measurementRSSI = -61
N = 2.4
distance = Math.pow(10, (measuredPower - measurementRSSI)/ (10 * N))
console.log(distance);