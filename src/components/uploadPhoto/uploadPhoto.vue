<template>
  <div>
    <div class="upload-pic b-company-photo">
      <div v-if="!imageSrc" class="add-img"></div>
      <canvas v-show="imageSrc" class="bg-canvas" ref="canvas"></canvas>
      <input class="uploader-btn" type="file" accept="image/*" @change="onChange">
      <div class="b-overlayer">
        <div class="btn">
          <span class="btn-content">Update Picture</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EXIF from 'exif-js';
export default {
  data() {
    return {
      imageSrc: '',
      orientation: null,
      ready: false
    };
  },

  watch: {
    imageSrc(v) {
      if (v) {
        this.update(v);
      }
    }
  },
  methods: {
    init() {
      let canvasDom = this.$refs.canvas;
      let ctx = canvasDom.getContext('2d');
      ctx.save();
    },
    get() {
      return this.imageSrc.replace(/data.*base64,/, '');
    },
    onChange(e) {
      let file = e.target.files[0];
      if ((/(?:jpg|png|jpeg)$/).test(file.type)) {
        // 获取图像的数据
        EXIF.getData(file, () => {
          this.orientation = EXIF.getTag(this, 'Orientation');//获取图像的某个数据 对于非拍摄照片无图源信息，回调可能不会执行
        });
        let reader = new FileReader();
        // 读文件成功后的回调
        reader.onload = (e) => {
          let base64 = e.target.result;
          this.imageSrc = base64;
        };
        reader.readAsDataURL(file);//读文件file
      } else {
        //错误的文件格式
        console.log("错误的文件格式")
      }
    },
    // onDelete () {
    //   //
    // },
    update(newV) {
      let vm = this;
      let canvasDom = this.$refs.canvas;
      let ctx = canvasDom.getContext('2d');
      ctx.restore();
      let img = new Image();
      img.src = newV;
      img.onload = function () {
        let imgW = this.width;
        let imgH = this.height;
        let scale = 1;
        //图片缩放比例：(300*4)*(416*4) (按大比例进行压缩)
        if (imgW > (300 * 4)) {
          scale = parseFloat(imgW / (300 * 4)).toFixed(2);
        } else if (imgH > (416 * 4)) {
          let scale2 = parseFloat(imgH / (416 * 4)).toFixed(2);
          if (scale2 > scale) {
            scale = scale2;
          }
        }
        imgW = (imgW / scale);
        imgH = (imgH / scale);
        canvasDom.width = imgW;
        canvasDom.height = imgH;
        setTimeout(() => {
          switch (vm.orientation) {
            case 6://旋转90度
              ctx.rotate(Math.PI / 2);
              ctx.translate(0, -imgW);
              ctx.drawImage(img, 0, 0, imgH, imgW);
              break;
            case 3://旋转180度
              ctx.rotate(Math.PI);
              ctx.translate(-imgW, -imgH);
              ctx.drawImage(img, 0, 0, imgW, imgH);
              break;
            case 8://旋转-90度
              ctx.rotate(3 * Math.PI / 2);
              ctx.translate(-imgH, 0);
              ctx.drawImage(img, 0, 0, imgH, imgW);
              break;
            default:
              //没有方向数据或未进行旋转，默认直接绘图
              ctx.drawImage(img, 0, 0, imgW, imgH);
              break;
          }
          canvasDom.toDataURL('image/png').replace(/data.*base64,/, '');
          vm.ready = true;
        }, 100);//fix bug:延时，等待vm.orientation获取完毕
      };
    }
  }
};
</script>
<style lang="less" scoped>
.upload-pic {
  position: relative;
  width: 300px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  background-color: #ccc;

  .add-img,
  .bg-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }

  input {
    font-size: 90px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 10;
  }
}

.b-company-photo {
  width: 230px;
  height: 230px;
  overflow: hidden;
  background: #f5f5f5;
  border: 1px solid #e6e6e6;
  position: relative;

  .bg-photo {
    width: 100%;
    height: 100%;

    .bg-photo_img,
    .bg-photo_canvas {
      position: absolute;
      left: 0;
      top: 0;
      width: 300px;
      height: 100px;
    }

    .bg-photo_bg {
      width: 100%;
      display: inline-block;
      height: 150px;
      margin-top: 26px;
    }
  }

  .b-overlayer {
    position: absolute;
    z-index: 9;
    display: none;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #000;
    opacity: 0.7;
    border: 1px solid #666;
    flex-direction: column;
    padding-top: 30px;
    align-items: center;

    .delete-btn {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
      cursor: pointer;
    }

    .delete-btn:hover {
      color: #fff;
    }

    .btn {
      display: block;
      width: 100px;
      height: 30px;
      color: #ccc;
      background: 0 0;
      border: 1px solid #ccc;
      border-radius: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 3px;
      margin-top: 65px;
      margin-bottom: 15px;
      font-size: 12px;
      cursor: pointer;
      position: relative;

      .btn-content {
        width: 100%;
        height: 100%;
        display: block;
        line-height: 30px;
        margin-top: 0;
        text-align: center;
      }

      .btn-file {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: inline-block;
        opacity: 0;
        font-size: 18px;
        font-size: 0;
        cursor: pointer;
      }
    }
  }

  &:hover .b-overlayer {
    display: flex;
  }

  .b-overlayer.read-only {
    display: none !important;
  }
}</style>