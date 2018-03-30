<template>
	<div class="causetreemodel">
		<Modal :value="value" @on-visible-change='visibleChange' :transfer='transfer' width="850" class-name='allot vertical-center-modal causetreemodel'>
	        <p slot="header" style="color:#396dd6;">
	            <span>选择案由</span>
	        </p>
	        <div class="inline">
	            <Input v-model="searchCause"  placeholder="搜索" style="width: 370px" @on-enter='searchIpt'>
            		<Button slot="append" icon="search" @click='searchIpt'></Button>
            	</Input>
            	<div style="height:240px;overflow: scroll;overflow-x: hidden;margin-top:10px;">
					<Tree :data="causeTree" ref="causetree" class="causetree" @on-select-change="getSelectedNodes" :render="renderContent"></Tree>
				</div>
	        </div>
	        <div class="inline" style="margin-left: 20px;">
	        	<p>详细信息</p>
	        	<table cellspacing="0px" >
	        		<tr>
	        			<td>案由名称：</td><td v-html="causename"></td>
	        		</tr>
	        		<tr>
	        			<td>案由等级：</td><td v-html="causelevel"></td>
	        		</tr>
	        		<tr>
	        			<td>状态：</td><td v-html="causestatus"></td>
	        		</tr>
	        		<tr>
	        			<td>备注：</td><td v-html="causeremark"></td>
	        		</tr>
	        	</table>
	        </div>
	        <div slot="footer">
	        	<Button type="primary" class="green" @click="okcausetree">确定</Button>
	            <Button type="ghost" @click="cancel">取消</Button>
	        </div>
	    </Modal>
	</div>
	
</template>

<script>
export default {
	name: 'CauseTree',
	props: {
      value: {
        type: Boolean,
        default: false
      },
      only: {
        type: Boolean,
        default: false
      },
      transfer: {
        type: Boolean,
        default: true
      }
    },
	data(){
		return{
			causeTree:[{}],
            answer:'',
            causename:'',
            causelevel:'',
            causestatus:'',
            causeremark:'',
            searchCause:""
		}
	},
	mounted(){
		this.causetree();
	},
	methods:{
		visibleChange(e) {
	        this.$emit("input", e);
	    },
	    cancel(){
	    	this.$emit("input", false);	
	    },
	    searchIpt(){
	    	if(this.searchCause!=""){
				let treedata = [];
                let info = this.generateTree(this.tempData);
                this.causeTree = info;		
	    	}else{
	    		this.$Message.destroy();
	    		this.$Message.error('未查找到结果!');
	    	}
	    },
		causetree(){
        	let that = this;
        	that.causename = "";
            that.causelevel = "";
            that.causestatus = "";
            that.causeremark = "";
        	this.$http.request({
				method: 'get',
				url:'/dictKind/findByDictKindCode/ay',
			}).then(function(res) {
				let data;
				data= res.data.content;
				that.tempData = res.data.content;
				let treedata = [];
                let info = that.generateTree(data);
                that.causeTree = info;
			}).catch(function(err) {
				console.log(err)
			}) 
        },
        generateTree(data){
        	let treedata = []
		    //查找最顶层
		    let len = data.length;
		   	
		    for(let j=0;j<len;j++){
		        data[j].expand = true
		        data[j].title = data[j].dictName;
		        if(data[j].parentId == 0){
		            treedata.push({
		                "expand":true,
		                "title":data[j].dictKindName,
		                "id":data[j].id
		            })
		        }
		    }
		     
		    //找到跟最高层id相关的子子孙孙，并给子孙添加lev
		    var treedataLevs =[]
		    for(let h=0,ls=treedata.length;h<ls;h++){
		        treedataLevs.push({
		            treedataLev:sonsTree(data,treedata[h].id)
		        })
		    }
		   
		    for(let p=0,lq=treedataLevs.length;p<lq;p++){
		        var treedataLev = treedataLevs[p].treedataLev
		        //找到最高层的lev
		        var maxLev = 0
		        for(let i=0,lt=treedataLev.length;i<lt;i++){
		            if(parseInt(treedataLev[i].lev) > maxLev){
		                maxLev = parseInt(treedataLev[i].lev)
		            }else{
		                maxLev = maxLev
		            }
		        }
		        //比较当前层和上一层的数据，然后做处理
		        var needLev = maxLev
		        var maxLevTree = []
		        var maxLevTreePrev = []
		        for(let m=0;m<maxLev;m++){
		            maxLevTree = getLevArr(treedataLev,needLev)
		            maxLevTreePrev = getLevArr(treedataLev,needLev-1)
		        for(var j=0,lp=maxLevTreePrev.length;j<lp;j++){
		                maxLevTreePrev[j].children = new Array()
		                for(var i=0,lm=maxLevTree;i<lm.length;i++){
		                    if(maxLevTree[i].parentId == maxLevTreePrev[j].id){
		                        maxLevTreePrev[j].children.push(maxLevTree[i])
		                    }
		                }
		            }
		            needLev--
		        }
		        treedata[p].children = maxLevTreePrev
		    }
		    
		    return treedata;
		   	
		    //找出同一级的数据
		    function getLevArr(arr,lev){
		        var newarr = []
		        for(let i=0,la=arr.length;i<la;i++){
		            //这里对arr 的children 做处理
		            arr.children = new Array()
		            if(parseInt(arr[i].lev) == lev){
		                newarr.push(arr[i])
		            }
		        }
		        return newarr
		    }
		    //给每个数据添加一个lev
		    function sonsTree(arr,id){
		        var temp = [],lev=0;
		        var forFn = function(arr, id,lev){
		            for (var i = 0; i < arr.length; i++) {
		                var item = arr[i];
		                if (item.parentId==id) {
		                    item.lev=lev;
		                    temp.push(item);
		                    forFn(arr,item.id,lev+1);
		                }
		            }
		        };
		        forFn(arr, id,lev);
		        return temp;
		    }		
        },
        okcausetree(){
        	if(this.causename!=""&&this.causename!="案由"){
        		this.$emit("ok", this.answer);
        		this.$emit("input", false);
        	}else if(this.causename=="案由"){
        		this.$Message.destroy();
        		this.$Message.error('不能选择一级!');	
        	}else{
        		this.$Message.destroy();
        		this.$Message.error('您未选择!');		
        	}
        	
        },
        getSelectedNodes(data){
        	this.answer = data;
        	let answer = this.answer;
        	if(this.answer!=""){
        		if(answer.title == "案由"){
        			this.causename = answer.title;
                	this.causelevel = answer.dictSeq;
                	if(answer.delFlag==0){
                		this.causestatus = "有效";
                	}else{
                		this.causestatus = "无效";
                	}
                	
                	this.causeremark = answer.remark;	
        		}else{
        			this.causename = answer.dictName;
                	this.causelevel = answer.dictSeq;
                	if(answer.delFlag==0){
                		this.causestatus = "有效";
                	}else{
                		this.causestatus = "无效";
                	}
                	this.causeremark = answer.remark;	
        		}
                
        	}else{
        		this.$Message.destroy();
        		this.$Message.error('您未选择!');		
        	}
        },
        renderContent(h, { root, node, data }) {
        	let str = "";
        	return h('span', {
                style: {
                    display: 'inline-block',
                    cursor:'pointer'
                },
                class: ['activeNode'],
                    	on: {
	                      	click: e => {
	                     		this.getSelectedNodes(data);
	                      		let nodeList = document.getElementsByClassName(
	                        		'activeNode');
	                      		nodeList = Array.prototype.slice.apply(nodeList);
	                      		nodeList.forEach((item) => {
	                        		item.classList.remove('highLight');
	                      		})
	                      		e.target.classList.toggle('highLight');
	                      }
	                    }
            }, data.title);
        }
	}
}
</script>

