
<template>
	<div id="flow-assitance-management" >
	<IconTitle title='流程帮助管理' left='-80' top='-30'></IconTitle>
		<div class="flex content">
			后续会放入集团相关指导规定文件说明	
		</div>
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
	import IconTitle from '../../components/IconTitle'
	export default {
		name: 'flowassitancemanagement',
		components: {
			IconTitle
		},
		computed: {
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
	#flow-assitance-management{
		padding: 20px;
		background: #FFFFFF;
		.content{
			flex-direction: column;
			font-size: 14px;
		}
		.btn{
			width: 100px;
		}
	}
</style>

