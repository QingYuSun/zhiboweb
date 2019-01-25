<template>
  <div class="box-warp">
  	<div class="box-header">
  		<h3>{{title}}</h3>
  	</div>
  	<div class="box-main">
  		<slot name="body"></slot>
  	</div>
  </div>
</template>
<style>
	.box-warp{
		width: 100%;
		background-color: #fff;
	}
	.box-header{
		padding-left: 30px;
		border-bottom: 2px solid #8fe687;
	}
	.box-header h3{
		line-height: 50px;
		font-size: 18px;
	}
</style>
<script>
export default {
  	props:{
    	title:String
	},
  	data () {
	    return {
	    	name:'我的关注'
	    }
	},
	methods:{

	}
}
</script>