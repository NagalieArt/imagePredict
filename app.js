console.log("ML5 Version", ml5.version)
let synth = window.speechSynthesis

// Initialize the Image Classifier method with MobileNet
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Make a prediction with a selected image 
function classifyImage(){
  classifier.classify(document.getElementById('output'), (err, results) => {
    console.log(results);
    console.log(results[0].label);
    speak(`I think it is a ${results[0].label}`)
});
}

//Output image
const image = document.getElementById('output')

//File button, puts file into the model
const fileButton = document.querySelector("#file")
fileButton.addEventListener("change", (event)=>loadFile(event))

//load file, Loads imagine into the model
function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
}

//Image gets through the model
image.addEventListener('load', () => userImageUploaded())

//gives notification that image is uploaded
function userImageUploaded(){
    console.log("The image is now visible in the DOM")
    classifyImage()
}
 
//Text to speech when the image is uploaded
function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

