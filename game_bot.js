const discord = require("discord.js");
const client = new discord.Client();
var request = require("request").defaults({ "encoding" : null });
var fs = require("fs");

var url = "http://developer.cumtd.com/api/v2.2/json/GetStop?" +
    "key=d99803c970a04223998cabd90a741633" +
    "&stop_id=it"

console.log("Starting Up");


client.on("ready", () => {
	console.log("Ready!");
	updateWarJSON();
	StartLoop();
	fs.readFile(process.cwd() + "/data/id.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	var temp = parseInt(data, 10);
	        	id = temp;
	        });

	fs.readFile(process.cwd() + "/data/steel.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	steel_threshold = data;
	        });
	fs.readFile(process.cwd() + "/data/alu.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	alu_threshold = data;
	        });
	fs.readFile(process.cwd() + "/data/gas.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	gas_threshold = data;
	        });
	fs.readFile(process.cwd() + "/data/ammo.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	ammo_threshold = data;
	        });
	fs.readFile(process.cwd() + "/data/requests.json", 'utf8', function(err, data) {
			if (err) throw err;
				if (data === "") {

				} else {
					request_json = JSON.parse(data);
				}
	        });
	fs.readFile(process.cwd() + "/data/write.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	first_write = data;
	        });
	
});
client.login("MzA5MDQ1NjY2NzU0MDY4NDkx.C-pszg.vDgvEGhpwH_BybH_TBLSfunykvU");

var request_json;

var food_json;
var steel_json;
var alu_json;
var munition_json;
var gas_json;
var baux_json;
var iron_json;
var lead_json;
var uran_json;
var oil_json;
var coal_json;

var steel_threshold;
var alu_threshold;
var gas_threshold;
var ammo_threshold;

var prefix = "t:";
	var date = new Date();
	var updated_last_hour;
	var updated_last_minutes

function getJson() {
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=steel",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        steel_json = body;
	        date = new Date();
	        updated_last_hour = date.getUTCHours();
	        updated_last_minutes = date.getUTCMinutes();
	        processSteelThreshold();
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=food",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        food_json = body;
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=iron",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        iron_json = body;
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=coal",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        coal_json = body;
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=oil",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        oil_json = body;
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=uranium",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        uran_json = body;
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=lead",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        lead_json = body;
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=aluminum",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        alu_json = body;
	        processAluThreshold();
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=munitions",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        console.log(body);
	        munition_json = body;
	        processMunitionsThreshold();
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=gasoline",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        gas_json = body;
	        processGasolineThreshold();
	    }
	})
	request({
	    url: "https://politicsandwar.com/api/tradeprice/resource=bauxite",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	        console.log(body.lowestbuy.nationid); // Print the json response
	        baux_json = body;
	    }
	})
}
function StartLoop() {
	console.log("Looped");
	getJson();
	confirm = false;
	setTimeout(StartLoop, 300000)
}

process.on('unhandledRejection', console.error);

