/**
 * Getting Started with Capture.
 * 
 * Reading and displaying an image from an attached Capture device. 
 */

int recordTime = 20; // SECond
int recordInterval = 3600;  // SECond
int startRecordAt = -1 ;


import com.hamoid.*;
import processing.video.*;
VideoExport videoExport;

Capture cam;

boolean recodStarted = false;
void setup() {
  size(640, 480);
  surface.setVisible(false);

  String[] cameras = Capture.list();

  if (cameras == null) {
    println("Failed to retrieve the list of available cameras, will try the default...");
    cam = new Capture(this, 640, 480);
  } 
  if (cameras.length == 0) {
    println("There are no cameras available for capture.");
    exit();
  } else {
    println("Available cameras:");
    printArray(cameras);

    // The camera can be initialized directly using an element
    // from the array returned by list():
    cam = new Capture(this, cameras[0]);
    // Or, the settings can be defined based on the text in the list
    //cam = new Capture(this, 640, 480, "Built-in iSight", 30);

    // Start capturing the images from the camera
    cam.start();
  }
}

void draw() {
  if (cam.available() == true) {
    cam.read();
    if (startRecordAt < 0 ||millis()-startRecordAt>recordInterval * 1000) {
      startRecord();
    }
  }
  image(cam, 0, 0, width, height);

  if (recodStarted) {
    //videoExport.saveFrame();
  }

  if (millis()-startRecordAt>recordTime * 1000) {
    stopRecord();
  }
}


void startRecord() {
  if (!recodStarted) {
    println("START");
    //videoExport = new VideoExport(this, "/Users/etudiants/Desktop/.camAlola/"+year() + "-"+month()+"-"+day()+"-"+hour()+"-"+minute()+"-"+second()+".mp4");
    //videoExport.startMovie();
    recodStarted = true;
    startRecordAt = millis();
  }
}

void stopRecord() {
  if (recodStarted) {
    println("STOP");
    //videoExport.endMovie();
    recodStarted = false;
  }
}