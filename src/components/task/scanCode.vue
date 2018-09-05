<template>

  <div class="page-trusteeshipPayment">

    <back :backTitle="backTitle" />

  </div>

</template>

<script type="text/ecmascript-6">
  import back from '../common/back.vue'

  import axios from 'axios';
  import Qs from 'qs';

  export default {
    name: "",
    data() {
      return {
        backTitle : '扫码支付'
      }
    },
    props: [],
    watch: {},
    computed: {},
    methods: {
    },
    components: {
      back : back
    },
    beforeCreate() {
    },
    created() {
    },
    mounted() {
    },
    beforeMount() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    activated() {
    },
    deactivated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    errorCaptured() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>

  .page-trusteeshipPayment {
    padding: 44px 0 60px;

  }


</style>
