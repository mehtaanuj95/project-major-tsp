#include <ESP8266WiFi.h>
 
const char* ssid     = "Abhishek";
const char* password = "kartik2002";
 
const char* host = "api.thingspeak.com";
 
int value = 1; 
 
void setup() {
  Serial.begin(9600);
  delay(10);
 
  // We start by connecting to a WiFi network
 
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
}//end setup
  
void loop() {
  delay(5000);
   
  Serial.print("Connecting to ");
  Serial.println(host);
  
  // Use WiFiClient class to create TCP connections
  WiFiClient Client;
  const int httpPort = 80;
  if (!Client.connect(host, httpPort)) {
    Serial.println("Connection failed");
    return;
  }
  
  // We now create a URI for the request
  String url = "/apps/thinghttp/send_request?api_key=HF6TCTIEQBT1GFD6";
  Serial.print("Requesting URL: ");
  Serial.println(host + url);
  Serial.println(String("TRY: ") + value + ".");
  
  // This will send the request to the server
 Client.print(String("GET ") + url + "&headers=false" + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
  delay(5000);
  
  // Read all the lines of the reply from server and print them to Serial
  while(Client.available()){
    Serial.print("Heelloo");
    String z=Client.readStringUntil('\n');
   
  Serial.print(z);
 }
  Serial.println("");
  Serial.println(String("Try nr. ") + value + " is finished.");
  Serial.println("Waiting for next try...");
  Serial.println("");
  value = value + 1;
  delay(20000);
}
