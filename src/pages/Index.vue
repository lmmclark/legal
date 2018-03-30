<template>
  <div id="index">
    <div class="content">
      <div class="content-item">
        <div class="content-item-title">
          <div class="flex item-txt">
            <p>全球案件统计</p>
            <p>Case Statistics</p>
          </div>
        </div>
        <div id="global">
        </div>
        <div class="global-data">
          <p>今日新增案件:24 ></p>
          <p>昨日新增案件:2 ></p>
          <p>累计新增案件:204 ></p>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-title">
          <div class="flex item-txt">
            <p>我的待办</p>
            <p>To Do List</p>
          </div>
          <Button type="primary" class="searchBtn" @click='toPerCenter("todo")'><Icon size='20' type="ios-search-strong"></Icon></Button>
        </div>
        <ul class="to-do-list">
          <li v-for='(item,index) in myToDoList' :title='item.title' :class="index==4?'no-border':''"
            @click='goToDoDetail(item)'>
            <p>{{item.title}}的{{item.taskName}}</p>
            <span>{{item.taskCreateTime}}</span>
          </li>
        </ul>
      </div>
      <div class="content-item">
        <div class="content-item-title">
          <div class="flex item-txt">
            <p>案件统计视图</p>
            <p>Dashboard</p>
          </div>
          <Button type="primary" class="searchBtn"><Icon size='20' type="ios-search-strong"></Icon></Button>
        </div>
        <Carousel v-model="Carousel_value" :radius-dot='true' arrow='always' loop>
          <CarouselItem>
            <div id='pie'></div>
          </CarouselItem>
          <CarouselItem>
            <div id='bar-chart'>
              <ul>
                <li v-for='item in barChartData'>
                  <IndexBarChart :color='item.color' :percent='item.percent' :label='item.name'></IndexBarChart>
                </li>
              </ul>

            </div>
          </CarouselItem>
        </Carousel>

      </div>
      <div class="content-item">
        <div class="content-item-title">
          <div class="flex item-txt">
            <p>我的已办</p>
            <p>Completed Task</p>
          </div>
          <Button type="primary" class="searchBtn" @click='toPerCenter("finish")'><Icon size='20' type="ios-search-strong"></Icon></Button>
        </div>
        <ul class="to-do-list">
          <li v-for='(item, index) in finishedTaskList' :title='item.title' :class="index==4?'no-border':''"
            @click='goToDoDetail(item)'>
            <p> {{item.title}}的{{item.taskName}}</p>
            <span>{{item.taskCreateTime}}</span>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/chart/pie';
  import 'echarts/lib/chart/map';
  import 'echarts/lib/chart/bar';
  import 'echarts/map/js/world';
  import 'echarts/map/js/china';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/title';
  import IndexBarChart from '../components/IndexBarChart'
  import { mapGetters, mapActions, mapState } from 'vuex'
  export default {
    name: 'Index',
    components: {
      IndexBarChart
    },
    computed: {
      ...mapGetters([
        'userInfo',
      ]),
      ...mapState(
        [
          'myToDoList',
          'finishedTaskList',
        ]
      ),

    },
    data() {
      return {
        Carousel_value: 0,
        barChartData: [
          { color: '#ff3c4e', name: '北京', percent: '18.4' },
          { color: '#ff9711', name: '海南', percent: '15.2' },
          { color: '#ffd324', name: '上海', percent: '14.7' },
          { color: '#29bc75', name: '浙江', percent: '11.8' },
          { color: '#3d68d3', name: '广东', percent: '10.3' },
          { color: '#4576ef', name: '福建', percent: '9.2' },

        ]
      }
    },
    mounted() {
      this.drawPiechart();
      this.drawMap();
      this.getMyToDoList(this.userInfo.userExtend.shareOrgId)
      this.getFinishedTaskList(this.userInfo.userExtend.shareOrgId)
      //this.drawBarChart();
    },
    methods: {
      ...mapActions([
        'getMyToDoList', //获取我的待办列表
        'getFinishedTaskList', //获取已办列表
      ]),
      toPerCenter(tab) {
        this.$router.push({
          name: 'personalTaskCenter',
          query: {
            tab
          }
        })
      },
      drawBarChart() { //绘制柱状图
        let labelOption = {
          normal: {
            show: true,
            position: 'left',
            distance: 15,
            align: 'right',
            verticalAlign: 'middle',
            //rotate: app.config.rotate,
            formatter: '{name|{a}} {c}%',
            fontSize: 16,
            emphasis: {
              show: true
            },
            rich: {
              name: {
                color: '#000',
                textBorderColor: '#fff'
              }
            }
          }
        };
        let option = {
          tooltip: {},
          yAxis: {
            show: false,
            data: ['']
          },
          xAxis: {
            show: false
          },
          grid: {
            left: '40%',
            bottom: '30%',
            containLabel: true
          },
          color: ['#ff3c4e', '#ff9711', '#ffd324', '#29bc75', '#3d68d3', '#4576ef',
            '#d9d9d9'
          ],
          series: [{
              name: '北京',
              type: 'bar',
              barWidth: 15,

              label: labelOption,
              data: [18.4]
            },
            {
              name: '海南',
              type: 'bar',
              barWidth: 15,

              label: labelOption,
              data: [15.2]
            },
            {
              name: '上海',
              type: 'bar',
              barWidth: 15,

              label: labelOption,
              data: [14.7]
            },
            {
              name: '浙江',
              type: 'bar',
              barWidth: 15,

              label: labelOption,
              data: [11.8]
            },
            {
              name: '广东',
              barWidth: 15,
              type: 'bar',
              label: labelOption,
              data: [10.3]
            },
            {
              name: '福建',
              type: 'bar',
              barWidth: 15,
              label: labelOption,
              data: [9.2]
            },
            {
              name: '其他地区',
              type: 'bar',
              barWidth: 15,
              barGap: 0.5,
              label: labelOption,
              data: [20.4]
            },
          ]
        };
        let myChart = echarts.init(document.getElementById('bar-chart'));
        myChart.setOption(option)

      },
      drawMap() { //绘制地图
        function randomData() {
          return Math.round(Math.random() * 1000);
        }

        let option = {
          //                  title: {
          //                      text: 'iphone销量',
          //                      left: 'center'
          //                  },
          tooltip: {
            trigger: 'item'
          },
          //                  legend: {
          //                      orient: 'vertical',
          //                      left: 'left',
          //                      data: [ 'iphone3' ]
          //                  },
          visualMap: {
            show: false,
            min: 0,
            max: 2500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true
          },
          toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          series: [{
              name: '案件',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                normal: {
                  show: true,
                  fontSize: 8
                },
                emphasis: {
                  show: true
                }
              },
              data: [
                { name: '北京', value: randomData() },
                { name: '天津', value: randomData() },
                { name: '上海', value: randomData() },
                { name: '重庆', value: randomData() },
                { name: '河北', value: randomData() },
                { name: '河南', value: randomData() },
                { name: '云南', value: randomData() },
                { name: '辽宁', value: randomData() },
                { name: '黑龙江', value: randomData() },
                { name: '湖南', value: randomData() },
                { name: '安徽', value: randomData() },
                { name: '山东', value: randomData() },
                { name: '新疆', value: randomData() },
                { name: '江苏', value: randomData() },
                { name: '浙江', value: randomData() },
                { name: '江西', value: randomData() },
                { name: '湖北', value: randomData() },
                { name: '广西', value: randomData() },
                { name: '甘肃', value: randomData() },
                { name: '山西', value: randomData() },
                { name: '内蒙古', value: randomData() },
                { name: '陕西', value: randomData() },
                { name: '吉林', value: randomData() },
                { name: '福建', value: randomData() },
                { name: '贵州', value: randomData() },
                { name: '广东', value: randomData() },
                { name: '青海', value: randomData() },
                { name: '西藏', value: randomData() },
                { name: '四川', value: randomData() },
                { name: '宁夏', value: randomData() },
                { name: '海南', value: randomData() },
                { name: '台湾', value: randomData() },
                { name: '香港', value: randomData() },
                { name: '澳门', value: randomData() }
              ]
            }

          ]
        };
        let myChart = echarts.init(document.getElementById('global'));
        myChart.setOption(option)
        //	            myChart.on( 'click', function ( params ) {
        //	                if ( params.data.name == 'China' ) {
        //	                    option.series[ 0 ].mapType = 'china';
        //	                    myChart.setOption( option )
        //	                }
        //	            } );
      },
      drawPiechart() { //绘制饼状图
        let pieoption = {
//        title: {
//          text: '案件饼状分布图',
//          x: 'center',
//          top: 0
//        },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            top: 50,
            x: 'left',
            data: ['北京', '海南', '上海', '浙江', '广东', '福建']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            color: ['#ff3c4e', '#ff9711', '#ffd324', '#29bc75', '#3d68d3',
              '#4576ef',
              '#d9d9d9'
            ],
            data: [
              { value: 184, name: '北京' },
              { value: 152, name: '海南' },
              { value: 147, name: '上海' },
              { value: 118, name: '浙江' },
              { value: 103, name: '广东' },
              { value: 92, name: '福建' },
              { value: 204, name: '其他地区' },
            ]
          }]
        };
        let myPie = echarts.init(document.getElementById('pie'));
        myPie.setOption(pieoption)
      },
      goToDoDetail(item) {
        //待办和已办跳转
        let key = item.taskKey,
          routeName = 'personalTaskCenter';
        switch(key) {
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
          case 'firstTrialTask':
            routeName = 'firstTrialLawyer';
            break;
          case 'finalTrialTask':
            routeName = 'finalTrialLawyer';
            break;
          case 'employTask':
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
            id: item.casesId,
          }
        })
      },
    }
  }
