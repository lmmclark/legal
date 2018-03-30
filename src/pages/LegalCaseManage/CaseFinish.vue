<template>
  <div class="caseFinish">
    <LgBreadcrumb :path='path'>
      <div class="btnGroup">
        <Button v-if='completeFlag!=2' type="primary" @click="startExternal" :disabled="casedata.externalStartFlag==1?true:false">启动外聘</Button>
        <Button v-if='completeFlag!=2' type="primary" @click="saveForm">保存</Button>
        <Button v-if='completeFlag!=2' type="primary" @click="submitForm">提交</Button>
        <!--<Button type="primary" @click="reportDoc">呈报公文</Button>-->
        <Button type="primary" @click="flow" :disabled="isFlow">流程图</Button>
        <Button type="primary" @click="generateReporter">生成案件报告</Button>
      </div>
    </LgBreadcrumb>
    <Form :model="formData" :rules="rule" ref="caseFinishForm" class="caseFinishForm">
      <ApprovalHistory :data='historyInfoData'></ApprovalHistory>
      <CaseBaseInfoModifiable ref='caseBaseInfo' :data='casedata'></CaseBaseInfoModifiable>
      <div class="progress">
        <div class="title">
          <IconTitle title='案件进展情况' left='-120' top='-30'></IconTitle>
        </div>
        <ProgressInfo :data="casedata!=null?casedata.casesProgressDTO:[]"></ProgressInfo>
      </div>
      <div class="execute">
        <div class="title">
          <IconTitle title='案件执行情况' left='-200' top='-30'></IconTitle>
        </div>
        <ExecuteInfo :data="casedata!=null?casedata.casesExecutionDTO:[]"></ExecuteInfo>
      </div>
      <div class="rectificationInfo">
        <div class="title">
          <IconTitle title='案件整改情况' left='-80' top='-30'></IconTitle>
        </div>
        <div class="wrapper">
          <FormItem prop="rectificationInfo">
            <Input type="textarea" class="textarea" v-model="formData.rectificationInfo" placeholder="请输入案件整改情况"></Input>
          </FormItem>
        </div>
      </div>
      <div class="causesAnalysis">
        <div class="title">
          <IconTitle title='案件成因分析情况' left='-80' top='-30'></IconTitle>
        </div>
        <div class="wrapper">
          <FormItem prop="causesAnalysis">
            <Input type="textarea" class="textarea" v-model="formData.causesAnalysis" placeholder="请输入案件成因分析情况"></Input>
          </FormItem>
        </div>
      </div>
      <div class="accountabilityResult">
        <div class="title">
          <IconTitle title='案件问责情况' left='-80' top='-30'></IconTitle>
        </div>
        <div class="wrapper">
          <FormItem prop="accountabilityResult">
            <Input type="textarea" class="textarea" v-model="formData.accountabilityResult" placeholder="请输入案件问责情况"></Input>
          </FormItem>
        </div>
      </div>
      <!--<div class="report">
        <div class="title">
          <IconTitle title='案件报告' left='-80' top='-30'></IconTitle>
        </div>
        <div class="wrapper">
          <Table size="small" border :columns="tableLabel3" :data="raportArray"></Table>
        </div>
      </div>-->
      <div class="reportedSign">
        <div class="title">
          <IconTitle title='案件入库' left='-140' top='-30'></IconTitle>
        </div>
        <div class="wrapper">
          <FormItem prop="reportedSign" label="是否入案件库：" :label-width="120">
            <RadioGroup v-model="formData.reportedSign">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </div>
      </div>
      <div class="archivesNo">
        <div class="title">
          <IconTitle title='对应档案库' left='-140' top='-30'></IconTitle>
        </div>
        <div class="wrapper">
          <FormItem prop="archivesNo" label="档案编号：" :label-width="120">
            <Input v-model="formData.archivesNo" style="width:30%" placeholder="请输入对应档案编号"></Input>
          </FormItem>
        </div>
      </div>
      <div class="appraise" v-if="casedata!=null?casedata.isExternal:0&&casedata!=null?casedata.externalFinshFlag:0">
        <div class="title">
          <IconTitle title='律师、律所评价' left='-380' top='-30'></IconTitle>
        </div>
        <div class="wrapper">
          <!-- 需要做判断如果律师不存在 -->
          <div class="myLawyer">
            <h3 class="myTitleA">我方律师、律所评价</h3>
            <Row type="flex" align="middle" class="row">
              <Col class="col">
              <label for="" class="label">律师名称：</label>
              <span class="cont">{{myLawyer.lawyerName}}</span>
              </Col>
            </Row>
            <Row type="flex" align="middle" class="row">
              <Col class="col">
              <label for="" class="label">执业证号：</label>
              <span class="cont">{{myLawyer.occupationCertificateNo}}</span>
              </Col>
            </Row>
            <FormItem label="评价等级：" prop="myLawyer.radio" :rules='{ required: true,message: "不能为空", trigger: "change" }'>
              <RadioGroup v-model="formData.myLawyer.radio" @on-change="selectLevel($event,'myLawyer')">
                <Radio v-for="item in lslspj" :key="item.id" :label="JSON.stringify(item)">{{item.dictName}}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="详细评价：" class="formItem" prop="myLawyer.appraisalContent" :rules='{ required: true,message: "不能为空", trigger: "blur" }'>
              <Input type="textarea" v-model="formData.myLawyer.appraisalContent" placeholder="请输入详细评价"></Input>
            </FormItem>
            <Row type="flex" align="middle" class="row">
              <Col class="col">
              <label for="" class="label">律所名称：</label>
              <span class="cont">{{myLawyer.lawOfficeDTO ? myLawyer.lawOfficeDTO.lawOfficeName : ''}}</span>
              </Col>
            </Row>
            <FormItem label="评价等级：" prop="myLawOffice.radio" :rules='{ required: true,message: "不能为空", trigger: "change" }'>
              <RadioGroup v-model="formData.myLawOffice.radio" @on-change="selectLevel($event,'myLawOffice')">
                <Radio v-for="item in lslspj" :key="item.id" :label="JSON.stringify(item)">{{item.dictName}}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="详细评价：" class="formItem" prop="myLawOffice.appraisalContent" :rules='{ required: true,message: "不能为空", trigger: "blur" }'>
              <Input type="textarea" v-model="formData.myLawOffice.appraisalContent" placeholder="请输入详细评价"></Input>
            </FormItem>
          </div>
          <!-- 需要做判断，如果律师不存在 -->
          <div class="myLawyer">
            <h3 class="myTitleB">相对方律师、律所评价</h3>
            <Row type="flex" align="middle" class="row">
              <Col class="col">
              <label for="" class="label">律师名称：</label>
              <span class="cont">{{oppLawyer.lawyerName}}</span>
              </Col>

            </Row>
            <Row type="flex" align="middle" class="row">
              <Col class="col">
              <label for="" class="label">执业证号：</label>
              <span class="cont" v-if="oppLawyer.occupationCertificateNo!=null">{{oppLawyer.occupationCertificateNo}}</span>
              <span class="cont" v-else>空</span>
              </Col>
            </Row>
            <FormItem label="评价等级：" prop="oppLawyer.radio" :rules='{ required: true,message: "不能为空", trigger: "change" }'>
              <RadioGroup v-model="formData.oppLawyer.radio" @on-change="selectLevel($event,'oppLawyer')">
                <Radio v-for="item in lslspj" :key="item.id" :label="JSON.stringify(item)">{{item.dictName}}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="详细评价：" class="formItem" prop="oppLawyer.appraisalContent" :rules='{ required: true,message: "不能为空", trigger: "blur" }'>
              <Input type="textarea" v-model="formData.oppLawyer.appraisalContent" placeholder="请输入详细评价"></Input>
            </FormItem>
            <Row type="flex" align="middle" class="row">
              <Col class="col">
              <label for="" class="label">律所名称：</label>
              <span class="cont">{{oppLawyer.lawOfficeDTO ? oppLawyer.lawOfficeDTO.lawOfficeName : ''}}</span>
              </Col>
            </Row>
            <FormItem label="评价等级：" prop="oppLawOffice.radio" :rules='{ required: true,message: "不能为空", trigger: "change" }'>
              <RadioGroup v-model="formData.oppLawOffice.radio" @on-change="selectLevel($event,'oppLawOffice')">
                <Radio v-for="item in lslspj" :key="item.id" :label="JSON.stringify(item)">{{item.dictName}}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="详细评价：" class="formItem" prop="oppLawOffice.appraisalContent" :rules='{ required: true,message: "不能为空", trigger: "blur" }'>
              <Input type="textarea" v-model="formData.oppLawOffice.appraisalContent" placeholder="请输入详细评价"></Input>
            </FormItem>
          </div>
        </div>
      </div>
    </Form>
    <OrgTreeStartExternal v-model="showStartExternal"></OrgTreeStartExternal>
  </div>
