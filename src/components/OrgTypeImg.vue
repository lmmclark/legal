<template>
	<div class="OrgTypeImg">
		<img :src="src"/>
	</div>
</template>

<script>
	export default {
		name: 'OrgTypeImg',
		props:{
			src:String,
		},
		data(){
			return{
			}
		},
		mounted(){
		},
		methods:{
		
		}
	}
</script>

<style lang="less">
	.img{
		img{
			height: 20px;
			width: 20px;
		}
	}
</style>