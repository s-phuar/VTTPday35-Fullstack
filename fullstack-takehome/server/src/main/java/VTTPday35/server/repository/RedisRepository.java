package VTTPday35.server.repository;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import VTTPday35.server.model.Weather;

@Repository
public class RedisRepository {
    @Autowired@Qualifier("redis-string")
    private RedisTemplate<String, String> template;

    //HSET {weather} {countryname} {details json}
    public void saveWeather(Weather weather){
        HashOperations<String, String, String> hashOps = template.opsForHash();

        //store object as json string
        hashOps.put("weather", weather.getCountryName(), Weather.objToJson(weather).toString());
        //expire after 15 mintues
        template.expire("weather", 15, TimeUnit.MINUTES);
    }

    //HGET {weather} {countryname}
    public Weather getWeather(String name){
        HashOperations<String, String, String> hashOps = template.opsForHash();
        try{
            String weather = hashOps.get("weather", name);
            return Weather.strToObj(weather);
        }catch(NullPointerException e){
            return new Weather();
        }

    }




}