client.on("message", function(message) {
	var msg = message;
	//channel = msg.channel;
	if (msg.content === prefix + "prices") {
		message.reply("Use t:price {resource}, fx t:price steel" + "\n" + "Current resources added: All of them");
	}
	if (msg.content === prefix + "price") {
		message.reply("Use t:price {resource}, fx t:price steel" + "\n" + "Current resources added: All of them");
	}
	if (msg.content === prefix + "price" + " steel") {
		message.reply("Lowest steel price: " + steel_json.lowestbuy.price + "$" + "\n" + "Highest steel buyer price: " +
		steel_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " aluminum") {
		message.reply("Lowest aluminum price: " + alu_json.lowestbuy.price + "$" + "\n" + "Highest aluminum buyer price: " +
		alu_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " aluminium") {
		message.reply("Lowest aluminum price: " + alu_json.lowestbuy.price + "$" + "\n" + "Highest aluminum buyer price: " +
		alu_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " munitions") {
		message.reply("Lowest munition price: " + munition_json.lowestbuy.price + "$" + "\n" + "Highest munition buyer price: " +
		munition_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " gasoline") {
		message.reply("Lowest gasoline price: " + gas_json.lowestbuy.price + "$" + "\n" + "Highest gasoline buyer price: " +
		gas_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " bauxite") {
		message.reply("Lowest bauxite price: " + baux_json.lowestbuy.price + "$" + "\n" + "Highest bauxite buyer price: " +
		baux_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " iron") {
		message.reply("Lowest iron price: " + iron_json.lowestbuy.price + "$" + "\n" + "Highest iron buyer price: " +
		iron_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " lead") {
		message.reply("Lowest lead price: " + lead_json.lowestbuy.price + "$" + "\n" + "Highest lead buyer price: " +
		lead_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " uranium") {
		message.reply("Lowest uranium price: " + uran_json.lowestbuy.price + "$" + "\n" + "Highest uranium buyer price: " +
		uran_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " oil") {
		message.reply("Lowest oil price: " + oil_json.lowestbuy.price + "$" + "\n" + "Highest oil buyer price: " +
		oil_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " coal") {
		message.reply("Lowest coal price: " + coal_json.lowestbuy.price + "$" + "\n" + "Highest coal buyer price: " +
		coal_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "price" + " food") {
		message.reply("Lowest food price: " + food_json.lowestbuy.price + "$" + "\n" + "Highest food buyer price: " +
		food_json.highestbuy.price + "$" + "\n" +"Last updated: " + updated_last_hour + ":" + updated_last_minutes + " (UTC Time)");
	}
	if (msg.content === prefix + "settings") {
		message.reply("Use t:setting threshold {resource} {threshold}, 0 = no threshold/remove")
	}

	if (msg.content === prefix + "help") {
		message.reply("Use t:price {resource} to see current prices (updated every 5 minutes-ish)"+ "\n" + " t:settings if you want to set anything. \n t:request [what you want]");
	}

	if (msg.isMentioned(client.user)) {
		message.reply("Use t:help if you need help" + "\n" + "*contact TheGamer01 if you want to report a bug*");
	}
	if (msg.content === prefix + "status") {
		message.reply("Market Index: $" + steel_json.marketindex + "\n \n" + "Average Food Price: $" + food_json.avgprice + "\n \n" +
		"Average Steel Price: $" + steel_json.avgprice + "\n \n" + "Average Aluminum price: $" + alu_json.avgprice + "\n \n" + 
		"Average Gasoline Price: $" + gas_json.avgprice + "\n \n" + "Average Munition Price: $" + munition_json.avgprice + "\n \n" +
		"Average Bauxite Price: $" + baux_json.avgprice + "\n \n" + "Average Iron Price: $" + iron_json.avgprice + "\n \n" +
		"Average Lead Price: $" + lead_json.avgprice + "\n \n" + "Average Uranium Price: $" + uran_json.avgprice + "\n \n" +
		"Average Oil Price: $" + oil_json.avgprice + "\n \n" + "Average Coal Price: $" + coal_json.avgprice);
	}
	if (msg.content === prefix + "lowest") {
		message.reply("Market Index: $" + steel_json.marketindex + "\n \n" + "Lowest Food Price: $" + food_json.lowestbuy.price + "\n \n" +
		"Lowest Steel Price: $" + steel_json.lowestbuy.price + "\n \n" + "Lowest Aluminum price: $" + alu_json.lowestbuy.price + "\n \n" + 
		"Lowest Gasoline Price: $" + gas_json.lowestbuy.price + "\n \n" + "Lowest Munition Price: $" + munition_json.lowestbuy.price + "\n \n" +
		"Lowest Bauxite Price: $" + baux_json.lowestbuy.price + "\n \n" + "Lowest Iron Price: $" + iron_json.lowestbuy.price + "\n \n" +
		"Lowest Lead Price: $" + lead_json.lowestbuy.price + "\n \n" + "Lowest Uranium Price: $" + uran_json.lowestbuy.price + "\n \n" +
		"Lowest Oil Price: $" + oil_json.lowestbuy.price + "\n \n" + "Lowest Coal Price: $" + coal_json.lowestbuy.price);
	}
	if (msg.content.startsWith(prefix + "calculate")) {
		if (msg.content.match(/lowest/i)) {
			if (msg.content.match(/steel/i)) {
				var temp = stripAlphaChars(msg.content)*(steel_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/aluminum/i)) {
				var temp = stripAlphaChars(msg.content)*(alu_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/munitions/i)) {
				var temp = stripAlphaChars(msg.content)*(munition_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/munition/i)) {
				var temp = stripAlphaChars(msg.content)*(munition_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/gasoline/i)) {
				var temp = stripAlphaChars(msg.content)*(gas_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/gas/i)) {
				var temp = stripAlphaChars(msg.content)*(gas_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/bauxite/i)) {
				var temp = stripAlphaChars(msg.content)*(baux_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/iron/i)) {
				var temp = stripAlphaChars(msg.content)*(iron_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/lead/i)) {
				var temp = stripAlphaChars(msg.content)*(lead_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/uranium/i)) {
				var temp = stripAlphaChars(msg.content)*(uran_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/oil/i)) {
				var temp = stripAlphaChars(msg.content)*(oil_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/coal/i)) {
				var temp = stripAlphaChars(msg.content)*(coal_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			} else if (msg.content.match(/aluminium/i)) {
				var temp = stripAlphaChars(msg.content)*(alu_json.lowestbuy.price-1);
				msg.reply("You would make " + temp.toLocaleString() + "$");
			}	else{
				msg.reply (prefix + "calculate [optional: lowest(lowest price being sold -1$)]{resource} {amount}");
			}
		} else {
			if (msg.content.match(/steel/i)) {
				var temp = stripAlphaChars(msg.content)*steel_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/aluminum/i)) {
				var temp = stripAlphaChars(msg.content)*alu_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/aluminium/i)) {
				var temp = stripAlphaChars(msg.content)*alu_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/munitions/i)) {
				var temp = stripAlphaChars(msg.content)*munition_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/munition/i)) {
				var temp = stripAlphaChars(msg.content)*munition_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/gasoline/i)) {
				var temp = stripAlphaChars(msg.content)*gas_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/gas/i)) {
				var temp = stripAlphaChars(msg.content)*gas_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/bauxite/i)) {
				var temp = stripAlphaChars(msg.content)*baux_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/iron/i)) {
				var temp = stripAlphaChars(msg.content)*iron_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/lead/i)) {
				var temp = stripAlphaChars(msg.content)*lead_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/uranium/i)) {
				var temp = stripAlphaChars(msg.content)*uran_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/oil/i)) {
				var temp = stripAlphaChars(msg.content)*oil_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else if (msg.content.match(/coal/i)) {
				var temp = stripAlphaChars(msg.content)*coal_json.avgprice;
				msg.reply("You would make " + temp.toLocaleString() + "$ using the average price");
			} else{
				msg.reply (prefix + "calculate [optional: lowest(lowest price being sold -1$)]{resource} {amount}");
			}
		}
	}
	if (msg.content === prefix + "thresholds") {
		msg.reply("Currently set thresholds \n Steel Threshold: " + steel_threshold + "$ \n Aluminum Threshold: " + alu_threshold + "$ \n Gasoline Threshold: " + 
		gas_threshold+ "$ \n Munition Threshold: " + ammo_threshold + "$");
	}
	if (msg.content.startsWith(prefix + "setting threshold steel")) {
		let temp = stripAlphaChars(msg.content);
		steel_threshold = parseInt(temp, 10);
		fs.writeFile(process.cwd() + "/data/steel.txt", steel_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold aluminum")) {
		let temp = stripAlphaChars(msg.content);
		alu_threshold = parseInt(temp, 10);
		fs.writeFile(process.cwd() + "/data/alu.txt", alu_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold aluminium")) {
		let temp = stripAlphaChars(msg.content);
		alu_threshold = parseInt(temp, 10);
		fs.writeFile(process.cwd() + "/data/alu.txt", alu_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold gasoline")) {
		let temp = stripAlphaChars(msg.content);
		gas_threshold = parseInt(temp, 10);
		fs.writeFile(process.cwd() + "/data/gas.txt", gas_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold munition")) {
		let temp = stripAlphaChars(msg.content);
		ammo_threshold = parseInt(temp, 10);
		fs.writeFile(process.cwd() + "/data/ammo.txt", ammo_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold munitions")) {
		let temp = stripAlphaChars(msg.content);
		ammo_threshold = parseInt(temp, 10);
		fs.writeFile(process.cwd() + "/data/ammo.txt", ammo_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.author.username === "Kastor") {

	} else {
		if (msg.content === "pasta") {
		client.channels.get("303965170601033748").send("u suck <@184525195740971008>");
	}
	if (msg.content === "pizza") {
		client.channels.get("303965170601033748").send("DOWN WITH THE TYRANT");
	}
	}
	if (msg.content === prefix + "update") {
		StartLoop();
		msg.reply("Updating prices....");
	}
	if (msg.content === prefix + "request cancel") {
		if (requesting === true) {
			msg.reply("Request cancelled");
			requesting = false;
			request_resources = null;
			id_request = null;
		}
	}
	if (msg.content.startsWith(prefix + "request")) {
		if (msg.content.match(/id/i)) {

		} else {
			if (msg.content.match(/finish/i)) {

			} else {
				perv = msg.author.username;
				msg.reply("Request message: " + msg.content.replace(prefix + "request ", "") + " Do t:request id {nation id}");
				requesting = true;
				request_resources = msg.content.replace(prefix + "request ", "");
			}
		}
	}
	if (msg.content.startsWith(prefix + "request id")) {
		if (msg.content.match(/finish/i)) {

		} else {
			if (requesting === true) {
				msg.reply("Current request: " + request_resources + " ID: " + msg.content.replace(prefix + "request id ", "") + " . Use t:request finish to submit");
				id_request = msg.content.replace(prefix + "request id ", "");
			}
		}
	}
	if (msg.content === prefix + "request finish") {
		if (requesting === true) {
			createRequest();
			msg.reply("Request added");
			fs.readFile(process.cwd() + "/data/requests.json", 'utf8', function(err, data) {
				if (err) throw err;
		        	request_json = JSON.parse(data);
		});
		}
	}
	if (msg.content === prefix + "list") {
		console.log(request_json);
		if (request_json == null) {
			msg.reply("No requests found!");
		} else {
			
			msg.reply("Current requests: ");
			for (var i = 0; i < request_json.table.length; i++) {
				var obj = request_json.table[i];
				client.channels.get("303965170601033748").send("Request ID: " + obj.identity + "\n Request: " + obj.request + "\n Nation Link: https://politicsandwar.com/nation/id=" + obj.nation + "\n Requester: " + obj.user);
			}
		}
	}
	if (msg.content === prefix + "clear") {
		if (confirm === false) {
			msg.reply("Are you sure? Type again to confirm");
			confirm = true;
		} else {
			msg.reply("All requests deleted");
			confirm = false;
			fs.truncate(process.cwd() + "/data/requests.json");
			fs.truncate(process.cwd() + "/data/id.txt");
			fs.writeFile(process.cwd() + "/data/write.txt", "true");
			first_write = "true";
			if (!request_json == "") {
				fs.readFile(process.cwd() + "/data/requests.json", 'utf8', function(err, data) {
					if (err) throw err;
		        		request_json = JSON.parse(data);
				});
			}
		}
	}

	/*if (msg.content.startsWith(prefix + "clear")) {
		if (msg.content === prefix + "clear") {

		} else {
			//var deleted = request_json.table.splice(1);
			request_json.table.splice(request_json.table.indexOf(2));
			console.log(request_json.table);
			console.log(request_json.table.indexOf(2));

		}
	} */

});

var perv;

var request_resources;
var requesting;
var id_request;
var id;
var confirm;
var first_write;

function createRequest() {
	var obj = {
		table: []
	}
	var json;
	id++;
	if (first_write === "true") {
		obj.table.push({identity: id, request: request_resources, nation: id_request, user: perv})
		json = JSON.stringify(obj);
		fs.writeFile(process.cwd() + "/data/requests.json", json, "utf8");
		fs.writeFile(process.cwd() + "/data/id.txt", id);
		fs.writeFile(process.cwd() + "/data/write.txt", "false");
		first_write = "false";
	} else {
		fs.readFile(process.cwd() + "/data/requests.json", 'utf8', function(err, data) {
			if (err) throw err;
		        request_json = data;
		     	obj = JSON.parse(data);
		      	obj.table.push({identity: id, request: request_resources, nation: id_request, user: perv})
		      	console.log(perv);
		       	json = JSON.stringify(obj);
		       	fs.writeFile(process.cwd() + "/data/requests.json", json, "utf8");
		       	fs.writeFile(process.cwd() + "/data/id.txt", id);
		       	request_resources = null;
				id_request = null;
				perv = null;
				requesting = false;
				fs.readFile(process.cwd() + "/data/requests.json", 'utf8', function(err, data) {
				if (err) throw err;
		        	request_json = JSON.parse(data);
		});
	});
	}

}

function stripAlphaChars(source) { 
  var out = source.replace(/[^0-9]/g, ''); 

  return out; 
}

function processSteelThreshold() {
	if(steel_json.lowestbuy.price < steel_threshold) {
		console.log(steel_json.lowestbuy.price);
		console.log(steel_threshold);
		client.channels.get("303965170601033748").send("@here Steel is under " + steel_threshold + "$! \n Quantity: " + steel_json.lowestbuy.amount + "\n https://politicsandwar.com/index.php?id=90&display=world&resource1=steel&buysell=sell&ob=price&od=ASC&maximum=15&minimum=0&search=Go");
	}
}
function processAluThreshold() {
	if(alu_json.lowestbuy.price < alu_threshold) {
		console.log(alu_json.lowestbuy.price);
		console.log(alu_threshold);
		client.channels.get("303965170601033748").send("@here Aluminum is under " + alu_threshold + "$! \n Quantity: " + alu_json.lowestbuy.amount + "\n https://politicsandwar.com/index.php?id=90&display=world&resource1=aluminum&buysell=sell&ob=price&od=ASC&maximum=15&minimum=0&search=Go");
	}
}
function processMunitionsThreshold() {
	if(munition_json.lowestbuy.price < ammo_threshold) {
		console.log("stuff: " + munition_json.lowestbuy.price);
		console.log("stuff: " + ammo_threshold);
		client.channels.get("303965170601033748").send("@here Munitions are under " + ammo_threshold + "$! \n Quantity: " + munition_json.lowestbuy.amount + "\n https://politicsandwar.com/index.php?id=90&display=world&resource1=munitions&buysell=sell&ob=price&od=ASC&maximum=15&minimum=0&search=Go");
	}
}
function processGasolineThreshold() {
	if(gas_json.lowestbuy.price < gas_threshold) {
		console.log(gas_json.lowestbuy.price);
		console.log(gas_threshold);
		client.channels.get("303965170601033748").send("@here Gasoline is under " + gas_threshold + "$! \n Quantity: " + gas_json.lowestbuy.amount + "\n https://politicsandwar.com/index.php?id=90&display=world&resource1=gasoline&buysell=sell&ob=price&od=ASC&maximum=15&minimum=0&search=Go");
	}
}

var war_json;
var ids = [];
var wars = [];

//Warboat implementation
function updateWarJSON() {
	request({
	    url: "https://politicsandwar.com/api/nations/",
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {
	    	war_json = body;
	    	if (setup == false) {
	    		firstWarData();
	    		setup = true;
	    	}
	    }
	})
}

function firstWarData() {
	for (var i = 0; i < war_json.nations.length; i++) {
		var obj = war_json.nations[i];

		if (obj.alliance == "Lordaeron") {
			ids.push(obj.nationid);
			wars.push(obj.defensivewars);
			
		}
	}
	console.log(wars);
	console.log(ids);
	StartWarLoop();
}

var setup = false;

function StartWarLoop() {
	console.log("War Looped");
	updateWarJSON();
	processWarDeclarations();
	setTimeout(StartWarLoop, 150000)
}

function processWarDeclarations() {
	for (var i = 0; i < ids.length; i++) {
		for (var i2 = 0; i2 < war_json.nations.length; i2++) {
			var obj = war_json.nations[i2];
			if (obj.nationid == ids[i]) {
				if (obj.defensivewars >= wars[i]) {
				} else {
					client.channels.get("303964576603701249").send("\@212531662305755137 ALERT " + obj.leader + "was attacked by an enemy! \n https://politicsandwar.com/nation/id=" + obj.nationid + "&display=war");
				}
			}
		}
	}
}