Webcam.set({
  width: 300,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("web_camera");

Webcam.attach("#web_camera");

function capture() {
  Webcam.snap(function (data_uri) {
    document.getElementById("camera_output").innerHTML =
      "<img src=" + data_uri + " id='cap_pic'>";
  });
}

console.log("ML5 version is", ml5.version);
var classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/923kmCFl-/model.json",
  modelLoaded
);
function modelLoaded() {
  console.log("Model is Loaded");
}
function identify() {
  img = document.getElementById("cap_pic");
  classifier.classify(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("object_name").innerHTML = results[0].label;
    percent = results[0].confidence * 100;
    document.getElementById("accuracy").innerHTML = percent.toFixed(2) + " % ";
  }
}
