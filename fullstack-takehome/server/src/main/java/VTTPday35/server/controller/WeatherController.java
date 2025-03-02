package VTTPday35.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import VTTPday35.server.model.Weather;
import VTTPday35.server.repository.RedisRepository;
import VTTPday35.server.service.WeatherService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping(path = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class WeatherController {
    
    @Autowired
    private WeatherService weatherService;

    @Autowired
    private RedisRepository redisRepository;

    @GetMapping(path="/search")
    @ResponseBody
    // @CrossOrigin(origins = "*") //testing proxy file
    public ResponseEntity<String> search(@RequestParam(defaultValue = "london") String q){
        

        //check whether redis has the information cached, if so return
        Weather weatherRedis = redisRepository.getWeather(q.toUpperCase());
        if(weatherRedis.getCountryName() == null){
            //do nothing
        }else{
            System.out.printf(">>>Pulling from redis: %s\n", weatherRedis.getCountryName());
            return ResponseEntity.ok(Weather.objToJson(weatherRedis).toString());
        }

        Weather weather = weatherService.getWeatherData(q.toUpperCase());

        if(weather.getCountryName() == null){
            JsonObject error = Json.createObjectBuilder()
                .add("status", 404)
                .add("message", "country not found")
                .build();
            return ResponseEntity.status(404).body(error.toString());
        }

        //cache in redis
        System.out.printf(">>>Pulling from API: %s\n", weather.getCountryName());
        System.out.println(">>>Saving in redis");
        redisRepository.saveWeather(weather);
        return ResponseEntity.ok(Weather.objToJson(weather).toString());
    }



}
