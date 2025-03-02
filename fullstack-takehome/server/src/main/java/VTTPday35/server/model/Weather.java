package VTTPday35.server.model;

import java.io.StringReader;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

public class Weather {
    private String countryName;
    private String description;
    private int temperature;
    private String icon;

    public String getCountryName() {return countryName;}
    public void setCountryName(String countryName) {this.countryName = countryName;}
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}
    public int getTemperature() {return temperature;}
    public void setTemperature(int temperature) {this.temperature = temperature;}
    public String getIcon() {return icon;}
    public void setIcon(String icon) {this.icon = icon;}

    @Override
    public String toString() {
        return "Weather [countryName=" + countryName + ", description=" + description + ", temperature=" + temperature
                + ", icon=" + icon + "]";
    }


    public static JsonObject objToJson(Weather weather){
        JsonObject jObj = Json.createObjectBuilder()
            .add("name", weather.getCountryName())
            .add("description", weather.getDescription())
            .add("temp", weather.getTemperature())
            .add("icon", weather.getIcon())
            .build();

        return jObj;
    }

    public static Weather strToObj(String jsonStr){
        JsonReader reader = Json.createReader(new StringReader(jsonStr));
        JsonObject jObj = reader.readObject();

        Weather weather = new Weather();
        weather.setCountryName(jObj.getString("name"));
        weather.setDescription(jObj.getString("description"));
        weather.setTemperature((jObj.getInt("temp")));
        weather.setIcon(jObj.getString("icon"));

        return weather;
    }


}