</template>
<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import CaseBaseInfoModifiable from '../../components/CaseBaseInfoModifiable'
  import IconTitle from "../../components/IconTitle";
  import ApprovalHistory from '../../components/ApprovalHistory'
  import LgBreadcrumb from '../../components/LgBreadcrumb'
  import { gotoFlowChart } from '../../utils'
  import ExecuteInfo from '@/components/CaseExecuteInfo'
  import ProgressInfo from '@/components/CaseProgressInfo'
  import OrgTreeStartExternal from '@/components/OrgTreeStartExternal'
  export default {
    name: "caseFinish",
    components: {
    	CaseBaseInfoModifiable,
      IconTitle,
      ApprovalHistory,
      LgBreadcrumb,
      ExecuteInfo,
      ProgressInfo,
      OrgTreeStartExternal
    },
    computed: {
      ...mapGetters([
        'Token'
      ]),
      ...mapState([
        'casedata',
        'lslspj'
      ]),
      raportArray() {
        let arr = [];
        let obj = {};
        if(this.casedata != null) {
          obj = {
            reporterId: this.casedata.reporterId,
            createor: this.casedata.createor,
            createTime: this.casedata.createTime,
            id: this.casedata.id
          }
        }
        arr.push(obj);
        return arr;
      }
    },
    created: function() {
      this.getCASEDATA(this.$route.query.id);
      this.getLSPJ();
      this.getLawyerInfo();
      this.getHistoryTask();
      this.completeFlag = this.$route.query.completeFlag;
    },
    data() {
      return {
        historyInfoData: [],
        flowFlag: false,
        saveFlag: false,
        caseData: '',
        showStartExternal: false,
        isFlow:false,
        //待办已办标示 待办1 已办2
				completeFlag:'',
				// 是否修改过案件
        isSaved: false,
        //面包屑路径
        path: [
          { 'name': '案件管理', 'path': '/main/caseManage' },
          { 'name': '案件结案', 'path': '' },
        ],
        formData: {
          // 案件整改情况
          rectificationInfo: "",
          // 案件成因分析情况
          causesAnalysis: "",
          // 案件问责情况
          accountabilityResult: "",
          // 案件是否入库
          reportedSign: 0,
          // 档案编号
          archivesNo: "",
          // 我方律师等级，评价
          myLawyer: {
            busId: '',
            // 等级id
            appraisalLevelId: '',
            // 等级名称
            appraisalLevelName: '',
            // 评价内容
            appraisalContent: '',
            // change事件与v-mode冲突，额外加一个变量
            radio: '',

          },
          // 我方律所等级，评价
          myLawOffice: {
            busId: '',
            // 等级id
            appraisalLevelId: '',
            // 等级名称
            appraisalLevelName: '',
            // 评价内容
            appraisalContent: '',
            // 
            radio: '',
          },
          // 对方律师
          oppLawyer: {
            busId: '',
            // 等级id
            appraisalLevelId: '',
            // 等级名称
            appraisalLevelName: '',
            // 评价内容
            appraisalContent: '',
            // 
            radio: '',
          },
          // 对方律所
          oppLawOffice: {
            busId: '',
            // 等级id
            appraisalLevelId: '',
            // 等级名称
            appraisalLevelName: '',
            // 评价内容
            appraisalContent: '',
            // 
            radio: '',
          },
          casesId: '',
          isExternal: '',
        },
        // 我方律师律所相关信息
        myLawyer: {},
        // 对方律师律所相关信息
        caseInfo: '',
        oppLawyer: {},
        // 流程提交
        flowObj: {
          // 流程办理人
          userId: '',
          // 流程审批意见
          comment: '',
          // 审核
          audit: '1',
          // taskId
          taskId: '',
        },
        rule: {
          // 案件整改情况
          rectificationInfo: [{ 
          	required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          // 案件成因分析情况
          causesAnalysis: [{ 
          	required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          // 案件问责情况
          accountabilityResult: [{ 
          	required: true,
            message: "不能为空",
            trigger: "blur"
          }],
          // 案件是否入库
          //reportedSign: [{ required: true, type: "number", message: "不能为空", trigger: "blur" }],
          // 档案编号
          archivesNo: [{
          	required: true,
            message: "不能为空",
            trigger: "blur"
          }],
        },
        tableData1: [],
        tableData2: [],
        tableLabel3: [{
            title: "报告单号",
            key: "reporterId",
            align: "center"
          },
          {
            title: "生成时间",
            key: "createTime",
            align: "center"
          },
          {
            title: "报告提交人",
            key: "creator",
            align: "center"
          },
          {
            title: "报告详情",
            key: "id",
            align: "center",
            render: (h, params) => {
              return h(
                "Button", {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "caseResult",
                        query: {
                          id: params.row.id
                        }
                      })
                    }
                  }
                },
                "查看详情"
              );
            }
          }
        ],
        tableData3: [],
        caseInfo: {}
      };
    },
    mounted() {
			this.isCheckFlow();
			this.issubmitForm();
    },
    watch:{
　　　　casedata(curVal,oldVal){
				this.formData.rectificationInfo = curVal.rectificationInfo;
				this.formData.causesAnalysis = curVal.causesAnalysis;
				this.formData.accountabilityResult = curVal.accountabilityResult;
				this.formData.reportedSign = curVal.reportedSign;
				this.formData.archivesNo = curVal.archivesNo;
　　　　},
			//表单数据缓存
      '$route.query.id': function(val) {
        this.getCASEDATA(val);
        if(val === undefined) {
          this.isSaved = false;
        }
      }
　　　},
    methods: {
      ...mapActions([
        'getCASEDATA',
        'getLSPJ'
      ]),
      //是否能查看流程图
      isCheckFlow(){
      	let id;
      	id = this.$route.query.processInstanceId;
      	if(typeof(id) != "undefined") {
        	this.isFlow = false;
       	}else{
       		this.isFlow = true;
       	}	
      },
      selectLevel(data, type) {
        let result = JSON.parse(data);
        this.formData[type].appraisalLevelId = result.dictCode;
        this.formData[type].appraisalLevelName = result.dictName;
      },
      // 保存
      saveForm() {
      	
      	
      	
      	
        
        this.$refs.caseBaseInfo.$refs.baseInfo.validateField('casesTitle', (valid) => {
          //如果没有填写案件标题，不能修改
          if(valid) return;
          let caseBaseInfo = { ...this.$refs.caseBaseInfo.baseForm };
          if(this.userInfo) {
            caseBaseInfo.orgFullId = this.userInfo.org.orgFullId;
            caseBaseInfo.userId = this.userInfo.org.id;
            caseBaseInfo.reportedName = this.userInfo.org.orgName;
            caseBaseInfo.reportedMobile = this.userInfo.userExtend.userMoblie;
            caseBaseInfo.creator = this.userInfo.userName;
          }

          caseBaseInfo.casesTitle = "关于" + caseBaseInfo.casesTitle + "的案件";
          caseBaseInfo.casesTitle = caseBaseInfo.casesTitle.replace(/\s+/g,"");
          
          caseBaseInfo.defendant = caseBaseInfo.defendant.replace(/\s+/g,"");
          caseBaseInfo.plaintiff = caseBaseInfo.plaintiff.replace(/\s+/g,"");
          caseBaseInfo.admittanceAgencies = caseBaseInfo.admittanceAgencies.replace(/\s+/g,"");
          caseBaseInfo.admittanceAgenciesManager = caseBaseInfo.admittanceAgenciesManager.replace(/\s+/g,"");
          caseBaseInfo.casesAcceptedNO = caseBaseInfo.casesAcceptedNO.replace(/\s+/g,"");
          caseBaseInfo.baseInfo = caseBaseInfo.baseInfo.replace(/\s+/g,"");
          caseBaseInfo.guide = caseBaseInfo.guide.replace(/\s+/g,"");
          
          
          
          this.$http
            .request({
              url: `/casesBase`,
              method: "post",
              data: caseBaseInfo
            })
            .then(res => {
              // 判断案件是否呈报过，切换提交按钮
              if(res.data.content.id) {
                this.isReported = false;
                this.casesId = res.data.content.id;
              }
              //          this.$router.push()
              this.getCASEDATA(this.casesId);
              
            });
        })
      
      	
        let casesId = this.$route.query.id;
        this.formData.id = casesId
        this.formData.myLawyer.busId = this.myLawyer.id;
        this.formData.myLawOffice.busId = this.myLawyer.lawOfficesId;
        this.formData.oppLawyer.busId = this.oppLawyer.id;
        this.formData.oppLawOffice.busId = this.oppLawyer.lawOfficesId;
        
        
			        this.$http.request({
			            url: '/updateCasesFinsh',
			            method: 'post',
			            data: this.formData
			          })
			          .then((res) => {
			            if(res.data.code === 1) {
			              this.$Message.success('保存成功！')
			              this.saveFlag = true;
			            } else {
			            	this.$Message.destroy();
			              this.$Message.warning('保存失败！')
			            }
			          })
			          .catch((err) => {
			          	this.$Message.destroy();
			            this.$Message.warning('保存失败！')
			          })
			          
      },
      // 提交
      submitForm() {
        // this.flowFlag = true;
        this.flowObj.taskId = this.$route.query.taskId;
        this.flowObj.comment = '完成';

        // 存疑区，必须要先保存才可以，需要有一个flag，暂时保存一个变量，可能需要后台返回flag
        //if(this.saveFlag) {
        	this.$refs.caseFinishForm.validate(valid => {
          if(valid) {
          this.$http.request({
              url: `/completTaskByTaskId`,
              method: 'post',
              data: this.flowObj
            })
            .then((res) => {
              this.$Message.success('提交成功！');
              this.$router.push('/main/flowManagement/personalTaskCenter?tab=done')
            })
            .catch((err) => {
              console.log(err)
            })
					}
					});
        //} else {
        //	this.$Message.destroy();
        //  this.$Message.warning('请先完善表单！')
        //}
      },
      // 呈报公文
      reportDoc() {
        console.log(this.formData);
      },
      // 流程图
      flow() {
        let id;
      	id = this.$route.query.processInstanceId;
      	if(typeof(id) != "undefined") {
        	gotoFlowChart(id);
       	}else{
       		this.$Message.destroy();
       		this.$Message.error("流程图启动中，查看流程图失败");
       	}
      },
      generateReporter() {
        this.$Message.loading("正在生成中。。。");
        setTimeout(() => {
          this.$router.push("/main/caseManage/caseResult");
        }, 1000);
      },
      getLawyerInfo() {
        let casesId = this.$route.query.id;
        this.$http.request({
            url: `/cases/${casesId}`,
            method: 'get'
          })
          .then((res) => {
            this.caseData = res.data.content;
            if(res.data.content.lawyers) {
              let lawyers = res.data.content.lawyers;
              this.formData.isExternal = res.data.content.isExternal;
              lawyers.forEach(item => {
                if(item.oppositeFlag) {
                  this.oppLawyer = item;
                } else {
                  this.myLawyer = item;
                }
              });
            } else {
            	this.$Message.destroy();
              this.$Message.warning('信息不存在')
            }
          })
      },
      getHistoryTask() {
        let processInstanceId = this.$route.query.processInstanceId;
        this.$http.request({
            url: `/hisTasks/${processInstanceId}`,
            method: 'get'
          })
          .then((res) => {
            this.historyInfoData = res.data.content.hisTask;
          })
      },
      startExternal() {
        this.showStartExternal = true;
      },
      editForm(){
      	
        
        this.$refs.caseBaseInfo.$refs.baseInfo.validateField('casesTitle', (valid) => {
          //如果没有填写案件标题，不能修改
          if(valid) return;
          let caseBaseInfo = { ...this.$refs.caseBaseInfo.baseForm };
          if(this.userInfo) {
            caseBaseInfo.orgFullId = this.userInfo.org.orgFullId;
            caseBaseInfo.userId = this.userInfo.org.id;
            caseBaseInfo.reportedName = this.userInfo.org.orgName;
            caseBaseInfo.reportedMobile = this.userInfo.userExtend.userMoblie;
            caseBaseInfo.creator = this.userInfo.userName;
          }

          caseBaseInfo.casesTitle = "关于" + caseBaseInfo.casesTitle + "的案件";
          caseBaseInfo.casesTitle = caseBaseInfo.casesTitle.replace(/\s+/g,"");
          
          caseBaseInfo.defendant = caseBaseInfo.defendant.replace(/\s+/g,"");
          caseBaseInfo.plaintiff = caseBaseInfo.plaintiff.replace(/\s+/g,"");
          caseBaseInfo.admittanceAgencies = caseBaseInfo.admittanceAgencies.replace(/\s+/g,"");
          caseBaseInfo.admittanceAgenciesManager = caseBaseInfo.admittanceAgenciesManager.replace(/\s+/g,"");
          caseBaseInfo.casesAcceptedNO = caseBaseInfo.casesAcceptedNO.replace(/\s+/g,"");
          caseBaseInfo.baseInfo = caseBaseInfo.baseInfo.replace(/\s+/g,"");
          caseBaseInfo.guide = caseBaseInfo.guide.replace(/\s+/g,"");
          
          
          
          this.$http
            .request({
              url: `/cases`,
              method: "post",
              data: caseBaseInfo
            })
            .then(res => {
              // 判断案件是否呈报过，切换提交按钮
              if(res.data.content.id) {
                this.isReported = false;
                this.casesId = res.data.content.id;
              }
              //          this.$router.push()
              this.getCASEDATA(this.casesId);
              this.$Message.success('修改成功！');
            });
        })
      
      
      },
      issubmitForm() {
        let id
        id = this.$route.query.id;
        if(typeof(id) != "undefined") {
          this.isSaved = false;
        } else {
          this.isSaved = true;
        }

      },
    }
  };
