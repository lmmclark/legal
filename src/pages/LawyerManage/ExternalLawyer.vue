<template>
    <div id="ExternalLawyer">
        <LgBreadcrumb :path='path'>
            <div class="btnGroup flex">
                <Button type="primary" v-if='btnShow' @click="saveData">保存</Button>
                <Button type="primary" style="margin-left: 5px;" v-if='btnShow'  @click="checkForm">提交</Button>
                <Button type="primary" style="margin-left: 5px;"   @click="showFlowchart">查看流程图</Button>
            </div>
        </LgBreadcrumb>
        <div style="position: relative;">
            <div class="checkInfo"  v-if="!$route.query.id">
                <Input type="text" v-model="checkInfo" placeholder="请输入案件编号" @on-keydown="searchInfo">
                <Button slot="append" icon="ios-search" @click="searchInfo"></Button>
                </Input>
            </div>
            <CaseBaseInfo :caseInfo='caseInfo'></CaseBaseInfo>
        </div>
        <OperatingInfo :operatingInfo='operatingInfo'></OperatingInfo>
        <div class="external-employee">
            <IconTitle title='外聘律师' left='-101' top='-30'></IconTitle>
            <div class="flex checkbox-item">
                <p>案件是否涉密：</p>
                <RadioGroup v-model="classified">
                    <Radio label="不涉密"></Radio>
                    <Radio label="涉密"></Radio>
                </RadioGroup>
            </div>
            <div>
                <div class="choose-lawyer-content">
                    <div class="flex">
                        <p>选择进入评审的律师：</p>
                    </div>
                    <Button type="primary" style="margin-right: 10px;" @click="chooseLawyer" :disabled="$route.query.completeFlag==2">律师库添加</Button>
                    <Button type="primary" @click="showOutsideChoose" v-if='classified=="不涉密"' :disabled="$route.query.completeFlag==2">库外律师添加</Button>
                </div>
            </div>
            <!--不涉密显示-->
            <div class="secret-wrapper" v-if='classified=="不涉密"'>
                <Table border stripe :columns="lawyers" :data="lawyerChoosedArray" no-data-text='暂无数据'></Table>
                <Form ref="NotclassifiedForm" :model="NotclassifiedForm" :rules='NotclassifiedRules' :labelWidth='110' style="margin-top: 30px;">
                    
                    <div class="attachmentFileContainer clearfix" v-if="NotclassifiedForm.DefaultFileList&&NotclassifiedForm.DefaultFileList.length>0">
                        <span class="att-label">已上传附件：</span>
                        <span>
                        	<AttachmentList v-if="NotclassifiedForm.DefaultFileList.length>0"  :data='NotclassifiedForm.DefaultFileList' @delete='deleteClassified'></AttachmentList>
                        </span>
                    </div>
                    <FormItem label='上传附件：'>
                        
                        <Upload 
                        	:max-size='10240'
                        	:format="FileFormat"
        					:on-format-error="handleFormatError"
        					:on-exceeded-size='handleExceededSize'
                        	name="attachmentFile" 
                        	:on-progress="uploadPrgLegal" 
                        	:on-success="uploadSucLegal" 
                        	:on-remove="rmLegal" 
                        	:on-error = 'uploadError'
                            action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
                            <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="$route.query.completeFlag==2">添加文件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label='申请理由：'>
                        <Input type="textarea" placeholder="请输入申请理由" :rows='4' v-model="NotclassifiedForm.explaination">
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <!--涉密显示-->
            <div v-else class="secret-wrapper">
                <Form ref="secretForm" :model="secretForm" :rules='secretFormRules' :labelWidth='110'>
                    <Row>
                        <Col span="12">
                        <FormItem label='律师名称：'>
                            <Input type="text" readonly v-model="secretForm.lawyerName">
                            </Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label='所属律所：'>
                            <Input type="text" readonly v-model="secretForm.lawOffice">
                            </Input>
                        </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="12">
                        <FormItem label='擅长案件类型：'>
                            <Input type="text" readonly v-model="secretForm.AreasExpertiseId">
                            </Input>
                            
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label='毕业院校：'>
                            <Input type="text" readonly v-model="secretForm.School">
                            </Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <FormItem label='风控部评分：' prop='legalGrade'>
                            <Input type="text" placeholder="请输入风控部评分" v-model="secretForm.legalGrade">
                            </Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label='财务部评分：' prop='financeGrade'>
                            <Input type="text" placeholder="请输入财务部评分" v-model="secretForm.financeGrade">
                            </Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <FormItem label='业务部评分：' prop='businessGrade'>
                            <Input type="text" placeholder="请输入业务部评分" v-model="secretForm.businessGrade">
                            </Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label='最终得分：'>
                            <Input type="text" readonly v-model="finalGrade">
                            </Input>
                        </FormItem>
                        </Col>
                    </Row>
                        <div class="attachmentFileContainer clearfix" v-if="secretForm.DefaultFileList&&secretForm.DefaultFileList.length>0">
	                        <span class="att-label">已上传附件：</span>
	                        <span>
	                        	<AttachmentList v-if="secretForm.DefaultFileList.length>0"  :data='secretForm.DefaultFileList' @delete='deleteClassified'></AttachmentList>
	                        </span>
	                    </div>
                    <FormItem label='上传附件：'>
                        <Upload style='flex:1' 
                        	:max-size='10240'
                        	:format="FileFormat"
        					:on-format-error="handleFormatError"
                        	name="attachmentFile" 
                        	:on-progress="uploadPrgLegal" 
                        	:on-success="uploadSucLegal" 
                        	:on-remove="rmLegal"
                        	:on-error = 'uploadError'
                            action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
                            <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="$route.query.completeFlag==2">添加文件</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label='申请理由：'>
                        <Input type="textarea" placeholder="请输入申请理由" :rows='4' v-model="secretForm.explaination">
                        </Input>
                    </FormItem>
                </Form>
            </div>
        </div>
        <!--<div class="upload_container">
        	<div class="flex" style="justify-content: flex-start;align-items:flex-start;background: #ffffff;padding-bottom: 20px;">
        		<span style="margin-right: 10px;font-size: 14px;margin-left: 50px;margin-top: 5px;">上传附件：</span>
				<Upload style='flex:1'  name="attachmentFile" :on-progress="uploadPrgLegal" :on-success="uploadSucLegal" :on-remove="rmLegal" action="http://10.71.202.132:8658/attachmentInfo/attachmentUpload">
				    <Button type="ghost" icon="ios-cloud-upload-outline">添加文件</Button>
				</Upload>
        	</div>
        </div>-->
        <Modal class-name='chooseLawyer ' v-model="isModalShow" title="选择律师" :closable='false'>
            <div class="flex legal-transfer">
                <div class="table-container">
                    <div class="flex" style="margin-bottom:10px;">
                        <Input placeholder="请输入律师或者律所的名称" v-model="lawyerSearchTxt" @on-keydown="Searchlawyer"></Input>
                        <Button type="primary" size='small' style="margin: 0 5px;" @click="lawyerSearch">搜索</Button>
                        <Button type="primary" :disabled="true" size='small'>新增</Button>
                    </div>
                    <Table border ref="selection" :columns="columns_left" :data="allLawyers" height='250' no-data-text='暂无数据' @on-selection-change='lawyerSelect'>
                    </Table>
                </div>
                <div class="flex arrow-box">
                    <Button type="ghost" @click="toRight" :disabled="toRightDisabled"><Icon type="chevron-right"></Icon></Button>
                    <Button type="ghost" @click="toLeft" :disabled="toLeftDisabled" style="margin-top: 10px;"><Icon type="chevron-left"></Icon></Button>
                </div>
                <div class="table-container target-table-container">
                    <Table border ref="selected-selection" :columns="columns_right" height='250' @on-selection-change='RightSelect' no-data-text='暂无数据'
                        :data="tagertData">
                    </Table>
                </div>
            </div>
            <div slot="footer">
                <div class="flex">
                    <Button type="primary" @click="ok">确认</Button>
                    <Button type="ghost" @click="cancel">关闭</Button>
                </div>
            </div>
        </Modal>
        <Modal class-name='chooseLawyer lawyer-from-outside' v-model="fromOutside" title="库外添加">
            <LawyerEntryForm ref='entry' @ok="receiveFormData"></LawyerEntryForm>
            <div slot="footer">
                <div class="flex">
                    <Button type="primary" @click="submitFromOutside">确认</Button>
                    <Button type="ghost" @click="close('baseInfo')">关闭</Button>
                </div>
            </div>
        </Modal>
        <Modal v-model="secretModal" title="库内律师选择" class-name='secret-lib-modal'>
            <div class="secretFromLib">
                <IconTitle title='查询条件' left='-280' top='-30'></IconTitle>
                <Form ref="secretSearchFrom" :model="secretSearch" :labelWidth='100'>
                    <Row>
                        <Col span="8">
                        <FormItem label='律师名称：' prop='lawyerName'>
                            <Input type="text" v-model="secretSearch.lawyerName">
                            </Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label='所属律所：' prop='lawyerOffice'>
                            <Input type="text" v-model="secretSearch.lawOffice">
                            </Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label='擅长案件类型：' prop='AreasExpertiseId'>
                        	<Select v-model="secretSearch.AreasExpertiseId" placeholder="请选择案件类型">
				              <Option v-for="item in ajlx" :value="String(item.id)" :key="item.id">{{item.dictName}}</Option>
				            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label='境内外：' prop='Territory'>
                            <Select v-model="secretSearch.Territory">
                                <Option value="0">境内</Option>
                                <Option value="1">境外</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label='省市：' prop='province'>
                            <Select v-model="secretSearch.province" @on-change='provienceChange'>
                                <Option v-for='(item,index) in cityArr' :value="item.value" :key='item.index'>{{item.label}}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label='县区：' prop='region'>
                            <Select v-model="secretSearch.region">
                                <Option v-if="regionList.length>0" v-for='(item,index) in regionList' :value="item.value" :key='item.index'>{{item.label}}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label='开始时间：' prop='startTime'>
                            <DatePicker v-model="secretSearch.startTime" type="date" placeholder="请选择开始时间"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label='结束时间：' prop='Endtime'>
                            <DatePicker v-model="secretSearch.Endtime" type="date" placeholder="请选择结束时间"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <div class="flex btn_group">
                            <Button @click="searchLaywer" type="primary">查询</Button>
                            <Button type="primary" style="margin-left: 10px;" @click="resetCondition">重置</Button>
                        </div>

                        </Col>
                    </Row>
                </Form>
                <IconTitle title='查询结果' left='-300' top='-30'></IconTitle>
                <!--涉密库内查询即结果列表-->
                <Table border stripe :columns="secretLawyers" :data="showedLawyerSearchArray" no-data-text='暂无数据'></Table>
                <div class="flex" style="justify-content: flex-end;margin-top:20px ;">
                    <Page :current.sync="currentPage" :total="totalPage" show-total :page-size='pageSize' size='small' show-elevator></Page>
                </div>

            </div>
            <div slot="footer">
                <div class="flex">
                    <Button type="ghost" @click="closeSecretModal">关闭</Button>
                </div>
            </div>
        </Modal>
        <!--<OrgTree title='承包人' v-model='isOrgTreeShow' type='psm' only @ok='getOrdId'></OrgTree>-->
        <Modal v-model="quetoModal" title="填写评分" class-name='lawyer-queto-modal'>
            <div class="flex">
                <Form ref="formInline" :model="formInline" :style="{width:'100%'}" :rules="ruleInline" :label-width="120">
                    <FormItem prop="legalGrade" label='风控部评分：'>
                        <Input type="text" v-model="formInline.legalGrade" placeholder="请输入风控部评分">
                        </Input>
                    </FormItem>
                    <FormItem prop="financeGrade" label='财务部评分：'>
                        <Input type="text" v-model="formInline.financeGrade" placeholder="请输入律师财务评分">
                        </Input>
                    </FormItem>
                    <FormItem prop="businessGrade" label='业务部评分：'>
                        <Input type="text" v-model="formInline.businessGrade" placeholder="请输入律师业务评分">
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
        <FlowSubmit v-model='isOrgTreeShow' @ok='getOrdId'></FlowSubmit>
    </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex'
    import LgBreadcrumb from '../../components/LgBreadcrumb'
    import CaseBaseInfo from '../../components/CaseBaseInfo'
    import IconTitle from '../../components/IconTitle'
    import LawyerEntryForm from '../../components/LawyerEntryForm'
    import OperatingInfo from '../../components/OperatingInfo'
    import FlowSubmit from '../../components/FlowSubmit'
    import AttachmentList from '../../components/AttachmentList'
    import { cityArr, provinceList } from '../../utils/area'
    import { ObjArrayDistinct, CheckObjArrayRepeat, gotoLawyerDetail, gotoFlowChart,fileFormat } from '../../utils'
    export default {
        name: 'ExternalLawyer',
        components: {
            LgBreadcrumb,
            CaseBaseInfo,
            IconTitle,
            LawyerEntryForm,
            OperatingInfo,
            FlowSubmit,
            AttachmentList
        },
        computed: {
            ...mapGetters( [
                'Token',
                'userInfo',
            ] ),
            ...mapState(
                [
                    'ajlx',
                    'allLawyers'
                ]
            ),
            showedLawyerSearchArray() {
                let startIndex = this.pageSize * ( this.currentPage - 1 ),
                    endIndex = startIndex + this.pageSize;
                return this.lawyerSearchArray.slice( startIndex, endIndex );
            },
            totalPage() {
                return this.lawyerSearchArray.length;
            },
            operatingInfo() {
                let obj;
                if ( this.applyInfo ) {
                    obj = {
                        creator: this.userInfo.userName,
                        createTime: this.applyInfo.createTime,
                    }
                } else {
                    obj = null
                }
                return obj
            },
            finalGrade() {
                let total_grade = Number( this.secretForm.financeGrade ) +
                    Number( this.secretForm.businessGrade ) +
                    Number( this.secretForm.legalGrade );
                return !isNaN( total_grade ) && total_grade != 0 ? total_grade : ''
            },
            btnShow(){
            	let  completeFlag = this.$route.query.completeFlag;
            	let btnShow;
            	if(completeFlag&&completeFlag=='2'){
            		btnShow = false;
            	}else{
            		btnShow = true;
            	}
            	return btnShow
            },
            FileFormat(){
            	return fileFormat
            }

        },
        data() {

            const validateNumber = ( rule, value, callback ) => {
                if ( value === '' ) {
                    callback( new Error( '不能为空' ) );
                } else {
//                  console.log( value )
                    let reg = /^\d+$/;
                    if ( !reg.test( Number( value ) ) ) {
                        callback( new Error( '请输入数字' ) );
                    } else if(value<0||value>100){
                        callback( new Error( '数值必须大于0小于100' ) );
                    }else{
                        callback();
                    }
                }
            };
            return {
                currentPage: 1,
                pageSize: 10,
                caseInfo: null,
                //面包屑路径
                path: [
                    { 'name': '律师管理', 'path': '/main/lawyerManage' },
                    { 'name': '外聘律师申请', 'path': '' },
                ],
                //是否涉密单选框
                classified: '不涉密',
                //不涉密库内添加对话框显示/隐藏
                isModalShow: false,
                //向右按钮禁用
                toRightDisabled: false,
                //向左按钮禁用
                toLeftDisabled: false,
                //库外律师添加对话框
                fromOutside: false,
                //不涉密添加后显示的数据表格
                lawyers: [ {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '律师姓名',
                        key: 'lawyerName',
                        align: 'center'
                    },
                    {
                        title: '所属律所',
                        key: 'lawOfficeName',
                        align: 'center',
                        render: ( h, params ) => {
                            return params.row.lawOffices ? params.row.lawOffices.lawOfficeName : params.row.lawOfficeDTO
                                .lawOfficeName
                        }
                    },
                    {
                        title: '地区',
                        key: 'district',
                        align: 'center',
                        render: ( h, params ) => {
                            return params.row.lawOffices ? params.row.lawOffices.area : params.row.lawOfficeDTO
                                .area
                        }
                    },
                    {
                        title: '擅长案件类型',
                        key: 'specialty',
                        align: 'center'
                    },
                    {
                        title: '毕业院校',
                        key: 'school',
                        align: 'center'
                    },
                    {
                        title: '风控部评分',
                        key: 'legalGrade',
                        align: 'center',
                        width: 80,
//                      render: ( h, params ) => {
//                          return params.row.legalGrade ? params.row.legalGrade : ''
//                      }
                    },
                    {
                        title: '财务部评分',
                        key: 'financeGrade',
                        align: 'center',
                        width: 80,
//                      render: ( h, params ) => {
//
//                          return params.row.financeGrade ? params.row.financeGrade : ''
//                      }

                    }, 
                    {
                        title: '业务部评分',
                        key: 'businessGrade',
                        align: 'center',
                        width: 80,
//                      render: ( h, params ) => {
//                          console.log( params.row.businessGrade )
//                      	
//                          return params.row.businessGrade ? params.row.businessGrade : ''
//                      }
                    },
                    {
                        title: '最终得分',
                        key: 'totalGrade',
                        align: 'center',
                        width: 80,
                        render: ( h, params ) => {
                            let total_grade = Number( params.row.financeGrade ) +
                                Number( params.row.businessGrade ) +
                                Number( params.row.legalGrade );
                            return !isNaN( total_grade ) ? total_grade : '--'
                        }
                    },
                    {
                        title: '操作',
                        key: 'address',
                        align: 'center',
                        width: 180,
                        render: ( h, params ) => {
                            return h( 'div', [
                                h( 'Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        "marginRight": '5px'
                                    },
                                    on: {
                                        click: () => {
                                            gotoLawyerDetail( params.row.id )
                                        }
                                    }
                                }, '查看' ),
                                h( 'Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        "marginRight": '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.showquetoModal( params.index )
                                        }
                                    }
                                }, '编辑' ),
                                h( 'Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.lawyerChoosedArray.splice( params.index, 1 )
                                        }
                                    }
                                }, '删除' )
                            ] );
                        }
                    },
                ],
                //涉密库内添加查询后的数据表格
                secretLawyers: [ {
                        type: 'index',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '律师姓名',
                        key: 'lawyerName',
                        align: 'center',
                        width: 85,
                    },
                    {
                        title: '所属律所',
                        key: 'lawOfficeName',
                        align: 'center',
                        width: 130,

                    },
                    {
                        title: '地区',
                        key: 'area',
                        align: 'center',
                        width: 80,
                    },
                    {
                        title: '擅长案件类型',
                        key: 'areasExpertiseName',
                        align: 'center',
                        width: 80,
                    },
                    {
                        title: '毕业院校',
                        key: 'school',
                        align: 'center',
                        width: 120,
                    },
                    {
                        title: '律师评级',
                        key: 'level',
                        align: 'center',
                        width: 80,
                        render: ( h, params ) => {
                            return '--'
                        }
                    },
                    {
                        title: '操作',
                        key: 'address',
                        align: 'center',
                        width: 132,
                        render: ( h, params ) => {
                            return h( 'div', [
                                h( 'Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            gotoLawyerDetail( params.row.id )
                                        }
                                    }
                                }, '查看' ),
                                h( 'Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                        	console.log(this.lawyerSearchArray[params.index ])
                                            this.secretForm.lawyerName = this.lawyerSearchArray[
                                                    params.index ].lawyerName,
                                                this.secretForm.lawOffice = this.lawyerSearchArray[
                                                    params.index ].lawOfficeName,
                                                this.secretForm.AreasExpertiseId = this.lawyerSearchArray[
                                                    params.index ].areasExpertiseName,
                                                this.secretForm.School = this.lawyerSearchArray[
                                                    params.index ].school,
                                                this.secretForm.level = this.lawyerSearchArray[
                                                    params.index ].area,
                                                this.secretForm.id = this.lawyerSearchArray[
                                                    params.index ].id
                                            this.secretModal = false
                                        }
                                    }
                                }, '推荐' )
                            ] );
                        }
                    }
                ],
                //不涉密库内添加对话框内 库内数据
                lawyerArray: [],
                //涉密库内添加 对话框 查询后 数据表格
                lawyerSearchArray: [],
                //不涉密库内添加 右边已选择数据表格
                lawyerChoosedArray: [],
                //不涉密库内添加 左右表格 数据格式
                columns_left: [ {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'lawyerName',
                        align: 'center',
                        width: 92,
                    },
                    {
                        title: '所属律所',
                        key: 'lawOfficeName',
                        align: 'center',
                        width: 180,
                        render: ( h, params ) => {
                            return params.row.lawOffices.lawOfficeName
                        }
                    },
                ],
                columns_right: [ {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'lawyerName',
                        align: 'center',
                        width: 92,
                    },
                    {
                        title: '所属律所',
                        key: 'lawOfficeName',
                        align: 'center',
                        width: 180,
                        render: ( h, params ) => {
                            return params.row.lawOffices.lawOfficeName
                        }
                    },
                ],
                //不涉密 对话框右边表格数据
                tagertData: [],
                toRightArray: [],
                toLeftArray: [],
                //涉密库内查询对话框 显示隐藏
                secretModal: false,
                //涉密库内查询 地市下拉框数据
                cityArr: [],
                //涉密库内查询 区县下拉框数据
                regionList: [],
                //涉密库内查询后 页面显示数据
                secretForm: {
                    lawyerName: '',
                    lawOffice: '',
                    AreasExpertiseId: '',
                    School: '',
                    level: '',
                    id: '',
                    orgid: '',
                    legalInstrument: [],
                    financeGrade: '',
                    legalGrade: '',
                    businessGrade: '',
                    DefaultFileList: [
                    ]
                },
                secretFormRules: {
                    financeGrade: [
                        { required: true, validator: validateNumber, trigger: 'blur' },
                    ],
                    legalGrade: [
                        { required: true, validator: validateNumber, trigger: 'blur' },
                    ],
                    businessGrade: [
                        { required: true, validator: validateNumber, trigger: 'blur' },
                    ],
                    secretExplaination: [
                        { required: true, message: '申请理由不能为空', trigger: 'blur' },
                    ]
                },

                NotclassifiedForm: {
                    explaination: '',
                    orgid: '',
                    legalInstrument: [],
                    DefaultFileList: []
                },
                NotclassifiedRules: {
                    //					NotclassifiedExplaination:[
                    //                      { required: true, message: '申请理由不能为空', trigger: 'blur' },
                    //                  ]
                },
                //组织机构的显示对话框 显示隐藏
                isOrgTreeShow: false,
                OrgId: '',
                //涉密库内查询 查询条件表单
                secretSearch: {
                    lawyerName: '',
                    lawOffice: '',
                    AreasExpertiseId: '',
                    Territory: '',
                    province: '',
                    region: '',
                    startTime: '',
                    endTime: ''
                },
                //不涉密库内添加 搜索框文字内容
                lawyerSearchTxt: '',
                //基本信息信息显示 对象
                applyInfo: null,
                //根据案件编号搜索案件信息
                checkInfo: '',
                //填写分数弹出框
                quetoModal: false,
                //选择律师的索引
                chooseIndex: '',
                formInline: {
                    financeGrade: '',
                    legalGrade: '',
                    businessGrade: '',
                },
                ruleInline: {
                    financeGrade: [
                        { required: true, validator: validateNumber, trigger: 'blur' },
                    ],
                    legalGrade: [
                        { required: true, validator: validateNumber, trigger: 'blur' },
                    ],
                    businessGrade: [
                        { required: true, validator: validateNumber, trigger: 'blur' },
                    ]
                },
                saveDataId:'',
                draftFlag:0
            }
        },
        created() {
            this.cityArr = cityArr;
            this.NotclassifiedForm.orgid = this.userInfo.org.orgName;
            this.secretForm.orgid = this.userInfo.org.orgName;
        },
        mounted() {
            if ( this.$route.query.id ) {
                this.getCaseInfo( this.$route.query.id )
            }
            //        this.getCaseInfo( 1 )
        },
        methods: {
            ...mapActions( [
                'getSimpleCaseInfo',
                'getAllLaywers',
                'lawyerSearch'
            ] ),
            searchLaywer() {
                /*
                 * 查询律师 
                 */
                let ss = this.secretSearch;
              console.log( ss )
                let _this = this;
                this.$http.request( {
                        method: 'post',
                        url: '/lawyer/listLawyerInStorage',
                        data: {
                            lawOfficeName: ss.lawOffice,
                            county: ss.Territory,
                            area: ss.province,
                            region: ss.region,
                            lawyerName: ss.lawyerName,
                            areasExpertiseId: ss.AreasExpertiseId,
                            startTime: ss.startTime,
                            endTime: ss.endTime,
                            storageFlag:'1'
                        }
                    } )
                    .then( ( res ) => {
                        if ( res.data.code == 1 ) {
                        	_this.$Message.destroy();
                        	_this.$Message.success('查询成功');
                            _this.lawyerSearchArray = res.data.content.content;
                        } else {
                        	_this.$Message.destroy();
                        	_this.$Message.error('无查询结果');
                            _this.lawyerSearchArray = [];
                        }

                    } )
                    .catch( ( err ) => {

                    } )
            },
            ok() {
                this.lawyerChoosedArray=[...this.tagertData]
                this.isModalShow = false;
            },
            cancel() {
                this.isModalShow = false
            },
            lawyerSelect( selection ) {
                this.toRightArray = selection;
            },
            RightSelect( selection ) {
                this.toLeftArray = selection;
            },
            toRight() {
                if ( this.toRightArray.length != 0 ) {
                    this.toRightArray.forEach( ( item ) => {
                        this.tagertData.push( item )
                    } );
                    this.tagertData = ObjArrayDistinct( this.tagertData, 'id' );
                }
            },
            toLeft() {
            	console.log(this.toLeftArray)
            	console.log(this.tagertData)
                let tagertData = this.tagertData;
                let toLeftArray = this.toLeftArray;
                if ( toLeftArray.length > 0 ) {
                    for ( let i = 0; i < toLeftArray.length; i++ ) {
                        for ( let j = 0; j < tagertData.length; j++ ) {
                            if ( toLeftArray[ i ].id == tagertData[ j ].id ) {
                                tagertData.splice( j, 1 )
                            }
                        }
                    }
                }

            },
            chooseLawyer() { //显示律师库选择律师对话框
                if ( this.classified == "不涉密" ) {
                    if ( this.allLawyers.length == 0 ) {
                        this.getAllLaywers()
                    }
                    this.isModalShow = true;
//                this.tagertData = [...this.lawyerChoosedArray]
                } else {
                    this.secretModal = true
                }
            },
            close( name ) { //库外选择对话框关闭
                this.fromOutside = false;
                //              this.$refs.entry.$refs.baseInfo.resetFields()
            },
            showOutsideChoose() { //库外选择对话框显示
                this.fromOutside = true;
            },
            provienceChange( province ) { //根据省市获取区县信息
                let regionArr = [];
                for ( let i = 0; i < cityArr.length; i++ ) {
                    if ( province == provinceList[ i ].name ) {

                        if ( province == '北京' || province == '天津' || province == '上海' || province ==
                            '重庆' ) {
                            let data = provinceList[ i ].cityList[ 0 ].areaList;
                            for ( let k = 0; k < data.length; k++ ) {
                                let obj = {
                                    value: data[ k ],
                                    label: data[ k ]
                                }
                                regionArr.push( obj )
                            }
                        } else {
//                          console.log( provinceList[ i ] )
                            if ( province != '台湾' && province != '香港' && province != '澳门' ) {
                                let data = provinceList[ i ].cityList;
                                for ( let k = 0; k < data.length; k++ ) {
                                    let obj = {
                                        value: data[ k ].name,
                                        label: data[ k ].name
                                    }
                                    regionArr.push( obj )
                                }
                            } else {
                                regionArr = []
                            }

                        }
                    }
                }
//              this.secretSearch.region = regionArr.length > 0 ? regionArr[ 0 ].value : '';
                this.regionList = regionArr;
                this.secretSearch.province = province;
            },
            resetCondition() { //重置查询条件
                this.$refs[ 'secretSearchFrom' ].resetFields();
            },
            closeSecretModal() {
                this.$refs[ 'secretSearchFrom' ].resetFields();
                this.lawyerSearchArray = [];
                this.secretModal = false
            },
            saveData() { //保存数据
                if ( !this.caseInfo ) {
                    this.$Message.error( '请根据案件选择律师' );
                    return false
                }
                let params = {
                    "casessId": Number( this.caseInfo.id ),
                    "externalConfidentialFlag": this.classified == '不涉密' ? 0 : 1,
                    "externalTitle": this.caseInfo.casesTitle,
                    "externalComments": "",
                    'reason': '',
                    'draftFlag': 0,
                    'externalReason': this.classified == '不涉密' ? this.NotclassifiedForm.explaination : this.secretForm
                        .explaination,
                    "externalPersonnelDTO": [],
                    'attachmentInfos':[],
                    'externalApplicantName':this.userInfo.userName,
                    'id':this.saveDataId?this.saveDataId:''
                };
                if ( this.classified == '不涉密' ) {
//              	console.log(this.lawyerChoosedArray)
                    for ( let i = 0; i < this.lawyerChoosedArray.length; i++ ) {
                        let obj = {
                            "appraisalContent": "string",
                            "delFlag": 0,
                            "externalCounselManagesId": 0,
                            "lawyersId": this.lawyerChoosedArray[ i ].id?this.lawyerChoosedArray[ i ].id:this.lawyerChoosedArray[ i ].lawyerId,
                            "reviewStageId": "string",
                            "reviewStageName": "string",
                            "winFlag": 0,
                            "financeGrade": this.lawyerChoosedArray[ i ].financeGrade,
                            "legalGrade": this.lawyerChoosedArray[ i ].legalGrade,
                            "businessGrade": this.lawyerChoosedArray[ i ].businessGrade,
                            "totalGrade": this.lawyerChoosedArray[ i ].totalGrade
                        }
                        params.externalPersonnelDTO.push( obj )
                        
                    }
//                  console.log(this.NotclassifiedForm.legalInstrument)
                    let fileArray = this.NotclassifiedForm.legalInstrument
                    for (let i = 0; i < fileArray.length; i++  ) {
                    	let fileObj = {
                        	'attName':fileArray[i].name,
                        	'attPath':fileArray[i].response.content,
                        	'attType':'4',
		                    'id':fileArray[i].response?'':fileArray[i].id,
                        }
                        params.attachmentInfos.push( fileObj )
                    }
                } else {
                	let fileArray = this.secretForm.legalInstrument
                    for (let i = 0; i < fileArray.length; i++  ) {
                    	let fileObj = {
                        	'attName':fileArray[i].name,
                        	'attPath':fileArray[i].response.content,
                        	'attType':'4',
		                    'id':fileArray[i].response?'':fileArray[i].id,
                        }
                        params.attachmentInfos.push( fileObj )
                    }
                	console.log(this.secretForm.id)
                    params.externalPersonnelDTO = [ {
                        "appraisalContent": "string",
                        "delFlag": 0,
                        "externalCounselManagesId": 0,
                        "lawyersId": this.secretForm.id,
                        "reviewStageId": "string",
                        "reviewStageName": "string",
                        "winFlag": 0,
                        "financeGrade": this.secretForm.financeGrade,
                        "legalGrade": this.secretForm.legalGrade,
                        "businessGrade": this.secretForm.businessGrade,
                        "totalGrade": this.finalGrade
                    } ]
                }
                console.log(params)
                let _this = this;

                this.$http.request( {
                        url: '/ecm/create',
                        method: 'post',
                        data: params
                    } )
                    .then( res => {
//                      console.log( res )
                        if ( res.data.code == 1 ) {
                            _this.$Message.success( res.data.message )
                            _this.saveDataId = res.data.content.id
                        } else {
                            _this.$Message.error( res.data.message )
                        }
                    } )
                    .catch( err => {
                        throw Error( err );
                    } )
            },
            submitToFirst( reason, ReserveFirst ) { //提交初审
                if ( !this.caseInfo ) {
                    this.$Message.error( '请根据案件选择律师' );
                    return false;
                };
                
                let params = {
                	"externalConfidentialFlag": this.classified == '不涉密' ? 0 : 1,
                    "externalTitle": this.caseInfo.casesTitle,
                    "comment": reason,
                    "externalComments": "",
                    'reason': '',
                    'externalReason': this.classified == '不涉密' ? this.NotclassifiedForm.explaination : this.secretForm
                        .explaination,
                    "externalPersonnelDTO": [],
                    'attachmentInfos':[],
                	'userId': this.OrgId + '',
                	"casessId": Number( this.caseInfo.id ),
                	'taskId':this.$route.query.taskId?this.$route.query.taskId:'',
                    'externalApplicantName':this.userInfo.userName,
                    'draftFlag':this.draftFlag?this.draftFlag:0
                };
                if ( this.classified == '不涉密' ) {
//                  this.$refs[ 'NotclassifiedForm' ].validate( ( valid ) => {
//                      if ( valid ) {
							if(this.lawyerChoosedArray.length<1){
								this.$Message.destroy()
								this.$Message.error('请选择律师')	
								return false;
							}
                            for ( let i = 0; i < this.lawyerChoosedArray.length; i++ ) {
                                let obj = {
                                    "appraisalContent": "string",
                                    "delFlag": 0,
                                    "externalCounselManagesId": 0,
                                    "lawyersId": this.lawyerChoosedArray[ i ].lawyerId?this.lawyerChoosedArray[ i ].lawyerId:this.lawyerChoosedArray[ i ].id,
                                    "reviewStageId": "string",
                                    "reviewStageName": "string",
                                    "winFlag": 0,
                                    "financeGrade": this.lawyerChoosedArray[ i ].financeGrade,
                                    "legalGrade": this.lawyerChoosedArray[ i ].legalGrade,
                                    "businessGrade": this.lawyerChoosedArray[ i ].businessGrade,
                                    "totalGrade": this.lawyerChoosedArray[ i ].totalGrade
                                }
                                params.externalPersonnelDTO.push( obj )
                            }
                            let fileArray = [...this.NotclassifiedForm.legalInstrument,...this.NotclassifiedForm.DefaultFileList]
//							console.log(fileArray)                            
		                    for (let i = 0; i < fileArray.length; i++  ) {
		                    	let fileObj = {
		                        	'attName':fileArray[i].name?fileArray[i].name:fileArray[i].attName,
		                        	'attPath':fileArray[i].response?fileArray[i].response.content:fileArray[i].attPath,
		                        	'attType':'4',
		                        	'id':fileArray[i].response?'':fileArray[i].id,
		                        }
		                        params.attachmentInfos.push( fileObj )
		                    }

//                      }
//                  } )
                } else {
                    this.$refs[ 'secretForm' ].validate( ( valid ) => {
                        if ( valid ) {
							if(!this.secretForm.id){
                            	this.$Message.destroy()
								this.$Message.error('请选择律师')	
								return false
							}
                            let fileArray = [...this.secretForm.legalInstrument,...this.secretForm.DefaultFileList]
		                    for (let i = 0; i < fileArray.length; i++  ) {
		                    	let fileObj = {
		                        	'attName':fileArray[i].name?fileArray[i].name:fileArray[i].attName,
		                        	'attPath':fileArray[i].response?fileArray[i].response.content:fileArray[i].attPath,
		                        	'id':fileArray[i].response?'':fileArray[i].id,
		                        	'attType':'4',
		                        }
		                        params.attachmentInfos.push( fileObj )
		                    }
                            params.externalPersonnelDTO = [ {
                                "appraisalContent": "string",
                                "delFlag": 0,
                                "externalCounselManagesId": 0,
                                "lawyersId": this.secretForm.id,
                                "reviewStageId": "string",
                                "reviewStageName": "string",
                                "winFlag": 0,
                                "financeGrade": this.secretForm.financeGrade,
                                "legalGrade": this.secretForm.legalGrade,
                                "businessGrade": this.secretForm.businessGrade,
                                "totalGrade": this.finalGrade
                            } ]
                        }
                    } )

                }
//              console.log(params)
//              let _this = this;
//              this.$http.request( {
//                      url: '/ecm/create/submit',
//                      method: 'post',
//                      data: params
//                  } )
//                  .then( res => {
//                      if ( res.data.code == 1 ) {
//                          _this.$Message.success( res.data.message )
//                          _this.$router.push( {
//                              name: 'personalTaskCenter',
//                              query: {
//                                  tab: 'todo'
//                              }
//                          } )
//                      }else{
//                          _this.$Message.error( res.data.message )
//                      }
//                  } )
//                  .catch( err => {
//                      throw Error( err );
//                  } )

            },
            Searchlawyer( e ) { //不涉密库内选择律师搜索
                if ( e.type !== 'click' ) {
                    if ( e.keyCode != 13 ) {
                        return false
                    }
                }
                this.lawyerSearch(this.lawyerSearchTxt)
//              let _this = this;
//              this.$http.request( {
//                      url: '/lawyer/lawyersByNameOrLawOffceName?queryName=' +
//                          this.lawyerSearchTxt,
//                      method: 'get',
//                  } )
//                  .then( res => {
//                      _this.allLawyers = res.data.content
//                  } )
//                  .catch( err => {
//                      throw Error( err );
//                  } )
            },
            submitFromOutside() {
                this.$refs.entry.handleSubmit()
            },
            receiveFormData( info ) {
                if ( info ) {
                    let _this = this;
                    this.$http.request( {
                            method: 'post',
                            url: '/lawyer/lawyers',
                            data: info,
                        } )
                        .then( function ( res ) {
//                          console.log( res )
                            if ( res.data.code == 1 ) {
                                _this.$Message.success( "添加成功" )
                                _this.lawyerChoosedArray.push( res.data.content );
                                _this.fromOutside=false
                            }
                        } )
                        .catch( function ( err ) {

                        } )
                }
            },
            getCaseInfo( id ) {
                let _this = this
                this.$http.request( {
                        url: '/ecm/findExternalCounsel/' + id,
                        method: 'get',
                    } )
                    .then( res => {
                        if ( res.data.code == 1 ) {
                        	let data = res.data.content;
                            _this.caseInfo = data.cases;
                            _this.applyInfo = data.cases;
                            let lawyerArr=[];
                            if(data.externalCounselManage[0]){
	                            data.externalCounselManage[0].externalPersonnelDTO.forEach((item)=>{
	                            	lawyerArr.push(item.lawyerInfoDTO);
	                            	return lawyerArr
	                            })
	                            _this.draftFlag = res.data.content.externalCounselManage[0].draftFlag;
                            }
                            if(data.externalCounselManage[0].externalConfidentialFlag==0){
                            	_this.NotclassifiedForm.DefaultFileList = data.attachmentInfos;
                            	_this.NotclassifiedForm.explaination=res.data.content.externalCounselManage[0].externalReason;
                            	_this.lawyerChoosedArray= lawyerArr;
                            	
                            }else{
                            	_this.secretForm.DefaultFileList = data.attachmentInfos
                            	_this.secretForm.explaination=res.data.content.externalCounselManage[0].externalReason;
								console.log(lawyerArr[0])
                            	_this.secretForm.lawyerName=lawyerArr[0].lawyerName;
                            	_this.secretForm.id=lawyerArr[0].lawyerId;
                            	_this.secretForm.lawOffice=lawyerArr[0].lawOfficeName;
                            	_this.secretForm.School=lawyerArr[0].school;
                            	_this.secretForm.financeGrade=lawyerArr[0].financeGrade;
                            	_this.secretForm.legalGrade=lawyerArr[0].legalGrade;
                            	_this.secretForm.businessGrade=lawyerArr[0].businessGrade;
                            	_this.secretForm.School=lawyerArr[0].school;
                            }
                            _this.classified=(data.externalCounselManage[0].externalConfidentialFlag==0?'不涉密':'涉密')
                        }
                    } )
                    .catch( err => {
                        throw Error( err );
                    } )
            },
            
            getOrdId( res ) {
                this.OrgId = res.people[ 0 ].id
                this.submitToFirst( res.opinion )
            },
            showFlowchart() {//查看流程图
                gotoFlowChart( this.$route.query.processInstanceId,2 )
            },
            //上传附件
            uploadSucLegal( response, file, fileList ) {
                if ( response.code == 1 ) {
                	this.$Message.destroy()
                    this.$Message.success( response.message )
                }
                if ( this.classified == '不涉密' ) {
                    this.NotclassifiedForm.legalInstrument = fileList
                } else {
                    this.secretForm.legalInstrument = fileList
                }
            },
            // 上传过程中函数，由于上传成功有滞后性，无法验证，所以在上传过程中把fileList赋值给列表
            uploadPrgLegal( event, file, fileList ) {
                if ( this.classified == '不涉密' ) {
                    this.NotclassifiedForm.legalInstrument = fileList
                } else {
                    this.secretForm.legalInstrument = fileList
                }
            },
            // 删除
            rmLegal( file, fileList ) {
                if ( this.classified == '不涉密' ) {
                    this.NotclassifiedForm.legalInstrument = fileList
                } else {
                    this.secretForm.legalInstrument = fileList
                }
            },
            uploadError(error, file, fileList){
            	this.$Message.destroy()
            	this.$Message.error('上传失败')
            },
            checkForm() { //验证表单、
            	if(this.classified == '不涉密'&&!this.lawyerChoosedArray.length==0){
            		let arr = this.lawyerChoosedArray;
            		let chenked=true;
            		for(let i= 0;i<arr.length;i++){
            			if(!arr[i].financeGrade||!arr[i].legalGrade||!arr[i].businessGrade||!arr[i].totalGrade){
            				chenked = false;
            				break
            			}
            		}
            		if(chenked){
            			this.isOrgTreeShow = true
            		}else{
            			this.$Message.destroy()
            			this.$Message.error('请填写律师评分')
            		}
                	return false;
                };
                if (this.classified == '涉密'&&this.secretForm.id&&this.secretForm.businessGrade!=null&&this.secretForm.financeGrade!=null&&this.secretForm.legalGrade!=null) {
                	this.$refs[ 'secretForm' ].validate( ( valid ) => {
                		console.log(this.secretForm)
                        if ( valid ) {
                			this.isOrgTreeShow = true
                		}else{
                			this.$Message.destroy()
            				this.$Message.error('请填写律师评分')
                		}
                    }) 
                	return false;
                }else{
                	this.$Message.destroy()
            		this.$Message.error('请填选择律师')
                }
                
            },
            searchInfo( e ) { //根据案件编号查询案件信息
                if ( e.type !== 'click' ) {
                    if ( e.keyCode != 13 ) {
                        return false
                    }
                }
                if ( this.checkInfo == '' ) {
                    return false
                }
                //865798
                let _this = this;
                _this.caseInfo =null
                _this.applyInfo = null;
                _this.lawyerChoosedArray= [];
                _this.classified ='不涉密'
                this.$http.request( {
                        url: '/ecm/queryCasesAndExternalInfoByCasesCode/' + this.checkInfo,
                        method: 'get',
                    } )
                    .then( res => {
                        if ( res.data.code == 1 ) {
                        	_this.$Message.success('查询成功')
                            _this.caseInfo = res.data.content.cases;
                            console.log(_this.caseInfo)
                            _this.applyInfo = res.data.content.cases;
							_this.draftFlag = res.data.content.externalCounselManage[0].draftFlag;
                            if(res.data.content.externalCounselManage&&res.data.content.externalCounselManage[0].externalConfidentialFlag==0){
                            	_this.NotclassifiedForm.DefaultFileList = res.data.content.attachmentInfos;
                            	_this.NotclassifiedForm.explaination=res.data.content.externalCounselManage?res.data.content.externalCounselManage[0].externalReason:'';
                            	_this.lawyerChoosedArray=res.data.content.externalCounselManage?[res.data.content.externalCounselManage[0].externalPersonnelDTO[0].lawyerInfoDTO]:[]
                            	
                            }else{
                            	_this.secretForm.DefaultFileList = res.data.content.attachmentInfos;
                            	_this.secretForm.explaination=res.data.content.externalCounselManage[0].externalReason;
                            	
                            };
                            if(res.data.content.externalCounselManage){
                            	_this.classified=res.data.content.externalCounselManage[0].externalConfidentialFlag==0?'不涉密':'涉密'
                            }
                        }else{
                        	_this.$Message.error('查询无此案件')
                        }
                    } )
                    .catch( err => {
                        throw Error( err );
                    } )
            },
            showquetoModal( index ) {//打开评分弹窗
                this.quetoModal = true;
                this.chooseIndex = index;
                console.log(this.lawyerChoosedArray[index].businessGrade)
                if(this.lawyerChoosedArray[index].businessGrade){
                	this.formInline.financeGrade = this.lawyerChoosedArray[index].financeGrade
                	this.formInline.legalGrade = this.lawyerChoosedArray[index].legalGrade
                	this.formInline.businessGrade = this.lawyerChoosedArray[index].businessGrade
                }
            },
            closeModal() {//关闭评分弹窗并清空表单
                this.quetoModal = false;
                this.$refs[ 'formInline' ].resetFields()
            },
            confirm( name ) {//评分弹窗  确认按钮事件  
                let _this = this;
                this.$refs[ name ].validate( ( valid ) => {
                    if ( valid ) {
//                      console.log( _this.lawyerChoosedArray )
                        let obj = {
                            ..._this.lawyerChoosedArray[ _this.chooseIndex ],
                            financeGrade: _this.formInline.financeGrade,
                            legalGrade: _this.formInline.legalGrade,
                            businessGrade: _this.formInline.businessGrade,
                            totalGrade: Number( _this.formInline.financeGrade ) + Number( _this.formInline.legalGrade ) +
                                Number( _this.formInline.businessGrade )
                        }
                        _this.lawyerChoosedArray.splice( _this.chooseIndex, 1, obj )
                        _this.$refs[ name ].resetFields()
                        _this.quetoModal = false;
                    }
                } )
            },
            deleteClassified(item){//删除附件信息
            	let attachList,index;
            	if(this.classified=='不涉密'){
            		attachList=this.NotclassifiedForm.DefaultFileList 
                }else{
                	attachList=this.secretForm.DefaultFileList 
                }
            	index = attachList.indexOf(item);
                attachList.splice(index, 1);
            },
            handleFormatError(){
            	this.$Message.destroy();
            	this.$Message.error('对不起，文件格式不正确');
            },
            handleExceededSize(file,fileList){
            	console.log(file);
            	console.log(fileList);
            }
        }
    }
