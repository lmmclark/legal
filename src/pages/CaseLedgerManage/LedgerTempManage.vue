<template>
	<div id="LedgerTempManage" class="mycontainer">
		<IconTitle title='台账模板管理' left='-420' top='-30'></IconTitle>
		<div class="content">
			<div class="operation">
				<Button type="primary" class="btn" @click="handleCheckAll" :value="checkAll" :indeterminate="indeterminate">全选</Button>
				<Button type="primary" class="btn">添加其他</Button>
			</div>
			<div class="title">请勾选需要的台账表头</div>
			<div class="checkcont">
				<CheckboxGroup v-model="checkAllGroup">
			        <Checkbox :label="item.dictName" :key="item.id" v-for='item in tzbt'></Checkbox>
			    </CheckboxGroup>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
	import IconTitle from '../../components/IconTitle'
	export default {
		name: 'LedgerTempManage',
		components: {
			IconTitle
		},
		computed: {
			...mapState([
	        	'tzbt'
        	]),	
		},
		data(){
			return{
				indeterminate: false,
				checkAll: false,
				checkAllGroup:[]
			}
		},
		mounted(){
			if(this.tzbt.length==0||this.tzbt==null){
    			this.getTZBT();
    		};
		},
		methods:{
			...mapActions([
				'getTZBT'
			]),
			handleCheckAll () {
				if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                
                if (this.checkAll) {
                	let tzbt = [];
                	for(let i=0;i<this.tzbt.length;i++){
                		tzbt.push(this.tzbt[i].dictName);	
                	}
                    this.checkAllGroup = tzbt;
                } else {
                    this.checkAllGroup = [];
                }
            }
		}
	}
</script>

<style lang="less">
	#LedgerTempManage{
		padding: 20px;
		background: #FFFFFF;
		.content{
			font-size: 14px;
			.operation{
				float:right;
				display: block;
				
			}
			.title{
				text-align: center;
				display: block;
				padding-top: 60px;
				color: #396dd6;
				font-family: "微软雅黑";
			}
			.checkcont{
				margin-top: 20px;
					.ivu-checkbox-wrapper + span, .ivu-checkbox + span{
						margin-left: 10px;
					}
					.ivu-checkbox-wrapper{
						width:200px;
						font-size:14px;
						margin-bottom: 20px;
					}
					.ivu-checkbox-wrapper:nth-of-type(3n+1){
						margin-left: 70px;
						margin-right: 187px;
					}
					.ivu-checkbox-wrapper:nth-of-type(3n+2){
						margin-right: 187px;
					}
			}
		}
		.btn{
			width: 100px;
		}
	}
</style>

