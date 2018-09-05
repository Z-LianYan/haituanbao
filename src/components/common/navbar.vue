<template>
  <div class="flex navbar">

    <div class="flex-col flex1 both-center" @click="onNavbarClick(1)">
      <div>
        <img v-if="!nav1" src="../../assets/images/icon/home-n@2x.png" width="22" height="20">
        <img v-if="nav1" src="../../assets/images/icon/home-s@2x.png" width="22" height="20">
      </div>
      <div class="item-name transition" :class="{ active : nav1 }">首页</div>
    </div>

    <div class="flex-col flex1 both-center" @click="onNavbarClick(2)">
      <div>
        <img v-if="!nav2" src="../../assets/images/icon/task-n@2x.png" width="22" height="20">
        <img v-if="nav2" src="../../assets/images/icon/task-s@2x.png" width="22" height="20">
      </div>
      <div class="item-name transition" :class="{ active : nav2 }">任务管理</div>
    </div>

    <div class="flex-col flex1 both-center" @click="onNavbarClick(3)">
      <div>
        <img v-if="!nav3" src="../../assets/images/icon/store-n@2x.png" width="22" height="20">
        <img v-if="nav3" src="../../assets/images/icon/store-s@2x.png" width="22" height="20">
      </div>
      <div class="item-name transition" :class="{ active : nav3 }">店铺</div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "",
        data() {
            return {}
        },
        props: ['nav1','nav2','nav3'],
        watch: {},
        computed: {},
        methods: {
          onNavbarClick : function(index) {
              if ( index === 1 ) {
                  this.toPageMain();
              }
              else if ( index === 2 ) {
                this.isGoing();
              }
              else if ( index === 3 ){
                  if( sessionStorage.getItem("ssid") ){
                      this.toPageStore();
                  }
                  else {
                    this.toPageLogin();
                  }
              }
              else {}
          },
          toPageMain : function () {
            this.$router.push({ name: 'main'});
          },
          isGoing : function () {
            this.$router.push({
              name: 'isGoing'
            });
          },
          toPageLogin : function () {
            this.$router.push({ name: 'login'});
          },
          toPageStore : function () {
            this.$router.push({ name: 'store'});
          }
        },
        components: {},
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

  .navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 49px;
    background-color: #fff;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 100%;
      height: 1px;
      background-color: #e5e5e5;
      transform: scaleY(.5);
    }

    .item-name {
      font-size: 11px;
      color: rgb(96,100,110);
      &.active {
        color : rgb(29,138,231);
      }
    }
  }

</style>
