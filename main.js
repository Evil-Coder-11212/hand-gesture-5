Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 180,
});
const cameraEl = document.querySelector("#live-camera");
const capturedImage = document.querySelector("#captured-image");
Webcam.attach(cameraEl);
const takeScreenShot = () => {
  Webcam.snap((dataURL) => {
    document.querySelector(
      "#result"
    ).innerHTML = `<img src=${dataURL} id="captured-image" />`;
  });
};
classifier = ml5.imageClassifier(
  " https://teachablemachine.withgoogle.com/models/T4a6W7oUF/ ",
  () => {
    console.log("Loaded");
  }
);

const check = () => {
  console.log(document.querySelector("#captured-image").src);
  classifier.classify(document.querySelector("#captured-image"), gotResult);
};

let toSpeak = "";

function gotResult(error, result) {
  console.log(result);
  if (error) {
    console.log(error);
    console.log("Error is here");
  } else {
    gesture = result[0].label;
    toSpeak = gesture;
    console.log(toSpeak);
    speak();
  }
}

const speak = () => {
  const synth = window.speechSynthesis;

  speakData = toSpeak;

  let utterThis = new SpeechSynthesisUtterance(speakData);

  synth.speak(utterThis);
};
