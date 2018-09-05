<template>

  <div class="page-taskPublish">

    <back :backTitle="backTitle" />

    <div class="tips-text">商品设置</div>

    <div class="flex-col detail-info-top no-border">
      <div class="info-h1">添加商品属性</div>
      <div class="info-h2">
        <input type="text" placeholder="请输入商品链接" v-model="product_url" autofocus>
      </div>
    </div>

<!--    <div class="flex detail-info-bottom">
      <div class="shop-img">
        <img src="../assets/images/task-shop.png" alt="">
      </div>
      <div class="flex-col main-between flex1 shop-detail">
        <div class="shop-desc">薰衣草衣柜香包香袋香草除味香薰清新随身荷包汽车小香囊卧室房间</div>
        <div class="flex">
          <div class="flex-col item-box">
            <div class="item-name">宝贝价格</div>
            <div class="item-data obvious"> <span>￥</span>112.80</div>
          </div>
          <div class="flex-col flex1 item-box">
            <div class="item-name">发货地</div>
            <div class="item-data">浙江金华</div>
          </div>
        </div>
      </div>
    </div>-->


    <div class="btn-box task-publish">
      <button class="btn" :class="{ active : product_url }" @click="onBtnClick">下一步</button>
    </div>


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
              backTitle : '发布任务',
              product_url : '',
              task_id : ''
            }
        },
        props: [],
        watch: {
        },
        computed: {},
        methods: {
            onBtnClick : function () {

              axios({
                method: 'post',
                url: Task_Save,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                params : {
                  ssid: sessionStorage.getItem("ssid")
                },
                transformRequest: [data => Qs.stringify(data)],
                data : {
                  step: 2,
                  id : this.task_id,
                  product_url : this.product_url
                }
              }).then( (response) => {

                let result = response.data;
                //console.log(result);

                if ( result.code > 0 ) {
                  EventHub.$emit('toastOpen', result.message);
                  this.$router.push({
                    name : 'taskPublish3',
                    query : {
                      task_id : result.data.task_id
                    }
                  });
                  sessionStorage.setItem("product",JSON.stringify(result.data.product));
                  sessionStorage.setItem("product_photo",JSON.stringify(result.data.product_photo));
                }
                else if ( result.code === -1 ) {
                  EventHub.$emit('toastOpen', result.message);
                }
                else if ( result.code === -100 ) {
                  EventHub.$emit('toastOpen', result.message);
                }
                else {
                  EventHub.$emit('toastOpen', result.message);
                }

              }).catch( (error) => {
                console.log(error);
              });

            },
            // 根据上一步获取的任务标识（task_id） ，来获取任务详情的信息
        },
        components: {
          back : back
        },
        beforeCreate() {
        },
        created() {
        },
        mounted() {
          this.task_id = this.$route.query.task_id;
          this.task_id = sessionStorage.getItem('task_id');
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

  .page-taskPublish {
    padding-top: 44px;

    .section {
      margin-top: 12px;

      .admin-item {
        height: 50px;
        background-color: #fff;

        .item-info {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 0 15px;

          &:after {
            position: absolute;
            bottom: 0;
            left: 15px;
            content: '';
            width: 100%;
            height: 1px;
            background-color: rgb(229,229,229);
            transform: scaleY(1);
          }


          .item-name {
            min-width: 72px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
            margin-right: 29px;
          }

          .security-code-input, .identifying-code-input {
            height: 100%;
            input {
              width: 100%;
              height: 100%;
            }
          }

          .item-icon {
            width: 22px;
            height: 22px;
          }

          .sex-selector {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 100px;
            right: 0;
            opacity: 0;
          }

          .identifying-code-line {
            width: 1px;
            height: 20px;
            background-color: #DDDCE1;
            margin-right: 22px;
          }

          .identifying-code {
            font-size:14px;
            color:rgba(29,138,231,1);
            line-height:20px;
          }


          .item-input {
            height: 100%;
            font-size:16px;
            color: #999;
            line-height:22px;
            border: none;
            text-align: right;

            &:focus {
              outline : none;
            }

            /* placeholder */
            &::-webkit-input-placeholder { /* WebKit browsers */
              color:rgba(204,204,204,1);
              font-size: 16px;
              line-height: 100%;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color:rgba(204,204,204,1);
              font-size: 16px;
              line-height: 100%;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              color:rgba(204,204,204,1);
              font-size: 16px;
              line-height: 100%;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10+ */
              color:rgba(204,204,204,1);
              font-size: 16px;
              line-height: 100%;
            }

          }

          .security-code {
            width: 100px;
          }

        }

      }

    }


    .detail-info-top {
      position: relative;
      padding: 17px 15px;
      background-color: #fff;

      &::after {
        position: absolute;
        bottom: 0;
        left: 15px;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
      }



      .info-h1 {
        font-size:17px;
        color:rgba(42,42,42,1);
        line-height:24px;
      }
      .info-h2 {
        margin: 3px 0 6px;
        font-size:15px;
        color:rgba(153,153,153,1);
        line-height:26px;

        input {
          width: 100%;
          height: 100%;
          font-size:16px;
          color: #999;
          line-height:22px;
          border: none;

          &:focus {
            outline : none;
          }

          /* placeholder */
          &::-webkit-input-placeholder { /* WebKit browsers */
            color:rgba(204,204,204,1);
            font-size: 16px;
            line-height: 100%;
          }
          &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:rgba(204,204,204,1);
            font-size: 16px;
            line-height: 100%;
          }
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:rgba(204,204,204,1);
            font-size: 16px;
            line-height: 100%;
          }
          &:-ms-input-placeholder { /* Internet Explorer 10+ */
            color:rgba(204,204,204,1);
            font-size: 16px;
            line-height: 100%;
          }

        }
      }

      .amount-box {
      }

      .shop-commission {
        width: auto;
        height:22px;
        padding: 2px 5px 3px;
        font-size:12px;
        line-height: 17px;
        color:rgba(255,62,62,1);
        background:rgba(255,235,235,1);
        border-radius: 1px ;
        border: 1px dotted #FF3E3E;
      }

      .commission-amount {
        margin-left: 10px;
        color: #FF3E3E;
        font-size: 20px;

        span {
          font-size: 12px;
        }
      }
    }

    .detail-info-bottom {
      height: 200px;
      padding: 20px 15px 22px;
      background-color: #fff;

      .shop-img {
        width: 34.8%;
        margin-right: 15px;

        img {
          width: 100%;
          height: auto;
          max-height: 100%;
          border-radius: 4px;

        }
      }

      .shop-detail {

        .shop-desc {
          font-size:16px;
          color:rgba(42,42,42,1);
          line-height:22px;

        }

        .item-box {
          .item-name {
            font-size:13px;
            color:rgba(153,153,153,1);
            line-height:18px;
          }
          .item-data {
            margin-top: 7px;
            font-size:14px;
            color:rgba(42,42,42,1);
            line-height:20px;
            &.obvious {
              color: #FF3E3E;
            }
            span {
              font-size: 12px;
            }
          }

        }

        .flex .item-box:first-child {
          position: relative;
          padding-right: 34px;

          &:after {
            position: absolute;
            top: 3px;
            right: 0;
            content: '';
            width: 1px;
            height: 40px;
            background-color: rgb(229,229,229);
          }
        }

        .flex .item-box:last-child {
          padding-left: 14px;
        }

      }

    }

    .btn-box.task-publish {
      margin-top: 30px;
    }

  }



</style>
