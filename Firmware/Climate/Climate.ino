#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

#define dhtPin 4
#define dhtType DHT11

const char* ssid = "";
const char* password = "Pramudith123";
const char* serverName = "http://192.168.1.7:3000/data";

DHT dht(dhtPin, dhtType);

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to Wifi...");
  }
  Serial.println("Connected to Wifi!");
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read Data from Sensor!");
    delay(5000);
    return;
  }

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" °C, ");
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
  
  if(WiFi.status()==WL_CONNECTED){
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    String jsonPayload="{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + "}";
    int httpResponse=http.POST(jsonPayload);

    if(httpResponse>0){
      String response=http.getString();
      Serial.println(httpResponse);
      Serial.println(response);
    }else{
      Serial.print("Error on Sending POST request");
      Serial.println(httpResponse);
    }

    http.end();
  }else{
    Serial.println("Wifi Disconnected!");
  }

  delay(10000);
}
