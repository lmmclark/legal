<template>
  <OrgTree :value='value' title='请选择' :only='true' type='psm' @ok="startExternalOk" v-bind='$attrs'
    v-on='$listeners'></OrgTree>
</template>

<script>
  /*
   * OrgTree封装了一层，添加一个事件处理函数，用于启动外聘
   */
  import OrgTree from '@/components/OrgTree'
  export default {
    components: {
      OrgTree,
    },
    props: {
      value: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      startExternalOk(e) {
        this.$http.request({
            url: `/external/start?userId=${e[0].id}&casesId=${this.$route.query.id}`,
            method: 'get'
          })
          .then((res) => {
            let data = res.data;
            if(data.code === 1) {
              this.$Message.success(data.message);
              this.$router.push({
                path: "/main/flowManagement/personalTaskCenter?tab=todo"
              });
            } else {
            	this.$Message.destroy();
              this.$Message.error(data.message);
            }
          })
      },
    },
    data() {
      return {

      }
    }
  }
</script>

<style>

</style>