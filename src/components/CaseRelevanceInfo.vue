<template>
  <div>
    <Form class="baseForm" ref="baseForm">
      <div class="relevance">
        <div class="title">
          <IconTitle title='关联其他' left='-60' top='-30'></IconTitle>
        </div>
        <p class="asscode" v-for="item in casedata!=null?casedata.oaRelationInfoList:''">关联办文编号:{{item!=null?item.contractNo:''}}</p>
        <FormItem v-if="tableData1.length">
          <p class="tableTitle">关联合同：</p>
          <div class="wrapper">
            <Table size="small" border :columns="tableLabel1" :data="casedata!=null?casedata.contractRelationInfoList:[]"></Table>
          </div>
        </FormItem>
        <FormItem v-if="tableData2.length">
          <p class="tableTitle">关联案件：</p>
          <div class="wrapper">
            <Table size="small" border :columns="tableLabel2" :data="casedata!=null?casedata.casesRelationInfoList:[]"></Table>
          </div>
        </FormItem>
        <FormItem class="addBtnWrapper">
          <Button type="primary" icon="ios-plus-empty" class="addBtn" @click="showRelevance">添加</Button>
        </FormItem>
      </div>
    </Form>
    <Modal class-name="relevanceModalCaseReport" v-model="relevanceModal" title="关联其他" width="900">
      <div class="content">
        <Tabs :animated="false">
          <TabPane label="关联办文编号">
            <Row type="flex" align="middle">
              <Col span="3">
              <label>办文编号</label>
              </Col>
              <Col span="8">
              <Input v-model="relevanceFileNo" placeholder="请输入关联办文编号"></Input>
              </Col>
              <Col span="2" offset="4">
              <Button type="primary" size="small">确定</Button>
              </Col>
            </Row>
          </TabPane>
          <TabPane label="关联合同">
            <Row type="flex" align="middle">
              <Col span="3">
              <label>合同编号</label>
              </Col>
              <Col span="8">
              <Input v-model="contractNo" placeholder="请输入合同编号"></Input>
              </Col>
              <Col span="2" offset="4">
              <Button type="primary" size="small">查询</Button>
              </Col>
            </Row>
            <Row style="margin-top:30px;">
              <Table size="small" border :columns="tableLabel3" :data="tableData3"></Table>
            </Row>
            <Row style="text-align:center;margin-top:30px">
              <Button type="primary">添加</Button>
            </Row>
          </TabPane>
          <TabPane label="关联案件" style="min-height:150px;">
            <Row type="flex" align="middle">
              <Col span="3">
              <label>案件编号</label>
              </Col>
              <Col span="6">
              <Input v-model="casesCode" placeholder="请输入关联办文编号"></Input>
              </Col>
              <Col span="3" offset="2">
              <label>案件类型</label>
              </Col>
              <Col span="6">
              <Select v-model="casesType" placeholder="请选择案件类型">
                <Option v-for="item in ajlx" :value="item.id" :key="item.id">{{item.dictName}}</Option>
              </Select>
              </Col>
              <Col span="2" offset="2">
              <Button type="primary" size="small">查询</Button>
              </Col>
            </Row>
            <Row style="margin-top:30px;">
              <Table size="small" border :columns="tableLabel4" :data="tableData4"></Table>
            </Row>
            <Row style="text-align:center;margin-top:30px">
              <Button type="primary">添加</Button>
            </Row>
          </TabPane>
        </Tabs>
      </div>
      <footer slot="footer"></footer>
    </Modal>

  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import IconTitle from "@/components/IconTitle";

  export default {
    components: {
      IconTitle,
    },
    created() {
      this.getAJLX();
      let id = this.$route.query.id;
      if(id){
      	this.getCASEDATA(id);
      }
    },
    methods: {
      ...mapActions(["getCASEDATA", 'getAJLX']),
      showRelevance() {
        this.relevanceModal = !this.relevanceModal;
      },
    },
    computed: {
      ...mapState(['casedata', 'ajlx'])
    },
    data() {
      return {
        relevanceModal: false,
        //   关联文件编号
        relevanceFileNo: "",
        //   合同编号
        contractNo: "",
        //   案件编号 -已改
        casesCode: "",
        //   案件类型，数据字典是caseTypeId，存疑
        casesType: "",

        /**提交表单部分 */
        tableLabel1: [{
            title: "合同编号",
            key: "contractNo",
            align: "center",
            width: 120
          },
          {
            title: "合同名称",
            key: "contractName",
            align: "center",
            width: 120
          },
          {
            title: "金额",
            key: "contractAmount",
            align: "center",
            width: 120
          },
          {
            title: "跟踪人",
            key: "creator",
            align: "center",
            width: 120
          },
          {
            title: "呈报机构",
            key: "reportedOrgName",
            align: "center",
            width: 320
          },
          {
            title: "状态",
            key: "state",
            align: "center",
            width: 120
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
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
                        console.log(params.index);
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }
          }
        ],
        tableData1: [],
        tableLabel2: [{
            title: "系统（案件）编号",
            key: "contractNo",
            align: "center",
            width: 120
          },
          {
            title: "案件标题",
            key: "contractName",
            align: "center",
            width: 120
          },
          {
            title: "原告/申请人",
            key: "creator",
            align: "center",
            width: 120
          },
          {
            title: "被告/申请人",
            key: "trackingPersionName",
            align: "center",
            width: 120
          },
          {
            title: "案由",
            key: "modifier",
            align: "center",
            width: 320
          },
          {
            title: "进展阶段",
            key: "modifyTime",
            align: "center",
            width: 120
          },
          {
            title: "操作",
            key: "action",
            // width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
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
                        console.log(params.index);
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }
          }
        ],
        tableData2: [],
        tableLabel3: [{
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "合同编号",
            key: "contractNo",
            align: "center"
          },
          {
            title: "合同名称",
            key: "contractName",
            align: "center"
          },
          {
            title: "金额",
            key: "money",
            align: "center"
          },
          {
            title: "跟踪人",
            key: "follower",
            align: "center"
          },
          {
            title: "呈报机构",
            key: "reportOrg",
            align: "center"
          },
          {
            title: "状态",
            key: "state",
            align: "center"
          }
        ],
        tableData3: [{
            contractNo: "QAZ00001", //合同编号
            contractName: "关于海航某某合同",
            money: "100000000",
            follower: "王律师",
            reportOrg: "海航集团",
            state: "一审"
          },
          {
            contractNo: "QAZ00005", //合同编号
            contractName: "关于海航某某合同",
            money: "100000000",
            follower: "张律师",
            reportOrg: "海航集团",
            state: "一审"
          },
          {
            contractNo: "QAZ00007", //合同编号
            contractName: "关于海航某某合同",
            money: "100000000",
            follower: "李律师",
            reportOrg: "海航集团",
            state: "一审"
          }
        ],
        tableLabel4: [{
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "案件编号",
            key: "casesCode",
            align: "center"
          },
          {
            title: "处理时间",
            key: "dealTime",
            align: "center"
          },
          {
            title: "案件调处责任人",
            key: "personCharge",
            align: "center"
          },
          {
            title: "外聘律师及律师",
            key: "lawyer",
            align: "center"
          },
          {
            title: "判决结果",
            key: "result",
            align: "center"
          },
          {
            title: "案件整改情况",
            key: "situation1",
            align: "center"
          },
          {
            title: "案件问责情况",
            key: "situation2",
            align: "center"
          },
          {
            title: "案件成因分析",
            key: "situation3",
            align: "center"
          },
          {
            title: "案件执行情况",
            key: "situation4",
            align: "center"
          },
          {
            title: "案件详情",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
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
                        console.log(params.index);
                      }
                    }
                  },
                  "查看"
                )
              ]);
            }
          }
        ],
        tableData4: [{
            casesCode: "QAZ00001",
            dealTime: "2017-10-10",
            personCharge: "王部长",
            lawyer: "王律师",
            result: "胜诉",
            situation1: "整改中",
            situation2: "问责中",
            situation3: "分析中",
            situation4: "执行中"
          },
          {
            casesCode: "QAZ00001",
            dealTime: "2017-10-10",
            personCharge: "王部长",
            lawyer: "王律师",
            result: "胜诉",
            situation1: "整改中",
            situation2: "问责中",
            situation3: "分析中",
            situation4: "执行中"
          },
          {
            casesCode: "QAZ00001",
            dealTime: "2017-10-10",
            personCharge: "王部长",
            lawyer: "王律师",
            result: "胜诉",
            situation1: "整改中",
            situation2: "问责中",
            situation3: "分析中",
            situation4: "执行中"
          }
        ],
      }
    },

  }
</script>

<style lang="less">
  .baseForm {
    .relevance {
      background: #fff;
      padding: 20px;
      margin-top: 20px;
      .asscode {
        font-size: 14px;
      }
      .addBtnWrapper {
        text-align: center;
      }
    }
  }
  
  // 关联部分模态框
  .relevanceModalCaseReport {
    .ivu-modal-header {
      text-align: center;
    }
  }
</style>