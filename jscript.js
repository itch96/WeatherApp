var main = function () {
	
	var api_ip = "http://ip-api.com/json/";
	var weatherIcons = $.getJSON("https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json");
	var openWeatherMapKey = ""; // I guess I'm not supposed to share the key.
	var latitude, longitude, city;
	var temperatureK = [], temperatureC = [], temperatureF = [], weatherData = [], date = [], code = [], minTempK = [], maxTempK = [], minTempC = [], maxTempC = [], minTempF = [], maxTempF = [], humidity = [];
	// getting the value of the latitude and longitude of the user from ip-api.com
	$.getJSON(api_ip, function(data) {
		latitude = (data.lat).toFixed(2);
		longitude = (data.lon).toFixed(2);
		// getting the weather info from the latitude and longitude previously recieved
		var api_weather = "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid="+openWeatherMapKey;
		$.getJSON(api_weather, function(data) {
			city = data.city.name;
			temperatureK[0] = data.list[0].main.temp;
			weatherData[0] = data.list[0].weather[0].main;
			code[0] = (data.list[0].weather[0].id).toString();
			date[0] = (data.list[0].dt_txt).substring(8, 10) + "-" + (data.list[0].dt_txt).substring(5, 7);
			minTempK[0] = data.list[0].main.temp_min;
			maxTempK[0] = data.list[0].main.temp_max;
			humidity[0] = data.list[0].main.humidity;
			// storing the temperature, weather, and respective code for icon data of 5 consecutive days in an array temperatureK, weatherData, and code
			var i = 1, index = 0;
			while(index < (data.list).length) {
				if((data.list[index].dt_txt).substring(11, 19) == "00:00:00") {
					date[i] = (data.list[index].dt_txt).substring(8, 10) + "-" + (data.list[index].dt_txt).substring(5, 7);
					temperatureK[i] = data.list[index].main.temp;
					minTempK[i] = data.list[index].main.temp_min;
					maxTempK[i] = data.list[index].main.temp_max;
					weatherData[i] = data.list[index].weather[0].main;
					code[i] = (data.list[index].weather[0].id).toString();
					humidity[i] = data.list[index].main.humidity;
					i ++;
				}
				index ++;
			}
			// getting respective temperature formats.
			for(i = 0; i < 5; i ++){
				temperatureC[i] = temperatureK[i] - 273;
				temperatureF[i] = (((9 / 5) * temperatureC[i]) + 32);
				minTempC[i] = minTempK[i] - 273;
				minTempF[i] = (((9 / 5) *  minTempC[i]) + 32);
				maxTempC[i] = maxTempK[i] - 273;
				maxTempF[i] = (((9 / 5) *  maxTempC[i]) + 32);
			}
			// printing out the data
			$('._city').html(city);
			for(i = 0; i < 5; i ++) {
				$('._temp' + (i + 1)).html((temperatureC[i]).toFixed(0));
				$('._minTemp' + (i + 1)).html("<strong>Minimum:</strong> " + (minTempC[i]).toFixed(0));
				$('._maxTemp' + (i + 1)).html("<strong>Maximum:</strong> " + (maxTempC[i]).toFixed(0));
				$('._date' + (i + 1)).html(date[i]);
				$('._icon' + (i + 1)).addClass("wi-owm-" + code[i]);
				$('._weather' + (i + 1)).html(weatherData[i]);
				$('._humidity' + (i + 1)).html("<strong>Humidity:</strong> " + humidity[i] + "%");
			}
		});
		$('._unitC').on('click', function(){
			if(!$(this).hasClass('active')) {
				for(i = 0; i < 5; i ++) {
					$('._temp' + (i + 1)).html(temperatureC[i].toFixed(0));
					$('._minTemp' + (i + 1)).html(minTempC[i].toFixed(0));
					$('._maxTemp' + (i + 1)).html(maxTempC[i].toFixed(0));
				}
				$(this).addClass('active');
				$('._unitF').removeClass('active');
			}
		});
		$('._unitF').on('click', function(){
			if(!$(this).hasClass('active')) {
				for(i = 0; i < 5; i ++) {
					$('._temp' + (i + 1)).html(temperatureF[i].toFixed(0));
					$('._minTemp' + (i + 1)).html(minTempF[i].toFixed(0));
					$('._maxTemp' + (i + 1)).html(maxTempF[i].toFixed(0));
				}
				$(this).addClass('active');
				$('._unitC').removeClass('active');
			}
		});
	});
};

$(document).ready(main);
