package VTTPday35.restapi.service;

import java.io.StringReader;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class GiphyService {
    
    public static final String GIPHY_URL= "https://api.giphy.com/v1/gifs/search";
    public static final String GIPHY_KEY= "EfVCfprodIZ47Hfw6ff49vnaF0E61BeM";

    public List<String> getGiphyUrls(String q, int limit, String rating){
        String url = UriComponentsBuilder
            .fromUriString(GIPHY_URL)
            .queryParam("q", q.replaceAll(" ", "+"))
            .queryParam("limit", limit)
            .queryParam("rating", rating)
            .queryParam("api_key", GIPHY_KEY)
            .toUriString();


        RequestEntity<Void> req = RequestEntity
            .get(url)
            .accept(MediaType.APPLICATION_JSON)
            .build();

        //exchange
        RestTemplate template = new RestTemplate();
        ResponseEntity<String> resp = template.exchange(req, String.class);
        String payload = resp.getBody();

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject jObj = reader.readObject();
        JsonArray jArray = jObj.getJsonArray("data");

        return jArray.stream()
            .map(obj -> obj.asJsonObject())
            .map(obj -> obj.getJsonObject("images").getJsonObject("fixed_height").getString("url"))
            .toList();







    }





}
