const express = require('express');
const http = require('http')
const app = express();
const cors = require('cors')
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 5001;

app.use('/api', require('./routers/longpollRoute'))


server.listen(PORT, ()=>{
    console.log(`Server runs on port: ${PORT}`);
})