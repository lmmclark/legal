
<template>
	<div id="exchange-rate-management">
		<IconTitle title='汇率管理' left='-260' top='-30'></IconTitle>
		<div class="flex content">
			<Table :columns="columns1" :data="data1"></Table>
			<Button type="primary" class="btn">添加提醒</Button>
		</div>
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
	import IconTitle from '../../components/IconTitle'
	export default {
		name: 'exchangeratemanagement',
		components: {
			IconTitle
		},
		computed: {
		},
		data(){
			return{
				columns1: [
                    {
                        type: 'index',
                        title: '序号',
                        align:'center',
                        width:100,
                        key: 'id'
                    },
                    {
                        title: '币种',
                        key: 'currency',
                        align:'center',
                        width:210,
                    },
                    {
                        title: '外币对人民币之汇率',
                        key: 'exchange',
                        align:'center',
                        width:210,
                    }
                ],
                data1: [
                    {
                        currency: '美元',
                        exchange: 6.5071,
                    },
                    {
                        currency: '日元',
                        exchange: 0.0583,
                    },
                    {
                        currency: '英镑',
                        exchange: 8.7703,
                    },
                    {
                        currency: '泰铢',
                        exchange: 0.2032,
                    },
                    {
                        currency: '港币',
                        exchange: 0.8317,
                    },
                    {
                        currency: '韩元',
                        exchange: 0.006078,
                    },
                    {
                        currency: '卢布',
                        exchange: 0.1142,
                    },
                    {
                        currency: '荷兰盾',
                        exchange: 3.2518,
                    }
                ]
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
	#exchange-rate-management{
		padding: 20px;
		background: #FFFFFF;
		.content{
			flex-direction: column;
			.ivu-table-wrapper{
				margin-bottom: 30px;
				.ivu-table{
					font-size: 14px;
				}
			}
		}
		.btn{
			width: 100px;
		}
	}
</style>

