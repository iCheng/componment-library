<template>
  <div class="container">
    <h2>--- 图片懒加载 ---</h2>
    <!-- 1 content-visibility: auto 实现图片内容的延迟渲染 -->
    <!-- <div v-for="item in items" :key="item">
      <div class="container-box">
        <p>-------------{{ item.id }}-------------</p>   
          <img :src="item.src" alt=""/>
      </div>
    </div> -->
    <!-- 2 loading="lazy" 懒加载 -->
    <div v-for="item in items" :key="item.id">
      <div class="container-box2">
        <p>-------------{{ item.id }}-------------</p>
        <img :src="item.src" alt="" loading="lazy" decoding="async" />
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            id: 0,
            src: "http://b.hiphotos.baidu.com/image/pic/item/e824b899a9014c08878b2c4c0e7b02087af4f4a3.jpg"
          }, {
            id: 1,
            src: "https://gtd.alicdn.com/sns_logo/i3/TB1wnBTKFXXXXcQXXXXSutbFXXX.jpg_240x240xz.jpg"
          }, {
            id: 2,
            src: "//www.baidu.com/img/flexible/logo/pc/result.png"
          }, {
            id: 3,
            src: "http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg"
          }, {
            id: 4,
            src: "http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg"
          }, {
            id: 5,
            src: "http://h.hiphotos.baidu.com/image/pic/item/7c1ed21b0ef41bd5f2c2a9e953da81cb39db3d1d.jpg"
          }, {
            id: 6,
            src: "https://gw.alipayobjects.com/zos/basement_prod/828aec79-8123-4ca7-baa8-1422a964003a.svg"
          }, {
            id: 7,
            src: "http://e.hiphotos.baidu.com/image/pic/item/4e4a20a4462309f7e41f5cfe760e0cf3d6cad6ee.jpg"
          }, {
            id: 8,
            src: "http://g.hiphotos.baidu.com/image/pic/item/55e736d12f2eb938d5277fd5d0628535e5dd6f4a.jpg"
          }, {
            id: 9,
            src: "http://e.hiphotos.baidu.com/image/pic/item/4bed2e738bd4b31c1badd5a685d6277f9e2ff81e.jpg"
          }, {
            id: 10,
            src: "http://g.hiphotos.baidu.com/image/pic/item/0d338744ebf81a4c87a3add4d52a6059252da61e.jpg"
          }, {
            id: 11,
            src: "http://a.hiphotos.baidu.com/image/pic/item/f2deb48f8c5494ee5080c8142ff5e0fe99257e19.jpg"
          }, {
            id: 12,
            src: "http://f.hiphotos.baidu.com/image/pic/item/4034970a304e251f503521f5a586c9177e3e53f9.jpg"
          }, {
            id: 13,
            src: "http://b.hiphotos.baidu.com/image/pic/item/279759ee3d6d55fbb3586c0168224f4a20a4dd7e.jpg"
          }, {
            id: 14,
            src: "http://a.hiphotos.baidu.com/image/pic/item/e824b899a9014c087eb617650e7b02087af4f464.jpg"
          }, {
            id: 15,
            src: "http://c.hiphotos.baidu.com/image/pic/item/9c16fdfaaf51f3de1e296fa390eef01f3b29795a.jpg"
          }, {
            id: 16,
            src: "http://d.hiphotos.baidu.com/image/pic/item/b58f8c5494eef01f119945cbe2fe9925bc317d2a.jpg"
          }, {
            id: 17,
            src: "http://h.hiphotos.baidu.com/image/pic/item/902397dda144ad340668b847d4a20cf430ad851e.jpg"
          }, {
            id: 18,
            src: "http://b.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9ea5c0e3c23d139b6003bf3b374.jpg"
          }, {
            id: 19,
            src: "http://a.hiphotos.baidu.com/image/pic/item/8d5494eef01f3a292d2472199d25bc315d607c7c.jpg"
          }, {
            id: 20,
            src: "http://b.hiphotos.baidu.com/image/pic/item/9d82d158ccbf6c81b94575cfb93eb13533fa40a2.jpg"
          }, {
            id: 21,
            src: "http://g.hiphotos.baidu.com/image/pic/item/6d81800a19d8bc3e770bd00d868ba61ea9d345f2.jpg"
          }
        ]
      }
    },
    created() {
      console.log(this.asdasds);
    }
  }
</script>

<style>
  .container-box {
    content-visibility: auto;
    contain-intrinsic-size: 320px;
  }

  img {
    margin: 8px;
    width: 302px;
    height: 266px;
    object-fit: cover; /* 居中自动剪裁图片 */
  }
</style>