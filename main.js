noseX=0;
noseY=0;
rightWristX = 0;
leftWristX = 0;
difference = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500)

    canvas = createCanvas(550, 500);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    background("#659E77");

    document.getElementById("size").innerHTML = "The Width and Height of the Square is: " + difference + "px";
    fill("#F90093");
    stroke("#F90033");
    square(noseX, noseY, difference)
}

function modelLoaded() {
    console.log("Posenet Is Initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "and noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = Math.floor(leftWristX - rightWristX);
        console.log("The leftWristX = " + leftWristX + " and the rightWristX = " + rightWristX + " and so the difference between the two is = " + difference);
    }
}