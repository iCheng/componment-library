<template>
  <div class="box">
    <el-input 
      :value="value"
      placeholder="请输入密码"
      @keydown.native="onKeydown($event)"
      @input="onInput($event)"
      :type="inputType"
      :disabled="canEdit"
      oncut="return false"
      onpaste="return false"
      oncopy="return false"
    >
    <i v-if="isModified" slot="suffix" :class="iconType" @click="clickIcon" style="cursor:pointer;"></i>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
        type: String,
        default: ''
    },
    canEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputType: 'password',  // 输入类型  text password
      iconType: 'el-input__icon el-icon-user-solid',// 图标样式
      isModified: false,    // 是否修改
      flag: true   //是否开启密码清0
    }
  },
  methods: {
    // 点击小图标
    clickIcon(){
      this.inputType = this.inputType == 'text' ? 'password' : 'text';
      this.iconType = this.iconType == 'el-input__icon el-icon-user-solid' ? 'el-input__icon el-icon-user' : 'el-input__icon el-icon-user-solid'
    },
    // 数据传递给父组件
    onInput(val){
        this.$emit("input", val);
    },
    // 监听键盘触发
    onKeydown(){
      this.isModified = true;
      // 第一次输入 输入框清空
      if(this.flag){
        this.$emit("input", '');
        this.flag = false;
      }
    }
  }
}
</script>

<style>
.box{
    width: 200px;
}
</style>