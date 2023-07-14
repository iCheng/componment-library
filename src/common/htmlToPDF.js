import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';


function canvasToPdf (pdfName, canvas) {
  // 拿到canvas宽高
  let contentWidth = canvas.width;
  let contentHeight = canvas.height;

  // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  let pageHeight = contentWidth / 592.28 * 841.89; //设置页纸高
  let leftHeight = contentHeight; // html页面的实际高度，剩下的高度


  let position = 0;

  // 设置内容图片的尺寸，img是pt单位
  let imgWidth = 595.28;
  let imgHeight = 592.28 / contentWidth * contentHeight;

  let pageData = canvas.toDataURL('image/jpeg', 1.0); // 将canvas对象转换为base64编码，从而实现图片转为base64编码

  // 初始化jspdf 参数1：方向：默认''时为纵向； 参数2：设置pdf内容图片使用的长度单位为pt，第三个参数为PDF的大小，单位是pt，设置为a4  或者自定义[241,279.4]
  let PDF = new JsPDF('', 'pt', 'a4'); // 设置pdf的尺寸，pdf要使用pt单位 已知 1pt/1px = 0.75   pt = (px/scale)* 0.75

  // 将内容图片添加到pdf中(addImage)，因为内容宽高和pdf宽高一样，就只需要一页，位置就是 0,0 
  // x 和 y 定义 PDF 中图像左上角的位置
  // w 和 h 定义图像宽度和高度
  //  ???????????????????????????????????????????????????????????? xy ????? ????????????????????????????????????????

  // 有两个高度需要区分，一个是html页面的实际高度leftHeight，和生成pdf的页面高度(841.89)
  // 当内容未超过pdf一页显示的范围，无需分页
  if (leftHeight < pageHeight) {

    PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
  } else {

    while (leftHeight > 0) {
      // arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
      PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= 841.89;
      if (leftHeight > 0) {
        PDF.addPage();
      }
    }
  }
  PDF.save(pdfName + '.pdf');
}
const htmlToPdf = {
  getPdf (pdfName, ele, params) {
    html2Canvas(ele, { // 将 html(参数ele) 转为canvas
      allowTaint: true,
      scale: 10, // 提升画面质量，但是会增加文件大小
      ...params
    }).then(function (canvas) {
      canvasToPdf(pdfName, canvas);
    });
  },
  canvasToPdf (pdfName, canvas) {
    canvasToPdf(pdfName, canvas);
  }
};
export default htmlToPdf;
