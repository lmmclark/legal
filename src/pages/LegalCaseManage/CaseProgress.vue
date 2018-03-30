<template>
  <div class="caseProgress">
    <LgBreadcrumb :path='path'>
      <div class="btnGroup">
        <Button v-if='completeFlag!=2' type="primary" @click="saveForm" :disabled="isSaved">修改</Button> 
        <Button v-if='completeFlag!=2' type="primary" @click="startExternal" :disabled="casedata.externalStartFlag==1?true:false">启动外聘</Button>
        <Button v-if='completeFlag!=2' type="primary" @click="submitForm">提交</Button>
        <!--<Button type="primary" @click="reportDoc">呈报公文</Button>-->
        <Button type="primary" @click="flow" :disabled="isFlow">流程图</Button>
        <Button type="primary" @click="generateReporter">生成案件报告</Button>
      </div>
    </LgBreadcrumb>
    <ApprovalHistory :data='historyInfoData'></ApprovalHistory>
    <CaseBaseInfoModifiable ref='caseBaseInfo' :data='casedata'></CaseBaseInfoModifiable>
    <div class="progress">
      <div class="title clearfix">
        <IconTitle title='案件进展情况' left='-120' top='-30'></IconTitle>
        <Button type="primary" class="btn" size="small" @click="addProgress">添加进展</Button>
      </div>
      <ProgressInfo :data='progressData'></ProgressInfo>
    </div>
    <Modal v-model="addProgressModal" title="添加案件进展信息" width="1100" class-name="addProgressModal">
      <Form :model="progressForm" :rules="rule" ref="progressForm">
        <Row>
          <Col span="10">
          <FormItem label="案件阶段：" prop="stageId" :label-width="190">
            <Select v-model="progressForm.stageId" placeholder="请选择案件阶段" :label-in-value="true" @on-change="progressForm.stageName=$event.label">
              <Option v-for="item in ajjzjd" :value="item.id" :key="item.id" :label="item.dictName">{{item.dictName}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem label="已支付金额：" prop="paidAmount" :label-width="190">
            <Input v-model="progressForm.paidAmount" placeholder="请输入已支付金额" @on-blur="formatMoney($event.target.value,'paidAmount')"></Input>
          </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="10">
          <FormItem label="对方外聘律师：" :label-width="190">
            <Input v-model="progressForm.oppositeLawyerName" placeholder="请输入对方外聘律师"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem label="对方外聘律所：" :label-width="190">
            <Input v-model="progressForm.oppositeLawyerOfficeName" placeholder="请输入对方外聘律所"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem label="受理法院/仲裁机构：" prop="admittanceAgencies" :label-width="190">
            <Input v-model="progressForm.admittanceAgencies" placeholder="请输入受理法院/仲裁机构"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem label="是否进行/完成成因分析：" prop="causesAnalysisFlag" :label-width="190">
            <RadioGroup v-model="progressForm.causesAnalysisFlag" placeholder="请选择是否进行/完成成因分析">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem label="承办法官/仲裁员：" prop="admittanceAgenciesManager" :label-width="190">
            <Input v-model="progressForm.admittanceAgenciesManager" placeholder="请输入承办法官/仲裁员"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem label="受案单位所在地：" prop="admittanceAgenciesAddress" :label-width="190">
            <Select v-model="progressForm.admittanceAgenciesAddress" placeholder="请选择受案单位所在地">
				        <Option v-for='(item,index) in cityArr' :value="item.value" :key='item.index'>{{item.label}}</Option>
				    </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="是否问责：" prop="accountableFlag" :label-width="190">
            <RadioGroup v-model="progressForm.accountableFlag" placeholder="请选择是否问责">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="调处时间计划表：" prop="mediationPlanList" :label-width="190">
            <Input type="textarea" v-model="progressForm.mediationPlanList" placeholder="请输入调处时间计划表"
              style="width:840px;"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="预测结果：" prop="predictionResult" :label-width="190">
            <Input type="textarea" v-model="progressForm.predictionResult" placeholder="请输入预测结果" style="width:840px;"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="预计结果：" prop="expectedResults" :label-width="190">
            <Input type="textarea" v-model="progressForm.expectedResults" placeholder="请输入预计结果" style="width:840px;"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="footer">
        <Button type="primary" class="confirm green" @click="confirm">确定</Button>
        <Button type="primary" class="cancel" @click="cancel">取消</Button>
      </div>
    </Modal>
    <FlowSubmit v-model="flowFlag" @ok="selectFlow"></FlowSubmit>
    <OrgTreeStartExternal v-model="showStartExternal"></OrgTreeStartExternal>
  </div>
</template>
<script>
  import CaseBaseInfoModifiable from '../../components/CaseBaseInfoModifiable'
  import IconTitle from "../../components/IconTitle";
  import ApprovalHistory from '../../components/ApprovalHistory'
  import FlowSubmit from '../../components/FlowSubmit'
	import { cityArr } from '../../utils/area.js'
  import LgBreadcrumb from '../../components/LgBreadcrumb'
  import { mapState, mapActions } from "vuex";
  import { gotoFlowChart } from '../../utils'
  import OrgTreeStartExternal from '@/components/OrgTreeStartExternal'
  import ProgressInfo from '@/components/CaseProgressInfo'
  export default {
    name: "caseProgress",
    components: {
      CaseBaseInfoModifiable,
      IconTitle,
      ApprovalHistory,
      FlowSubmit,
      LgBreadcrumb,
      OrgTreeStartExternal,
      ProgressInfo
    },
    computed: {
      ...mapState(["casedata", "ajjzjd"])
    },
    watch: {
      //没有改动之前的部分，所以加了watch,此处可能更加适合用computed
      casedata(val) {
        this.progressData = val.casesProgressDTO;
      },
      //表单数据缓存
      '$route.query.id': function(val) {
        this.getCASEDATA(val);
        if(val === undefined) {
          this.isSaved = false;
        }
      }
    },
    mounted() {
    	this.isCheckFlow();
    	this.issubmitForm();
    },
    created() {
      this.getCASEDATA(this.$route.query.id);
      this.getAJJZJD();
      this.getHistoryTask();
      this.progressData = this.casedata.casesProgressDTO;
      this.completeFlag = this.$route.query.completeFlag;
      this.cityArr=cityArr;
    },
    data() {
      const validateMoney = (rule, value, callback) => {
        let val = Number(value);
        if(value === "") {
          callback(new Error("金额不能为空"));
        } else if(isNaN(val)) {
          callback(new Error("请输入正确的数字格式"));
        } else if(val<0){
        	callback(new Error("请输入正确的数字格式"));
        }else {
          callback();
        }
      };
      const validateSpace = (rule, value, callback) => {
        value = value.replace(/\s+/g,"");
        if(value === "") {
          callback(new Error("不能为空！"));
        }else {
          callback();
        }
      };
      return {
        //面包屑路径
        path: [
          { 'name': '案件管理', 'path': '/main/caseManage' },
          { 'name': '案件进展', 'path': '' },
        ],
        showStartExternal: false,
        addProgressModal: false,
        flowFlag: false,
        isFlow:false,
        cityArr:[],
        // 是否修改过案件
        isSaved: false,
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
        progressForm: {
          // 案件阶段名称
          stageName: "",
          // 案件id
          stageId: "",
          // 受理法院/仲裁机构
          admittanceAgencies: "",
          // 受案单位所在地
          admittanceAgenciesAddress: "",
          // 承办法官/仲裁员
          admittanceAgenciesManager: "",
          // 律师费总额
          //totalLegalAmount: "",
          // 已支付金额
          paidAmount: "",
          // 对方外聘律师
          oppositeLawyerName: "",
          // 对方外聘律所
          oppositeLawyerOfficeName: "",
          // 预测结果
          predictionResult: "",
          // 调处时间计划表
          mediationPlanList: "",
          // 预计结果
          expectedResults: "",
          // 是否问责
          accountableFlag: 1,
          // 是否进行/完成成因分析
          causesAnalysisFlag: 1,
          //待办已办标示 待办1 已办2
          completeFlag:"",
          casessId: "",
          
        },
        rule: {
          stageId: [
            { required: true, type: "number", message: "不能为空", trigger: "change" }
          ],
          admittanceAgencies: [{
          	validator: validateSpace,
          	required: true,
          	trigger: "blur"
         	}],
          admittanceAgenciesAddress: [
            { required: true, type: "string", message: "不能为空", trigger: "change" }
          ],
          admittanceAgenciesManager: [{ 
          	validator: validateSpace,
          	required: true, 
          	trigger: "blur"
          }],
          paidAmount: [{
            validator: validateMoney,
            required: true,
            trigger: "blur"
          }],
          oppositeLawyerName: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          oppositeLawyerOfficeName: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          predictionResult: [{ 
          	validator: validateSpace,
          	required: true, 
          	trigger: "blur"
          }],
          mediationPlanList: [{ 
          	validator: validateSpace,
          	required: true, 
          	trigger: "blur"
          }],
          expectedResults: [{ 
          	validator: validateSpace,
          	required: true, 
          	trigger: "blur"
          }],
          accountableFlag: [{
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }],
          causesAnalysisFlag: [{
            required: true,
            type: "number",
            message: "不能为空",
            trigger: "change"
          }]
        },
        progressData: [],
        historyInfoData: [],
      };
    },
    methods: {
      ...mapActions(["getCASEDATA", "getAJJZJD"]),
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
      // 格式化金额，保留两位小数
      formatMoney(val, type) {
        if(val == "") {
          return;
        } else {
          val = Number(val);
          if(isNaN(val)) {
            return;
          } else {
            // 保留两位小数
            var val_string = val.toString();
            if(val_string.indexOf(".") < 0) {
              val_string = val_string + '.00';
              this.progressForm[type] = parseFloat(val_string);
            } else {
              var arr = val_string.split(".");
              var newValue_string = arr[0] + "." + arr[1].slice(0, 2);
              this.progressForm[type] = parseFloat(newValue_string);
            }
          }
        }
      },
      // 添加进展
      addProgress() {
        this.addProgressModal = !this.addProgressModal;
        let obj = this.progressForm;
        for(const key in obj) {
          switch(key) {
            case "causesAnalysisFlag":
              obj[key] = 1;
              break;
            case "accountableFlag":
              obj[key] = 1;
              break;
            default:
              obj[key] = "";
              break;
          }
        }
      },
      // 确认
      confirm() {
        let object = this.progressForm;
        this.progressForm.admittanceAgencies = this.progressForm.admittanceAgencies.replace(/\s+/g,"");
        this.progressForm.admittanceAgenciesManager = this.progressForm.admittanceAgenciesManager.replace(/\s+/g,"");
        this.progressForm.predictionResult = this.progressForm.predictionResult.replace(/\s+/g,"");
        this.progressForm.mediationPlanList = this.progressForm.mediationPlanList.replace(/\s+/g,"");
        this.progressForm.expectedResults = this.progressForm.expectedResults.replace(/\s+/g,"");
        // 深复制对象，修改传入的值
        let obj = {};
        for(const key in object) {
          obj[key] = object[key];
        }
        obj.causesAnalysisFlag = obj.causesAnalysisFlag == 1 ? 1 : 0;
        obj.accountableFlag = obj.accountableFlag == 1 ? 1 : 0;
        this.$refs.progressForm.validate(valid => {
          if(valid) {
            // 提交
            // 此处id需要从query中搞到
            this.progressForm.casessId = this.$route.query.id;
            this.$http.request({
                url: '/casesProgress',
                method: 'post',
                data: this.progressForm
              })
              .then((res) => {
                this.progressData.push(obj);
              })
            this.addProgressModal = false;
          } else {
          	this.$Message.destroy();
            this.$Message.warning("请您先完善表单！");
          }
        });
      },
      getHistoryTask() {
        let processInstanceId = this.$route.query.processInstanceId;
        if(!processInstanceId) {
          return;
        }
        let _this = this;
        this.$http.request({
            url: `/hisTasks/${processInstanceId}`,
            method: 'get'
          })
          .then((res) => {
            _this.historyInfoData = res.data.content.hisTask;
          })
      },
      selectFlow(data) {
        if(data) {
          this.flowObj.taskId = this.$route.query.taskId;
          this.flowObj.userId = data.people[0].id;
          this.flowObj.comment = data.opinion;
          if(this.progressData.length > 0) {
            this.$http.request({
                url: `/completTaskByTaskId`,
                method: 'post',
                data: this.flowObj
              })
              .then((res) => {
                console.log(res);
                this.$Message.success('提交成功！');
                this.$router.push(
                  '/main/flowManagement/personalTaskCenter?tab=todo')
              })
              .catch((err) => {
                console.log(err)
              })

          } else {
          	this.$Message.destroy();
            this.$Message.warning('请先添加进展！')
          }
        }
        return;
      },
      // 取消
      cancel() {
        this.addProgressModal = false;
      },
      // 修改
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
              this.$Message.success('修改成功！');
            });
        })
      
      },
      // 提交
      submitForm() {
      	this.$refs.caseBaseInfo.$refs.baseInfo.validate((valid) => {
          if(!valid) {
            return
          }
        this.flowFlag = true;
        })
      },
      // 呈报公文
      reportDoc() {
        console.log(this.progressForm);
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
      // 生成案件报告
      generateReporter() {
        this.$Message.loading("正在生成中。。。");
        setTimeout(() => {
          this.$router.push("/main/caseManage/caseResult");
        }, 1000);
      },
      startExternal() {
        this.showStartExternal = true;
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
  @import url("../../less/common.less");
  .caseProgress {
    .btnGroup {
      text-align: right;
      margin-bottom: 20px;
      margin-top: -36px;
    }
    .case-base-info {
      margin-top: 20px;
      .content {
        margin: 0 0 20px 0 !important;
        .content-item {
          .content-caseInfo {
            .case-label {
              font-size: 14px !important;
            }
            .case-detail {
              font-size: 14px !important;
            }
          }
        }
        .title {
          padding: 15px 5px;
          font-size: 20px !important;
        }
      }
    }
    .progress {
      background: #fff;
      padding: 20px;
      .title {
        .btn {
          float: right;
          margin-top: -40px;
        }
      }
    }
  }
  
  .addProgressModal {
    .ivu-modal-header {
      text-align: center;
      font-size: 14px;
    }
    .ivu-modal-footer {
      .footer {
        display: flex;
        justify-content: center;
      }
    }
  }
</style>