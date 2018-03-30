<template>
  <div>
    <div v-for="(item,index) in data" style="vertical-align: middle;">
    	<span>附件{{index+1}}：</span>
      <a :href="item.attPath" :download="item.attName">{{item.attName}}</a>
      <Icon type="close-circled" class='closeIcon' v-if='deletable' :size='16' @click.native='deleteAttch(item)'
        color='gray' style='cursor: pointer;'></Icon>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      },
      deletable:{
        type: Boolean,
        default:true
      }
    },
    methods: {
      deleteAttch(item) {
        this.$Modal.confirm({
          title: '确认删除附件',
          content: '<p>确认删除附件</p>',
          onOk: () => {
            this.$http.request({
                url: `/attachment/${item.id}`,
                method: 'delete'
              })
              .then(res => {
                if(res.data.code == 1) {
                  this.$Message.success('删除附件成功');
                  this.$emit('delete',item);
                }
              })
              .catch(err => {
                console.log(err);
              })
          },
          onCancel: () => {}
        });
      },
    }
  }
</script>

<style>

</style>