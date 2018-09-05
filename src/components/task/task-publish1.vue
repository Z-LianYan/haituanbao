<template>

  <div class="pasg-taskPublish">

    <back :backTitle="backTitle" />

    <div class="section">

      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">任务店铺</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="store_name" readonly>
        </div>
      </div>

<!--      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info no-border">
          <div class="item-name">任务店铺</div>
          <div class="flex cross-center flex1 security-code-input">
            <input class="item-input" type="text" placeholder="请选择" v-model="store_id_show" readonly>
          </div>
          <div class="flex main-end item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
          <select name="" class="sex-selector" v-model="store_id">
            <option :value="store_id">{{store_id}}</option>
          </select>
        </div>
      </div>-->

      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info no-border">
          <div class="item-name">任务类型</div>
          <div class="flex cross-center flex1 security-code-input">
            <input class="item-input" type="text" placeholder="请选择" v-model="cid_show" readonly>
          </div>
          <div class="flex main-end item-icon">
            <img src="../../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
          <select name="" class="sex-selector" v-model="cid">
            <option value="1">销量任务</option>
            <option value="2">流量任务</option>
            <option value="3">问答任务</option>
          </select>
        </div>
      </div>

    </div>

    <div class="btn-box task-publish">
      <button class="btn" :class="{ active : ( store_name && cid ) }" @click="onBtnClick" :disabled="!( store_name && cid )">下一步</button>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">

  import axios from 'axios';
  import Qs from 'qs';

  import back from '../common/back.vue'
    export default {
        name: "",
        data() {
            return {
              backTitle : '发布任务',
              store_id : '',
              store_name : '',
              store_id_show : '',
              cid : '',
              cid_show : ''
            }
        },
        props: [],
        watch: {
          cid : function (newVal, oldVal) {
              if ( this.cid === "1" ) {
                  this.cid_show = "销量任务";
              }
              else if( this.cid === "2" ) {
                this.cid_show = "流量任务";
              }
              else if( this.cid === "3" ) {
                this.cid_show = "问答任务";
              }
              else {
              }
          }
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
                  step: 1,
                  store_id : parseInt(this.store_id),
                  cid : parseInt(this.cid)
                }
              }).then( (response) => {

                let result = response.data;

                if ( result.code > 0 ) {
                  EventHub.$emit('toastOpen', result.message);
                  devConsole.log(result);
                  sessionStorage.setItem("task_id",result.data.task_id);
                  setTimeout( ()=>{
                    this.$router.push({
                      name : 'taskPublish2',
                      query : {
                        task_id : result.data.task_id
                      }
                    });
                  },2000);
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

            }
        },
        components: {
          back : back
        },
        beforeCreate() {
        },
        created() {
        },
        mounted() {
          this.store_id = sessionStorage.getItem("store_id");
          this.store_name = sessionStorage.getItem("store_name");
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

  .pasg-taskPublish {
    padding-top: 44px;

    .section {
      margin-top: 12px;
      overflow-x: hidden;

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
