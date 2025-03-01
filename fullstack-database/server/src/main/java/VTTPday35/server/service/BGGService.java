package VTTPday35.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import VTTPday35.server.repository.BGGRepository;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

@Service
public class BGGService {
    @Autowired
    private BGGRepository bggRepository;

    public JsonArray search(String q, int count){
        JsonArrayBuilder jArry = Json.createArrayBuilder();

        bggRepository.search(q, count).stream()
            .map(doc -> { //turn each doc in a json object
                return Json.createObjectBuilder()
                    .add("gid", doc.getInteger("gid"))
                    .add("name", doc.getString("name"))
                    .build();
            })
            .forEach(jArry::add);

            return jArry.build();
    }


    
}
