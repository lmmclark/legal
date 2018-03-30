<!--
ReadMe:
1.这里定义了一个新页面的基本格式,新建页面时，直接复制粘贴，改成自己页面的名字即可 
2.需要改动的地方：
	2.1 id="AuctionType" => 改成自己的id 或者 class名
	2.2 name: 'AuctionType' => 改成 自己组建的名字
-->

<template>
	<div id="AuctionType" class="lg-wrapper">
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
	export default {
		name: 'AuctionType',
		components: {
			
		},
		computed: {
			...mapState([]),
			...mapGetters([])
		},
		data(){
			return{
			}
		},
		mounted(){
		},
		methods:{
			...mapActions([]),
		}
	}
</script>

<style lang="less">
</style>

