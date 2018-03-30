<template>
  <div  id="flowChart" class="lg-wrapper" style="position: relative;">
    <img :src="flowChart.resourceName">
    <div style="position: absolute;border:1px solid red;" :style="curPosStyle"></div>
  </div>
  <!--<div v-else>
  	<p>暂无流程图</p>
  </div>-->
</template>

<script>
  export default {
    name: 'flowChart',
    components: {},
    created() {
      this.getFlowChart();
    },
    methods: {
      getFlowChart() {
      	let flowChart = this.$route.query.flowChart;
      	let processImgType = this.$route.query.processImgType;
      	console.log(flowChart)
      	if(!flowChart){
      		this.$http.get(
	            `http://10.71.202.132:8609/viewProcessImg/type?processImgType=${processImgType}`)
	          .then(res => {
	          	console.log(res)
	          	let imgObj = {
	          		resourceName: res.data.content
	          	}
	            this.flowChart = imgObj;
	          })
	          .catch(err => console.log(err))
      	}else{
	        this.$http.get(
	            `http://10.71.202.132:8609/viewProcessImg?processInstanceId=${flowChart}`)
	          .then(res => {
	            this.flowChart = res.data.content;
	          })
	          .catch(err => console.log(err))
      	}
      }
    },
    computed: {
      curPosStyle() {
        let pos = this.flowChart;
        return {
          left: pos.x + 'px',
          top: pos.y + 'px',
          width: pos.width + 'px',
          height: pos.height + 'px',
        }
      }
    },
    data() {
      return {
        flowChart: {}
      }
    },
  }
</script>

<style lang="less" scoped="scoped">

</style>