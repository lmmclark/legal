<template>
    <div class="mycontainer">
        <Layout>
            <Header class="flex">
                <span><Icon type="home"></Icon>&nbsp;&nbsp;机构人员管理</span>
                <span>
                	<router-link class='link' to="/main"><Icon type="close-round"></Icon></router-link>
                </span>
            </Header>
            <Layout>
                <Sider style="padding:10px;background: #fff;">
                    <Input v-model="searchOrg" placeholder="搜索" style="width: 260px" @on-enter='searchOrgIpt'>
                    <Button slot="append" icon="search" @click='searchOrgIpt'></Button>
                    </Input>
                    <Tree :data="leftTree" ref="tree" :render="renderContent"  class="orgtree"></Tree>
                </Sider>
                <Content>
                	
                	
                    <div class="banner">
                        <Button type="text" icon="person-add" disabled>新建</Button>
                        <Button type="text" icon="compose" disabled>编辑</Button>
                        <Button type="text" icon="arrow-swap" disabled>排序</Button>
                        <Button type="text" icon="android-share" disabled>移动</Button>
                        <Button type="text" icon="locked" disabled>授权</Button>
                        <Dropdown style="margin-left: 20px">
                            <a href="javascript:void(0)">
                                <Icon type="more"></Icon>更多操作
                            </a>
                            <DropdownMenu slot="list">
                            	<DropdownItem>
                                    <Button type="text" icon="person-add" @click="showNewRole" :disabled="authDisabled">权限分配</Button>
                                </DropdownItem>
                                <DropdownItem>
                                    <Button type="text" icon="unlocked" :disabled="openDisabled" @click="openOrg">启用</Button>
                                </DropdownItem>
                                <DropdownItem>
                                    <Button type="text" icon="locked" :disabled="closeDisabled" @click="closeOrg">禁用</Button>
                                </DropdownItem>
                                <DropdownItem>
                                	<Button type="text" icon="trash-a" disabled>删除</Button>
                                </DropdownItem>
                                <DropdownItem>
                                	<Button type="text" icon="settings" disabled>重置密码</Button>
                                </DropdownItem>
                                <DropdownItem>
                                	<Button type="text" icon="person" disabled>重置密码</Button>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Input v-model="searchTable" placeholder="搜索" style="width: 260px" @on-enter='searchTableIpt'>
                        <Button slot="append" icon="search" @click='searchTableIpt'></Button>
                        </Input>
                    </div>
                    <div class="content">
                        <Table highlight-row :columns="selcolumns" :data="personData" no-data-text="暂无数据" @on-row-click="selectrow"></Table>
                        <div class="page">
                            	<Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-elevator show-total></Page>
                        </div>
                    </div>
                    <Modal v-model="modalNew" width="600" class-name="new vertical-center-modal">
                        <p slot="header">
                            <span>&nbsp;权限分配</span>
                        </p>
                        <div>
                            <Tree :data="baseData" ref='shareFunTree' show-checkbox multiple empty-text="暂无数据" @on-check-change="showauthority"></Tree>
                            <Table :columns="authcolumns" :data="authData"></Table>

                        </div>
                        <div slot="footer" class='modalNew'>
                            <Row type="flex" align="middle" justify="center">
                                <Col span="6">
                                <Button type="primary" class="green" @click="ok">确定</Button>
                                <Button type="ghost" @click = "cancel">取消</Button>
                                </Col>
                            </Row>
                        </div>
                    </Modal>

                </Content>
            </Layout>
            <Footer>
                <Checkbox value="1" @on-change="forbidorg" v-model="forbidorgCheckbox">
                    <span>显示已禁用的组织</span>
                </Checkbox>
                <Checkbox value="2" @on-change="nextorg" v-model="nextorgCheckbox" :disabled="checkboxdisable">
                    <span>显示所有下级组织</span>
                </Checkbox>
                <Checkbox value="3" @on-change="major">
                    <span>只显示人员主岗</span>
                </Checkbox>
                <span class="select">显示的组织类型</span>
                <Select v-model="orgTypemodel" style="width:200px" placement="top" @on-change="checkChange">
                    <Option v-for="item in orgType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Footer>
        </Layout>
    </div>
</template>

