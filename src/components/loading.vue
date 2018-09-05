<template>
  <div id="loading">
    <div class="bootstrap"></div>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: "app",
    data() {
      return {
      }
    },
    props: [],
    watch: {},
    computed: {},
    methods: {
    },
    components: {
    },
    beforeCreate() {
    },
    created() {
    },
    mounted() {
        setTimeout(()=>{
          this.$router.replace({
            name : 'login'
          })
        },2000)
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

<style lang="less" type="text/less">

.loading {
  width: 100%;
  height: 100%;

  .bootstrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: url("../../static/bootstrap.png") no-repeat center bottom;
    background-size: cover;
  }
  .bootstrap img {
    width: 100%;
    height: 100%;
  }
  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform:  rotate(360deg);
    }
  }



}


</style>
