


<template>
    <div id="app">
        <div class="itxst" style="margin-left: 300px; margin-top: 200px;">
            <div class="col">
                <div class="title">groupA</div>
                <div class="title">数据量：{{ arr1Len }}</div>
                <draggable v-model="arr1" :group="groupA" animation="300" dragClass="dragClass" ghostClass="ghostClass" chosenClass="chosenClass">
                    <transition-group :style="style">
                        <div class="item" v-for="item in arr1" :key="item.id">
                            {{ item.name }}
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <div class="col">
                <div class="title">groupB</div>
                <div class="title">数据量：{{ arr2Len }}</div>
                <draggable v-model="arr2" :group="groupB" animation="300" dragClass="dragClass" ghostClass="ghostClass" chosenClass="chosenClass">
                    <transition-group :style="style">
                        <div class="item" v-for="item in arr2" :key="item.id">
                            {{ item.name }}
                        </div>
                    </transition-group>
                </draggable>
            </div>
        </div>
        <div style="display: block">{{ message }}</div>
    </div>
</template>
<script>

import draggable from "vuedraggable"; //  'npm i -S vuedraggable' 下载  再导入draggable组件
export default {
    components: { draggable }, //注册draggable组件
    data() {
        return {
            groupA: {
                name: "itxst",
                put: true, //可以拖入
                pull: () => {
                    if (this.arr1.length <= 3) { // 长度小于3 不允许拖出
                        return false;
                    }
                    return this.arr1.length > 3;
                },
            },
            groupB: {
                name: "itxst",
                pull: true,
                put: true,
            },
            //定义要被拖拽对象的数组
            arr1: [
                { id: 1, name: "Input Limit" },
                { id: 2, name: "Four decimal places" },
                { id: 3, name: "Jarrison" },
                { id: 4, name: "Tao Bao" },
                { id: 5, name: "The Interval Time" },
            ],
            arr2: [], //空数组
            //空数组的样式，设置了高度
            style: "min-height:120px;display: block;"
        };
    },
    mounted() { },
    computed: {
      arr1Len() {
        return this.arr1.length;
      },
      arr2Len() {
        return this.arr2.length;
      }
    },
    methods: {
        //开始拖拽事件
        onStart() {
            //
        },
        //拖拽结束事件
        onEnd() {
            //
        },
    },
};
</script>
<style scoped>

/*下面三个定义要拖拽元素的样式*/
/* 1 目标位置占位符的样式 */
.ghostClass {
    background-color: #B0C4DE !important;
}
/* 2 选中时样式 */
.chosenClass {
    background-color: #B0C4DE  !important;
    opacity: 1 !important;
}
/* 3 拖动时样式 */
.dragClass {
    background-color: #B0C4DE !important;
    opacity: 1 !important;
    box-shadow: none !important;
    outline: none !important;
    background-image: none !important;
}

.itxst {
    margin: 10px;
    min-height: 200px;
}

.title {
    padding: 6px 12px;
    justify-self: center
}

.col {
    width: 250px;
    flex: 1;
    padding: 10px;
    /* border: solid 2px #eee; */
    border-radius: 5px;
    float: left;
    display: grid;
    margin-right: 100px;;
    color: 	#708090;
    background-color: #F5F5F5;
}

.col+.col {
    margin-left: 10px;
}

/* 元素静态样式 */
.item {
    padding: 6px 12px;
    border-radius: 10px;;
    margin: 0px 10px 0px 10px;
    background-color: #ADD8E6;
}

/* 元素获得焦点的样式 */
.item:hover {
    background-color: #B0C4DE;
    cursor: move;
}

.item+.item {
    border-top: none;
    margin-top: 6px;
}
</style>