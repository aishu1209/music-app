song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristscore = 0;
status_meera = "";
status_so_good = "";
function preload(){
    song_2 = loadSound("meera.mp3");
    song_1 = loadSound("so_good.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);

    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    
}

function draw(){
    image(video, 0, 0, 600, 500);


    fill('#FF0000');
    stroke('#FF0000');

    status_meera = song_1.isPlaying();
    status_so_good = song_2.isPlaying();

    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        song_2.stop();
        if(status_so_good = "false"){
            song_1.play();
            document.getElementById("song").innerHTML = "So Good - Weston Estate";
        }
        if(rightWristScore > 0.2){
            circle(rightWristX, rightWristY, 20);
            song_1.stop();
            if(status_meera = "false"){
                song_2.play();
                document.getElementById("song").innerHTML = "Meera - Raja Kumari";
            }
        }
    }

    
}

function modelLoaded(){
    console.log("model is loaded");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("score left wrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;

        console.log("left wrist X =" + leftWristX + "and left wrist y =" + leftWristY);
        console.log("right wrist X " + rightWristX + "and right wrist y = " + rightWristY);
    }
}