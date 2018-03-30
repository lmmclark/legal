<template>
  <div class="caseReport">
    <LgBreadcrumb :path='path'>
      <div class="btnGroup">
        <Button v-if='!isSaved' type="primary" @click="saveForm" :disabled="isSaved">保存</Button>
        <Button v-if='isSaved&&completeFlag!=2' type="primary" @click="updateForm">修改</Button>
        <!--<Button type="primary" @click="reportDoc">呈报公文</Button>-->
        <Button v-if='completeFlag!=2' type="primary" @click="submitForm" :disabled="isReported">提交</Button>
        <Button type="primary" @click="flow" >流程图</Button>
        <Button type="primary" @click="generateReporter">生成报告</Button>
      </div>
    </LgBreadcrumb>
    <div class="caseForm">
      <CaseBaseInfoModifiable ref='caseBaseInfo' :data='casedata'></CaseBaseInfoModifiable>
      <CaseRelevanceInfo></CaseRelevanceInfo>
    </div>
    <FlowSubmit v-model="flowFlag" @ok="selectFlow"></FlowSubmit>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from "vuex";
  import IconTitle from "../../components/IconTitle";
  import FlowSubmit from '../../components/FlowSubmit';
  import { gotoFlowChart } from '../../utils'
  import CaseBaseInfoModifiable from '../../components/CaseBaseInfoModifiable'
  import CaseRelevanceInfo from '@/components/CaseRelevanceInfo'
  import LgBreadcrumb from '../../components/LgBreadcrumb'
  import * as Types from '@/store/mutation-types'

  export default {
    name: "caseReport",
    components: {
      IconTitle,
      FlowSubmit,
      CaseBaseInfoModifiable,
      CaseRelevanceInfo,
      LgBreadcrumb
    },
    mounted() {
      this.issubmitForm();
      this.isCheckFlow();
    },
    created() {
      this.casesId = this.$route.query.id;
      this.getCASEDATA(this.casesId);
      if(this.$route.query.id) {
        this.isReported = true;
      }
      this.completeFlag = this.$route.query.completeFlag;
    },
    watch: {
      '$route.query.id': function(val) {
      	
        this.getCASEDATA(val);
        
        if(this.$refs.caseBaseInfo.baseForm.id!=""){
        	this.$refs.caseBaseInfo.baseForm.id="";
        }
        
        if(val === undefined) {
          this.isSaved = false;
        }
      }
    },
    methods: {
      ...mapActions(['getCASEDATA']),
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
      // 生成报告
      generateReporter() {
        this.$Message.loading("正在生成中。。。");
        setTimeout(() => {
          this.$router.push("/main/caseManage/caseResult");
        }, 1000);
      },
      // 提交
      submitForm() {
        let id = this.$route.query.id;
        let that = this;
        this.$refs.caseBaseInfo.$refs.baseInfo.validate((valid) => {
          if(valid) {
	          if(typeof(id) != "undefined") {
	            this.$http.request({
	                method: 'get',
	                url: '/cases/' + id,
	              })
	              .then(function(res) {
	                if(res.data.content.isExternal) {
	                  let reserveFirst;
	                  reserveFirst = res.data.content.reserveFirst;
	                  if(reserveFirst == 0) {
	                    that.$Message.destroy();
	                    that.$Message.error('该案件外聘律师流程未完成');
	                  } else {
	                    that.flowFlag = true;
	                  }
	                } else {
	                  that.flowFlag = true;
	                }
	              })
	              .catch(function(err) {
	                console.log(err)
	              })
	          } else {
	            that.flowFlag = true;
	          }
          }
        })
      },
      selectFlow(data) {
        if(data) {
          this.flowObj.userId = this.userInfo.org.id;
          this.flowObj.doUserId = data.people[0].id;
          this.flowObj.comment = data.opinion;
          this.flowObj.busId = this.casesId;
          this.$http.request({
              url: `/subCases`,
              method: 'post',
              data: this.flowObj
            })
            .then((res) => {
              this.$Message.success('提交成功！');
              this.$router.push('/main/flowManagement/personalTaskCenter?tab=todo')
            })
            .catch((err) => {
              console.log(err)
            })
        }
        return;
      },
      // 保存
      saveForm() {
        this.$refs.caseBaseInfo.$refs.baseInfo.validateField('casesTitle', (valid) => {
          //如果没有填写案件标题，不能保存
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
              this.isSaved = true;
              this.$Message.success('保存成功！');
            });
        })
      },
      updateForm() {
        let caseInfo = { ...this.$refs.caseBaseInfo.baseForm };
        caseInfo.casesTitle = "关于" + caseInfo.casesTitle + "的案件";
        this.$http.request({
            url: '/casesBase',
            method: 'post',
            data: caseInfo
          })
          .then((res) => {
            if(res.data.code === 1) {
              this.$Message.success('修改成功');
              this.isReported = false;
            } else {
              this.$Message.destroy();
              this.$Message.error('修改失败');
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 呈报公文
      reportDoc() {
        console.log(this.baseForm);
      },
      // 流程图
      flow() {
      	let id;
      	id = this.$route.query.processInstanceId;
      	if(typeof(id) != "undefined") {
        	gotoFlowChart(id);
       	}else{
        	gotoFlowChart('',1);
       		
//     		this.$Message.destroy();
//     		this.$Message.error("流程图启动中，查看流程图失败");
       	}
      },
      issubmitForm() {
        let id
        id = this.$route.query.id;
        if(typeof(id) != "undefined") {
          this.isSaved = true;
        } else {
          this.isSaved = false;
        }

      },
    },
    computed: {
      ...mapGetters(['userInfo']),
      ...mapState(["casedata"]),
    },
    data() {
      const validateMoney = (rule, value, callback) => {
        let val = Number(value);
        if(value === "") {
          callback(new Error("金额不能为空"));
        } else if(isNaN(val)) {
          callback(new Error("请输入正确的数字格式"));
        } else {
          callback();
        }
      };
      return {
        //面包屑路径
        path: [
          { 'name': '案件管理', 'path': '/main/caseManage' },
          { 'name': '案件呈报', 'path': '' },
        ],
        // 流程开关
        flowFlag: false,
        // 案件id
        casesId: '',
        // 是否呈报过案件
        isReported: true,
        // 是否保存过案件
        isSaved: false,
				//是否能查看流程图
				isFlow:false,
				//待办已办标示 待办1 已办2
				completeFlag:'',
        flowObj: {
          // 当前用户
          userId: '',
          // 流程审批意见
          comment: '',
          // 审核
          audit: '1',
          // 案件id
          busId: '',
          // type
          busType: "casesReport",
          // 流程办理人
          doUserId: ''
        },

        optype: ''
      };
    },
  };
</script>

<style lang="less">
  @import url("../../less/common.less");
  @import url("../../less/tree.less");
  .caseReport {
    .btnGroup {
      width: 320px;
      text-align: right;
      margin-bottom: 20px;
      margin-top: -36px;
    }
  }
</style>