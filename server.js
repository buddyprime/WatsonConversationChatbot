/*eslint-disable unknown-require */
var express = require("express");
var app = express();
//var connect = require("connect");
//var app = connect();
//var serveStatic = require('serve-static');

var cfenv = require("cfenv");
var bodyParser = require('body-parser');

//app.use(serveStatic(__dirname));
app.use(express.static(__dirname));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var watson = require('watson-developer-cloud');

var watson_url;
var watson_user;
var watson_pwd;
var watson_workspace_id;

app.post("/api/new_dialog", function (request, response) {
	//reset the variables
	var userData = request.body;
	
	console.log(JSON.stringify(userData));
	watson_url = userData.context.url;
	watson_user = userData.context.user;
	watson_pwd = userData.context.pwd;
	watson_workspace_id = userData.context.workspace;
	console.log("Updated Watson data.");
	
	response.send("Updated Watson API data.");
});

app.post("/api/chat", function (request, response) {  
  var userData = request.body;
  var userText = userData.context;
  if(!watson_url) {
    console.log("No Watson.");
    response.send("Watson is sleeping and couldn't read " + userText + "!");
    return;
  }

  var conversation = watson.conversation({
  	username: watson_user,
  	password: watson_pwd,
  	version: 'v1',
	version_date: '2017-05-26'
  });

  
  var params = {
  	workspace_id: watson_workspace_id,
  	input: {'text': userText}
  };

  conversation.message(params, function(err, res) {
  	if (err){
    	console.log(err);
    	response.send(JSON.stringify(err, null, 2));
	}
  	else {
    	console.log(JSON.stringify(res, null, 2));
    	//response.send(JSON.stringify(res, null, 2));
    	response.send(res);
	}

	});
});


// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {};

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['conversation']) {
  // Load the WATSON service
  
  // Initialize with credentials
  watson_url = appEnv.services['conversation'][0].credentials.url;
  watson_user = appEnv.services['conversation'][0].credentials.username;
  watson_pwd = appEnv.services['conversation'][0].credentials.password;


  var cfenv_w = require('./node-cfenv-wrapper-master/cfenv-wrapper');
  // get the app environment from Cloud Foundry
  var appEnv_w = cfenv_w.getAppEnv();
  watson_workspace_id = appEnv_w.getEnvVar('WORKSPACE_ID') || '4a63ebf2-3942-41e5-af8c-f0a492c81a97';
  
}


var port = process.env.VCAP_APP_PORT || 3000;
var host = process.env.VCAP_APP_HOST || 'localhost';

//var port = process.env.PORT || 3000
app.listen(port, host, function() {
    console.log("Listening on %s", port);
});
