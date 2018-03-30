<template>
  <router-view></router-view>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    name: 'AuctionType',
    components: {},
    computed: {
      ...mapGetters([
        'custormerToken'
      ])
    },
    data() {
      return {}
    },
    mounted() {},
    methods: {}
  }
</script>

<style>

</style>