<template>
  <div class="caseResult" >
    <LgBreadcrumb :path='path'>
      <div class="btnGroup">
        <Button type="primary">打印报告</Button>
        <Button type="primary" @click='downloadpdf'>下载报告</Button>
      </div>
    </LgBreadcrumb>

    <div class="box" id="pdfDom">
      <h2 class="primaryTitle">{{casedata!=null?casedata.casesTitle:''}}</h2>
      <ApprovalHistory :data='historyInfoData'></ApprovalHistory>
      <List ref='BaseInfo' :caseInfo="casedata"></List>
      <div class="progress">
        <IconTitle title='案件进展情况' left='-120' top='-30'></IconTitle>
        <ProgressInfo :data="casedata!=null?casedata.casesProgressDTO:[]"></ProgressInfo>
      </div>
      <div class="execute">
        <IconTitle title='案件执行情况' left='-200' top='-30'></IconTitle>
        <ExecuteInfo :data="casedata!=null?casedata.casesExecutionDTO:[]"></ExecuteInfo>
      </div>
      <div class="abarbeitung">
        <IconTitle title='案件整改情况' left='-80' top='-30'></IconTitle>
        <div class="wrapper">
          <span class="cont textarea">{{casedata!=null?casedata.rectificationInfo:''}}</span>
        </div>
      </div>
      <div class="factor">
        <IconTitle title='案件成因分析情况' left='-80' top='-30'></IconTitle>
        <div class="wrapper">
          <span class="cont textarea">{{casedata!=null?casedata.causesAnalysis:''}}</span>
        </div>
      </div>
      <div class="accountability">
        <IconTitle title='案件问责情况' left='-80' top='-30'></IconTitle>
        <div class="wrapper">
          <span class="cont textarea">{{casedata!=null?casedata.accountabilityResult:''}}</span>
        </div>
      </div>
      <div class="record">
        <IconTitle title='对应档案库' left='-140' top='-30'></IconTitle>
        <div class="content">
          <Row type="flex" class="row" align="middle">
            <Col span="12" class="col">
            <label for="" class="label">档案编号：</label>
            <span class="cont">{{casedata!=null?casedata.archivesNo:''}}</span>
            </Col>
          </Row>
        </div>
      </div>
      <div class="relevance" style="display:none;">
        <IconTitle title='案件关联其他案件信息' left='-80' top='-30'></IconTitle>
        <div class="content">
          <Row type="flex" class="row" align="middle">
            <Col span="12" class="col">
            <label for="" class="label">关联案件编号：</label>
            <span class="cont">暂无</span>
            <!--<span class="cont">{{casedata!=null?casedata.casesCode:''}}</span>-->
            </Col>
            <Col span="12" class="col">
            <label for="" class="label">案件标题：</label>
            <span class="cont">暂无</span>
            <!--<span class="cont">{{casedata!=null?casedata.casesTitle:''}}</span>-->
            </Col>
          </Row>
          <Row type="flex" class="row" align="middle">
            <Col span="12" class="col">
            <label for="" class="label">原告/申请人/控告人：</label>
            <span class="cont">暂无</span>
            <!--<span class="cont">{{casedata!=null?casedata.plaintiff:''}}</span>-->
            </Col>
            <Col span="12" class="col">
            <label for="" class="label">被告/被申请人/被控告人：</label>
            <span class="cont">暂无</span>
            <!--<span class="cont">{{casedata!=null?casedata.defendant:''}}</span>-->
            </Col>
          </Row>
        </div>
      </div>
      <div class="relevanceLawyer">
        <IconTitle title='关联律师信息' left='-380' top='-30'></IconTitle>
        <div class="content">
          <Row type="flex" class="row" align="middle">
            <Col span="12" class="col">
            <label for="" class="label">案件受理机构：</label>
            <span class="cont">{{casedata!=null?casedata.admittanceAgencies:''}}</span>
            </Col>
            <Col span="12" class="col">
            <label for="" class="label">受理案号：</label>
            <span class="cont">{{casedata!=null?casedata.casesAcceptedNO:''}}</span>
            </Col>
          </Row>
          <Row type="flex" class="row" align="middle">
            <Col span="12" class="col">
            <label for="" class="label">案件费用承担公司：</label>
            <span class="cont">{{casedata!=null?casedata.casesCostUnitName:''}}</span>
            </Col>
            <Col span="12" class="col">
            <label for="" class="label">聘用律师费用：</label>
            <span class="cont">{{casedata!=null?casedata.casesAcceptedCost:''}}元</span>
            </Col>
          </Row>
          <Row type="flex" class="row" align="middle" v-for="(item,index) in casedata.lawyers" v-if="item.oppositeFlag==0"
            :key='index'>
            <Col span="10" class="col">
            <label for="" class="label">案件聘请律所：</label>
            <span class="cont">{{item.lawOfficeDTO.lawOfficeName}}</span>
            </Col>
            <Col span="2" class="col">
            <Button type="primary" size="small"><router-link class='link' :to="{ path: '/main/lawyerManage/lawOfficeDetail', query: { id: item.lawOfficeDTO.id}}">查看该律所</router-link></Button>
            </Col>
            <Col span="10" class="col">
            <label for="" class="label">聘请律师姓名：</label>
            <span class="cont">{{item.lawyerName}}</span>
            </Col>
            <Col span="2" class="col">
            <Button type="primary" size="small"><router-link class='link' :to="{ path: '/main/lawyerManage/LawyerDetail', query: { id: item.id }}">查看该律师</router-link></Button>
            </Col>
          </Row>
          <Row type="flex" class="row" align="middle" v-for="(item,index) in casedata.lawyers" v-if="item.oppositeFlag==0"
            :key='index'>
            <Col span="10" class="col">
            <label for="" class="label">案件聘请律师职业证号：</label>
            <span class="cont">{{item.occupationCertificateNo}}</span>
            </Col>
          </Row>
          <Row type="flex" class="row" align="middle" v-for="(item,index) in casedata.lawyers" v-if="item.oppositeFlag==1"
            :key='index'>
            <Col span="10" class="col">
            <label for="" class="label">相对方案件聘请律所：</label>
            <span class="cont">{{item.lawOfficeDTO.lawOfficeName}}</span>
            </Col>
            <Col span="2" class="col">
            <Button type="primary" size="small"><router-link class='link' :to="{ path: '/main/lawyerManage/lawOfficeDetail', query: { id: item.lawOfficeDTO.id}}">查看该律所</router-link></Button>
            </Col>
            <Col span="10" class="col">
            <label for="" class="label">相对方聘请律师姓名：</label>
            <span class="cont">{{item.lawyerName}}</span>
            </Col>
            <Col span="2" class="col">
            <Button type="primary" size="small"><router-link class='link' :to="{ path: '/main/lawyerManage/LawyerDetail', query: { id: item.id }}">查看该律师</router-link></Button>
            </Col>
          </Row>
          <Row type="flex" class="row" align="middle" v-for="(item,index) in casedata.lawyers" v-if="item.oppositeFlag==1"
            :key='index'>
            <Col span="10" class="col">
            <label for="" style="width:240px;">相对方案件聘请律师职业证号：</label>
            <span class="cont">{{item.occupationCertificateNo}}</span>
            </Col>
          </Row>

        </div>
      </div>
			
			
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import IconTitle from '../../components/IconTitle';
  import List from "../../components/CaseBaseInfo";
  import ApprovalHistory from '../../components/ApprovalHistory';
  import LgBreadcrumb from '../../components/LgBreadcrumb';
  import ExecuteInfo from '@/components/CaseExecuteInfo'
  import ProgressInfo from '@/components/CaseProgressInfo'
	
  export default {
    name: "caseResult",
    components: {
      IconTitle,
      List,
      ApprovalHistory,
      LgBreadcrumb,
      ExecuteInfo,
      ProgressInfo,
    },
    computed: {
      ...mapGetters([

      ]),
      ...mapState([
        'casedata'
      ]),
      caseDataLawyer() {
        let data = this.casedata
        if(data && data.lawyers) {
          return this.casedata.lawyers;
        } else {
          return {};
        }
      },
      htmlTitle(){
      	let title = this.casedata!=null?this.casedata.casesTitle:'';
      	title = title +"的报告";
      	return title;

      }
      
      
    },
    created() {
      this.getCASEDATA(this.$route.query.id);
      this.getHistoryTask();
    },
    mounted() {
    	
    },
    data() {
      return {
        //面包屑路径
        path: [
          { 'name': '案件管理', 'path': '/main/caseManage' },
          { 'name': '案件报告', 'path': '' },
        ],
       tableData1: [],
        tableData2: [],
        caseInfo: {},
        historyInfoData: [],
      };
    },

    methods: {
      ...mapActions([
        'getCASEDATA'
      ]),
      downloadpdf(){
      	 let menustyle = this.$refs.BaseInfo.$el.children[0].children[1].children[2].children[0].children[1].style.display;
      	 if(menustyle=="none"){
      	 		this.$refs.BaseInfo.$el.children[0].children[1].children[2].children[0].children[1].style.display = "block";
      	 }
      	 document.body.scrollTop = document.documentElement.scrollTop = 0;
      	 this.getPdf();
      },
      getHistoryTask() {
        let processInstanceId = this.$route.query.processInstanceId;
        this.$http.request({
            url: `/queryFinishedByProcessInstanceId/${processInstanceId}`,
            method: 'get'
          })
          .then((res) => {
            this.historyInfoData = res.data.content;
          })
      }
    }
  };
