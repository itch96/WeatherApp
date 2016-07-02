var main = function () {
	
	var api_ip = "http://ip-api.com/json/";
	var openWeatherMapKey = "bfd3b440167863075755d5567ff8b227";
	var weatherIcons = $.getJSON("https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json");
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
			date[0] = (data.list[0].dt_txt).substring(9, 10) + "-" + (data.list[0].dt_txt).substring(5, 7);
			// storing the temperature, weather, and respective code for icon data of 5 consecutive days in an array temperatureK, weatherData, and code
			while(index < (data.list).length) {
				if((data.list[index].dt_txt).substring(11, 19) == "00:00:00") {
					temperatureK[i] = data.list[index].main.temp;
					weatherData[i] = data.list[index].weather[0].main;
					code[i] = (data.list[index].weather[0].id).toString();
					date[i] = (data.list[index].dt_txt).substring(9, 10) + "-" + (data.list[index].dt_txt).substring(5, 7);
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

		/*$('._unit1').on('click', function(){
			if(C[0]) {
				$(this).removeClass('wi-celsius');
				$(this).addClass('wi-fahrenheit');
				$('._temp1').html(temperatureF[0].toFixed(0));
				C[0] = 0; F[0] = 1;
			}
			else {
				$(this).removeClass('wi-fahrenheit');
				$(this).addClass('wi-celsius');
				$('._temp1').html(temperatureC[0].toFixed(0));
				F[0] = 0; C[0] = 1;	
			}
		});
		$('._unit2').on('click', function(){
			if(C[1]) {
				$(this).removeClass('wi-celsius');
				$(this).addClass('wi-fahrenheit');
				$('._temp2').html(temperatureF[1].toFixed(0));
				C[1] = 0; F[1] = 1;
			}
			else {
				$(this).removeClass('wi-fahrenheit');
				$(this).addClass('wi-celsius');
				$('._temp2').html(temperatureC[1].toFixed(0));
				F[1] = 0; C[1] = 1;	
			}
		});
		$('._unit3').on('click', function(){
			if(C[2]) {
				$(this).removeClass('wi-celsius');
				$(this).addClass('wi-fahrenheit');
				$('._temp3').html(temperatureF[2].toFixed(0));
				C[2] = 0; F[2] = 1;
			}
			else {
				$(this).removeClass('wi-fahrenheit');
				$(this).addClass('wi-celsius');
				$('._temp3').html(temperatureC[2].toFixed(0));
				F[2] = 0; C[2] = 1;	
			}
		});
		$('._unit4').on('click', function(){
			if(C[3]) {
				$(this).removeClass('wi-celsius');
				$(this).addClass('wi-fahrenheit');
				$('._temp4').html(temperatureF[3].toFixed(0));
				C[3] = 0; F[3] = 1;
			}
			else {
				$(this).removeClass('wi-fahrenheit');
				$(this).addClass('wi-celsius');
				$('._temp4').html(temperatureC[3].toFixed(0));
				F[3] = 0; C[3] = 1;	
			}
		});
		$('._unit5').on('click', function(){
			if(C[4]) {
				$(this).removeClass('wi-celsius');
				$(this).addClass('wi-fahrenheit');
				$('._temp5').html(temperatureF[4].toFixed(0));
				C[4] = 0; F[4] = 1;
			}
			else {
				$(this).removeClass('wi-fahrenheit');
				$(this).addClass('wi-celsius');
				$('._temp5').html(temperatureC[4].toFixed(0));
				F[4] = 0; C[4] = 1;	
			}
		});*/
	});
};

$(document).ready(main);