<script>
    import router from '../../router'
	import { permissionBaseUrl } from "../../utils";
    import OrgTypeImg from '../../components/OrgTypeImg'
    import LgTreeIcon from '../../components/LgTreeIcon'
    import { generateTree } from '../../utils/tree.js'
    export default {
        name: 'personmanage',
        components: {
            OrgTypeImg,
            LgTreeIcon
        },
        data() {
            return {
                leftTree: [ {} ],
                moveTree: [ {} ],
                ajaxHistoryData: [],
                tempData: [],
                dataCount: 0,
                pageSize: 10,
                userCode: '',
                orgTypemodel: '',
                searchOrg: '',
                nextorgCheckbox: '',
                forbidorgCheckbox:false,
                modalNew: false,
                baseData: [],
                selcolumns:[ {} ],
                orgTypeState:'',
                openDisabled:true,
                closeDisabled:true,
                checkboxdisable:true,
                openid:'',
                closeid:'',
                total:"",
                personcolumns: [ {
                        type: 'index',
                        title: '序号',
                        align: 'center',
                        width: 60,
                        key: 'id',
                    },
                    {
                        title: '类型',
                        align: 'center',
                        width: 60,
                        key: 'userType',
                        render: ( h, params ) => {
                            let i = require( "../../assets/mechanism.png" );
                            let j = require( "../../assets/department.png" );
                            if ( params.row.userType == 1 ) {
                                return h( OrgTypeImg, {
                                    props: {
                                        'src': j
                                    }
                                } );
                            } else {
                                return h( OrgTypeImg, {
                                    props: {
                                        'src': i
                                    }
                                } );
                            }
                        }
                    },
                    {
                        title: '名称',
                        align: 'center',
                        width: 79,
                        key: 'creator',
                        render: ( h, params ) => {
                            return params.row.shareOrg.orgName;
                        }
                    },
                    {
                        title: '编码',
                        align: 'center',
                        width: 80,
                        key: 'userCode',
                        render: ( h, params ) => {
                            return params.row.shareOrg.orgCode;
                        }
                    },
                    {
                        title: '性别',
                        align: 'center',
                        width: 60,
                        key: 'userSex',
                        render: ( h, params ) => {
                            if ( params.row.userType == 1 ) {
                                if ( params.row.userSex == 0 ) {
                                    return '男';
                                } else {
                                    return '女';
                                }
                            } else {
                                return '--';
                            }

                        }
                    },
                    {
                        title: '身份证号',
                        align: 'center',
                        width: 140,
                        key: 'userIdCard',
                        render: ( h, params ) => {
                            if ( params.row.userType == 1 ) {
                                return params.row.userIdCard;
                            } else {
                                return '--';
                            }
                        }
                    },
                    {
                        title: '机构全路径',
                        align: 'left',
                        key: 'orgFullName',
                        render: ( h, params ) => {
                            return params.row.shareOrg.orgFullName;
                        }
                    },
                    {
                        title: '机构',
                        align: 'center',
                        width: 80,
                        key: 'agency',
                        render: ( h, params ) => {
                            let name = params.row.shareOrg.agency;
                            return name;
                        }
                    },
                    {
                        title: '部门',
                        align: 'center',
                        width: 80,
                        key: 'orgName',
                        render: ( h, params ) => {
                            return params.row.shareOrg.orgMainPost;
                        }
                    },
                    {
                        title: '岗位',
                        align: 'center',
                        width: 80,
                        key: 'mainPost'

                    },
                    {
                        title: '副岗',
                        align: 'center',
                        width: 80,
                        key: 'orgSecondary',
                        render: ( h, params ) => {
                            return params.row.shareOrg.orgSecondary;
                        }

                    }
                ],
                orgcolumns: [ {
                        type: 'index',
                        title: '序号',
                        align: 'center',
                        width: 60,
                        key: 'id',
                    },
                    {
                        title: '类型',
                        align: 'center',
                        width: 60,
                        key: 'userType',
                        render: ( h, params ) => {
                            let i = require( "../../assets/mechanism.png" );
                            let j = require( "../../assets/department.png" );
                            if ( params.row.orgType == ".psm" ) {
                                return h( OrgTypeImg, {
                                    props: {
                                        'src': j
                                    }
                                } );
                            } else {
                                return h( OrgTypeImg, {
                                    props: {
                                        'src': i
                                    }
                                } );
                            }
                        }
                    },
                    {
                        title: '名称',
                        align: 'center',
                        width: 79,
                        key: 'creator',
                        render: ( h, params ) => {
                            return params.row.orgName;
                        }
                    },
                    {
                        title: '编码',
                        align: 'center',
                        width: 80,
                        key: 'userCode',
                        render: ( h, params ) => {
                            return params.row.orgCode;
                        }
                    },
                    {
                        title: '性别',
                        align: 'center',
                        width: 60,
                        key: 'userSex',
                        render: ( h, params ) => {
                            if ( params.row.orgType == ".psm" ) {
                                if ( params.row.userSex == 0 ) {
                                    return '男';
                                } else {
                                    return '女';
                                }
                            } else {
                                return '--';
                            }

                        }
                    },
                    {
                        title: '身份证号',
                        align: 'center',
                        width: 140,
                        key: 'userIdCard',
                        render: ( h, params ) => {
                            if ( params.row.orgType == ".psm" ) {
                                return params.row.userIdCard;
                            } else {
                                return '--';
                            }
                        }
                    },
                    {
                        title: '机构全路径',
                        align: 'left',
                        key: 'orgFullName',
                        render: ( h, params ) => {
                            return params.row.orgFullName;
                        }
                    },
                    {
                        title: '机构',
                        align: 'center',
                        width: 80,
                        key: 'agency',
                        render: ( h, params ) => {
                            let name = params.row.agency;
                            return name;
                        }
                    },
                    {
                        title: '部门',
                        align: 'center',
                        width: 80,
                        key: 'orgMainPost',
                        render: ( h, params ) => {
                            if ( params.row.orgType == ".psm" ) {
                                return params.row.orgMainPost;
                            } else {
                                return '--';
                            }
                        }
                    },
                    {
                        title: '岗位',
                        align: 'center',
                        width: 80,
                        key: 'mainPost',
						render: ( h, params ) => {
                            if ( params.row.orgType == ".psm" ) {
                                return params.row.mainPost;
                            } else {
                                return '--';
                            }
                        }
                    },
                    {
                        title: '副岗',
                        align: 'center',
                        width: 80,
                        key: 'orgSecondary',
                        render: ( h, params ) => {
                            if ( params.row.orgType == ".psm" ) {
                                return params.row.orgSecondary;
                            } else {
                                return '--';
                            }
                        }

                    }
                ],
                personData: [],
                authcolumns: [ {
                        title: '角色',
                        align: 'center',
                        width: 160,
                        key: 'roleName',
                    },
                    {
                        title: '权限分配列表',
                        align: 'center',
                        width: 415,
                        key: 'permisName',
                        render:(h,params)=>{
							let permisName = [];
							
							for(let i=0;i<params.row.sharePermissions.length;i++){
								permisName.push(params.row.sharePermissions[i].permisName+'    ');
							}
							return permisName;
                    	}
                    }
                ],
                authorityData: [],
                authid: "",
                authDisabled: true,
                orgType: [ {
                        value: '1',
                        label: '用户'
                    },
                    {
                        value: '2',
                        label: '机构'
                    }
                ],
                searchTable:'',
                authData:[]
                
			}
		},
		mounted(){
		},
		created:function(){
		    this.getTree();
		    this.selcolumns = this.personcolumns;
		},
        methods: {
        	openOrg(){
        		let openid;
        		openid = this.openid;
        		let that = this;
                this.$http.request( {
                    method: 'post',
                    url:permissionBaseUrl+'/shareOrg/OpenOrg/'+openid,
                } )
                .then( function ( res ) {
                	that.$Message.success('启用成功!'); 
                	that.getTree();
                	that.forbidorgCheckbox=false;
                	that.forbidorg();
                	that.personData = [];
                    that.dataCount = 1;
                } )
                .catch( function ( err ) {
                    console.log( err )
                } )
        	},
        	closeOrg(){
        		let closeid;
        		closeid = this.closeid;
        		let that = this;
                this.$http.request( {
                    method: 'post',
                    url:permissionBaseUrl+'/shareOrg/DisabledOrg/'+closeid,
                } )
                .then( function ( res ) {
                	that.$Message.success('禁用成功!'); 
                	that.getTree();
                	that.forbidorgCheckbox=false;
                	that.forbidorg();
                	that.personData = [];
                    that.dataCount = 1;
                } )
                .catch( function ( err ) {
                    console.log( err )
                } )
        	},
            major( data ) {
                if ( data == true ) {
                	this.selcolumns.splice( this.selcolumns.length - 1, 1 );	
                } else {
                	if(this.orgTypeState == "1"){
                		this.selcolumns.push( {
	                        title: '副岗',
	                        align: 'center',
	                        width: 80,
	                        key: 'orgSecondary',
	                        render: ( h, params ) => {
	                            return params.row.shareOrg.orgSecondary;
	                        }
	                    } )	
                	}else{
                		
                		this.selcolumns.push( {
	                        title: '副岗',
	                        align: 'center',
	                        width: 80,
	                        key: 'orgSecondary',
	                        render: ( h, params ) => {
	                            if ( params.row.orgType == ".psm" ) {
	                                return params.row.orgSecondary;
	                            } else {
	                                return '--';
	                            }
	                        }
	                    } )	
	                    
                	}
                    
                }
            },
            forbidorg( cont ) {
                let that = this;
                let data;
                data = that.disableTree;
                let orgpid = data[ 0 ].orgParentId;
                let isDisable; 
                if ( cont == true ) {
                	for(let i=0;i<data.length;i++){
                		if(data[i].disFlag == 1&& data[i].orgLevel==4){
                			isDisable = 1;	
                		}
                	}
                	
                	let isOpen;
                	isOpen = false;
                    let info = generateTree( data, orgpid ,isOpen,isDisable );
                    that.searchTree = data;
                    that.leftTree = info;
                } else {
                	
                    let treedata = [];
                    for ( let i = 0; i < data.length; i++ ) {
                        if ( data[ i ].disFlag == 0 ) {
                            treedata.push( data[ i ] );
                        }
                    }
                    for (let j = 0;j < treedata.length; j++){
                    	for ( let k = 0; k < treedata.length; k++ ) {
	                        if ( j != k ) {
	                            treedata[ j ].children = "";
	                        }
	                    }	
                    }
                    
                    that.searchTree = treedata;
                    let dinfo = generateTree( treedata, orgpid );
                    that.leftTree = dinfo;
                }
            },
            nextorg( data ) {
            	let that = this;
                if(data==true){
                	
                	this.$http.request( {
                        method: 'get',
                        url:permissionBaseUrl+'/shareOrgTree/' + this.selid,
                    } )
                    .then( function ( res ) {
                        if ( res.data.code == 0 ) {
                            that.personData = [];
                            that.dataCount = 1;
                        } else {
                        	
						
                        let shareOrgTree = res.data.content.shareOrgTree;
                        let userinfo = res.data.content.userinfo;
                        let length = shareOrgTree.length;
                        that.ajaxHistoryData = shareOrgTree;
                        for ( let i = 0; i < length; i++ ) {
                            for ( let j = 0; j < userinfo.length; j++ ) {
                            	that.ajaxHistoryData[i].remark = shareOrgTree[ i ].orgName;
                                if ( shareOrgTree[ i ].id == userinfo[ j ].userInfo.content[0].shareOrg.id ) {
                                	that.ajaxHistoryData[i].userSex = userinfo[ j ].userInfo.content[0].userSex;
                                	that.ajaxHistoryData[i].userIdCard = userinfo[ j ].userInfo.content[0].userIdCard;
                                	that.ajaxHistoryData[i].mainPost = userinfo[ j ].userInfo.content[0].mainPost;
                                }
                            }
                        }
                        
                        that.dataCount = length;
                        if ( length < that.pageSize ) {
                            that.personData = that.ajaxHistoryData;
                        } else {
                            that.personData = that.ajaxHistoryData.slice( 0, that.pageSize );
                        }
                        that.tempData = shareOrgTree;
                        that.sortDisabled = false;
                    
                        	
                        	
                        }
                       
						
                    } )
                    .catch( function ( err ) {
                        console.log( err )
                    } )
                }else{
                	that.personData = that.selectData;
                	that.tempData = that.selectData;
                }
            },
            nextorgsearch( datatrue,data ) {
            	
            	if(typeof(data.shareOrg) != "undefined"){
            		this.searchid = data.shareOrg.id;	
            	}else{
            		this.searchid = data.id;
            	}
            	
                let that = this;
                let cont;
                cont = that.searchTree;
                let orgpid = cont[ 0 ].orgParentId;
                if ( datatrue == true ) {
                    let isOpen = true;
                    let info = generateTree( cont, orgpid, isOpen );
                    that.leftTree = info;
                } 
            },
            checkChange( orgType ) {
                let that = this;
                let cont;
                cont = that.tempData;
                let length = that.tempData.length;
                that.ajaxHistoryData = that.tempData;
                let newdata = [];
                if(this.orgTypeState=="1"){
                	for ( let j = 0; j < length; j++ ) {
	                    if ( cont[ j ].userType == that.orgTypemodel ) {
	                        newdata.push( cont[ j ] );
	                    }
	                }	
                }else{
                	for ( let j = 0; j < length; j++ ) {
                		if(that.orgTypemodel=="1"){
                			if ( cont[ j ].orgType == ".psm" ) {
	                        	newdata.push( cont[ j ] );
	                    	}		
                		}else{
                			if ( cont[ j ].orgType != ".psm" ) {
	                        	newdata.push( cont[ j ] );
	                    	}	
                		}
	                    
	                }	
                }
                
                that.dataCount = newdata.length;
                if ( newdata.length < that.pageSize ) {
                    that.ajaxHistoryData = newdata;
                    that.personData = that.ajaxHistoryData;
                } else {
                    that.ajaxHistoryData = newdata;
                    that.personData = that.ajaxHistoryData.slice( 0, that.pageSize );
                }
            },
            changepage( index ) {
                let that = this;
                let _start = ( index - 1 ) * that.pageSize;
                let _end = index * that.pageSize;
                that.personData = that.ajaxHistoryData.slice( _start, _end );
            },
            getSelectedDatas: function ( id ) {
                
                let that = this;
                that.authDisabled = true;
                that.orgTypemodel = "";
                this.$http.request( {
                        method: 'get',
                        url:permissionBaseUrl+"/shareOrg/find/" + id,
                    } )
                    .then( function ( res ) {
                        
						that.ajaxHistoryData = res.data.content[1][0].userInfo.content;
						let length = res.data.content[1][0].userInfo.content.length;
						that.dataCount = length;
	                    that.personData = that.ajaxHistoryData;
	                    that.tempData = res.data.content[1][0].userInfo.content;
	                    that.sortDisabled = false;
                    } )
                    .catch( function ( err ) {
                        console.log( err )
                    } )
            },
            getAllSelectedDatas: function ( id ) {
            	let that = this;
                that.authDisabled = true;
                that.orgTypemodel = "";
                this.$http.request( {
                    method: 'get',
                    url:permissionBaseUrl+"/shareOrg/find/" + id,
                } )
                .then( function ( res ) {
                	
					that.ajaxHistoryData = res.data.content[0];
					let length = res.data.content[0].length;
					that.dataCount = length;
                    that.personData = that.ajaxHistoryData;
                    that.selectData = res.data.content[0];
                    that.tempData = res.data.content[0];
                    that.sortDisabled = false;


                } )
                .catch( function ( err ) {
                    console.log( err )
                } )
            },
            
			getTree(){
                let that = this;
            	this.$http.request({
					method: 'get',
					url: permissionBaseUrl+'/shareOrgTree/1',
				}).then(function(res) {
					let data;
					data= res.data.content.shareOrgTree;
					that.disableTree = res.data.content.shareOrgTree;
					that.orgTempData = res.data.content.shareOrgTree;
					let orgpid = data[0].orgParentId;
					let treedata = [];
					for (let i=0;i<data.length;i++){
						if(data[i].disFlag==0){
							treedata.push(data[i]);
						}
					}
					that.searchTree = treedata;
	                let info = generateTree(treedata,orgpid);
	                that.leftTree = info;
				}).catch(function(err) {
					console.log(err)
				})   
                
            },
            showNewRole() { 
                this.modalNew = true;
                this.genTree();
            },
            searchOrgIpt(){
            	let that = this;
            	that.nextorgCheckbox = false;
            	let CompyOrgName = this.searchOrg;

				if(CompyOrgName!=""){
					that.$http.request({
						method: 'get',
						url: permissionBaseUrl+"/shareOrg/findCompyInfo/"+CompyOrgName,
					}).then(function(res) {
						if(res.data.code!=0){
							let cont;
							cont= res.data.content;
							let userinfo = cont[1];
	                      	let userlength = userinfo.length;
	                        if(userlength!=0){
	                        	that.selcolumns = that.personcolumns;
	                        	that.ajaxHistoryData = userinfo[0].userInfo.content;
	                        	let length = userinfo[0].userInfo.content.length;
	                        }else{
	                        	that.selcolumns = that.orgcolumns;	
	                        	that.ajaxHistoryData = cont[0];
	                        	let length = cont[0].length;
	                        }
	                        
	                        
	                        that.dataCount = length;
	                        if ( length < that.pageSize ) {
	                            that.personData = that.ajaxHistoryData;
	                        } else {
	                            that.personData = that.ajaxHistoryData.slice( 0, that.pageSize );
	                        }
	                        
	                      	that.tempData = that.personData;
	                      	that.sortDisabled = false;	
						}else{
							that.$Message.destroy();
							that.$Message.error('未查找到数据!');	
						}
						
					}).catch(function(err) {
						console.log(err)
					})		
				}else{
					that.$Message.destroy();
					that.$Message.error('未查找到数据!');		
				}
					
           },
           searchTableIpt(){
           		let that = this;
           		let Name = this.searchTable;
           		let TableData = [];
           		if(that.ajaxHistoryData!=""&&Name!=""){
           			for(let i=0;i<that.ajaxHistoryData.length;i++){
           				if(that.ajaxHistoryData[i].remark!=null){
           					if(that.ajaxHistoryData[i].remark.indexOf(Name)!=-1){
           						TableData.push(that.ajaxHistoryData[i]);
           					}	
           				}
           			}
           			if(TableData!=""){
           				that.personData = TableData;
           				that.dataCount = 1;
           			}else{
           				that.$Message.destroy();
						that.$Message.error('未查找到数据!');	
           			}
           			
           			
           		}else{
           			that.$Message.destroy();
					that.$Message.error('请您先选择组织机构!');
           		}
           	},
			treeTable(data){
            	let treedata = [];
            	//查找最顶层
                let len = data.length;
                for ( let j = 0; j < len; j++ ) {
                    data[ j ].title = data[ j ].roleName;
                    if ( data[ j ].roleParentId == null ) {
	                    treedata.push( {
	                        "expand": true,
	                        "title": data[ j ].roleName,
	                        "id": data[ j ].id,
	                        "checked": false,
	                        "roleName":data[ j ].roleName,
	                        "sharePermissions":data[ j ].sharePermissions
	                    } )
	                }
                }
                for ( let j = 0; j < len; j++ ) {
                    for ( let k = 0; k < this.authData.length; k++ ) {
                    	if(data[j].roleStatus==1){
                    		if ( data[ j ].id == this.authData[ k ].id ) {
	                        	data[ j ].checked = true;	
	                        }	
                    	}
                    }
                }
                //找到跟最高层id相关的子子孙孙，并给子孙添加lev
                let treedataLevs = []
                for ( let h = 0, ls = treedata.length; h < ls; h++ ) {
                    treedataLevs.push( {
                        treedataLev: sonsTree( data, treedata[ h ].id )
                    } )
                }
                for ( let p = 0, lq = treedataLevs.length; p < lq; p++ ) {
                    let treedataLev = treedataLevs[ p ].treedataLev
                    //找到最高层的lev
                    let maxLev = 1;
                    for ( let i = 0, lt = treedataLev.length; i < lt; i++ ) {
                        if ( parseInt( treedataLev[ i ].lev ) > maxLev ) {
                            maxLev = parseInt( treedataLev[ i ].lev )
                        } else {
                            maxLev = maxLev
                        }
                    }
                    //比较当前层和上一层的数据，然后做处理
                    let needLev = maxLev
                    let maxLevTree = []
                    let maxLevTreePrev = []
                    for ( let m = 0; m < maxLev; m++ ) {
                        maxLevTree = getLevArr( treedataLev, needLev )
                        maxLevTreePrev = getLevArr( treedataLev, needLev - 1 )
                        for ( let j = 0, lp = maxLevTreePrev.length; j < lp; j++ ) {
                            maxLevTreePrev[ j ].children = new Array()
                            for ( let i = 0, lm = maxLevTree; i < lm.length; i++ ) {
                                if ( maxLevTree[ i ].roleParentId == maxLevTreePrev[ j ].id ) {
                                    maxLevTreePrev[ j ].children.push( maxLevTree[ i ] )
                                }
                            }
                        }
                        needLev--
                    }
                    treedata[ p ].children = maxLevTreePrev
                }

                this.baseData = treedata;
                //找出同一级的数据
                function getLevArr( arr, lev ) {
                    let newarr = []
                    for ( let i = 0, la = arr.length; i < la; i++ ) {
                        //这里对arr 的children 做处理
                        arr.children = new Array()
                        if ( parseInt( arr[ i ].lev ) == lev ) {
                            newarr.push( arr[ i ] )
                        }
                    }
                    return newarr
                }
                //给每个数据添加一个lev
                function sonsTree( arr, id ) {
                    let temp = [],
                        lev = 0;
                    let forFn = function ( arr, id, lev ) {
                        for ( let i = 0; i < arr.length; i++ ) {
                            let item = arr[ i ];
                            if ( item.roleParentId == id ) {
                                item.lev = lev;
                                temp.push( item );
                                forFn( arr, item.id, lev + 1 );
                            }
                        }
                    };
                    forFn( arr, id, lev );
                    return temp;
                }
            },
            genTree(){
            	let that = this;
            	this.$http.request({
					method: 'get',
					url:permissionBaseUrl+'/shareOrg/shareRole/'+this.authid,
				}).then(function(res) {
					let cont = res.data.content;
					if (cont!=null){
						that.authData = cont;
					}
					that.$http.request({
					method: 'get',
						url:permissionBaseUrl+'/queryRoleTree/1',
					}).then(function(res) {
						let data = res.data.content;
						that.FirstData = data[0];
						that.orgtreeData = data;
		                that.treeTable(data);
					}).catch(function(err) {
						console.log(err)
					}) 
				}).catch(function(err) {
					console.log(err)
				}) 
				
                
           	},
           	showauthority(){
           		let that = this;
           		let authid = this.authid;
           		let data = this.$refs.shareFunTree.getCheckedNodes();
           		let newdata = [];
           		
           		
           		for(let p = 0; p < data.length; p++) { //查找父节点								
					for(let q = 0; q < this.orgtreeData.length; q++) {
						if(data[p].roleParentId == this.orgtreeData[q].id && this.orgtreeData[q].id!=1) {
							data.push(this.orgtreeData[q])
						}
					}
				}
           		
           		var hash1 = {};
				data = data.reduce(function(item, next) {
					hash1[next.id] ? '' : hash1[next.id] = true && item.push(next);
					return item
				}, []);
           		
         			
         		
           		for (let i=0;i<data.length;i++){
           			newdata.push(data[i]);	
           		}
           		
           		that.authData = newdata;   		
          	},
          	ok () {
				if(this.authData!=""){
					let authid = this.authid;
					let that = this;
					let data = that.authData;
           			let id = [];
           			for(let i=0;i<data.length;i++){
	           			id.push(data[i].id);
	           		}
	           		let idArr = {id: id};
					
					this.$http.request({
						method: 'post',
						url: permissionBaseUrl+'/create/org/role/'+authid,
						data: idArr,
						headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
						},
					}).then(function(res) {
						let cont = res.data.content;
		                that.authData = cont;
		                if(cont!=""){
		                	that.$Message.success('权限分配成功!');
							that.modalNew = false;	
		                }
					}).catch(function(err) {
						console.log(err)
					}) 
				}else{
					this.$Message.destroy();
					this.$Message.error('未选择数据!');
				}
           	},
            
           
            cancel() {
                this.modalNew = false;
            },
            selectrow( data ) {
            	if(this.orgTypeState == "1"){
            		this.authid = data.shareOrg.id;	
            		this.authDisabled = false;
            	}else if(data.orgType==".psm"){
            		this.authid = data.id;
            		this.authDisabled = false;
            	}else if(typeof(data.shareOrg) != "undefined"){
            		this.authid = data.shareOrg.id;
            		this.authDisabled = false;
            	}else{
            		this.authDisabled = true;
            	}
                let datatrue = true;
            	this.nextorgsearch(datatrue,data);
            },
            renderContent( h, { root, node, data } ) {
            	
                let str = '';
                
                
                if(data.disFlag==1){
                	if ( data.orgType == '.plate' ) {
	                    str = 'department_disable'
	                } else if ( data.orgType == '.psm' ) {
	                    str = 'person_disable'
	                } else if ( data.type == 'root' ) {
	                    str = 'root_disable';
	                } else {
	                    str = 'company_disable'
	                }
                }else if(data.id == this.searchid){
                	if ( data.orgType == '.plate' ) {
	                    str = 'department_search'
	                } else if ( data.orgType == '.psm' ) {
	                    str = 'person_search'
	                } else if ( data.type == 'root' ) {
	                    str = 'root_search';
	                } else {
	                    str = 'company_search'
	                }
                }else{
                	if ( data.orgType == '.plate' ) {
	                    str = 'department'
	                } else if ( data.orgType == '.psm' ) {
	                    str = 'person'
	                } else if ( data.type == 'root' ) {
	                    str = 'root';
	                } else {
	                    str = 'company'
	                }
                }
                
                return h( 'span', {
                    style: {
                        display: 'inline-block',
                    }
                }, [
                    h( 'span', {
                        style: {

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }, [
                        h( LgTreeIcon, {
                            props: {
                                type: str
                            }
                        } ),
                        h( 'div', {
                            style: { marginTop: '6px',cursor:'pointer' },
                            class:['activeNode'],
                            on: {
                                click: (e) => { 
                                	if( data.orgType == '.psm' ){
                                		this.personData = [];
                            			this.dataCount = 1;
                                		this.selcolumns = this.personcolumns;
                                		this.checkboxdisable = true;
                                		this.getSelectedDatas( data.id );
                                		this.orgTypeState = "1";
                                		
                                	}else{
                                		this.personData = [];
                            			this.dataCount = 1;
                                		this.selcolumns = this.orgcolumns;
                                		this.selid = data.id;
                                		this.checkboxdisable = false;
                                		this.nextorgCheckbox = false;
                                		this.getAllSelectedDatas( data.id );
                                		this.orgTypeState = "2";
                                	}
                                	if(data.disFlag=="0"){
                                		if(data.orgType == '.plate'){
                                			this.openDisabled=true;
                                			this.closeDisabled=true;		
                                		}else{
                                			this.closeid = data.id;
                                			this.openDisabled=true;
                                			this.closeDisabled=false;	
                                		}
                                	}else{
                                		if(typeof(data.disFlag) != "undefined"){
                                			this.openid = data.id;
                                			this.openDisabled=false;
                                			this.closeDisabled=true;	
                                		}
                                		
                                	}
                                	
                         		
					                
					                let classArray = ['lg-tree-icon-department_search','lg-tree-icon-person_search','lg-tree-icon-root_search','lg-tree-icon-company_search'];
					                for (let i=0;i<classArray.length;i++){
					                	let snodeList = document.getElementsByClassName(classArray[i]);
	                                    snodeList = Array.prototype.slice.apply(snodeList);
	                                	snodeList.forEach((item) => {
	                                    	item.classList.remove(classArray[i]);
	                                    	let str_before = classArray[i].split('_')[0];
	                                    	item.classList.add(str_before);
	                                	})
					                }
					                
                                	
                                	let nodeList = document.getElementsByClassName('activeNode');
                                    nodeList = Array.prototype.slice.apply(nodeList);
                                    nodeList.forEach((item) => {
                                        item.classList.remove('highLight');
                                    })
                                    e.target.classList.toggle('highLight');
                                }
                            },
                        }, data.title )
                    ] ),
                ] );
            }
        }
    }
