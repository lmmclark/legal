<template>
    <div class="lawyer-manage">
        <div class="contents">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "lawyerManage",
    data() {
        return {
            route: {}
        };
    },
//  created() {
//      this.route = this.$route;
//  },
//  watch: {
//      $route: function(newValue, oldValue) {
//          this.route = newValue;
//      }
//  },
    methods: {}
};
</script>

<style lang="less">

</style>

