<template>
  <!-- Force力导向气泡图 -->
  <div class="main-content-box">
    <div id="container"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  props: {},
  data () {
    return {

    }
  },
  mounted () {
    this.getInit();
  },
  methods: {
    getInit () {
      const data = {
        // value： 决定节点大小
        // cluster: a b c d 对应不同的样式 cluster值决定拿到colors、strokes数组中的某一项
        // label: 默认节点文本（默认配置项属性）
        // description： 点击节点放大后 该该数据赋值给label 展示文本
        // x/y 节点初始位置
        nodes: [
          {
            id: '0',
            label: 'iCheng',
            style: { fill: 'l(0) 0:#ffffff 0.5:#8FE9FF 1:#87EAEF', stroke: '', shadowBlur: 60, shadowOffsetX: 10, shadowOffsetY: 10, shadowColor: '#ADD8E6' },
            description: 'See the latest updates to the MDN reference pages about JavaScript regular expressions',
            x: 624.0361181340486,
            y: 208.12272169694995,
            size: 57
          },
          {
            id: '1',
            label: 'analyse',
            style: { fill: 'l(0) 0:#FFD3C9 0.5:	#FFD3C9 1:#ffffff', stroke: '', shadowBlur: 60, shadowOffsetX: 10, shadowOffsetY: 10, shadowColor: '#E6E6FA' },
            description: 'Learn what HTML landmark roles are, how they improve accessibility',
            x: 538.8142691877796,
            y: 236.54991963171793,
            size: 78
          },
          {
            id: '2',
            label: 'subs',
            style: { fill: 'l(0) 0:#A7C2FF 0.5:#A7C2FF 1:#ffffff', stroke: '', shadowBlur: 60, shadowOffsetX: 10, shadowOffsetY: 10, shadowColor: '#A7C2FF' },
            description: 'The Performance API is a group of standards used to measure ',
            x: 614.8210615725476,
            y: 331.28231753161253,
            size: 52
          },
          {
            id: '3',
            label: 'JS',
            style: { fill: 'l(0) 0:#FFA1E3 0.5:#FFA1E3 1:#ffffff', stroke: '', shadowBlur: 60, shadowOffsetX: 10, shadowOffsetY: 10, shadowColor: '#F0F8FF' },
            description: 'The font-palette CSS property allows specifying one of the many ',
            x: 623.5903311141668,
            y: 213.7599581024757,
            size: 57
          },
          {
            id: '4',
            label: 'Vue',
            style: { fill: 'l(0) 0:#CADBFF 0.5:#CFF6FF 1:#ffffff', stroke: '', shadowBlur: 60, shadowOffsetX: 10, shadowOffsetY: 10, shadowColor: '#BFCFEE' },
            description: 'The open Web presents incredible opportunities for developers. To take full ',
            x: 722.6441419689719,
            y: 248.67386175886122,
            size: 80
          },
          {
            id: '5',
            label: 'React',
            style: { fill: 'l(0) 0:#D5FF86 0.5:#D5FF86 1:#ffffff', stroke: '', shadowBlur: 60, shadowOffsetX: 10, shadowOffsetY: 10, shadowColor: '#D5FF86' },
            description: 'The Web Developer Guide provides useful how-to content to help ',
            x: 695.1804391519112,
            y: 148.1169442882475,
            size: 76
          },
          {
            id: '6',
            label: 'TS',
            style: { fill: 'l(0) 0:#6BFFDE 0.5:#6BFFDE 1:#ffffff', stroke: '', shadowBlur: 60, shadowOffsetX: 10, shadowOffsetY: 10, shadowColor: '#6BFFDE' },
            description: 'Events are what you build Web apps to react to; for example, when a Web page ',
            x: 541.8735531901256,
            y: 310.94404362667007,
            size: 50
          }
        ],
        edges: [],
      };

      // const tipDiv = document.createElement('div');
      // tipDiv.innerHTML = 'Try to click or drag a bubble!';
      // const graphDiv = document.getElementById('container');
      // graphDiv.appendChild(tipDiv);

      const container = document.getElementById('container');
      const width = container.scrollWidth;
      const height = (container.scrollHeight || 1000) - 20;

      const graph = new G6.Graph({
        container: 'container',
        width,
        height,
        // 布局配置
        layout: {
          type: 'force', // 力导向布局
          nodeStrength: 300, // 节点作用力，正数代表节点之间的引力作用，负数代表节点之间的斥力作用
          collideStrength: 0.7, // 防止重叠的力强度，范围 [0, 1]
          alphaDecay: 0.01, // 迭代阈值的衰减率 ？啥玩意
          preventOverlap: true, // 是否防止重叠 必须在数据中设置了 size 或在该布局中配置了与当前图节点大小相同的 nodeSize 值
        },
        modes: {
          default: ['collapse-expand-combo'], // combo类型
        },
        // 默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖
        defaultNode: {
          type: 'bubble',
          size: 80,
          labelCfg: {
            position: 'center',
            style: {
              fill: 'black',
              fontSize: 6,
              fontStyle: 'bold',
            },
          },
        },
      });

      // mapping
      const nodes = data.nodes;
      


      nodes.forEach(function (node) {
        node.oriSize = node.size;
        node.oriLabel = node.label;
      });
      
      // 方法：跟随拖动的位置 节点位置移动
      // 参数e：鼠标拖动信息,x/y是xy轴位置信息
      // 将移动后的xy数据赋予fx fy dragend事件完成后，将fx fy置空，节点就会返回原来的位置坐标
      function refreshDragedNodePosition (e) {
        // console.log(e)
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
      }

      // 事件绑定 graph.on()
      // Node 交互事件: node:dragstart 当节点开始被拖拽的时候触发的事件
      graph.on('node:dragstart', function (e) {
        graph.layout(); // graph.layout()重新以当前配置的属性进行一次布局
        refreshDragedNodePosition(e);
      });
      // node:drag  当节点在拖动过程中时触发的事件
      graph.on('node:drag', function (e) {
        refreshDragedNodePosition(e);
      });
      // node:dragend 当拖拽完成后触发的事件
      graph.on('node:dragend', function (e) {
        e.item.get('model').fx = null;
        e.item.get('model').fy = null;
      });
      // node:click 鼠标左键单击节点时触发
      graph.on('node:click', function (e) {
        // debugger;
        const node = e.item; //那到当前点击的节点
        const states = node.getStates(); //返回当前元素的所有状态 啥也没有
        let clicked = false;
        const model = node.getModel(); // 获得节点位置
        let size = 200; // 点击后的大小
        let labelText = 'NODE: ' + model.id + '\n' + model.description; // 拼接： "NODE:  this is node 8, and the value of it is 21"
        states.forEach(function (state) {
          if (state === 'click') {
            clicked = true;
            size = model.oriSize;
            labelText = model.oriLabel;
          }
        });
        graph.setItemState(node, 'click', !clicked); //设置元素状态(元素实例，状态值，是否启用状态)
        // 更新元素，包括更新数据、样式等
        graph.updateItem(node, {
          size,
          label: labelText,
        });
        graph.layout(); // graph.layout()重新以当前配置的属性进行一次布局
      });
      
      graph.data(data); // 初始化图数据，data是一个包括 节点 数组和 边 数组的对象
      graph.render();
      
      // 不知道干啥的
      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight) return;
          graph.changeSize(container.scrollWidth, container.scrollHeight - 20);
        };
      
    }
  }
}
</script>

<style>

</style>