</script>

<style lang="less">
    #ExternalLawyer {
        width: 1100px;
        margin: 0 auto 50px auto;
        .external-employee {
            box-sizing: border-box;
            margin-top: 20px;
            padding: 20px;
            background: #ffffff;
            .checkbox-item {
                justify-content: flex-start;
                margin-top: 10px;
                p {
                    text-align: right;
                    margin-right: 10px;
                    font-size: 14px;
                }
                .ivu-radio-wrapper {
                    margin-right: 30px;
                }
            }
            .choose-lawyer-content {
                background: #ffffff;
                display: flex;
                display: -webkit-flex;
                margin: 20px 0;
                font-size: 14px;
                justify-content: flex-start;
                align-items: center;
                width: 400px;
                p {
                    /*width: 100px;*/
                    text-align: right;
                    margin-right: 10px;
                    font-size: 14px;
                }
            }
            .btn_group {
                margin-top: 20px;
            }
        }
        .checkInfo {
            position: absolute;
            top: 10px;
            right: 20px;
            .ivu-input-group-append {
                background-color: #eee;
                border: 1px solid #d6d6d6
            }
        }
    }
    .legal-transfer {
        .arrow-box {
            flex-direction: column;
            margin: 42px 10px 0 10px;
        }
        .table-container {
            width: 350px;
        }
        .target-table-container {
            margin-top: 42px;
        }
    }
    .chooseLawyer .ivu-modal {
        width: 800px !important;
        .choose-lawyer-tips {
            text-align: center;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            margin-bottom: 10px;
        }
    }
    .secret-wrapper {
        .ivu-col-span-12 {
            padding-right: 100px;
        }
        .ivu-form .ivu-form-item-label {
            font-size: 14px;
        }
    }
    .secret-lib-modal .ivu-modal {
        width: 800px !important;
        .ivu-col-span-8 {
            padding-right: 20px;
        }
        .ivu-form .ivu-form-item-label {
            font-size: 12px;
            color: #1A1A1A;
        }
        .btn_group {
            justify-content: space-between;
            .ivu-btn {
                width: 45%;
            }
        }
    }
    .attachmentFileContainer{
    	font-size: 14px;
    	color: #1A1A1A;
    	line-height: 30px;
    	margin-bottom: 10px;
    	span.att-label{
    		width: 100px;
    		text-align: right;
    		margin-right: 15px;
    		float: left;
    	}
    	span.att-label~span{
    		float: left;
    	}
    }
</style>