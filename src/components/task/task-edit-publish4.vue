<template>

  <div class="pasg-taskPublish">

    <back :backTitle="backTitle" />

    <!--平台担保-->
<!--    <div class="tips-text">宝贝由接手拍下垫付，任务完成后由商家支付货款返回，佣金由平台支付，发布任务前需全额托付任务佣金</div>
    <div class="section">
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">平台担保</div>
          <div class="flex cross-center flex1 security-code-input">
            <input class="item-input" type="text" placeholder="请选择" v-model="p1" readonly>
          </div>
          <div class="flex main-end item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
          <select name="" class="sex-selector" v-model="p1">
            <option value="是"> 是 </option>
            <option value="否"> 否 </option>
          </select>
        </div>
      </div>
    </div>-->

    <!--任务佣金设置-->
    <div class="flex main-between tips-text">
      <span>任务佣金设置</span>
      <span class="item-tips" @click="onTipsOpen">佣金收费表</span>
    </div>
    <div class="section">

      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">任务佣金</div>
          <input class="item-input" type="number" placeholder="请输入" v-model="price" readonly>
          <div class="item-unit">元/单</div>
        </div>
      </div>

      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">任务数量</div>
          <input class="item-input" type="number" placeholder="请输入" v-model="works">
          <div class="item-unit">件</div>
        </div>
      </div>

<!--
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">任务押金</div>
          <input class="flex1 item-input" type="number" placeholder="请输入" v-model="m3">
          <div class="item-unit">元</div>
        </div>
      </div>-->

    </div>

    <!-- 返款时间-->
    <div class="tips-text">商家需在用户完成任务后次日12点前完成审核，并将买家垫付的货款转账至用户收款账号，否则接手可向申请退款，并按违规扣分处理</div>
    <div class="section">
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">返款时间</div>
          <div class="flex cross-center security-code-input">
            <input v-if="!refund_time" class="item-input" type="text" placeholder="请选择"readonly>
          </div>
          <div v-if="!refund_time" class="flex main-end item-icon">
            <img src="../../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
          <select name="" class="sex-selector" v-model="refund_time">
            <option value="12"> 次日12点前 </option>
            <option value="17"> 次日17点前 </option>
          </select>
        </div>
      </div>
    </div>

    <div class="btn-box task-publish" @click="onBtnClick">
      <button class="btn" :class="{ active : works && refund_time && isInPriceRange }" :disabled="!(works && refund_time && isInPriceRange)">发布任务</button>
    </div>

