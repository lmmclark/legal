<template>
  <div id="PersonalTaskCenter" class="lg-wrapper">
    <LgBreadcrumb :path='path'></LgBreadcrumb>
    <div class="personalTaskCenter">
      <div class="personalTaskCenter-top">
        <Tabs v-model='dataFilter'>
          <TabPane label="全部" name="all"></TabPane>
          <TabPane label="我的待办" name="todo"></TabPane>
          <TabPane label="我的已办" name="finish"></TabPane>
          <TabPane label="已完成" name="done"></TabPane>
          <TabPane label="草稿" name="draft"></TabPane>
        </Tabs>
        <div class="content">
          <div class="item" v-for="(item,index) in showedList" :key='item.processInstanceId+""+index'>
            <!--已结束-->
            <template v-if='item.localProcess==="done"'>
              <p @click='goDoneDetail(item)'>{{processFlag(item)}}{{getFlowType(item)}}{{item.title}}</p>
              <span>{{item.endTime}}</span>
            </template>
            <!--草稿-->
            <template v-else-if="item.localProcess==='draft'">
              <p @click='goDraftDetail(item)'>{{processFlag(item)}}{{getFlowTypeByType(item)}}{{item.title}}</p>
              <span>{{item.createTime}}</span>
            </template>
            <!--代办和已办-->
            <template v-else>
              <p @click='goToDoDetail(item)'>{{processFlag(item)}}{{getFlowType(item)}}{{item.title}}【{{item.taskName}}】</p>
              <span>{{item.taskCreateTime}}</span>
            </template>
          </div>
        </div>
        <div class="funPos flex">
          <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 180px"
            @on-change='chooseDate'></DatePicker>
          <Input class="search" v-model="searchContent" placeholder="搜索" @on-enter='searchEventIpt'>
          <Button slot="append" @click='searchEventIpt'>
          	<Icon :size='15' type="ios-search"></Icon>
          </Button>
          </Input>
        </div>
      </div>
      <div class="personalTaskCenter-bot flex">
        	<Page :current.sync="currentPage" :total="pageTotal" show-elevator :page-size='pageSize'
          class="page" show-total></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import LgBreadcrumb from '../../components/LgBreadcrumb.vue'
  export default {
    name: 'personalTaskCenter',
    components: {
      LgBreadcrumb,
    },

    created() {
      this.dataFilter = this.$route.query.tab || 'all';
      let id = this.userInfo.userExtend.shareOrgId;
      this.getMyToDoList(id);
      this.getFinishedTaskList(id);
      this.getDoneList(id);
      //this.getDraftList(this.userInfo.userName);
    },
    computed: {
      ...mapGetters([
        'userInfo',
      ]),
      ...mapState([
        'myToDoList',
        'finishedTaskList',
        'doneTaskList',
      ]),
      todoDataList() {
        return this.myToDoList.map(item => {
          item.localProcess = 'todo';
          return item;
        })
      },
      finishedDataList() {
        return this.finishedTaskList.map(item => {
          item.localProcess = 'finished';
          return item;
        })
      },
      doneDataList() {
        return this.doneTaskList.map(item => {
          item.localProcess = 'done';
          return item;
        })
      },
      draftDataList() {
        return this.draftList.map(item => {
          item.localProcess = 'draft';
          return item;
        })
      },
      orgiDataList() {
        switch(this.dataFilter) {
          case 'todo':
            return this.todoDataList;
          case 'finish':
            return this.finishedDataList;
          case 'done':
            return this.doneDataList;
          case 'draft':
            return this.draftDataList;
          case 'all':
          default:
            return this.todoDataList.concat(this.finishedDataList, this.doneDataList,
              this.draftDataList);
        }
      },
      filterDataList() {
        let dateArr = this.dateRange,
          searchContent = this.searchContent,
          resultArr = this.orgiDataList;
        if(dateArr[0] && dateArr[1]) {
          resultArr = this.timeFilter(resultArr, dateArr[0], dateArr[1]);
        }
        if(searchContent !== '') {
          resultArr = this.searchFilter(resultArr, searchContent);
        }
        return resultArr;
      },
      showedList() {
        let startIndex = this.pageSize * (this.currentPage - 1),
          endIndex = startIndex + this.pageSize;
        return this.filterDataList.slice(startIndex, endIndex);
      },
      pageTotal() {
        return this.filterDataList.length;
      }
    },
    data() {
      return {
        searchContent: '', //搜索事件的值
        dateRange: [],
        dataFilter: 'all',
        currentPage: 1, //当前页码
        pageSize: 9, //每页条数
        path: [
          { 'name': '首页', 'path': '/main/' },
          { 'name': '我的待办/已办', 'path': '/main/flowManagement/personalTaskCenter' }
        ],
        draftList: [],
        total:""
      }
    },
    methods: {
      ...mapActions([
        'getMyToDoList',
        'getFinishedTaskList',
        'getDoneList',
      ]),
      getDraftList(loginName) {
        this.$http.request({
            url: `/cases/draft/${loginName}`,
            method: 'get'
          })
          .then((res) => {
            let data = res.data.content || [];
            this.draftList = data;
          })
      },
      getFlowType(item) {
        switch(item.processInstanceName) {
        	case 'storage':
        		return '【律师出入库】';	
          case 'external':
            return '【外聘律师】';
          case 'casesReport':
            return '【案件呈报】';
          case 'casesPatch':
            return '【案件补录】';
          default:
            return '【案件呈报】';
        }
      },
      getFlowTypeByType(item) {
        switch(item.type) {
        	case 4:
        		return '【律师出入库】';
          case 2:
            return '【案件补录】';
          case 3:
            return '【外聘申请】';
          case 1:
          	return '【案件呈报】';
          default:
            return '【案件呈报】';
        }
      },
      searchEventIpt() { //搜索事件

      },
      processFlag(item) {
        switch(item.localProcess) {
          case 'todo':
            return '【待办】';
          case 'finished':
            return '【已办】';
          case 'done':
            return '【结束】';
          case 'draft':
            return '【草稿】';
        }
      },
      chooseDate(e) {
        this.dateRange = [Date.parse(e[0]), Date.parse(e[1])];
      },
      timeFilter(fromArr, startTime, endTime) {
      	endTime += 24*60*60*1000
        let result = fromArr.filter((item) => {
          let time;
          //如果是已结束流程，用结束时间作为筛选时间，待办和已办流程用开始时间做筛选时间
          if(item.localProcess === 'done') {
            time = Date.parse(item.endTime);
          } else {
            time = Date.parse(item.taskCreateTime)
          }
          if(startTime <= time && time <= endTime) {
            return true;
          } else {
            return false;
          }
        })
        return result;
      },
      searchFilter(fromArr, searchTitle) {
        let result = fromArr.filter((item) => {
          let title = String(item.title)
            .toUpperCase();
          if(title.includes(searchTitle.toUpperCase())) {
            return true;
          } else {
            return false;
          }
        })
        return result;
      },
      goToDoDetail(item) {
        //待办和已办跳转
        let key = item.taskKey,
          routeName = 'personalTaskCenter';
           console.log(key)
        switch(key) {
//      	case 'firstApprovalTask':
//      		routeName = 'firstTrialLawyer';
//          break;
//        case 'finalApprovalTask':
//      		routeName = 'finalTrialLawyer';
//          break;
        	case 'applyStorageTask':
        		routeName = 'lawyerFirstApproval';
            break;
          case 'firstApprovalTask':
        		routeName = 'lawyerFirstApproval';
            break;
          case 'finalApprovalTask':
        		routeName = 'lawyerEndApproval';
            break;  
          case 'casesProcessTask':
            routeName = 'caseProgress';
            break;
          case 'casesExecutionTask':
            routeName = 'caseExecute';
            break;
          case 'casesClosingTask':
            routeName = 'caseFinish';
            break;
          case 'casesReportTask':
            routeName = 'caseReport';
            break;
          case 'addLawyerTask':
            routeName = 'externalLawyer';
            break;
//        case 'firstTrialTask':
//          routeName = 'firstTrialLawyer';
//          break;
//        case 'finalTrialTask':
//          routeName = 'finalTrialLawyer';
//          break;
//          case 'employTask':
          case 'assignLawyerTask':
            routeName = 'employLawyer';
            break;
          default:
            break;
        }
        this.$router.push({
          name: routeName,
          query: {
          	completeFlag:item.completeFlag,
            processInstanceId: item.processInstanceId,
            taskId: item.taskId,
            id: item.id,
          }
        })
      },
      goDoneDetail(item) {
        //已结束跳转
        let routeName = '';
        switch(item.processInstanceName) {
          case 'external':
            routeName = 'externalLawyerInfo';
            break;
          case 'storage':
            routeName = 'lawyerEndApproval';
            break;  
          case 'casesReport':
          default:
            routeName = 'caseResult';
            break;
        }
        this.$router.push({
          name: routeName,
          query: {
            processInstanceId: item.processInstanceId,
            id: item.busId,
          }
        })
      },
      goDraftDetail(item) {
        let routerName;
        if(item.type == 1) { //type 1呈报 ，3外聘， 
          routerName = 'caseReport';
        } else {
          routerName = 'externalLawyer'
        }
        this.$router.push({
          name: routerName,
          query: {
            id: item.id,
          }
        })
      }
    },
    watch: {
      orgiDataList() {
        this.currentPage = 1;
      }
    }
  }