<style lang="less">
	.causetreemodel{
		.ivu-modal{
			.ivu-modal-body{
				height:300px;
				.inline{
					float:left;
					display:inline;
					.arrow:nth-of-type(1){
						margin-top: 100px;
					}
					.arrow{
						display: block;
						margin-left:10px;
						margin-bottom: 10px;
						margin-right: 10px;
					}
					p{
						text-align: center;
						margin-bottom: 10px;
					}
					
					table tr td:nth-of-type(1){
						width:100px;
						border:1px solid #ccc;
						height: 32px;
						text-align: center;
						background: #e1e6f0;
					}
					table tr td:nth-of-type(2){
						width:280px;
						border:1px solid #ccc;
						padding-left: 10px;
					}
					table tr:nth-of-type(4) td{
						border:1px solid #ccc;
						height:150px;
					}
				}	
			}
				
		}
	}
	.causetree{
		ul{
			li{
				span.activeNode{
					background: url(../assets/tree.png) no-repeat;
					background-position:-2px -73px;
					height: 24px;
					width: 10px;
					padding-left: 20px;
					line-height: 24px;
				}
				ul{
					li{
						span.activeNode{
							background: url(../assets/tree.png) no-repeat;
							background-position:-25px -73px;
							height: 24px;
							width: 10px;
							padding-left: 20px;
							line-height: 24px;
						}
					}
				}
			}
		}
	}
	.ivu-modal-close{
		top:3px;
	}
	.ivu-input-group-prepend .ivu-btn, .ivu-input-group-append .ivu-btn{
		background: #ff9000;
	}
	.highLight {
      	color: blue;
    }
    .sLight{
    	color: green;
    }
</style>