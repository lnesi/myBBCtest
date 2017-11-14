const axios = require("axios");
const config=require('./config');
class PushNotification {
	constructor(user, title, body) {
		this.notification = { "type": "note", "title": title, "body": body };
		this.user = user;
	}

	send() {
		var requestConfig = { 
			headers: { 'Content-Type': 'application/json',"Access-Token": this.user.accessToken },
		};
    	return axios.post(config.ROOT_URL+"/pushes",this.notification,requestConfig);
	}

}

module.exports = PushNotification;