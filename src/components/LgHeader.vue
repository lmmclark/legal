<template>
    <div class="lg-header flex">
        <div class="logo">
            <img src="../assets/login_Logo.png" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'lgHeader',
        components: {

        },
        computed: {},
        data() {
            return {}
        },
        mounted() {},
        methods: {}
    }
</script>

<style lang="less">
    .lg-header {
        width: 100%;
        height: 140px;
        background: #ffffff;
        flex-shrink: 0;
        .logo {
            margin-top: 76px;
            margin-left: 26px;
            width: 1054px;
        }
    }
</style>