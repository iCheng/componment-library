<template>
  <div class="container">
    <h1>打地鼠小游戏</h1>
    <div class="container-game">
      <div class="score">分数: {{ score }}</div>
      <div class="message" @click="startGame" v-if="!isPlaying">开始游戏</div>
      <div class="container-hole">
        <div class="hole">
          <div class="mole" @click="clickMole"></div>
        </div>
        <div class="hole">
          <div class="mole" @click="clickMole"></div>
        </div>
        <div class="hole">
          <div class="mole" @click="clickMole"></div>
        </div>
        <div class="hole">
          <div class="mole" @click="clickMole"></div>
        </div>
        <div class="hole">
          <div class="mole" @click="clickMole"></div>
        </div>
        <div class="hole">
          <div class="mole" @click="clickMole"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // dom内容
      container: '',
      moles: '',
      // --
      score: 0, //成绩
      isPlaying: false, //是否开始游戏,
      timeUp: false,
      lastHole: ''
    }
  },
  mounted () {
    // 挂载后 拿到dom
    this.container = document.querySelector('.container-hole');
    this.moles = Array.from(this.container.querySelectorAll('.hole'));  // 将鼹鼠的元素合并为数组

    console.log("132123", this.container.querySelectorAll('.hole'), this.moles);
  },
  methods: {
    // 点击鼹鼠
    clickMole (e) {
      console.log("hahha", e);
      if (!e.isTrusted) return; // 防止作弊
      if (!this.isPlaying) return;
      // 检查是否真正地点击到了鼹鼠
      // Element.matches() 元素是否被指定的选择器字符串选择
      if (e.target.matches('.mole')) {
        // 打到了 成绩+1 隐藏鼹鼠
        this.score++;
        e.target.parentNode.querySelector('div').classList.remove('mole--show');
      }
    },
    // 开始游戏
    startGame () {
      this.score = 0;
      this.isPlaying = true;
      this.timeUp = false;
      // 开始游戏
      this.popUpMole();
      // 定时关闭游戏
      setTimeout(() => {
        this.isPlaying = false;
        this.timeUp = true;
      }, 60000);
    },
    // 随机时间生成地鼠
    popUpMole () {
      if (this.timeUp) {
        return;
      }
      const time = Math.random() * (1500 - 500) + 500; //生成时间 0.5s -- 1.5s
      const hole = this.randomHole(this.moles); // 随机拿到一个鼹鼠的dom  打印出来是其中一个<div>..</div>结构
      // 展示鼹鼠
      hole.querySelector('div').classList.add('mole--show'); //添加一个样式 使样式覆盖 让元素展示
      // 隐藏鼹鼠
      setTimeout(() => {
        hole.querySelector('div').classList.remove('mole--show');
        // 递归调用
        if (!this.timeUp){
          this.popUpMole()
        }
      }, time);
    },
    // 随机选择一个地鼠洞
    randomHole (holes) {
      const idx = Math.floor(Math.random() * holes.length);
      const hole = holes[idx];
      if (hole === this.lastHole) return this.randomHole(holes);
      this.lastHole = hole;
      return hole;
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  height: 1000px;
  background-image: url('@/assets/meadow.png');
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: 1000px 1000px;
  cursor: url(https://cdn.jsdelivr.net/gh/fz6m/Private-web@1.5/image/cursor/No_Disponible.cur), auto
  /* cursor: url('D:\AllProject\componment-library\src\assets\hammer.cur'), auto; */
}

h1 {
  text-align: center;
  line-height: 30px;
}

.container-game {
  width: 60%;
  height: 400px;
  margin: 230px auto;
}

.container-hole {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.hole {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 20px;
  /* background-color: #f5732d; */
}

.mole {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/mole.png');
  background-size: 100% 100%;
  display: none;
}

/* 会覆盖原来的样式 使元素展示 */
.mole--show {
  display: block;
}

.score {
  font-size: 2rem;
  text-align: center;
}

.message {
  font-size: 2rem;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
}
</style>
