var main = function () {
	
	var api_ip = "http://ip-api.com/json/";
	var weatherIcons = $.getJSON("https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json");
	var openWeatherMapKey = ""; // I guess I'm not supposed to share my key
	var latitude, longitude, city;
	var C = 1, F = 0;
	var temperatureK = [], temperatureC = [], temperatureF = [], weatherData = [], date = [], code = [];
	// getting the value of the latitude and longitude of the user from ip-api.com
	$.getJSON(api_ip, function(data) {
		$.each(data, function(key, value){ 			
			if(key == "lat") {latitude = value.toFixed(2).toString();}
			else if(key == "lon") {longitude = value.toFixed(2).toString();}
		});
		var api_weather = "http://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid="+openWeatherMapKey;
		// getting the weather info from the latitude and longitude previously recieved
		$.getJSON(api_weather, function(data) {
			var i = 1, index = 0;
			city = data.city.name;
			temperatureK[0] = data.list[0].main.temp;
			weatherData[0] = data.list[0].weather[0].main;
			code[0] = (data.list[0].weather[0].id).toString();
			date[0] = (data.list[0].dt_txt).substring(8, 10) + "-" + (data.list[0].dt_txt).substring(5, 7);
			// storing the temperature, weather, and respective code for icon data of 5 consecutive days in an array temperatureK, weatherData, and code
			while(index < (data.list).length) {
				if((data.list[index].dt_txt).substring(11, 19) == "00:00:00") {
					temperatureK[i] = data.list[index].main.temp;
					weatherData[i] = data.list[index].weather[0].main;
					code[i] = (data.list[index].weather[0].id).toString();
					date[i] = (data.list[index].dt_txt).substring(8, 10) + "-" + (data.list[index].dt_txt).substring(5, 7);
					i ++;
				}
				index ++;
			}
			// getting respective temperature formats.
			for(i = 0; i < 5; i ++){
				temperatureC[i] = temperatureK[i] - 273;
				temperatureF[i] = (((9 / 5) * temperatureC[i]) + 32);
			}
			// printing out the data
			$('._city').html(city);
			for(i = 0; i < 5; i ++) {
				$('._temp' + (i + 1)).html((temperatureC[i]).toFixed(0));
				$('._date' + (i + 1)).html(date[i]);
				$('._icon' + (i + 1)).addClass("wi-owm-" + code[i]).css({'textShadow': '2px 5px 7px #242424'});
				$('._weather' + (i + 1)).html(weatherData[i]);
			}
		});
		$('._unit').on('click', function(){
			if(C) {
				$(this).removeClass('wi-celsius');
				$(this).addClass('wi-fahrenheit');
				for(i = 0; i < 5; i ++) {
					$('._temp' + (i + 1)).html(temperatureF[i].toFixed(0));
				}
				C = 0; F = 1;
			}
			else {
				$(this).removeClass('wi-fahrenheit');
				$(this).addClass('wi-celsius');
				for(i = 0; i < 5; i ++) {
					$('._temp' + (i + 1)).html(temperatureC[i].toFixed(0));	
				}
				F = 0; C = 1;
			}
		});
	});
};

$(document).ready(main);
