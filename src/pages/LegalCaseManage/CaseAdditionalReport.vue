<template>
  <div class="CaseAdditionalReport">
    <LgBreadcrumb :path='path'>
      <div class="btnGroup">
        <Button type="primary" @click="saveForm" :disabled="isSaved">保存</Button>
        <!--<Button type="primary" @click="reportDoc">呈报公文</Button>-->
        <Button type="primary" @click="submitForm" :disabled="isReported">提交</Button>
        <Button type="primary" @click="flow" :disabled="isFlow">流程图</Button>
        <Button type="primary" @click="generateReporter">生成报告</Button>
      </div>
    </LgBreadcrumb>
    <CaseBaseInfoModifiable :data='casedata' ref='caseBaseInfo'></CaseBaseInfoModifiable>
    <CaseRelevanceInfo></CaseRelevanceInfo>
    <FlowSubmit v-model="flowFlag" @ok="selectFlow"></FlowSubmit>
  </div>
</template>

<script>
  import { permissionBaseUrl } from "../../utils";
  import LgTreeIcon from '../../components/LgTreeIcon'
  import { mapState, mapActions, mapGetters } from "vuex";
  import IconTitle from "../../components/IconTitle";
  import FlowSubmit from '../../components/FlowSubmit';
  import { gotoFlowChart } from '../../utils'
  import CaseBaseInfoModifiable from '../../components/CaseBaseInfoModifiable'
  import CaseRelevanceInfo from '@/components/CaseRelevanceInfo'
  import LgBreadcrumb from '../../components/LgBreadcrumb'
  export default {
    name: "CaseAdditionalReport",
    components: {
      IconTitle,
      LgTreeIcon,
      FlowSubmit,
      CaseBaseInfoModifiable,
      CaseRelevanceInfo,
      LgBreadcrumb
    },
    data() {
      return {
        //面包屑路径
        path: [
          { 'name': '案件管理', 'path': '/main/caseManage' },
          { 'name': '案件补录', 'path': '' },
        ],
        flowFlag: false,
        isReported: true,
        isSaved: false,
        isFlow:false
      }
    },
    mounted() {
      this.issubmitForm();
      this.isCheckFlow();
    },
    created() {
      this.getCASEDATA(this.$route.query.id);
    },
    computed: {
      ...mapState(["casedata"]),
      ...mapGetters(['userInfo'])
    },
    methods: {
      ...mapActions(["getCASEDATA"]),
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
        let id
        id = this.$route.query.id;
        let that = this;
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
              this.$router.push(
                '/main/flowManagement/personalTaskCenter?tab=todo')
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
              this.isSaved = true;
              this.$Message.success('保存成功！');
            });
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
       		this.$Message.destroy();
       		this.$Message.error("流程图启动中，查看流程图失败");
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

  };
</script>

<style lang="less">
  @import url("../../less/common.less");
  @import url("../../less/tree.less");
</style>