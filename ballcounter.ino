int switch_balls = 0;
int force = 0;

void setup() {
  pinMode(A0,INPUT);
  Serial.begin(9600);

}

void loop() {
  force = analogRead(A0);

  if (Serial.available() > 0){
    int message = Serial.read();
    switch_balls = 0;
  }

  if(force >= 1){
    if (switch_balls <= 100){
      switch_balls += 1;
    }
    Serial.println(switch_balls);
  }

  delay(100);
}