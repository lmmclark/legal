<template>
    <div id="final-trial-lawyer" class="content-container">
        <div class="flex" style="justify-content: space-between;">
            <LgBreadcrumb :path='path'></LgBreadcrumb>
            <div class="btnGroup flex">
                <!--<Button type="primary" @click="isOrgTreeShow=true">保存</Button>-->
                <Button type="primary" style="margin-left: 5px;" @click="isOrgTreeShow=true">提交</Button>
                <Button type="primary" style="margin-left: 5px;"  @click="showFlowchart">查看流程图</Button>
            </div>

        </div>
        <ApprovalHistory :data='caseInfo!=null?caseInfo.hisTask:[]'></ApprovalHistory>
        <div class="table-container">
            <CaseBaseInfo :caseInfo='caseBaseInfo'></CaseBaseInfo>
        	<OperatingInfo :operatingInfo='operatingInfo'></OperatingInfo>
            
            <div style="background: #fff;">
                <div class="final-evaluate">
                    <IconTitle title='终审评价' left='-102' top='-30'></IconTitle>
                    <Table border stripe :columns="lawyers" :data="lawyerArray" @on-selection-change='selectAll'></Table>
                </div>
                <div class="final-evaluate">
                    <IconTitle title='聘用律师相关' left='-121' top='-30'></IconTitle>
                    <Form ref="relativeForm" :model="relativeForm" :rules="relativeFormRule" :label-width='130'>
                        <div class="form-item-content flex">
                            <div class="form-item">
                                <FormItem label='聘用律师：'>
                                    <Input readonly type="text" v-model="relativeForm.lawyer" placeholder="请输入律师名称">
                                    </Input>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label='所属律所：'>
                                    <Input readonly type="text" v-model="relativeForm.lawoffice" placeholder="请输入律师所属律所">
                                    </Input>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label='计费方式：'>
                                    <RadioGroup v-model="relativeForm.feeMode">
                                        <Radio disabled label="包干计费"></Radio>
                                        <Radio disabled label="风险收费"></Radio>
                                        <Radio disabled label="按小时计费"></Radio>
                                    </RadioGroup>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label='律师费用：'>
                                    <Input disabled type="text" v-model="relativeForm.fee" placeholder="请输入律师费用">
                                    <Select v-model="currency" slot="append" style="width: 70px">
                                        <Option value="人民币">人民币</Option>
                                        <Option value="美元">美元</Option>
                                        <Option value="欧元">欧元</Option>
                                        <Option value="英镑">英镑</Option>
                                    </Select>
                                    </Input>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem  label='签订合同编号：'>
                                    <Input disabled type="text" v-model="relativeForm.contractNo" placeholder="请输入聘用律师签订合同编号">
                                    </Input>
                                </FormItem>
                            </div>
                            <!--<div style="width: 100%;padding-left: 25px;" >
                            	<OperatingInfo></OperatingInfo>
                            </div>-->
                       
                            <!--<div style="width: 100%;">
                                <FormItem  label='申请人：' :rules="{required: true, message: '请选择呈报人'}" style='width: 300px;'>
                                    <Input type="text" v-model="relativeForm.username" readonly >
                                    </Input>
                                </FormItem>
                            </div>-->
                            <div style="width: 100%;">
                                <FormItem prop="finalEvaluation" label='终审意见：' :rules="{required: true, message: '请输入申请理由'}">
                                    <Input type="textarea" :rows='4' v-model="relativeForm.finalEvaluation" placeholder="请输入终审意见">
                                    </Input>
                                </FormItem>
                            </div>

                        </div>

                    </Form>

                </div>

            </div>
        </div>

        <Modal v-model="quetoModal" title="填写报价及评价" class-name='lawyer-queto-modal'>
            <div class="flex">
                <Form ref="formInline" :model="formInline" :style="{width:'100%'}" :rules="ruleInline" :label-width="50">
                    <FormItem prop="appraisalContentEnd" label='评价'>
                        <Input type="textarea" :rows="4" v-model="formInline.appraisalContentEnd" placeholder="请输入律师终审评价">
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <div class="flex">
                    <Button type="primary" @click="confirm('formInline')">确认</Button>
                    <Button type="primary" @click="closeModal" style="margin-left: 10px;">取消</Button>
                </div>

            </div>
        </Modal>
        <!--<OrgTree title='承包人' v-model='isOrgTreeShow' type='psm' only @ok='getOrdId'></OrgTree>-->
        <FlowSubmit v-model='isOrgTreeShow' @ok='getOrdId'></FlowSubmit>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex'
    import LgBreadcrumb from '../../components/LgBreadcrumb'
    import CaseBaseInfo from '../../components/CaseBaseInfo'
    import IconTitle from '../../components/IconTitle'
    import ApprovalHistory from '../../components/ApprovalHistory'
    import OrgTree from '../../components/OrgTree'
    import { gotoFlowChart } from '../../utils'
    import OperatingInfo from '../../components/OperatingInfo'
    import FlowSubmit from '../../components/FlowSubmit'
    export default {
        name: 'finaltriallawyer',
        components: {
            LgBreadcrumb,
            CaseBaseInfo,
            IconTitle,
            ApprovalHistory,
            OrgTree,
            OperatingInfo,
            FlowSubmit
        },
        computed: {
            ...mapGetters( [
            	'userInfo'
            ] ),
            ...mapState( [] ),
            lawyerArray() {
                return this.caseInfo == null ? [] : this.caseInfo.lawyer
            },
            caseBaseInfo() {
                return this.caseInfo == null ? null : this.caseInfo.cases

            },
            operatingInfo(){
            	let obj;
            	if(this.applyInfo){
            		obj = {
	            		creator:this.userInfo.userName,
	            		createTime:this.applyInfo.createTime,
	            		externalReason:this.applyInfo.externalReason,
	            		externalReasonFirst:this.applyInfo.externalReasonFirst,
	            	}
            	}else{
            		obj = null
            	}
            	return obj
            }
        },
        data() {
            return {
                path: [
                    { 'name': '外聘律师', 'path': '/main/lawyerManage' },
                    { 'name': '终审', 'path': '' },
                ],
                lawyers: [ {
                        title: '选择',
                        width: 60,
                        align: 'center',
                        render: ( h, params ) => {
                            return h( 'div', [
                                h( 'Checkbox', {
                                    props: {
                                        value: params.row.choose,
                                        disabled: params.row.winFlag == 1 ? false : true
                                    },
                                    on: {
                                        'on-change': () => {
                                            this.caseInfo.lawyer = this.caseInfo.lawyer.map( (
                                                item, index ) => {
                                                return {
                                                    ...item,
                                                    choose: index == params.index ?
                                                        true : false
                                                }
                                            } )
                                            this.relativeForm.lawyer = this.lawyerArray[ params
                                                .index ].lawyerName
                                            this.relativeForm.lawoffice = this.lawyerArray[
                                                params.index ].lawOfficeName
                                        }
                                    }
                                } )
                            ] );
                        }
                    },
                    {
                        title: '律师姓名',
                        key: 'lawyerName',
                        align: 'center',
                        width: 70,
                    },
                    {
                        title: '所属律所',
                        key: 'lawOfficeName',
                        align: 'center',
                    },
                    {
                        title: '地区',
                        key: 'area',
                        align: 'center',
                        width: 80,
                    },
                    {
                        title: '擅长案件类型',
                        key: 'goodAtName',
                        align: 'center',
                        width: 80,
                    },
                    {
                        title: '毕业院校',
                        key: 'school',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '律师评级',
                        key: 'level',
                        align: 'center',
                        width: 70,
                        render: ( h, params ) => {
                            return '--'
                        }

                    },
                    {
                        title: '合作案件律师费总数(元)',
                        key: 'totalFee',
                        align: 'center',
                        render: ( h, params ) => {
                            return params.row.totalCost == 0 ? '--' : params.row.totalCost
                        }
                    },
                    {
                        title: '报价(元)',
                        key: 'quoteAmount',
                        align: 'center',
                        width: 90,
                        render: ( h, params ) => {
                            return params.row.quoteAmount ? params.row.quoteAmount : ''
                        }

                    },
                    {
                        title: '初审评价',
                        key: 'appraisalContent',
                        align: 'center',
                        width: 90,
                    },
                    {
                        title: '终审评价',
                        key: 'appraisalContentEnd',
                        align: 'center'
                    },

                    {
                        title: '操作',
                        key: 'address',
                        align: 'center',
                        render: ( h, params ) => {
                            return h( 'div', [
                                h( 'Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.showquetoModal( params.index )
                                        }
                                    }
                                }, '填写评价' )
                            ] );
                        }
                    },
                ],
                selectedArray: [],
                quetoModal: false,
                formInline: {
                    appraisalContentEnd: ''
                },
                ruleInline: {
                    appraisalContentEnd: [
                        { required: true, message: '请输入律师报价', trigger: 'blur' }
                    ]
                },
                chooseIndex: '',
				currency:'',
                caseInfo: null,
                relativeForm: {
                    lawyer: '',
                    lawoffice: '',
                    contractNo: '',
                    fee: '',
                    feeMode: '',
                    finalEvaluation: '',
                    username: '',
                    id: ''
                },
                relativeFormRule: {

                    feeMode: [
                        { required: true, message: '请选择计费方式', trigger: 'change' },
                    ],
                    fee: [
                        { required: true, message: '请输入正确的律师费用', trigger: 'blur', type: 'number' },
                    ],
                    contractNo: [
                        { required: true, message: '请输入律师合同编号', trigger: 'blur' },
                    ]
                },
                isOrgTreeShow: false,
                applyInfo:null

            }
        },
        mounted() {
            this.getCaseInfo( this.$route.query.id )
            this.relativeForm.username = this.userInfo.org.orgName
        },
        methods: {
            showquetoModal( index ) {
                this.quetoModal = true;
                this.chooseIndex = index
            },
            selectAll( selection ) {
                this.selectedArray = selection
            },
            confirm( name ) {
                let _this = this;
                this.$refs[ name ].validate( ( valid ) => {
                    if ( valid ) {
                        console.log( _this.lawyerArray )
                        let obj = _this.caseInfo.lawyer[ _this.chooseIndex ];
                        obj.appraisalContentEnd = _this.formInline.appraisalContentEnd
                        _this.caseInfo.lawyer.splice( _this.chooseIndex, 1, obj )

                        _this.$refs[ name ].resetFields()
                        _this.quetoModal = false;
                    }
                } )
            },
            closeModal() {

                this.quetoModal = false;
                this.$refs[ 'formInline' ].resetFields()
            },
            getCaseInfo( id ) {
                let _this = this
                this.$http.request( {
                        url: '/ecm/findExternalCounsel/' + id,
                        method: 'get',
                    } )
                    .then( res => {
                        console.log( res.data )
                        if ( res.data.code == 1 ) {
                            _this.caseInfo = res.data.content
                            _this.applyInfo = res.data.content.externalCounselManage
                        }
                    } )
                    .catch( err => {
                        throw Error( err );
                    } )
            },
            employ(id,reason) {
            	console.log(this.relativeForm)
                this.$refs[ 'relativeForm' ].validate( ( valid ) => {
                    if ( valid ) {
                        let lawyerArr = this.caseInfo.lawyer.map( ( item ) => {
                            return { ...item }
                        } );
                        let arr = [];
                        let winFlagarr=[];
                        lawyerArr.forEach( ( item, index ) => {
                            let obj = {
                                winFlag: item.choose ? 1 : 0, //check 状态
                                quoteAmount: Number( item.quoteAmount ), //报价
                                appraisalContentEnd: item.appraisalContentEnd != undefined ? item.appraisalContentEnd :
                                    '', //初审评价
                                id: Number( this.caseInfo.externalPersonnel[ index ].id )
                            }
                            winFlagarr.push(obj.winFlag)
                            arr.push( obj )
                        } )
                        winFlagarr = Array.from(new Set(winFlagarr))
                        if(winFlagarr.length==1&&winFlagarr[0] == 0){
                        	this.$Message.error('请选择一名律师')
                        	return false;
                        }
                        let params = {
                            id: Number( this.caseInfo.externalCounselManage.id ),
                            externalReasonFinalJudgment: this.relativeForm.finalEvaluation,
                            externalPersonnel: arr,
                            userId:id+'',
							taskId:this.$route.query.taskId,
							comment:reason,
                    		externalApplicantName:this.userInfo.org.orgName
							
                        }
                        let _this = this
                        this.$http.request( {
                                url: '/ecm/createFinalJudgmentExternalCounselManage',
                                method: 'post',
                                data: params
                            } )
                            .then( res => {
                                if ( res.data.code == 1 ) {
                                    _this.$Message.success(res.data.message)
                                    _this.$router.push( {
			                            name: 'personalTaskCenter',
			                            query: {
			                                tab: 'todo'
			                            }
			                        } )
                                } else {
                                    _this.$Message.error( res.data.message)

                                }
                            } )
                            .catch( err => {
                                throw Error( err );
                            } )
                    } 
                } )

            },
            getOrdId( res ) {
            	console.log(res)
            	this.employ(res.people[0].id,res.opinion)
//              this.relativeForm.id = res[ 0 ].id
//              this.relativeForm.username = res[ 0 ].orgName
            },
            showFlowchart(){
            	gotoFlowChart(this.$route.query.processInstanceId)
            }
        }
    }
</script>

<style lang="less">
    #final-trial-lawyer {
        width: 1100px;
        margin: 0 auto;
        .table-container {
            margin-top: 20px;
            .case-base-info .content {
                margin: 0;
            }
            .btnGroup {
                margin-top: 20px;
            }
        }
        .final-evaluate {
            p.all {
                margin: 20px 0;
                color: #1A1A1A;
                font-size: 14px;
                font-weight: 600;
            }
            background: #ffffff;
            padding: 10px 20px;
            margin-top: 20px;
            .form-item {
                width: 50%;
                padding-right: 150px;
            }
            .form-item-content {
                flex-wrap: wrap;
                justify-content: space-between;
                .ivu-input-group-append {
                    background-color: #eee;
                    border: 1px solid #d6d6d6;
                }
                .ivu-form-item-label {
                    font-size: 14px;
                    color: #1A1A1A;
                }
            }
        }
    }
    .lawyer-queto-modal {
        .ivu-modal {
            width: 520px !important;
        }
    }
</style>