<template>
  <div class="caseExecute">
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
    <CaseBaseInfoModifiable :data='casedata' ref='caseBaseInfo'></CaseBaseInfoModifiable>
    <div class="progress">
      <IconTitle title='案件进展情况' left='-120' top='-30'></IconTitle>
      <ProgressInfo :data='progressData'></ProgressInfo>
    </div>
    <div class="progress">
      <div class="title clearfix">
        <IconTitle title='案件执行情况' left='-200' top='-30'></IconTitle>
        <Button type="primary" class="btn" size="small" @click="addExecute">添加执行情况</Button>
      </div>
      <ExecuteInfo :data="tableData1"></ExecuteInfo>
    </div>
    <Modal v-model="addExecutedModal" title="添加案件执行信息" width="1100" class-name="addExecutedModal">
      <Form :model="excuteForm" :rules="rule" ref="excuteForm">
        <Row>
          <Col span="10">
          <FormItem label="案件阶段：" prop="stageId" :label-width="190">
            <Select v-model="excuteForm.stageId" placeholder="请选择案件阶段" :label-in-value="true" @on-change="excuteForm.stageName=$event.label">
              <Option v-for="item in ajjzjd" :value="item.id" :key="item.id" :label="item.dictName">{{item.dictName}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem label="案件进展：" prop="casesProgresssId" :label-width="190">
            <Select v-model="excuteForm.casesProgresssId" placeholder="请选择案件阶段">
              <Option v-for="item in casedata.casesProgressDTO" :value="item.id" :key="item.id">{{item.stageName}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem label="律师费总额：" prop="totalLegalAmount" :label-width="190">
            <Input v-model="excuteForm.totalLegalAmount" placeholder="请输入律师总费用" @on-blur="formatMoney($event.target.value,'totalLegalAmount')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem label="已支付金额：" prop="paidAmount" :label-width="190">
            <Input v-model="excuteForm.paidAmount" placeholder="请输入已支付金额" @on-blur="formatMoney($event.target.value,'paidAmount')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem label="是否进行/完成成因分析：" prop="causesAnalysisFlag" :label-width="190">
            <RadioGroup v-model="excuteForm.causesAnalysisFlag" placeholder="请选择是否进行/完成成因分析">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem label="已执行款项：" prop="executionAmount" :label-width="190">
            <Input v-model="excuteForm.executionAmount" placeholder="请输入已执行款项" @on-blur="formatMoney($event.target.value,'executionAmount')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem label="避免/挽回经济损失：" prop="recoverAmount" :label-width="190">
            <Input v-model="excuteForm.recoverAmount" placeholder="请输入避免/挽回经济损失" @on-blur="formatMoney($event.target.value,'recoverAmount')"></Input>
          </FormItem>
          </Col>
          <Col span="10" offset="3">
          <FormItem label="判决/调解金额：" prop="mediationAmount" :label-width="190">
            <Input v-model="excuteForm.mediationAmount" placeholder="请输入判决/调解金额" @on-blur="formatMoney($event.target.value,'mediationAmount')"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="是否问责：" prop="accountableFlag" :label-width="190">
            <RadioGroup v-model="excuteForm.accountableFlag" placeholder="请选择是否问责">
              <Radio :label="1">是</Radio>
              <Radio :label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="判决结果：" prop="judgmentResult" :label-width="190">
            <Input type="textarea" v-model="excuteForm.judgmentResult" placeholder="请输入判决结果" style="width:840px;"></Input>
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
  import List from "../../components/CaseBaseInfo";
  import IconTitle from '../../components/IconTitle';
  import FlowSubmit from '../../components/FlowSubmit'
  import ApprovalHistory from '../../components/ApprovalHistory'
  import LgBreadcrumb from '../../components/LgBreadcrumb'
  import { mapState, mapActions } from 'vuex'
  import { gotoFlowChart } from '../../utils'
  import CaseBaseInfoModifiable from '../../components/CaseBaseInfoModifiable'
  import ExecuteInfo from '@/components/CaseExecuteInfo'
  import ProgressInfo from '@/components/CaseProgressInfo'
	import OrgTreeStartExternal from '@/components/OrgTreeStartExternal'
  export default {
    name: "caseExecute",
    components: {
      List,
      IconTitle,
      ApprovalHistory,
      FlowSubmit,
      LgBreadcrumb,
      CaseBaseInfoModifiable,
      ExecuteInfo,
      ProgressInfo,
      OrgTreeStartExternal
    },
    computed: {
      ...mapState([
        'casedata',
        'ajjzjd'
      ]),
    },
    watch: {
      casedata(val) {
        this.progressData = val.casesProgressDTO;
        this.tableData1 = this.casedata.casesExecutionDTO;
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
      this.tableData1 = this.casedata.casesExecutionDTO;
      this.progressData = this.casedata.casesProgressDTO;
      this.completeFlag = this.$route.query.completeFlag;
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
        addExecutedModal: false,
        flowFlag: false,
        historyInfoData: [],
        showStartExternal: false,
        isFlow:false,
        //待办已办标示 待办1 已办2
        completeFlag:"",
        // 是否修改过案件
        isSaved: false,
        //面包屑路径
        path: [
          { 'name': '案件管理', 'path': '/main/caseManage' },
          { 'name': '案件执行', 'path': '' },
        ],
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
        excuteForm: {
          // 案件阶段
          stageId: "",
          // 案件阶段名称
          stageName: "",
          // 判决/调解金额（万元）
          mediationAmount: "",
          // 已执行款项（人民币万元）
          executionAmount: "",
          // 避免/挽回经济损失（人民币万元）
          recoverAmount: "",
          // 律师费总额（人民币万元）
          totalLegalAmount: "",
          // 已支付金额（人民币万元）
          paidAmount: "",
          // 对方外聘律师
          lawyerName: "",
          // 外聘律所
          lawOfficeName: "",
          // 是否问责
          accountableFlag: 1,
          // 是否进行/完成成因分析
          causesAnalysisFlag: 1,
          // 判决结果
          judgmentResult: "",
          // 案件id
          casessId: "",
          // 案件进展阶段id
          casesProgresssId: '',
        },
        rule: {
          // 案件阶段
          stageId: [
            { required: true, type: "number", message: "不能为空", trigger: "change" }
          ],
          // 案件进展
          casesProgresssId: [
            { required: true, type: "number", message: "不能为空", trigger: "change" }
          ],
          // 判决/调解金额（万元）
          mediationAmount: [
            { required: true, type: "number", validator: validateMoney, trigger: "blur" }
          ],
          // 已执行款项（人民币万元）
          executionAmount: [
            { required: true, validator: validateMoney, trigger: "blur" }
          ],
          // 避免/挽回经济损失（人民币万元）
          recoverAmount: [
            { required: true, validator: validateMoney, trigger: "blur" }
          ],
          // 律师费用总额
          totalLegalAmount: [
            { required: true, validator: validateMoney, trigger: "blur" }
          ],
          // 已支付金额（人民币万元）
          paidAmount: [
            { required: true, validator: validateMoney, trigger: "blur" }
          ],
          // 对方律师及律所
          lawyerName: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          lawOfficeName: [
            { required: true, message: "不能为空", trigger: "blur" }
          ],
          // 是否问责
          accountableFlag: [
            { required: true, type: "number", message: "不能为空", trigger: "change" }
          ],
          // 是否进行/完成成因分析
          causesAnalysisFlag: [
            { required: true, type: "number", message: "不能为空", trigger: "change" }
          ],
          // 判决结果
          judgmentResult: [{ 
          	validator: validateSpace,
          	required: true,
          	trigger: "blur"
          }]
        },
        caseInfo: {
          caseNo: "56252523",
          title: "关于***公司的****案件",
          fileNo: "No26244",
          leaderInstruction: "这个案件比较重要，尽量打赢，巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉......",
          caseType: "刑事案件",
          caseBrief: "主要是公司之间的纠纷，涉及到的钱比较多",
          caseBaseInfo: "公司纠纷"
        },
        progressData: [],
        tableData1: [],
      };
    },
    methods: {
      ...mapActions([
        'getCASEDATA',
        'getAJJZJD'
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
              this.excuteForm[type] = parseFloat(val_string);
            } else {
              var arr = val_string.split(".");
              var newValue_string = arr[0] + "." + arr[1].slice(0, 2);
              this.excuteForm[type] = parseFloat(newValue_string);
            }
          }
        }
      },
      // 添加执行情况
      addExecute() {
        this.addExecutedModal = !this.addExecutedModal;
        // 清空表单
        let obj = this.excuteForm;
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
        let object = this.excuteForm;
        this.excuteForm.judgmentResult = this.excuteForm.judgmentResult.replace(/\s+/g,"");
        // 深复制对象，修改传入的值
        let obj = {};
        for(const key in object) {
          obj[key] = object[key];
        }
        obj.causesAnalysisFlag = obj.causesAnalysisFlag == 1 ? 1 : 0;
        obj.accountableFlag = obj.accountableFlag == 1 ? 1 : 0;
        this.$refs.excuteForm.validate(valid => {
          if(valid) {
            // 此处id需要从query中搞到
            this.excuteForm.casessId = this.$route.query.id;
            this.$http.request({
                url: '/casesExecutions',
                method: 'post',
                data: this.excuteForm
              })
              .then((res) => {
                this.tableData1.push(obj);
              })
            this.addExecutedModal = false;
          } else {
          	this.$Message.destroy();
            this.$Message.warning("请您先完善表单！");
          }
        });
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
      selectFlow(data) {
        if(data) {
          this.flowObj.taskId = this.$route.query.taskId;
          this.flowObj.userId = data.people[0].id;
          this.flowObj.comment = data.opinion;
          if(this.tableData1.length > 0) {
            this.$http.request({
                url: `/completTaskByTaskId`,
                method: 'post',
                data: this.flowObj
              })
              .then((res) => {
                this.$Message.success('提交成功！');
                this.$router.push(
                  '/main/flowManagement/personalTaskCenter?tab=todo')
              })
              .catch((err) => {
                console.log(err)
              })

          } else {
          	this.$Message.destroy();
            this.$Message.warning('请先添加执行！')
          }
        }
        return;
      },
      // 取消
      cancel() {
        this.addExecutedModal = false;
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
        console.log(this.excuteForm);
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
          this.$router.push("main//caseManage/caseResult");
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
  .caseExecute {
    .btnGroup {
      text-align: right;
      margin-bottom: 20px;
      margin-top: -36px;
    }
    .case-base-info {
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
          padding: 15px 20px;
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
  
  .addExecutedModal {
    .ivu-modal-header {
      text-align: center;
      font-size: 14px;
    }
    .ivu-modal-footer {
      .footer {
        display: flex;
        justify-content: center;
        .cancel {
          margin-left: 8px;
        }
      }
    }
  }
</style>