const express = require('express');
const socketIO = require('socket.io');
var cors = require('cors');
var bodyParser = require('body-parser')

const app =express();
const PORT =  process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const server = app.listen(PORT, ()=>{
    console.log(`server connected at ${PORT}`)
})
const io = socketIO(server)



app.get('/', (req, res) =>{
    res.send({"hi": 123})
}) 

app.post('/send-notification', (req, res) => {
    const notify = {data: req.body};
    socket.emit('notification', notify); // Updates Live Notification
    res.send(notify);
});

app.post('/postLocation', (req,res) => {
    console.log(req.body)
    const data = req.body
    io.emit('fluClinicDetials', data);
})



io.on('connection', socket =>{
    console.log('Socket: Client Connected');
    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
      });
    socket.on('disconnect', socket =>{
        console.log('Socket: Client Disconnected');}
    )
}

  
    
)

