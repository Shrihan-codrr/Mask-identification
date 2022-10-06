
prediction1 = "";
prediction2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality :90

});

my_cam = document.getElementById("camera");


Webcam.attach(my_cam);

function Cap_image(){
    

    Webcam.snap(function(picture){

        document.getElementById("result").innerHTML= "<img id = 'web_snap' src = '" + picture + "'>";
    });

    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_7_C3eoy7/json", model_loaded);

}

function model_loaded(){

    console.log("Model is loaded");

   
}


function agent_speak(){

    var my_synth = window.speechSynthesis;

    speak_data1="My first prediction is " + prediction1;
    speak_data2="and My second prediction is " + prediction2;


    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);

    my_synth.speak(utterThis);
}

function prediction(){

    img = document.getElementById("web_snap");
    classifier.classify(img, got_results);
    
}

function got_results(error, results){

    if(error){
      console.error(error);
    }
    else{
      console.log(results);

      document.getElementById("result_prediction_name1").innerHTML = results[0].label;
      document.getElementById("result_prediction_name2").innerHTML = results[1].label;

      prediction1 = results[0].label;
      prediction2 = results[1].label;

      agent_speak();

      //Happy , Sad ,  Silly , Surpised

      if(prediction1 == "MASK IS WORN"){
        document.getElementById("result_emoji1").innerHTML = "&#128567;";
      }

      else if(prediction1 == "NO MASK"){
        document.getElementById("result_emoji1").innerHTML = "&#128577;";
      } 

      if(prediction2 == "MASK IS WORN"){
        document.getElementById("result_emoji2").innerHTML = "&#128567;";
      }

      else if(prediction2 == "MASK IS NOT WORN"){
        document.getElementById("result_emoji2").innerHTML = "&#128577;";
      } 

    }
    
}