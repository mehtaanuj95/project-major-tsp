void setup() {
  // put your setup code here, to run once:
pinMode(7, OUTPUT);
pinMode(8, OUTPUT);
pinMode(9, OUTPUT);
pinMode(5,OUTPUT);
pinMode(6,OUTPUT);
pinMode(11,OUTPUT);
}

void loop() {

digitalWrite(8, HIGH); 
  digitalWrite(7,LOW);
 // analogWrite(9,255);     
    digitalWrite(5,LOW);
    digitalWrite(6,HIGH);
   // analogWrite(11,150);
      delay(5000);
 
 //   delay(5000);                  
     
      // wait for a second
//  digitalWrite(7, HIGH); 
  // digitalWrite(8, LOW);
 // analogWrite(9,80);// t urn the LED off by making the voltage LOW
  //delay(200);    

}  
