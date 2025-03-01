package VTTPday35.restapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import VTTPday35.restapi.service.GiphyService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;


@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class GiphyController {
    
    @Autowired
    private GiphyService giphyService;


    @GetMapping(path="/search")
    @ResponseBody
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> search(
        @RequestParam String q,
        @RequestParam(defaultValue = "pg") String rating,
        @RequestParam(defaultValue = "5") int limit){

        JsonArrayBuilder builder = Json.createArrayBuilder();
        giphyService.getGiphyUrls(q, limit, rating) //returns list of string urls
            .stream()
            .forEach(builder::add);

        return ResponseEntity.ok().body(builder.build().toString());
    }






}