</script>
<style lang="less">
  .caseFinish {
    .btnGroup {
      text-align: right;
      margin-top: -36px;
      width: 500px;
    }
    .caseFinishForm {
      .ivu-form-item-label {
        text-align: left;
        width: 85px;
      }
      .textarea {
        height: 120px;
        .ivu-input {
          height: 100%;
        }
      }
      .caseBaseInfo {
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;
        color: #1a1a1a;
        .title {
          font-size: 20px;
        }
        .content {
          padding: 0 15px;
          font-size: 14px;
          .row {
            margin: 5px;
            .col {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .label {
                display: inline-block;
                text-align: left;
              }
              .cont {
                display: inline-block;
                line-height: 20px;
                width: 300px;
                border-radius: 3px;
                padding: 5px 10px;
                &.textarea {
                  width: 80%;
                }
              }
            }
          }
        }
      }
      .baseStyle() {
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;
        .title {
          font-size: 20px;
        }
        .wrapper {
          padding: 0 20px;
        }
      }
      .progress {
        .baseStyle();
        margin-top: 20px;
      }
      .execute {
        .baseStyle();
      }
      .rectificationInfo {
        .baseStyle();
      }
      .causesAnalysis {
        .baseStyle();
      }
      .accountabilityResult {
        .baseStyle();
      }
      .report {
        .baseStyle();
      }
      .reportedSign {
        .baseStyle();
      }
      .archivesNo {
        .baseStyle();
      }
      .appraise {
        .baseStyle();
        height: 600px;
        .wrapper {
          display: flex;
          justify-content: center;
          .myLawyer {
            padding: 0px 20px 20px 20px;
            width: 510px;
            height: 530px;
            border: 1px solid #ccc;
            border-radius: 4px;
            .myTitleA {
              font-size: 16px;
              color: #fff;
              background: url(../../assets/icons.png) no-repeat;
              background-position: 3px -169px;
              width: 184px;
              height: 40px;
              text-align: center;
              line-height: 34px;
              margin: 0 auto;
              margin-bottom: 20px;
              margin-top: -1px;
            }
            .myTitleB {
              font-size: 16px;
              color: #fff;
              background: url(../../assets/icons.png) no-repeat;
              background-position: -197px -169px;
              width: 184px;
              height: 40px;
              text-align: center;
              line-height: 34px;
              margin: 0 auto;
              margin-bottom: 20px;
              margin-top: -1px;
            }
            .row {
              margin-bottom: 24px;
              .col {
                .label {
                  padding: 10px 12px 10px 10px;
                }
                .cont {
                  display: inline-block;
                  line-height: 20px;
                  width: 300px;
                  border: 1px solid #cdcdcd;
                  border-radius: 3px;
                  font-size: 15px;
                  padding: 5px 10px;
                }
              }
            }
            .formItem {
              display: flex;
              .ivu-form-item-content {
                width: 86%;
              }
            }
          }
        }
      }
    }
  }
</style>