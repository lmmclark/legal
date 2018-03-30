<template>
	<div  class="approval-history">
		<IconTitle title='审批历史' left='-102' top='-30'></IconTitle>
		<Table border :columns="columns" :data="data"></Table>
		
	</div>
</template>

<script>
	import IconTitle from './IconTitle'
	export default {
		name: 'approvalHistory',
		components: {
			IconTitle
		},
		computed: {
		},
		props: {
			data:{
				type:Array
			}
        },
		data(){
			return{
				columns: [
                    {
                        title: '环节',
                        key: 'taskName',
                        align:'center',
                        width:140
                    },
                    {
                        title: '办理人',
                        key: 'orgName',
                        align:'center',
                        width:150
                    },
                    {
                        title: '意见',
                        key: 'comment',
                        align:'center',
                        width:568
                    },
                    {
                        title: '办理时间',
                        key: 'taskEndTime',
                        align:'center',
                        width:200
                    },
                ],
			}
		},
		mounted(){
		},
		methods:{
		}
	}
</script>

<style lang="less">
.approval-history{
	padding: 20px;
	background: #ffffff;
}
td:nth-of-type(3).ivu-table-column-center{
	text-align: left;
}
</style>

