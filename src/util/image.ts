import axios from 'axios';
//设置清晰度
export function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = (rect.width || canvas.width) * dpr;
  canvas.height = (rect.height || canvas.height) * dpr;
  return canvas.getContext('2d');
}
// 剪切图片
export function cupImage(url: string, aspectRatio: number): Promise<string> {
  return new Promise<string>((resolve) => {
    //初始化图片和canvas
    const image = new Image();
    image.src = url;
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = aspectRatio * 1000;
    const ctx = setupCanvas(canvas);
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    //读取照片后
    image.onload = () => {
      //设置正确的宽高
      let imageWidth = image.width;
      let imageHeight = image.height;
      if (8 * imageHeight > 5 * imageWidth) {
        imageHeight = (imageWidth * 9) / 16;
      } else if (81 * imageWidth > 160 * imageHeight) {
        imageWidth = (imageHeight * 16) / 9;
      }
      ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, canvasWidth, canvasHeight);

      //生成新图片链接，删除旧图片链接
      canvas.toBlob((imageBlob) => {
        const newUrl = URL.createObjectURL(imageBlob);
        URL.revokeObjectURL(url);
        resolve(newUrl);
      });
    };
  });
}
//返回图片
export async function getWallpaper(num: number): Promise<string> {
  const errorSrc = require('../assets/fail.svg') as string;
  let url = await axios
    .get<ArrayBuffer>(`/wallpaper/${num}`, {
      responseType: 'arraybuffer',
    })
    .then((res) => {
      return URL.createObjectURL(new Blob([res.data]));
    })
    .catch(() => {
      return errorSrc;
    });
  if (url !== errorSrc) {
    url = await cupImage(url, 9 / 16);
  }
  return url;
}
