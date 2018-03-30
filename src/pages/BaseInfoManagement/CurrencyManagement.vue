
<template>
	<div id="currency-management" >
		<IconTitle title='币种管理' left='-260' top='-30'></IconTitle>
		<div class="flex content">
			<div class="flex cont" v-for="(item,index) in btnArray">
				<div class="currency">{{item.dictName}}</div>
				<div class="switch">
					<i-Switch size="large" v-model='item.open'>
				        <span slot="open">启用</span>
				        <span slot="close">停用</span>
				    </i-Switch>
			    </div>
			</div>
			
		   	<div class="flex">
		   		<Button type="primary" class="btn" @click="allenable" :disabled="openDis">全部启用</Button>
		   		<Button type="primary" class="btn" @click="alldisable" :disabled="closeDis">全部禁用</Button>
		   		<Button type="primary" class="btn" @click="comfirm">确认</Button>
		   	</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters,mapActions,mapState } from 'vuex'
	import IconTitle from '../../components/IconTitle'
	export default {
		name: 'currencymanagement',
		components: {
			IconTitle
		},
		computed: {
			openDis(){
				return this.btnArray.every((item)=>{
					return item.open === true;
				})
			},
			closeDis(){
				return this.btnArray.every((item)=>{
					return item.open === false;
				})
			}
		},
		data(){
			return {
				btnArray:[]
            }  
		},
		mounted(){
			this.getBzInfo()
		},
		methods:{
			...mapActions([]),
			allenable(){
				this.btnArray.forEach((item)=>{
					item.open=true;
				})
			},
			alldisable(){
				this.btnArray.forEach((item)=>{
					item.open=false;
				})
			},
			getBzInfo(){
				this.$http.request({
			      url:'/dict-infos/kind/bz',
			      method: 'get',
			    })
			    .then(res => {
			    	console.log(res);
			    	if(res.data.code==1){
		    			let arr = []
						for (let i = 0;i<res.data.content.length;i++) {
							let obj = {...res.data.content[i],open:res.data.content[i].delFlag=='0'?true:false};
							arr.push(obj)
						}
						this.btnArray = arr 
			    	}
			    })
			    .catch(err => {
			      throw Error(err);
			    })
			},
			comfirm(){
				this.btnArray.forEach((item)=>{
					item.delFlag=item.open?'0':'1';
				})
				let params = [];
				for (let i = 0;i<this.btnArray.length;i++) {
					let {open,...obj}=this.btnArray[i]
					params.push(obj)
				}
				console.log(params)
				this.$http.request({
			      url:'/dict-infos',
			      method: 'put',
			      data:params
			    })
			    .then(res => {
			    	console.log(res);
			    	if(res.data.code==1){
			    		this.$Message.success(res.data.message)
			    	}
			    })
			    .catch(err => {
			      throw Error(err);
			    })
			}
		}
	}
</script>

<style lang="less">
	#currency-management{
		padding: 20px;
		background: #FFFFFF;
		.content{
			display: flex;
            display: -webkit-flex;
            flex-wrap: wrap;
            width:800px;
            margin: 0 auto;
			.cont{
				margin-bottom: 40px;
				width: 400px;
				width: 50%;
            	justify-content: flex-start;
            	align-items: flex-start;
				.currency{
					font-size: 18px;
					width: 120px;
					text-align:right;
					line-height: 32px;
					padding-right: 20px;
					color: #1A1A1A;
				}
				.ivu-switch{
					margin-right: 20px;
				}
			}
		}
		.btn{
			width: 100px;
			margin-right: 20px;
		}
		.switch{
			.ivu-switch{
				width: 120px;
				height: 32px;
				border-radius:4px;
				border: 1px solid #bcbec2;
				background-color:#bcbec2;
			}
			.ivu-switch:after{
				width: 60px !important;
				height: 32px !important;
				border: 1px solid #bcbec2;
				border-radius:4px;
				left:-1px;
				top:-1px;
			}
			.ivu-switch-inner{
				font-size:14px;
				top:5px;
				left:74px;	
			}
			.ivu-switch-checked span{
				color:#FFF;
				
			}
			.ivu-switch-checked{
				background-color:#396dd6;
			}
			.ivu-switch-checked .ivu-switch-inner{
				left:15px;
			}
			.ivu-switch-large.ivu-switch-checked:after{
				left: 59px;
			}	
		}
	}
</style>

