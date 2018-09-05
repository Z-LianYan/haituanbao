<template>

  <div class="page-fundDetail">

    <back :backTitle="backTitle" />

    <div class="flex primary-nav">
      <div class="flex1 both-center transition" :class="{ active : nav3 }" @click="onNavClick(3)">全部</div>
      <div class="flex1 both-center transition" :class="{ active : nav1 }" @click="onNavClick(1)">收入</div>
      <div class="flex1 both-center transition" :class="{ active : nav2 }" @click="onNavClick(2)">支出</div>
    </div>

    <div class="flex mouth-nav">
      <div class="flex1 both-center transition" :class="{ active : navMonth[0] }" @click="onNavMouth(0)">本月</div>
      <div class="flex1 both-center transition" :class="{ active : navMonth[1] }" @click="onNavMouth(1)">近3月</div>
      <div class="flex1 both-center transition" :class="{ active : navMonth[2] }" @click="onNavMouth(2)">近6月</div>
      <div class="flex1 both-center transition" :class="{ active : navMonth[3] }" @click="onNavMouth(3)">近1年</div>
  </div>
    <div class="primary-tips flex both-center" v-if="direction === ''">收入：{{ result.incomes}} 元，支出：{{ result.spends}} 元 </div>
    <div class="primary-tips flex both-center" v-if="direction === 1">收入：{{ result.incomes}} 元，支出：{{ result.spends}} 元 </div>
    <div class="primary-tips flex both-center" v-if="direction === 2">支出：{{ result.spends}} 元， 收入：{{ result.incomes}} 元</div>
    <div class="contact-list" v-for="(item, index) in result.data">

      <!--收入视图-->
      <div class="contact-item">
        <div class="item-info">
          <div class="flex main-between">
            <div class="item-name">{{item.note}}</div>
            <div class="item-data green"> <span v-if="item.income > 0">+</span> {{item.income }}</div>
          </div>
          <div class="item-time">{{item.time}}</div>
        </div>
      </div>
 
    </div>
<!-- 加载更多按钮 -->

 <!-- <div class="btn-box" v-if="page*psize < total && total > 0" >
      <button class="btn active" @click="doLoadMore"> 加载更多 </button>
    </div> -->

    <div class="btn-box logout" v-if="page*psize >= total && total > 0">
      <button class="btn finished"> 以上已是全部内容 </button>
    </div>
    

  </div>

</template>

<script type="text/ecmascript-6">
import back from "../common/back.vue";

import axios from "axios";
import Qs from "qs";

export default {
  name: "",
  data() {
    return {
      nav1: false,
      nav2: false,
      nav3: true,
      navMonth: [true, false, false, false],

      backTitle: "资金明细",
      // 分页
      page: 1,
      psize: 5,
      total: 0,
      status: 0,
      result: {},
      direction: "", //	1:收入, 2:支出
      months: 1, //	1:本月,3:近3月:6:近6月,12:近一年
      page: 1 //	第几页
    };
  },
  props: [],
  watch: {
    direction: function() {
      devConsole.log("1收入、2支出：" + this.direction);
      this.getFundDetail(this.direction, this.months, 1);
    },
    months: function() {
      devConsole.log(" 1:本月,3:近3月:6:近6月,12:近一年 " + this.months);
      this.getFundDetail(this.direction, this.months, 1);
    },
    page: function() {
      devConsole.log(this.page);
      this.getFundDetail(this.direction, this.months, 1);
    }
  },
  computed: {},
  methods: {
    // 测试分页
    // getWalletRecords: function(status=this.status,page = this.page, psize = this.psize) {
    //   axios({
    //     mothod: "get",
    //     url: WalletRecords,
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    //     },
    //     params: {
    //       ssid: sessionStorage.getItem("ssid"),
    //       status:status,
    //       page: page,
    //       psize: psize
    //     },
    //   }).then((response)=>{
    //      let result = response.data;
    //          //console.log(result);
    //          this.data = result.data;
    //          this.total = result.total;
    //   })
    // },

    getFundDetail: function(
      direction = "",
      months = 1,
      status = this.status,
      page = this.page,
      psize = this.psize
    ) {
      axios({
        method: "POST",
        url: WalletRecords,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        transformRequest: [data => Qs.stringify(data)],
        params: {
          ssid: sessionStorage.getItem("ssid"),
          direction: direction,
          months: months,
          page: page,
          psize: psize
        }
      })
        .then(response => {
          let result = response.data;
          this.result = result;

          if (result.code > 0) {
          } else {
            EventHub.$emit("toastOpen", "获取数据出错");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onNavClick: function(index) {
      switch (index) {
        case 1: {
          this.nav1 = true;
          this.nav2 = false;
          this.nav3 = false;

          this.navMonth = [true, false, false, false];
          this.months = 1;
          this.direction = 1;
          break;
        }
        case 2: {
          this.nav1 = false;
          this.nav2 = true;
          this.nav3 = false;

          this.navMonth = [true, false, false, false];
          this.months = 1;
          this.direction = 2;
          break;
        }
        case 3: {
          this.nav1 = false;
          this.nav2 = false;
          this.nav3 = true;

          this.navMonth = [true, false, false, false];
          this.months = 1;
          this.direction = "";
          break;
        }
        default: {
        }
      }
    },
    onNavMouth: function(index) {
      this.navMonth = [false, false, false, false];
      this.navMonth[index] = !this.navMonth[index];
      this.$set(this.navMonth, index, this.navMonth[index]); // 对象更新之后，手动触发视图更新

      switch (index) {
        case 0: {
          this.months = 1;
          break;
        }
        case 1: {
          this.months = 3;
          break;
        }
        case 2: {
          this.months = 6;
          break;
        }
        case 3: {
          this.months = 12;
          break;
        }
        default: {
        }
      }
    }
  },
  components: {
    back: back
  },
  beforeCreate() {},
  created() {},
  mounted() {
    this.getFundDetail();
  },
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less" scoped>
.page-fundDetail {
  padding-top: 144px;

  .primary-nav {
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    height: 50px;
    background-image: linear-gradient(90deg, #02aaf2, #4475f0);
    color: rgba(255, 255, 255, 0.6);
    font-size: 15px;
    z-index: 11;

    div {
      border-bottom: 2px solid transparent;
    }

    div.active {
      color: #fff;
    }
  }

  .mouth-nav {
    position: fixed;
    top: 94px;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    color: rgb(96, 100, 110);
    font-size: 15px;
    z-index: 10;

    div {
      border-bottom: 2px solid transparent;
    }

    div.active {
      color: rgb(29, 138, 231);
      border-bottom: 2px solid rgb(29, 138, 231);
    }
  }

  .contact-list {
    background-color: #fff;

    .contact-item {
      height: 80px;
      padding: 19px 0 11px 15px;

      .item-icon {
        margin-right: 20px;
      }
      .item-info {
        position: relative;
        height: 100%;
        padding-right: 14px;

        &:after {
          position: absolute;
          bottom: -12px;
          left: 0;
          content: "";
          width: 100%;
          height: 1px;
          background-color: #e5e5e5;
        }

        .item-name {
          font-size: 16px;
          font-weight: bold;
          color: rgba(42, 42, 42, 1);
          line-height: 22px;
        }
        .item-data {
          font-size: 16px;
          color: rgba(42, 42, 42, 1);
          line-height: 22px;
          font-weight: bold;

          &.green {
            color: #19af00;
          }
        }

        .item-time {
          margin-top: 7px;
          font-size: 12px;
          color: rgba(153, 153, 153, 1);
          line-height: 14px;
        }
      }
    }
  }
}
</style>
