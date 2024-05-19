require('dotenv').config()

const Server = require('./server')

const server = new Server()

server.listen()


// require('dotenv').config()
// const fs=require('fs')
// const {google} = require('googleapis')
// const apikeys = require('../config/quantumlearn-418816-7a1528261416.json')
// const SCOPE = ['https://www.googleapis.com/auth/drive'];

// const Server = require('./server')

// const server = new Server()

// server.listen()

// async function authorize(){
//     const jwtClient = new google.auth.JWT(
//         apikeys.client_email,
//         null,
//         apikeys.private_key,
//         SCOPE
//     );
//     await jwtClient.authorize()
//     return jwtClient;
// }

// async function uploadFile(authClient){
//     return new Promise((resolve, reject) => {
//         const drive = google.drive({version: 'v3', auth: authClient})
//         const fileMetadata = {
//             name:"myFile.txt",
//         }
//         drive.files.create({
//             resource: fileMetadata,
//             media: {
//                 body: fs.createReadStream('test.txt'),
//                 mimeType: 'text/plain'
//             },
//             fields: 'id'
//         },function (err, file) {
//             if(err){
//                 return reject(err)
//             }else{
//             resolve(file)
//             }
//         })
//     })
// }

// authorize().then(uploadFile).then(console.log).catch(console.error)