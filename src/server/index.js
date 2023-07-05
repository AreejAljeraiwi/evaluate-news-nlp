const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

const app = express()
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
   // res.sendFile(path.resolve('src/client/views/index.html'))
})
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1'
const apiKey = process.env.API_KEY
let userInput = []

app.post('/api', async function(req, res) {
    userInput = req.body;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`

    const response = await fetch(apiURL)
    const jsonData = await response.json()
    console.log(jsonData)
    res.send(jsonData)

})


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// You could call it aylienapi, or anything else



// app.post('/test', async function(req, res) {
//     console.log("$$$");
//     text = req.body.url;
//     const formdata = new FormData();
//     formdata.append("key", apiKey);
//     formdata.append("txt", text);
//     formdata.append("lang", 'en'); 

//     const requestOptions = {
//         method: 'POST',
//         body: formdata,
//         redirect: 'follow'
//       };

//       const response = await fetch(baseURL, requestOptions)
//   .then(response => ({
//     status: response.status, 
//     body: response.json()
//   }))
//   .then(({ status, body }) => 
//   console.log(status, body)
//   )
//   .catch(error => console.log('error', error));

//   res.send(response.json())
// })

