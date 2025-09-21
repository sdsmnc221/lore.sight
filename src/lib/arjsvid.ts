import isMobile from "./isMobile";

function createCanvasCopy() {
  let canvas: HTMLCanvasElement = document.createElement("canvas");
  let ctx: CanvasRenderingContext2D;

  const setupCanvas = () => {
    canvas.id = "arjs-video-copy";
    canvas.width = 640;
    canvas.height = 480;

    canvas.style.cssText = `
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -${isMobile() ? 95 : 50}%) !important;
      z-index: 99 !important;
      border-radius: 20px !important;
    `;

    ctx = canvas.getContext("2d")!;
    document.body.appendChild(canvas);
  };

  const copyVideoFrame = () => {
    const video = document.getElementById("arjs-video") as HTMLVideoElement;
    if (video && video.videoWidth > 0) {
      // Hide original video
      // video.style.opacity = "0";

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(copyVideoFrame);
  };

  setupCanvas();
  copyVideoFrame();

  return canvas;
}

export default createCanvasCopy;
