
<template>
  <div class="wrapper">
    <div class="input-data">
        <input type="text" required="" />
        <div class="underline"></div>
        <label>Name</label>
    </div>
    <div class="input-data">
        <input type="text" required="" />
        <div class="underline"></div>
        <label>Label</label>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
*{
	margin: 0;
	padding: 0;
	outline: none;
	box-sizing: border-box;
}
body{
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	/* 背景图片 可以自己选择一张图片在某路径下*/
    background: url('@/assets/image2.jpg');
    background-size: 100% 100%;
}
.wrapper{
    /* background:#00000090;  /*透明度 90*/
	border-radius: 20px;
	width: 450px;
	background-color: #fff;
	padding: 30px;
	box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}
.wrapper .input-data{
	width: 100%;
	height: 40px;
	position: relative;
}
/* 输入框的样式 */
.wrapper .input-data input{ 
	width: 90%;
	height: 100%;
	border: none;
    margin-left: 30px;
    margin-right: 13px;
	border-bottom: 2px solid silver;
	font-size: 17px;
}
/* 标题静态样式 */
.wrapper .input-data label{
	position: absolute;
	bottom: 10px;
	left: 30px;
	color: grey;
	pointer-events: none;
	transition: all 0.3s ease;
}
/* 标题获得焦点时的样式 */
.input-data input:focus ~ label,
.input-data input:valid ~ label{    /* 获得焦点 且拥有有效值的表单元素 会把label(name)字段变位置 */
	transform: translateX(-50px);   /* name字段向右移动50px */
	font-size: 15px;
	color: #4158D0;
}
.wrapper .input-data .underline{
	position: absolute;
	bottom: 0px;
	height: 2px;
	width: 100%;
}
.input-data .underline:before{    /* 给底线加个颜色 */
    margin-left: 30px;
	position: absolute;
	content: "";
	height: 2px;
	width: 90%;
	background: #4158D0;
	transform: scaleX(0);
	transition:transform 0.3s ease;  /* 渐变 */
}

.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before{
	transform: scaleX(1);
}

</style>