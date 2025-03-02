package VTTPday35.server.service;

import java.io.StringReader;

import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;


import VTTPday35.server.model.Weather;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class WeatherService {
    
    public static final String API_URL = "https://api.openweathermap.org/data/2.5/weather";
    public static final String API_KEY = "bacd833dd68918978fba509e986ad505";


    public Weather getWeatherData(String query){
        String url = UriComponentsBuilder
            .fromUriString(API_URL)
            .queryParam("q", query)
            .queryParam("appid", API_KEY)
            .toUriString();

        RequestEntity<Void> req = RequestEntity
            .get(url)
            .accept(MediaType.APPLICATION_JSON)
            .build();

        //in case city doesnt exists
        try{
            RestTemplate template = new RestTemplate();
            ResponseEntity<String> resp = template.exchange(req,String.class);
            String payload = resp.getBody(); //jsonstring

            JsonReader reader = Json.createReader(new StringReader(payload));
            JsonObject jObj = reader.readObject();
            //transform entire object into model
            Weather weather = new Weather();
            JsonArray jArray = jObj.getJsonArray("weather");

            weather.setCountryName(query);
            weather.setDescription(jArray.getJsonObject(0).getString("description"));
            weather.setIcon(jArray.getJsonObject(0).getString("icon"));
            weather.setTemperature(jObj.getJsonObject("main").getInt("temp"));
            return weather;


        }catch(Exception e){

            Weather weather = new Weather();
            return weather;
        }




    }



}