</script>

<style lang="less">
    @import url("../../less/common.less");
    @import url("../../less/tree.less");
    .ivu-modal-header {
        padding: 9px 16px 8px 16px;
    }
    .ivu-modal-close .ivu-icon-ios-close-empty {
        top: -4px;
    }
    .ivu-modal-body {
        padding: 10px;
    }
    .vertical-center-modal {
        /*模态框垂直居中*/
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal {
            top: 0;
        }
    }
    .mycontainer {
        min-height: 500px;
        width: 100%;
        th.ivu-table-column-left{
        	text-align:center;
        }
        .ivu-layout-header {
            background-image: linear-gradient(90deg, #0e37bd, #1f0a73, #1f0a73, #0e37bd, #0e37bd);
			padding: 1px 20px 0 25px;
			font-size: 18px;
			height: 60px;
			color: #fff;
			justify-content: space-between;
			a {
				color: #FFF;
			}
        }
        .ivu-layout {
            height: 96%;
        }
        .ivu-layout-sider {
            border-right: 1px solid #CCCCCC;
        }
        .ivu-layout-footer {
            padding: 0;
            position: fixed;
            width: 100%;
            bottom: 0;
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            border-top: 1px solid #CCCCCC;
            justify-content: flex-start !important;
            span.select {
                font-size: 12px;
                margin-right: 10px;
            }
            .ivu-checkbox-group {
                display: inline;
                .ivu-checkbox-wrapper {
                    margin-right: 40px;
                }
                .ivu-checkbox-wrapper+span, .ivu-checkbox+span {
                    margin-left: 5px;
                }
            }
        }
        .ivu-layout-content {
            min-width: 1000px;
            div.banner {
                height: 48px;
                line-height: 48px;
                padding-left: 12px;
                .ivu-input-wrapper {
                    float: right;
                    margin-top: 10px;
                    margin-right: 10px;
                }
                .ivu-btn-text{
                	margin-right: 10px;
                }
            }
            div.content {
                position: relative;
                .ivu-table-wrapper {
                    border-left: none;
                    border-right: none;
                }
                div.page {
                    position: fixed;
                    bottom: 40px;
                    height: 40px;
                    width: 100%;
                    border-top: 1px solid #CCCCCC;
                    .ivu-page {
                        position: fixed;
                        right: 0px;
                        margin-top: 3px;
                        padding-right: 20px;
                    }
                }
            }
        }
        .ivu-layout-sider {
            width: 280px !important;
            max-width: 280px !important;
            flex: 0 0 280px !important;
        }
    }
    .ivu-icon-home:after {
        height: 23px;
        width: 23px;
        border: 2px solid #fff;
        content: '';
        display: block;
        position: absolute;
        top: 20px;
        left: 20px;
        border-radius: 50%;
    }
    .ivu-table-row:hover{
    	cursor:pointer;
    }
    .highLight {
        color: blue !important;
    }
   	.ivu-checkbox-disabled + span{
   		color: #000;
   	}
</style>