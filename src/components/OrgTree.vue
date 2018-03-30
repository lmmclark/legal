<template>
  <div class="orgtreemodel">
    <Modal :value="value" @on-visible-change='visibleChange' width="822" :transfer='transfer'
      class-name='allot vertical-center-modal orgtreemodel'>
      <p slot="header" style="color:#396dd6;">
        <span>{{title}}</span>
      </p>
        <div class="inline">
          <Input v-model="searchOrg" placeholder="搜索" style="width: 260px" @on-enter='searchOrgIpt'>
          <Button slot="append" icon="search" @click='searchOrgIpt'></Button>
          </Input>
          <div style="height:242px;overflow-y: scroll;overflow-x: hidden;margin-top:10px;">
            <Tree :data="showedTreeData" ref="orgtree" :render="renderContent" class="orgtree" :class="treelevel"></Tree>
          </div>
        </div>
        <div class="inline" style="float:right;">
          <p>选择结果</p>
          <Table ref="currentTreeTable" :columns="columnstree" width="510" :data="orgtreeData"></Table>
        </div>
      <div slot="footer">
        <Button type="primary" class="green" @click="ok">确定</Button>
        <Button type="ghost" @click='cancel'>取消</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
  import { generateTree } from "../utils/tree.js";
  import { ObjArrayDistinct, permissionBaseUrl } from "../utils";
  import LgTreeIcon from "./LgTreeIcon";
  /*
   * 接受参数
   * 	title: modal head的title
   * 	v-model:控制组件的显示隐藏
   * 	type:  all全部 显示全部机构和人员，全部可以移动到右侧
   * 		   org机构 显示全部机构，不显示人员，机构可以移动到右侧
   * 		   psm人员 显示全部机构和人员，人员可以移动到右侧
   *    only: 是否开启单选模式
   * 	transfer: modal transfer
   * 抛出事件两个:
   * 	ok:点击确定时传出,传出选择结果数组
   * 	cancel:点击取消时传出，无参数
   */
  export default {
    name: "OrgTree",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: "all"
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
    computed: {
      showedTreeData() {
        let orgData = this.orgTree;
        if(this.type === "org") {
          return this.orgtreeDataFilter(orgData);
        } else {
          return orgData;
        }
      }
    },
    data() {
      return {
        orgTree: [],
        orgtreeData: [],
        rightChoosenList: [],
        leftSelectedList: [],
        searchOrg: "",
        treelevel: "",
        columnstree: [
          {
            title: "名称",
            key: "orgName",
            align: "center",
            width: 140
          },
          {
            title: "类型",
            key: "orgType",
            align: "center",
            width: 140,
            render: (h, params) => {
            	let orgTypeText;
							switch (params.row.orgType) {
                    case 'root':
                        orgTypeText = '集团';
                        break;
                    case '.plate':
                        orgTypeText = '公司';
                        break;
                    case '.dpt':
                        orgTypeText = '部门';
                        break;
                    case '.org"':
                        orgTypeText = '组织';
                        break;
                    case '.psm':
                        orgTypeText = '人员';
                        break;
                    default:
                        orgTypeText = '机构';
                        break;
                }
							return orgTypeText
						}
          }
        ]
      };
    },
    mounted() {},
    created() {
      this.orgtree();
    },
    methods: {
      // 生成结构树
      orgtree() {
      	
        let that = this;
        that.orgtreeData = [];
        this.$http
          .request({
            method: "get",
            url: permissionBaseUrl + "/shareOrgTree/1"
          })
          .then(function(res) {
            let data;
            data = res.data.content.shareOrgTree;	
            that.orgTempData = res.data.content;
            that.treelevel = "treelev" + data[0].orgLevel;
            let info = generateTree(data);
            that.orgTree = info;
          })
          .catch(function(err) {
            console.log(err);
          });
      },
      orgtreeDataFilter(arr) {
        let re = [];
        re = arr.filter(item => {
          if(item.orgType === ".psm") {
            return false;
          } else {
            return true;
          }
        });
        re = re.map(item => {
          if(item.children && item.children.length) {
            return {
              ...item,
              children: this.orgtreeDataFilter(item.children)
            };
          } else {
            return item;
          }
        });
        return re;
      },
      // 添加到右侧
      toRight() {
        if(this.only) {
          // 因为单选，先清空
          this.orgtreeData = [];
        }
        let leftChoosenData = this.leftSelectedList;
        if(this.type === "psm") {
          leftChoosenData = leftChoosenData.filter(item => {
            if(item.orgType === ".psm") {
              return true;
            } else {
              return false;
            }
          });
        }
        let data = this.orgtreeData.concat(leftChoosenData);
        this.orgtreeData = ObjArrayDistinct(data, "id");
      },
      toLeft() {
        let to = this.orgtreeData,
          right = this.rightChoosenList;
        for(let item of right) {
          for(let i = 0; i < to.length; i++) {
            if(item.id === to[i].id) {
              to.splice(i, 1);
              break;
            }
          }
        }
      },
      chooseRightData(e) {
        this.rightChoosenList = e;
      },
      // ok
      ok() {
        this.$emit("ok", this.orgtreeData);
        this.$emit("input", false);
      },
      cancel() {
      	this.orgtreeData = [];
      	let nodeList = document.getElementsByClassName('activeNode');
        nodeList = Array.prototype.slice.apply(nodeList);
        nodeList.forEach((item) => {
          item.classList.remove('highLight');
        })
        //this.$emit("cancel");
        this.$emit("input", false);
      },
      visibleChange(e) {
        this.$emit("input", e);
      },
      searchOrgIpt() {
        let that = this;
        let CompyOrgName = this.searchOrg;
        this.$http
          .request({
            method: "get",
            url: permissionBaseUrl + "/shareOrg/findCompyInfo/" +
              CompyOrgName
          })
          .then(function(res) {
            let data;
            data = res.data.content;
            let code = res.data.code;
            if(code != 0) {
              let treeid = data[0].id;
              that.$http
                .request({
                  method: "get",
                  url: permissionBaseUrl + "/shareOrgTree/" +
                    treeid
                })
                .then(function(res) {
                  let cont;
                  cont = res.data.content;
                  let treedata = [];
                  
                  for (let i=0;i<cont.length;i++){
										if(cont[i].disFlag==0){
											treedata.push(cont[i]);
										}
									}
									
									let level = treedata[0].orgLevel;
									for(let k = 0; k < level; k++){
										for(let m = 0; m < that.orgTempData.length; m++){
											if(treedata[0].orgParentId ==that.orgTempData[m].id){
												treedata.unshift(that.orgTempData[m])
											}
										}								
									}
									that.searchTree = treedata;
									let orgpid = treedata[0].orgParentId;
									let isOpen = true;
	                let info = generateTree(treedata,orgpid,isOpen);
	                that.orgTree = info;
                  
                  
                  
                })
                .catch(function(err) {
                  console.log(err);
                });
            } else {
            	that.$Message.destroy();
              that.$Message.error("未查找到数据!");
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      },
      renderContent(h, { root, node, data }) {
        let str = "";
        if(data.orgType == ".plate") {
          str = "department";
        } else if(data.orgType == ".psm") {
          str = "person";
        } else if(data.type == "root") {
          str = "root";
        } else {
          str = "company";
        }

        return h(
          "span", {
            style: {
              display: "inline-block"
            }
          }, [
            h(
              "span", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }
              }, [
                h(LgTreeIcon, {
                  props: {
                    type: str
                  }
                }),
                h(
                  "div", {
                    style: {
                      marginTop: "6px",
                      cursor: "pointer"
                    },
                    class: ['activeNode'],
                    on: {
                      click: e => {
		                      this.selectTreeItem(data);
		                      let nodeList = document.getElementsByClassName(
		                        'activeNode');
		                      nodeList = Array.prototype.slice.apply(nodeList);
		                      nodeList.forEach((item) => {
		                        item.classList.remove('highLight');
		                      })
		                      e.target.classList.toggle('highLight');
                        
                        
                      }
                    }
                  },
                  data.title
                )
              ]
            )
          ]
        );
      },
      selectTreeItem(item) {
        if(this.only) {
          //	单选
          this.leftSelectedList = [];
          this.leftSelectedList.push(item);
          this.toRight();
        } else {
          // 多选逻辑
          let list = this.leftSelectedList;
          let index = list.indexOf(item);
          if(index !== -1) {
            list.splice(index, 1);
          } else {
            list.push(item);
          }
        }
      }
    }
  };
</script>

<style lang="less">
  @import url("../less/tree.less");
  .orgtreemodel {
    .ivu-modal {
    	.ivu-modal-content{
    	height:418px;	
    	}
      .ivu-modal-body {
        .inline {
          float: left;
          display: inline;
          table{
          	width:509px !important;
          	height:48px;
          }
          .arrow {
            display: block;
            margin-left: 10px;
            margin-bottom: 10px;
            margin-right: 10px;
          }
          p {
            text-align: center;
            margin-bottom: 10px;
          }
          .arrow-l {
            background: url(../assets/icons.png) no-repeat;
            background-position: -48px -250px;
            width: 40px;
            height: 32px;
          }
          .arrow-r {
            background: url(../assets/icons.png) no-repeat;
            background-position: -2px -250px;
            width: 40px;
            height: 32px;
          }
        }
      }
    }
    .highLight {
      color: blue;
    }
    .ivu-input-group-append{
	    background: #ff9000 !important;
	    border: none;
		}
  }
</style>