</script>
<style lang="less">
  .caseResult {
    .btnGroup {
      text-align: right;
      margin-bottom: 20px;
      margin-top: -36px;
      width: 200px;
    }
    .box {
      .primaryTitle {
        padding: 15px 20px;
        font-size: 20px;
        text-align: center;
      }
      .case-base-info {
        margin-top: 20px;
      }
      .caseBaseInfo {
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;
        .title {
          padding: 15px 20px;
          font-size: 20px;
        }
        .content {
          padding: 0 15px;
          font-size: 14px;
          .row {
            margin: 5px 0;
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
          padding: 15px 20px;
          font-size: 20px;
        }
        .wrapper {
          padding: 0 20px;
          .cont {
            display: inline-block;
            line-height: 20px;
            width: 300px;
            border-radius: 3px;
            font-size: 15px;
            padding: 5px 10px;
            &.textarea {
              width: 95%;
            }
          }
        }
      }
      .progress {
        .baseStyle();
        margin-top: 20px;
      }
      .execute {
        .baseStyle();
      }
      .abarbeitung {
        .baseStyle();
      }
      .factor {
        .baseStyle();
      }
      .accountability {
        .baseStyle();
      }
      .record {
        .baseStyle();
        .content {
          padding: 0 15px;
          font-size: 14px;
        }
      }
      .relevance {
        .baseStyle();
        .content {
          padding: 0 15px;
          font-size: 14px;
          .row {
            margin: 5px 0;
            .col {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .label {
                display: inline-block;
                // width: 164px;
                text-align: right;
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
      .relevanceLawyer {
        a {
          color: #FFF;
        }
        .baseStyle();
        .content {
          padding: 0 15px;
          font-size: 14px;
          .row {
            margin: 5px 0;
            .col {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .label {
                display: inline-block;
                text-align: right;
              }
              .cont {
                display: inline-block;
                line-height: 20px;
                width: 274px;
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
    }
  }
</style>