</script>

<style lang="less">
  @import url("../../less/common.less");
  .personalTaskCenter {
    height: 570px;
    width: 100%;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #cccccc;
    position: relative;
    .personalTaskCenter-top {
      height: 518px;
      width: 100%;
      .search {
        width: 200px;
        margin-left: 80px;
      }
      .datePick {
        width: 130px;
      }
      .ivu-menu-light {
        background: none;
      }
      .ivu-tabs {
        width: 100%;
        top: 0;
        z-index: 50;
        background: linear-gradient(to bottom, #fff 0%, #f0f0f0 100%);
        .ivu-tabs-bar {
          margin-bottom: 0;
          padding-left: 20px;
          .ivu-tabs-nav-scroll {
            height: 60px;
            .ivu-tabs-nav {
              height: 100%;
              .ivu-tabs-tab {
                line-height: 44px;
              }
            }
          }
        }
      }
      .funPos {
        height: 60px;
        width: 50%;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        padding-right: 20px;
        z-index: 100;
      }
    }
    .personalTaskCenter-bot {
      height: 50px;
      background: #f7f8fa;
      border-top: 1px solid #d6d6d6;
      justify-content: flex-end;
      padding: 0 20px;
      border-bottom: 1px solid #cccccc;
    }
  }
</style>
<style lang="less" scoped="scoped">
  .content {
    height: 458px;
    padding: 0 20px;
    width: 100%;
    overflow: auto;
    .item {
      display: flex;
      width: 100%;
      height: 51px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #d6d6d6;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        color: #999;
      }
    }
    .item p:hover {
      cursor: pointer;
    }
  }
</style>