</script>

<style lang="less">
  @baseColor: #4576ef;
  #index {
    width: 100%;
    min-height: 718px;
    height: 100%;
    flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    background: url(../assets/content_bg.png) no-repeat;
    background-size: 100% 100%;
    .content {
      width: 1110px;
      height: 680px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-bottom: 30px;
      .content-item {
        width: 550px;
        height: 335px;
        background: #ffffff;
        margin-top: 10px;
        padding: 10px 20px;
        box-sizing: border-box;
        border: 3px solid #FFFFFF;
        border-radius: 5px;
        position: relative;
        &:hover {
          border-color: #ff4861;
        }
        #global {
          height: 320px;
          width: 530px;
          position: absolute;
          right: 0;
          top: 10px;
        }
        #pie {
          height: 255px;
          width: 450px;
          margin-left: 100px;
        }
        #bar-chart {
          height: 255px;
          width: 524px;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;
        }
        .ivu-carousel-dots-inside {
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          align-items: center;
        }
        .ivu-carousel-dots li.ivu-carousel-active>button.radius {
          width: 10px;
          height: 10px;
          background: @baseColor;
        }
        .ivu-carousel-arrow {
          background-color: @baseColor;
          border-radius: 5px;
          font-size: 15px;
        }
        .global-data {
          position: absolute;
          bottom: 20px;
          left: 20px;
        }
        .content-item-title {
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          p {
            color: @baseColor;
            font-weight: bold;
            font-size: 13px;
          }
          .searchBtn {
            height: 36px;
            width: 36px;
            padding: 0;
          }
          .item-txt {
            align-items: flex-start;
            flex-direction: column;
          }
        }
        .to-do-list {
          height: 250px;
          overflow-y: auto;
          li {
            height: 50px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #CCCCCC;
            font-size: 16px;
            cursor: pointer;
            p {
              color: #000;
              flex: 1;
              margin-right: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            &.no-border {
              border: none;
            }
          }
        }
      }
    }
  }
</style>