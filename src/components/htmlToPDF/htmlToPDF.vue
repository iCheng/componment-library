<template>
    <div id="demo" style="background-color: aqua; height: 1000px; width: 1000px;">
        htmlPDF
        {{ inputType }}
        <el-input :value="value" placeholder="请输入密码" @keydown.native="onKeydown($event)" @input="onInput($event)"
            :type="inputType" :disabled="canEdit" oncut="return false" onpaste="return false" oncopy="return false">
            <i v-if="isModified" slot="suffix" :class="iconType" @click="clickIcon" style="cursor:pointer;"></i>
        </el-input>
        <el-button type="success" @click="save">打印</el-button>
    </div>
</template>

<script>

import htmlToPdf from '@/common/htmlToPDF';


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
            inputType: 'passwordpasswordprdpassword',  // 输入类型  text password
            iconType: 'el-input__icon el-icon-user-solid',// 图标样式
            isModified: false,    // 是否修改
            flag: true   //是否开启密码清0
        }
    },
    methods: {
        save() {
            console.log("--begin");
            let ele = document.getElementById('demo');
            htmlToPdf.getPdf('demo', ele);
            console.log("--end")
        }
    }
}
</script>

<style>
.box {
    width: 200px;
}
</style>