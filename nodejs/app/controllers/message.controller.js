const { Message } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');
// get the client
const mysql = require('mysql2');
const CONFIG = require('../config/config');

// const create = async function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     let err, company;
//     let user = req.user;

//     let company_info = req.body;


//     [err, company] = await to(Company.create(company_info));
//     if(err) return ReE(res, err, 422);

//     company.addUser(user, { through: { status: 'started' }})

//     [err, company] = await to(company.save());
//     if(err) return ReE(res, err, 422);

//     let company_json = company.toWeb();
//     company_json.users = [{user:user.id}];

//     return ReS(res, {company:company_json}, 201);
// }
// module.exports.create = create;


//You should move this out of the function - you want to set it once
var connection = mysql.createConnection(
    { host: CONFIG.db_host,
      user: CONFIG.db_user,
      password: CONFIG.db_password,
      database: CONFIG.db_name,
      port: CONFIG.db_port
    });

function getDriver(callback) {
       connection.query("SELECT * FROM inbox",
           function (err, rows) {
               //here we return the results of the query
               callback(err, rows); 
           }
       );    
}


const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    // //let user = req.user;
    // let err, messages;

    // [err, messages] = await to(Message.getMessages({}));

    // let messages_json =[]
    // for( let i in messages){
    //     let message = messages[i];
    //     let message_info = message.toWeb();
    //     messages_json.push(message_info);
    // }

    // console.log('c t', messages_json);
    // return ReS(res, {messages:messages_json});

    getDriver(function (err, driverResult){
        if (err) {
            console.log("ERROR: "+err);
            let send_data = {"err": err};
            return res.status(500).json(send_data);
        }

        // let result = [];
        // var reformattedArray = driverResult.map(obj =>{
        //     var rObj = {};
        //     rObj[obj.key] = obj.value;
        //     return rObj;
        //  });
         

        //you might want to do something is err is not null...      
        // res.json('SQLtest', { 'title': 'SQL test',
        //                  'result': driverResult});
        res.status(200).json(driverResult);
 
     });

}
module.exports.getAll = getAll;

const getLatest = async function(req, res){
    res.setHeader('Content-Type', 'application/json');

    getDriver(function (err, driverResult){
        if (err) {
            console.log("ERROR: "+err);
            let send_data = {"err": err};
            return res.status(500).json(send_data);
        }

        let latestMessage = {},
        latestRecievedDateTime,
        latestRecievedText,
        latestRecievedNumber,
        latestRecievedSMSCNumber;

        if (driverResult.length) {
            latestMessage = driverResult[driverResult.length - 1];
            latestRecievedDateTime = latestMessage.ReceivingDateTime;
            latestRecievedText = latestMessage.TextDecoded;
            latestRecievedNumber = latestMessage.SenderNumber;
            latestRecievedSMSCNumber = latestMessage.SMSCNumber;
        }

        //you might want to do something is err is not null...      
        // res.json('SQLtest', { 'title': 'SQL test',
        //                  'result': driverResult});
        res.status(200).json({
            'latestRecievedDateTime': latestRecievedDateTime,
            'latestRecievedText': latestRecievedText,
            'latestRecievedNumber': latestRecievedNumber,
            'latestRecievedSMSCNumber': latestRecievedSMSCNumber
        })
 
     });

}
module.exports.getLatest = getLatest;

// const get = function(req, res){
//     res.setHeader('Content-Type', 'application/json');
//     let company = req.company;

//     return ReS(res, {company:company.toWeb()});
// }
// module.exports.get = get;

// const update = async function(req, res){
//     let err, company, data;
//     company = req.company;
//     data = req.body;
//     company.set(data);

//     [err, company] = await to(company.save());
//     if(err){
//         return ReE(res, err);
//     }
//     return ReS(res, {company:company.toWeb()});
// }
// module.exports.update = update;

// const remove = async function(req, res){
//     let company, err;
//     company = req.company;

//     [err, company] = await to(company.destroy());
//     if(err) return ReE(res, 'error occured trying to delete the company');

//     return ReS(res, {message:'Deleted Company'}, 204);
// }
// module.exports.remove = remove;
