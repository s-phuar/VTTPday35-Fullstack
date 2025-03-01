package vttp.batch5.day35.server.controller;

import java.util.Date;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.core.MediaType;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON)
public class RegistrationController {
    
    @PostMapping(path="/register", consumes = MediaType.APPLICATION_JSON)
    @ResponseBody
    public ResponseEntity<String> postRegister(@RequestBody String payload){

        //return custom response with only redId and current timestamp to angular
        System.out.printf("Got payload: %s\n", payload);
        String regId = UUID.randomUUID().toString().substring(0, 8);
        long timeStamp = (new Date().getTime());

        JsonObject response = Json.createObjectBuilder()
            .add("regId", regId) //should match angular methods
            .add("timestamp", timeStamp) //should match angular methods
            .build();

        return ResponseEntity.ok(response.toString());
    }

}
