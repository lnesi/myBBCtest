const moment = require('moment');
const axios = require("axios");
const config = require('./config');
class User{
	constructor(username,accessToken){
		this.username=username;
		this.accessToken=accessToken;
		this.numOfNotificationsPushed=0;
		this.creationTime=moment().format();
	}

	validateToken(callback){

		var requestConfig = { 
			headers: { 'Content-Type': 'application/json',"Access-Token": this.accessToken },
		};
		axios.get(config.ROOT_URL+"/pushes",requestConfig)
		.then(res=>{
			this.numOfNotificationsPushed=res.data.pushes.length;
			callback(true)
		})
		.catch(error=>{
			console.log("ERROR:",error);
			callback(false);
		});
	}

}

module.exports=User;