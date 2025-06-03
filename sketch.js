let video;
let handpose;
let predictions = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(640, 480); // 保持鏡頭大小及比例
  video.style('transform', 'scale(-1, 1)'); // 水平翻轉鏡頭
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Handpose model loaded!");
}

function draw() {
  background(240);
  const scaleFactor = 1.2; // 放大比例
  const videoWidth = video.width * scaleFactor;
  const videoHeight = video.height * scaleFactor;
  const xOffset = (width - videoWidth) / 2;
  const yOffset = (height - videoHeight) / 2;

  push();
  translate(width, 0); // 翻轉畫布
  scale(-1, 1); // 水平翻轉
  image(video, width - xOffset - videoWidth, yOffset, videoWidth, videoHeight);
  pop();

  drawKeypoints();
}

function drawKeypoints() {
  const scaleFactor = 1.2; // 放大比例
  const videoWidth = video.width * scaleFactor;
  const videoHeight = video.height * scaleFactor;
  const xOffset = (width - videoWidth) / 2;
  const yOffset = (height - videoHeight) / 2;

  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    const indexTip = prediction.landmarks[8]; // 食指末端

    const [x, y, z] = indexTip;
    const adjustedX = width - (x * scaleFactor + xOffset); // 修正水平翻轉
    const adjustedY = y * scaleFactor + yOffset;
    fill(0, 255, 0);
    noStroke();
    ellipse(adjustedX, adjustedY, 10, 10);
  }
}