//o.NluZmYOA91HCawrUhDdBOm6VpIROIfpK
const express=require('express');
var bodyParser = require('body-parser')
const axios=require('axios');
const _=require('lodash');
const User=require('./User');
const PushNotification=require('./PushNotification');

const u=new User('lneso','dsadsa');


const app=express();
app.use(bodyParser.json({type:'*/*'}));
app.users=[];

app.post("/api/register",(req,res)=>{
	const {username, accessToken} = req.body;
	if(username && accessToken){
		const user=_.filter(app.users,function(user){return user.username===username})[0];
		if(!user){
			const u=new User(username,accessToken);
			u.validateToken(function(isValid){
				if(isValid){
					app.users.push(u);
					return res.send(u);
				}else{
					return res.status(422).send({error:"Invalid AccessToken"});
				}
			});
			
		}else{
			return res.status(422).send({error:"user name already exist"});
		}
		
	}else{
		return res.status(422).send({error:"You mus provided username and accessToken in a JSON format"});
	}
});

app.get("/api/users",(req,res)=>{
	res.send(app.users);
});


app.post("/api/push",(req,res)=>{
	const {username,title,body} = req.body;
	if(username && title && body){
		const user=_.filter(app.users,function(user){return user.username===username})[0];
		console.log(username,user);
		if(user){
			const pn=new PushNotification(user,title,body);
			pn.send().then(response=>{
				user.numOfNotificationsPushed++;
				res.send({message:"OK","notification":response.data,user:user});
			}).catch(error=>{
				return res.status(422).send({error:error});
			});
		}else{
			return res.status(422).send({error:"We could not find a user with the specified username"});
		}
		
		
		
	}else{
		return res.status(422).send({error:"Invalid request you need to provide username, title and body"});
	}
});


app.listen(5000);
console.log("SERVER STARTED ON PORT 5000");
