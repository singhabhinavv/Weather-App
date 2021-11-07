const express = require("express");

const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
	res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res) {

	const city = req.body.cityName;

	const apiKey = "a158d829890f2e740e57d498be484ee8";

	const unit = "metric";
	
	const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units="+unit;
	
	https.get(url, function(response) {
		console.log(response.statusCode);

		response.on("data", function(data) {
			const weatherData = JSON.parse(data);

			const temp = weatherData.main.temp;

			const desc = weatherData.weather[0].description;

			const weatherIcon = weatherData.weather[0].icon;

			const imageURL =  "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

			res.write("<p>The weather is currently " + desc + ".</p>");
			res.write("<h1>The temperature in " + city +" is "+ temp +" degrees Celsius.</h1>");
			res.write("<img src=" + imageURL + ">");
			res.send();
		});
	});
});

app.listen(3000, function() {
	console.log("Server is running on port 3000.");
});
