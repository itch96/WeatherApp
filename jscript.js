var main = function () {
	
	var api_ip = "http://ip-api.com/json/";
	var openWeatherMapKey = "bfd3b440167863075755d5567ff8b227";
	var prefix = 'wi wi-';
	var latitude, longitude;
	var result = "", icon, code;
	var weatherIcons = $.getJSON("https://gist.githubusercontent.com/tbranyen/62d974681dea8ee0caa1/raw/3405bfb2a76b7cbd90fde33d8536f0cd13706955/icons.json");
	var C = 1, F = 0;
	var temperatureK, temperatureC, temperatureF, weatherData, city, req;

	$.getJSON(api_ip, function(data) {
		$.each(data, function(key, value){ 			
			if(key == "lat") {latitude = value.toFixed(2).toString();}
			else if(key == "lon") {longitude = value.toFixed(2).toString();}
	});

		result += "<br/>";
		var api_weather = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid="+openWeatherMapKey;
		req = $.getJSON(api_weather, function(data) {
			temperatureK = data.main.temp;
			temperatureC = temperatureK - 273;
			temperatureF = (((9 / 5) * temperatureC) + 32);
			weatherData = data.weather[0].main;
			code = (data.weather[0].id).toString();
			city = data.name;

			$('._city').html(city);
			$('._weather').html(weatherData);
			$('._temp').html(temperatureC.toFixed(0));
			$('._icon').addClass("wi-owm-" + code);
		});
		$('i').on('click', function(){
			if($(this).hasClass('_unit')){
				if(C) {
					$(this).removeClass("wi-celsius");
					$(this).addClass("wi-fahrenheit");
					$('._temp').html(temperatureF.toFixed(0));
					C = 0; F = 1;	
				}
				else if(F) {
					$(this).removeClass("wi-fahrenheit");
					$(this).addClass("wi-celsius");
					$('._temp').html(temperatureC.toFixed(0));
					C = 1; F = 0;		
				}
			}
			console.log(C + " " + F);
		});
	});
};

$(document).ready(main);