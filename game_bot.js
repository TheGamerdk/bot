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
	StartLoop();
	client.user.setGame("trade");
	fs.readFile("/Users/Jesper/data/steel.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	steel_threshold = data;
	        });
	fs.readFile("/Users/Jesper/data/alu.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	alu_threshold = data;
	        });
	fs.readFile("/Users/Jesper/data/gas.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	gas_threshold = data;
	        });
	fs.readFile("/Users/Jesper/data/ammo.txt", 'utf8', function(err, data) {
			if (err) throw err;
	        	ammo_threshold = data;
	        });
});
client.login("MzA5MDQ1NjY2NzU0MDY4NDkx.C-pszg.vDgvEGhpwH_BybH_TBLSfunykvU");

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
		message.reply("Use t:price {resource} to see current prices (updated every 5 minutes-ish)"+ "\n" + " t:settings if you want to set anything.")
	}

	if (msg.isMentioned(client.user)) {
		message.reply("Use t:help if you need help" + "\n" + "*contact TheGamer01 if you want to report a bug*");
	}
	if(msg.content === prefix + "price hooker") {
		message.reply("10$, ask kastor for more info")
	}
	if (msg.content === prefix + "status") {
		message.reply("Market Index: $" + steel_json.marketindex + "\n \n" + "Average Food Price: $" + food_json.avgprice + "\n \n" +
		"Average Steel Price: $" + steel_json.avgprice + "\n \n" + "Average Aluminum price: $" + alu_json.avgprice + "\n \n" + 
		"Average Gasoline Price: $" + gas_json.avgprice + "\n \n" + "Average Munition Price: $" + munition_json.avgprice + "\n \n" +
		"Average Bauxite Price: $" + baux_json.avgprice + "\n \n" + "Average Iron Price: $" + iron_json.avgprice + "\n \n" +
		"Average Lead Price: $" + lead_json.avgprice + "\n \n" + "Average Uranium Price: $" + uran_json.avgprice + "\n \n" +
		"Average Oil Price: $" + oil_json.avgprice + "\n \n" + "Average Coal Price: $" + coal_json.avgprice);
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
			"\n Munition Threshold: " + ammo_threshold + "$");
	}
	if (msg.content.startsWith(prefix + "setting threshold steel")) {
		let temp = stripAlphaChars(msg.content);
		steel_threshold = parseInt(temp, 10);
		fs.writeFile("/Users/Jesper/data/steel.txt", steel_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold aluminum")) {
		let temp = stripAlphaChars(msg.content);
		alu_threshold = parseInt(temp, 10);
		fs.writeFile("/Users/Jesper/data/alu.txt", alu_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold aluminium")) {
		let temp = stripAlphaChars(msg.content);
		alu_threshold = parseInt(temp, 10);
		fs.writeFile("/Users/Jesper/data/alu.txt", alu_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold gasoline")) {
		let temp = stripAlphaChars(msg.content);
		gas_threshold = parseInt(temp, 10);
		fs.writeFile("/Users/Jesper/data/gas.txt", gas_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold munition")) {
		let temp = stripAlphaChars(msg.content);
		ammo_threshold = parseInt(temp, 10);
		fs.writeFile("/Users/Jesper/data/ammo.txt", ammo_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content.startsWith(prefix + "setting threshold munitions")) {
		let temp = stripAlphaChars(msg.content);
		ammo_threshold = parseInt(temp, 10);
		fs.writeFile("/Users/Jesper/data/ammo.txt", ammo_threshold);
		client.channels.get("303965170601033748").send("Threshold set");
	}
	if (msg.content === prefix + "update") {
		StartLoop();
	}
});
function stripAlphaChars(source) { 
  var out = source.replace(/[^0-9]/g, ''); 

  return out; 
}

function processSteelThreshold() {
	if(steel_json.lowestbuy.price <= steel_threshold) {
		client.channels.get("303965170601033748").send("@here Steel is under " + steel_threshold + "$!");
	}
}
function processAluThreshold() {
	if(alu_json.lowestbuy.price <= alu_threshold) {
		client.channels.get("303965170601033748").send("@here Aluminum is under " + alu_threshold + "$!");
	}
}
function processMunitionsThreshold() {
	if(munition_json.lowestbuy.price <= ammo_threshold) {
		client.channels.get("303965170601033748").send("@here Munitions are under " + alu_threshold + "$!");
	}
}
function processGasolineThreshold() {
	if(gas_json.lowestbuy.price <= gas_threshold) {
		client.channels.get("303965170601033748").send("@here Gasoline is under " + alu_threshold + "$!");
	}
}