
<template>
	<div id="case-type-management">
        <IconTitle title='案件类型管理' left='-80' top='-30'></IconTitle>
        <div class="flex content">
        	<ul>
        		<li v-for="item in btnArray">
        			<div class="flex flex-end">
		        		<span class="title">
		        			{{item.dictName}}
		        		</span>
		        		<div class="type-btn-group">
		        			<div class="switch">
			        			<i-Switch size="large" v-model='item.delFlag' @on-change="change(item.id)">
							        <span slot="open">启用</span>
							        <span slot="close">禁用</span>
							    </i-Switch>
						    </div>
		        		</div>
		        		<div class="delete" @click="deleteItem(item.id)" >删除</div>
		        	</div>
        		</li>
        	</ul>
        	<div class="flex">
        		<Button type="dashed" class="btn_dashed" @click="addNewType">新增类型</Button>
        	</div>
        	<div class="flex">
		   		<Button @click="allenable" type="primary" :disabled="openDis" >全部启用</Button>
		   		<Button @click="alldisable" type="primary" :disabled="closeDis" >全部禁用</Button>
		   		<Button @click="confirm" type="primary" >确定</Button>
		   	</div>
        	
        </div>
        <Modal
	        v-model="isAddNewShow"
	        title="新增案件类型"
	        :styles="{width:'300px'}"
	        class-name='AddTypeModal'
	        :closable='false'>
	        <div class="flex content">
	        	<Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width='80'>
			        <FormItem prop="newtype" label='案件类型'>
			            <Input type="text" v-model="formInline.newtype" placeholder="请输入新的案件类型">
			            </Input>
			        </FormItem>
			    </Form>
	        </div>
	        <div slot="footer" class="flex">
            	<Button type="primary"   @click="ok">确定</Button>
            	<Button type="ghost"   @click="cancel">取消</Button>
            	
        	</div>
	        
	    </Modal>
	</div>
</template>

<script>
    import IconTitle from '../../components/IconTitle'
	export default {
		name: 'casetypemanagement',
		components: {
			IconTitle
		},
		computed: {
			openDis(){
				return this.btnArray.every((item)=>{
					return item.delFlag === true;
				})
			},
			closeDis(){
				return this.btnArray.every((item)=>{
					return item.delFlag === false;
				})
			},

		},
		created() {
      		
    	},
		data(){
			return{
				btnArray:[],
				checkArr:[],
				btnObj:[{
					dictName:'',
					delFlag:'',
					parentId:'',
					dictKindsId:'',
					dictCode:''
				}],
				changeObj:[{
					id:'',
					delFlag:'',
				}],
				allchange:[],
				isAddNewShow:false,
				formInline: {
                    newtype: '',
                },
                ruleInline: {
                    newtype: [
                        { required: true, message: '请输入您要增加的案件类型', trigger: 'blur' }
                    ]
                }
			}
		},
		mounted(){
			this.ObtainAJXL();
			let arr = []
			this.btnArray.forEach((item)=>{
				arr.push(item.delFlag)
			});
			this.checkArr = arr
		},
		methods:{
			change (id) {
				for(let i=0;i<this.btnArray.length;i++){
					if(this.btnArray[i].id==id){
						this.changeObj[0].delFlag = this.btnArray[i].delFlag;
					}
				}
				if(this.changeObj[0].delFlag==true){
					this.changeObj[0].delFlag = 0;	
				}else{
					this.changeObj[0].delFlag = 1;
				}
				this.changeObj[0].id = id;
				this.allchange = this.changeObj;
           	},
           	confirm(){
           		let that = this;
				this.$http.request( {
                    method: 'put',
                    url:"/dict-infos/",
                    data:this.allchange,
                } )
                .then( function ( res ) {
					that.$Message.success(res.data.message); 
                } )
                .catch( function ( err ) {
                    console.log( err )
                } )	
           	},
			ObtainAJXL(){
				let that = this;
				this.$http.request( {
                    method: 'get',
                    url:"/dict-infos/kind/ajlx",
                } )
                .then( function ( res ) {
                	that.btnArray = res.data.content;
					for(let i=0;i<that.btnArray.length;i++){
						if(that.btnArray[i].delFlag==0){
							that.btnArray[i].delFlag = true;
						}else{
							that.btnArray[i].delFlag = false;
						}
					}	
					that.dictKindsId = that.btnArray[0].dictKindsId;
					that.parentId = that.btnArray[0].parentId;

                } )
                .catch( function ( err ) {
                    console.log( err )
                } )
				
			},
			allenable(){
				
                
				this.btnArray.forEach((item)=>{
					item.delFlag=true;
				})
				
				
				for (let val of this.btnArray) {
					let change = {
						id: val.id,
						delFlag: 0,
					}
					this.allchange.push(change);
				}
				
			},
			alldisable(){
				this.btnArray.forEach((item)=>{
					item.delFlag=false;
				})
				
				for (let val of this.btnArray) {
					let change = {
						id: val.id,
						delFlag: 1,
					}
					this.allchange.push(change);
				}
				
			},
			deleteItem(id){
				let that = this;
				let index;
				for(let i=0;i<this.btnArray.length;i++){
					if(this.btnArray[i].id==id){
						index = i;
					}
				}
				this.$http.request( {
                    method: 'delete',
                    url:"/dict-infos/"+id,
                } )
                .then( function ( res ) {
					that.$Message.success(res.data.message); 
                } )
                .catch( function ( err ) {
                    console.log( err )
                } )
				this.btnArray.splice(index,1);
			},
			addNewType(){
                this.isAddNewShow= true;
			},
			ok(){
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        this.btnObj[0].dictName = this.formInline.newtype;
						this.btnObj[0].delFlag = 0;
						this.btnObj[0].parentId = this.parentId;
						this.btnObj[0].dictKindsId = this.dictKindsId;
						this.btnObj[0].dictCode = 'ajlx_';
						
						let bObj = {
							dictName:this.formInline.newtype,
							delFlag:true,
							parentId:this.parentIds,
							dictKindsId:this.dictKindsId,
							dictCode:this.dictCode
						}
                        
                        this.btnArray.push(bObj);
                        this.isAddNewShow= false;
                        let that = this;
						this.$http.request( {
		                    method: 'post',
		                    url:"/dict-infos",
		                    data:this.btnObj,
		                } )
		                .then( function ( res ) {
							that.$Message.success(res.data.message); 
		                } )
		                .catch( function ( err ) {
		                    console.log( err )
		                } )
						
						
                    } 
                })
	            
			},
			cancel () {
                this.isAddNewShow= false;
                this.$refs['formInline'].resetFields()
            }
		}
	}
</script>

<style lang="less">
	#case-type-management{
		padding: 20px;
		background: #FFFFFF;
		.content{
			flex-direction: column;
			margin-top: 30px;
			
			ul{
				li{
					margin-bottom: 20px;
					.flex-end{
						justify-content:flex-end;
						.title{
							font-size:18px;
							color:#1a1a1a;
						}
						.type-btn-group{
							width: 120px;
							height:32px;
							margin:0 20px 0 30px ;
						}
						.delete{
							font-size:14px;
							color:#b2b2b2;	
							cursor: pointer;
						}
					}
				}
			}
			.ivu-btn{
				width: 100px;
				margin-right: 10px;
				margin-top: 40px;
			}
		}
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
	}.AddTypeModal{
		.ivu-modal-body{
			padding: 16px 16px 2px 16px;
			.content{
				justify-content: flex-start;
			}
		}
	}
	
</style>