<!--    <div class="btn-box draft">
      <button class="btn" :class="{ active : (1 && 1) }">保存草稿</button>
    </div>-->


    <transition name="fade">
      <div class="flex both-center commission-detail" v-if="commissionShow">
        <div class="flex-col commission-box">
          <div class="commission-close">
            <img src="../../assets/images/icon/close@2x.png" alt="" width="20" height="20" @click="onCloseToggle">
          </div>
          <div class="title">佣金明细</div>
          <table class="table-box">
            <tbody>
            <tr>
              <th>成交价格</th>
              <th>费用</th>
            </tr>
            <tr>
              <td>0~100</td>
              <td>10.00</td>
            </tr>

            <tr>
              <td>100~200</td>
              <td>12.00</td>
            </tr>

            <tr>
              <td>200~300</td>
              <td>14.00</td>
            </tr>

            <tr>
              <td>300~500</td>
              <td>16.00</td>
            </tr>

            <tr>
              <td>500~700</td>
              <td>18.00</td>
            </tr>

            <tr>
              <td>700~1000</td>
              <td>20.00</td>
            </tr>

            <tr>
              <td>1000~1500</td>
              <td>22.00</td>
            </tr>

            <tr>
              <td>1500~2000</td>
              <td>24.00</td>
            </tr>

            <tr>
              <td>大于2000</td>
              <td>暂不支持</td>
            </tr>
            </tbody>
          </table>
          <div class="tips"> 包含快递面单费用，平台收取3-5元/单的技术服务费，剩下部分以佣金形式结算给买手  </div>
        </div>
      </div>
    </transition>


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
              backTitle : '编辑任务',
              taskTitle : '',
              productObj : {},

              task_id : '',
              price : '',
              works : '',
              refund_time : '',
              deposit_balance : '',
              commissionShow : false,

              editTaskObj : '',
              isInPriceRange : true
            }
        },
        props: [],
        watch: {},
        computed: {},
        methods: {
          initEditTaskData : function () {
            this.editTaskObj = JSON.parse(sessionStorage.getItem("editTaskObj"));
            this.task_id = this.editTaskObj.task_id;
            this.works = this.editTaskObj.works;
            this.refund_time = this.editTaskObj.refund_time;
          },
          onCloseToggle : function () {
            this.commissionShow = false;
          },
          onTipsOpen : function () {
            this.commissionShow = true;
          },
          onSelected : function (index) {
            devConsole.log(index);

            this.answerList[index].userAnswer = !this.answerList[index].userAnswer;

            this.$set( this.answerList, index,  this.answerList[index]); // 对象更新之后，手动触发视图更新

          },
          //从 sessionStorage 获取商品信息
          getProductObj : function () {
            devConsole.log(JSON.parse(sessionStorage.getItem("edit-product")));
            if( JSON.parse(sessionStorage.getItem("edit-product")) ){
              this.productObj = JSON.parse(sessionStorage.getItem("edit-product"));
            }
            let price = parseFloat(this.productObj.price);

            if( 0 <= price && price < 100 ){
              this.price = 10.00;
            }
            else if( 100 <= price && price < 200 ) {
              this.price = 12.00;
            }
            else if( 200 <= price && price < 300 ) {
              this.price = 14.00;
            }
            else if( 300 <= price && price < 500 ) {
              this.price = 16.00;
            }
            else if( 500 <= price && price < 700 ) {
              this.price = 18.00;
            }
            else if( 700 <= price && price < 1000 ) {
              this.price = 20.00;
            }
            else if( 1000 <= price && price < 1500 ) {
              this.price = 22.00;
            }
            else if( 1500 <= price && price < 2000 ) {
              this.price = 24.00;
            }
            else if( price > 2000 ) {
              this.isInPriceRange = false;
              this.price = 24.00;
              EventHub.$emit('toastOpen', '暂不支持大于2000元商品');
            }
            else {
              devConsole.log("不支持该商品金额");
            }

          },
          onTipsClick : function () {
            alert("Tips alert");
          },
          saveAsDraft : function () {
            sessionStorage.setItem("price",this.price);
            sessionStorage.setItem("works",this.works);

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
                step: 4,
                id : this.task_id,
                price : this.price,
                works : this.works,
                refund_time : this.refund_time,
              }
            }).then( (response) => {

              let result = response.data;
              //console.log(result);

              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', result.message);
              }
              else if ( result.code === -1 ) {
                EventHub.$emit('toastOpen', result.message);
              }
              else if ( result.code === -100 ) {
                EventHub.$emit('toastOpen', result.message);
                sessionStorage.clear();
                this.$router.push({ name: 'loginRegister'});
              }
              else {
                EventHub.$emit('toastOpen', result.message);
              }

            }).catch( (error) => {
              console.log(error);
            });
          },
          // 存为草稿
          saveTask : function () {

            sessionStorage.setItem("edit-price",this.price); //任务佣金
            sessionStorage.setItem("edit-works",this.works); // 任务数量
            this.deposit_balance = parseFloat(sessionStorage.getItem("edit-deposit_balance")); // 账户余额（含1000冻结资金）

            if ( sessionStorage.getItem("is_republish") === "1" ){ // 判断是否是重发任务,是的话 task_id 用新的值

              axios({  // 发布
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
                  step: 4,
                  id : this.productObj.task_id,
                  price : this.price,
                  works : this.works,
                  refund_time : this.refund_time
                }
              }).then( (response) => {

                let result = response.data;
                //console.log(result);

                if ( result.code > 0 ) {
                  EventHub.$emit('toastOpen', result.message);
                  setTimeout(()=>{
                    this.$router.push({ name: 'trusteeshipEditPayment'});
                  },2000);
                }
                else if ( result.code === -1 ) {
                  EventHub.$emit('toastOpen', result.message);
                }
                else {
                  EventHub.$emit('toastOpen', result.message);
                }

              }).catch( (error) => {
                console.log(error);
              });

            }
            else {

              axios({  // 发布
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
                  step: 4,
                  id : this.task_id,
                  price : this.price,
                  works : this.works,
                  refund_time : this.refund_time
                }
              }).then( (response) => {

                let result = response.data;
                //console.log(result);

                if ( result.code > 0 ) {
                  EventHub.$emit('toastOpen', result.message);
                  setTimeout(()=>{
                    this.$router.push({ name: 'trusteeshipEditPayment'});
                  },2000);
                }
                else if ( result.code === -1 ) {
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
          onBtnClick : function () {
              this.saveTask();
          },
        },
        components: {
          back : back
        },
        beforeCreate() {
        },
        created() {
        },
        mounted() {
            this.getProductObj();
            this.initEditTaskData();
        },
        beforeMount() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
          this.getProductObj();
          this.initEditTaskData();
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
    padding-bottom: 100px;

    .tips-text {
      .item-tips {
        color: #1d8ae7;
      }
    }

    .section {
      & .admin-item:last-child .item-info:after  {
        background-color: transparent;
      }

      .admin-item {
        height: 50px;
        background-color: #fff;
        overflow-x: hidden;

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
            min-width: 80px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
            margin-right: 29px;
          }

          .item-unit {
            min-width: 44px;
            font-size:16px;
            color: #999;
            line-height:22px;
            text-align: right;
          }

          .security-code-input, .identifying-code-input {
            height: 100%;
            input {
              width: 100%;
              height: 100%;
            }
          }

          .item-icon {
            position: relative;
            top: 0;
            left: 16px;
            width: 22px;
            height: 22px;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .sex-selector {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 124px;
            right: 0;
            opacity: 1;
            border: none;
            font-size: 16px;
            color: #999;
            background-color: transparent;
            &:focus {
              outline: none;
            }

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

          .security-code {
            width: 100px;
          }

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
            .item-tips {
              margin-left: 4px;
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

    .answerSheet-list {
      background-color: #fff;
      margin-top: 15px;
      padding-left: 15px;

      & .answerSheet-item:last-child:after {
        background-color: transparent;
      }

      .item-title {
        padding: 15px 0;
        position: relative;
        font-size:14px;
        color:rgba(96,100,110,1);
        line-height:20px;

        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: rgb(229,229,229);
          transform: scaleY(1);
        }
      }

      .answerSheet-item {
        position: relative;
        padding: 12px 15px 12px 0;

        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 1px;
          background-color: rgb(229,229,229);
          transform: scaleY(1);
        }

        .item-data {
          font-size:16px;
          color:rgba(42,42,42,1);
          line-height:22px;
        }

      }
    }

    .textarea-input {

      textarea {
        width: 100%;
        height: 100px;
        padding: 13px 15px;
        border: none;
        resize : none;
        font-size:16px;
        color: #999999;
        line-height:22px;

        &:focus {
          outline: none;
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

    .btn-box.task-publish {
      margin-top: 30px;
    }

    .btn-box.draft {
      margin-top: 15px;
      .btn {
        font-size:18px;
        color:rgba(42,42,42,1);
        line-height:25px;
        background:rgba(255,255,255,1);
      }
    }

    .commission-detail {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,.4);

      .commission-box {
        position: relative;
        width: 300px;
        min-height: 260px;
        padding-bottom: 20px;
        background-color: #fff;
        border-radius: 2px;

        .commission-close {
          position: absolute;
          top: -2px;
          right: -2px;
          padding: 4px;
        }

        .title {
          color: #666;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          padding: 14px 0 10px;
        }

        .table-box {
          width: 100%;
          height: auto;
          padding: 6px 0 20px;

          tr {

            th {
              width: 50%;
              color: #999;
              font-size: 13px;
              font-weight: bold;
              text-align: left;
              padding-left: 26px;
            }
            td {
              color: #999;
              font-size: 13px;
              text-align: left;
              padding-left: 26px;
            }
          }
        }

        .tips {
          color: #999;
          padding: 0 26px;
          font-size: 12px;
          text-align: left;
        }
      }

    }


  }



</style>
