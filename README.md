### myBBC Coding Challenge

Run:

````
npm start
````

API

### POST: /api/register

Register a uses expectes a JSON formated body:

We insert a new user into the runtime array for users. If the user already register in previous runs the notification count will be populated from api

````
{
	"username": "bbcUser1",
	"accessToken": "anAccessToken" 
}
````

Response

````
{
    "username": "bbcUser1",
    "accessToken": "anAccessToken",
    "numOfNotificationsPushed": 0,
    "creationTime": "2017-11-14T11:40:38+00:00"
}
````

Potential Errors respnse (422):

User name already exist

````
{
    "error": "user name already exist"
}
````


Invalid AccessToken

````
{
    "error": "Invalid AccessToken"
}
````



### GET: /api/users

Return Array User

````
[
    {
        "username": "bbcUser1",
        "accessToken": "anAccessToken",
        "numOfNotificationsPushed": 0,
        "creationTime": "2017-11-14T11:20:28+00:00"
    }
]
````


### POST: /api/push

Push notification with title and body passing the username
Requires a JSON formated body as below:

````
{
	"username":"bbcUser1",
	"title":"This is the title2",
	"body":"This is the body content of the push notification."
}
````

Response

````
{
    "message": "OK",
    "notification": {
        "active": true,
        "iden": "adsfasdfasdf",
        "created": 1510658778.4562209,
        "modified": 1510658778.4684596,
        "type": "note",
        "dismissed": false,
        "direction": "self",
        "sender_iden": "asdfasdf",
        "sender_email": "afsdfasd@fasdfasd.com",
        "sender_email_normalized": "lenesi@yahoo.com",
        "sender_name": "Luis Nesi",
        "receiver_iden": "gsdfgsdfg",
        "receiver_email": "gsdfgs@dfgdgf.com",
        "receiver_email_normalized": "dsfgdfg@dgfdfg.com",
        "title": "This is the title2",
        "body": "This is the body content of the push notification."
    },
    "user": {
        "username": "bbcUser1",
        "accessToken": "anAccessToken",
        "numOfNotificationsPushed": 1,
        "creationTime": "2017-11-14T11:26:16+00:00"
    }
}
````

Potential Errors respnse (422):

Invalid Request

````
{
    "error": "Invalid request you need to provide username, title and body"
}
````


Invalid Username

````
{
    "error": "We could not find a user with the specified username"
}
````