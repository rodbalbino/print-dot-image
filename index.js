const drawScene = () => {
  var canvas = document.getElementById("scene");
  var context = canvas.getContext("2d");
  var size = 4;

  canvas.width = png.width * size;
  canvas.height = png.height * size;

  context.drawImage(png, 0, 0);
  var data = context.getImageData(0, 0, png.width, png.height);
  context.clearRect(0, 0, canvas.width, canvas.height);

  var particles = [];
  for (let y = 0; y < data.height; y++) {
    for (let x = 0; x < data.width; x++) {
      var pixelPos = (y * data.width + x) * 4;
      let rgbR = data.data[pixelPos];
      let rgbG = data.data[pixelPos + 1];
      let rgbB = data.data[pixelPos + 2];
      let rgbA = data.data[pixelPos + 3];

      let gray = 0.3 * rgbR + 0.59 * rgbG + 0.11 * rgbB;

      if (gray > 30) {
        var particle = { x, y, color: gray };
        particles.push(particle);
      }
    }
  }

  for (let i = 0, j = particles.length; i < j; i++) {
    var particle = particles[i];
    context.fillStyle = `rgba(${particle.color},${particle.color},${particle.color},1)`;

    let pixelSize = 1.5;

    context.fillRect(
      particle.x * size,
      particle.y * size,
      pixelSize,
      pixelSize
    );
  }
};

var png = new Image();
png.onload = drawScene;
png.crossOrigin = "Anonymous";
png.src = "./images.png";
