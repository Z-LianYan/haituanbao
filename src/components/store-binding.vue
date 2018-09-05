<template>

  <div class="page-taskPublish" :class="{ 'app-overflow-hidden' : wrapperShow }">

    <back :backTitle="backTitle" />

    <!-- 审核状态 -->
    <div v-if="myStoreDefaultData.audit_status === 0" class="flex cross-center primary-tips">
      店铺绑定信息工作人员正在核对中，请耐心等候店铺绑定信息工作人员正在核对中
    </div>
    <div v-if="myStoreDefaultData.audit_status === -1" class="flex cross-center primary-tips">
      审核未通过
    </div>

    <!--店铺信息-->
    <div class="tips-text">店铺信息</div>
    <div class="section">
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">店铺名称</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="name" :readonly="myStoreDefaultData.audit_status === 1">
        </div>
      </div>
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">店铺类型</div>
          <div class="flex cross-center flex1 security-code-input">
            <input class="item-input" type="text" placeholder="请选择" v-model="cid_show" readonly>
          </div>
          <div class="flex main-end item-icon">
            <img src="../assets/images/icon/arrow@2x.png" alt="" width="22" height="22">
          </div>
          <select name="" class="sex-selector" v-model="cid" :disabled="myStoreDefaultData.audit_status === 1">
            <option :value="item.cid" v-for="(item, index) in categoriesData" :key="index" > {{item.name}} </option>
          </select>
        </div>
      </div>
    </div>

    <!--公司信息-->
    <div class="tips-text">公司信息</div>
    <div class="section">
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">公司名称</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="coname" :readonly="myStoreDefaultData.audit_status === 1">
        </div>
      </div>
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">主营类目</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="core_products" :readonly="myStoreDefaultData.audit_status === 1">
        </div>
      </div>
      <div class="flex cross-center admin-item">
        <div class="flex cross-center item-info">
          <div class="item-name">客服QQ</div>
          <input class="flex1 item-input" type="text" placeholder="请输入" v-model="qq" :readonly="myStoreDefaultData.audit_status === 1">
        </div>
      </div>
    </div>

    <div class="tips-text">其他信息</div>
    <!-- 店铺管理后台截图 -->
    <div class="detail-list">
      <div class="detail-item flex-col">
        <div class="flex main-between flex1 item-info">
          <div class="item-name">店铺管理后台截图</div>
        </div>
        <div class="item-tips">登录商家（千牛）管理后台，进入任意有店铺名的页面全屏截图并上传</div>
      </div>
      <div class="shopping-step">
        <div class="shop-list">

          <div class="flex flex-wrap shop-box">

            <div v-if="shopImgUrl" class="flex-col shop-img" @click="onImgWrapper(1)">
              <img id="screenshots-upload-img" :src="shopImgUrl" alt="">
            </div>

            <div class="flex flex-col add both-center" v-if="myStoreDefaultData.audit_status !== 1"> +

              <!--vue 版本的图片上传-->
<!--                <input id="screenshots-upload" ref="screenshots-upload" class="screenshots-upload" name="store[shop_admin_pic]"
                       type="file" accept="image/*" @change="onScreenshotsReady" />-->

              <input id="screenshots-upload" class="screenshots-upload" name="store[shop_admin_pic]"
                     type="file" accept="image/*" />


            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- 店铺 logo -->
    <div class="detail-list">
      <div class="detail-item flex-col">
        <div class="flex main-between flex1 item-info">
          <div class="item-name">店铺 logo </div>
        </div>
        <div class="item-tips">店铺 logo 上传</div>
      </div>
      <div class="shopping-step">
        <div class="shop-list">
          <!--多图上传支持-->
          <div class="flex flex-wrap shop-box">
            <div v-if="logoImgUrl" class="flex-col shop-img" @click="onImgWrapper(2)">
              <img id="logo-upload-img" :src="logoImgUrl" alt="">
            </div>

            <div class="flex flex-col add both-center" v-if="myStoreDefaultData.audit_status !== 1"> +

              <!--vue 版本的图片上传-->
<!--              <input id="logo-upload" class="logo-upload" name="store[logo]"
                     type="file" accept="image/*" @change="onLogoReady"  />-->

              <input id="logo-upload" class="logo-upload" name="store[logo]"
                     type="file" accept="image/*" />

            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 营业执照 -->
    <div class="detail-list">
      <div class="detail-item flex-col">
        <div class="flex main-between flex1 item-info">
          <div class="item-name">营业执照副本复印件盖章扫描件</div>
<!--          <div class="open-case" @click="onOpenCaseClick">查看示例</div>-->
        </div>
        <div class="item-tips">请上传营业执照副本复印件（加盖公章）扫描件</div>
      </div>
      <div class="shopping-step">
        <div class="shop-list">
          <div class="flex  flex-wrap shop-box">

            <div v-if="licenseImgUrl" class="flex-col shop-img" @click="onImgWrapper(3)">
              <img id="license-upload-img" :src="licenseImgUrl" alt="">
            </div>

            <div class="flex flex-col add both-center" v-if="myStoreDefaultData.audit_status !== 1"> +
              <!--vue 版本的图片上传-->
<!--              <input id="license-upload" class="license-upload" name="store[bizlicense_pic]"
                     type="file" accept="image/*" @change="onLicenseReady" />-->

              <input id="license-upload" class="license-upload" name="store[bizlicense_pic]"
                     type="file" accept="image/*" />

            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- !store_id 未创建店铺 -->
    <div v-if="!store_id" class="btn-box task-publish">
      <button class="btn" :class="{ active : (cid && name && shop_admin_pic_id && bizlicense_pic_id && logo_id ) }"
              :disabled="!(cid && name && shop_admin_pic_id && bizlicense_pic_id && logo_id )"
              @click="onBtnClick">确认绑定
      </button>
    </div>

    <!--myStoreDefaultData.audit_status === -1 审核未通过 -->
    <div v-if="myStoreDefaultData.audit_status === -1" class="btn-box task-publish" data-info="审核未通过，需要修改">
      <button class="btn" :class="{ active : store_id }"
              :disabled="!(cid && name && shop_admin_pic_id && bizlicense_pic_id && logo_id )"
              @click="onBtnEditClick">确认修改</button>
    </div>

    <!--myStoreDefaultData.audit_status === -1 审核通过 -->
    <div v-if="myStoreDefaultData.audit_status === 1" class="btn-box task-publish" data-info="审核通过，不可修改">
      <button class="btn grey" :disabled="true" >审核通过</button>
    </div>

    <transition name="fade">
      <div v-if="wrapperShow" class="img-wrapper">
        <div class="flex flex-col both-center img-box">
          <div class="flex both-center close" @click="onCloseClick">
            <img src="../assets/images/icon/close@2x.png" alt="close" width="24" height="24">
          </div>
          <div class="large-text"> {{largeImgText}} </div>
          <img class="large-image" :src="lgImgUrl" alt="查看大图">
        </div>
      </div>
    </transition>

  </div>

</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import Qs from 'qs';

  import back from './common/back.vue'
    export default {
        name: "",
        data() {
            return {
              backTitle : '店铺绑定',
              taskTitle : '',
              categoriesData : [],
              myStoreDefaultData : [], // 默认店铺信息

              store_id : '', // 店铺id，根据店铺id的有无来判断是否显示哪个按钮

              name : '', //店铺名称
              cid_show : '',
              cid : '', //店铺类别
              coname : '', //公司名称
              core_products : '', //主营类目
              shop_admin_pic_id : '', //店铺后台管理截图
              bizlicense_pic_id : '', //营业执照截图
              logo_id : '', //店铺logo
              qq : '', //QQ
              files : '',

              shopImgUrl : '',
              logoImgUrl : '',
              licenseImgUrl : '',

              wrapperShow : false,
              lgImgUrl : '',
              largeImgText : '查看大图'

            }
        },
        props: [],
        watch: {
            //根据cid的变化，来决定 主营类目 显示什么样的文本
          cid : function (newVal, oldVal) {
            let index = parseInt(this.cid);
            this.cid_show = this.categoriesData[index - 1].name;
          }
        },
        computed: {
        },
        methods: {
          onCloseClick : function () {
            EventHub.$emit("appOverflowHiddenClose",'appOverflowHiddenClose');
            this.wrapperShow = false;
          },
          onImgWrapper : function (index) {
            if( index === 1 ){
              //EventHub.$emit("appOverflowHidden",'appOverflowHidden');
              this.wrapperShow = true;
              this.largeImgText = '店铺管理后台截图';
              this.lgImgUrl = this.myStoreDefaultData.shop_admin_pic_url;
            }
            else if ( index === 2) {
              //EventHub.$emit("appOverflowHidden",'appOverflowHidden');
              this.wrapperShow = true;
              this.largeImgText = '店铺 logo ';
              this.lgImgUrl = this.myStoreDefaultData.logo_url;
            }
            else if ( index === 3 ) {
              //EventHub.$emit("appOverflowHidden",'appOverflowHidden');
              this.wrapperShow = true;
              this.largeImgText = '营业执照副本复印件盖章扫描件';
              this.lgImgUrl = this.myStoreDefaultData.bizlicense_pic_url;
            }
            else {}
          },
          bindImgUpload : function () {
              this.$nextTick(()=>{

                let _this = this;

                $(document).on('change','#screenshots-upload',function(){
                  _this.onScreenshotsReady();
                });

                $(document).on('change','#logo-upload',function(){
                  _this.onLogoReady();
                });

                $(document).on('change','#license-upload',function(){
                  _this.onLicenseReady();
                });

/*
                $("#screenshots-upload").on("change",function () {
                  _this.onScreenshotsReady();
                });
                $("#logo-upload").on("change",function () {
                  _this.onLogoReady();
                });
                $("#license-upload").on("change",function () {
                  _this.onLicenseReady();
                });*/


              });
          },
          onOpenCaseClick : function () {
              //EventHub.$emit("appOverflowHidden",'appOverflowHidden');
              this.wrapperShow = true;
              this.largeImgText = '营业执照示例';
              this.lgImgUrl = '../src/assets/images/license.jpg';
          },
          //绑定店铺
          onBtnClick : function () {

            axios({
              method: 'post',
              url: MyStoreAdd,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                cid : parseInt(this.cid),
                name: this.name,
                coname : this.coname, //N
                core_products : this.core_products, //N
                shop_admin_pic_id : this.shop_admin_pic_id,
                bizlicense_pic_id : this.bizlicense_pic_id,
                logo_id : this.logo_id,
                qq : this.qq //N
              }
            }).then( (response) => {

              let result = response.data;
              //this.data = result.data;

              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', result.message);
                setTimeout(()=>{
                  window.history.back();
                  EventHub.$emit('doRefreshRouter','doRefreshRouter');
                },2000);
/*                this.$router.replace({
                  name : 'store'
                })*/
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
          // 修改店铺信息
          onBtnEditClick : function () {
            axios({
              method: 'post',
              url: MyStoreUpdate,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              },
              transformRequest: [data => Qs.stringify(data)],
              data : {
                id : this.store_id,
                cid : parseInt(this.cid),
                name: this.name,
                coname : this.coname, //N
                core_products : this.core_products, //N
                shop_admin_pic_id : this.shop_admin_pic_id,
                bizlicense_pic_id : this.bizlicense_pic_id,
                logo_id : this.logo_id,
                qq : this.qq //N
              }
            }).then( (response) => {

              let result = response.data;
              //this.data = result.data;

              if ( result.code > 0 ) {
                EventHub.$emit('toastOpen', result.message);
                window.history.back();
/*                this.$router.replace({
                  name : 'store'
                })*/
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
          // 后台截图上传
          onScreenshotsReady : function () {

            let fileTarget = document.getElementById('screenshots-upload');
            let file = fileTarget.files[0];
            let fileSize = (fileTarget.files[0].size / 1024).toFixed(2);

            let fileReader = new FileReader();
            fileReader.onloadend = () => {
              if ( fileReader.readyState === fileReader.DONE ) {
                this.shopImgUrl = true; // 将容器显示
                this.$nextTick( ()=>{ // 将图片回显
                  let preview = document.getElementById('screenshots-upload-img');
                  preview.setAttribute('src', fileReader.result);
                } );
              }
            };
            fileReader.readAsDataURL(file);

            let formData = new FormData();

            formData.append('store[shop_admin_pic]', file);


            $.ajax({
                url: BaseURL+MyStoreUploadPic+"&ssid="+sessionStorage.getItem("ssid"),
                type: "POST",
                data: formData,
                /**
                 *必须false才会自动加上正确的Content-Type
                 */
                contentType: false,
                /**
                 * 必须false才会避开jQuery对 formdata 的默认处理
                 * XMLHttpRequest会对 formdata 进行正确的处理
                 */
                processData: false,
                beforeSend:function(){
                  EventHub.$emit('uploading', "图片上传中");
                },
                success:  (data) => {

                  let result = data;

                  if ( result.code > 0 ) {
                    EventHub.$emit('uploadingDone', "上传成功");
                    EventHub.$emit('toastOpen', "上传成功");

                    this.shop_admin_pic_id =  result.data.pic_id;

                    let preview = document.getElementById('screenshots-upload-img');
                    preview.setAttribute('src', '' );

                    this.shopImgUrl = result.data.pic_url;

                  }
                  else if ( result.code === -1 ) {
                    EventHub.$emit('uploadingFail', result.message);
                    let preview = document.getElementById('screenshots-upload-img');
                    preview.removeAttribute('src');
                  }
                  else if ( result.code === -100 ) {
                    EventHub.$emit('uploadingFail', result.message);
                    let preview = document.getElementById('screenshots-upload-img');
                    preview.removeAttribute('src');
                  }
                  else {
                    EventHub.$emit('toastOpen', result.message);
                  }

                },
                error:  () => {
                    console.log(data)
                }
            });



          },
          // logo上传
          onLogoReady : function () {

            let fileTarget = document.getElementById('logo-upload');
            let file = fileTarget.files[0];
            let fileSize = (fileTarget.files[0].size / 1024).toFixed(2);

            let fileReader = new FileReader();
            fileReader.onloadend = () => {
              if ( fileReader.readyState === fileReader.DONE ) {
                this.logoImgUrl = true; // 将容器显示
                this.$nextTick( ()=>{ // 将图片回显
                  let preview = document.getElementById('logo-upload-img');
                  preview.setAttribute('src', fileReader.result);
                } );
              }
            };
            fileReader.readAsDataURL(file);

            let formData = new FormData();

            formData.append('store[logo]', file);

            $.ajax({
              url: BaseURL+MyStoreUploadPic+"&ssid="+sessionStorage.getItem("ssid"),
              type: "POST",
              data: formData,
              /**
               *必须false才会自动加上正确的Content-Type
               */
              contentType: false,
              /**
               * 必须false才会避开jQuery对 formdata 的默认处理
               * XMLHttpRequest会对 formdata 进行正确的处理
               */
              processData: false,
              beforeSend:function(){
                EventHub.$emit('uploading', "图片上传中");
              },
              success:  (data) => {

                let result = data;

                if ( result.code > 0 ) {
                  EventHub.$emit('uploadingDone', "上传成功");
                  EventHub.$emit('toastOpen', "上传成功");
                  this.logo_id =  result.data.pic_id;

                  let preview = document.getElementById('logo-upload-img'); //预览图片的容器
                  preview.setAttribute('src', '' );
                  this.logoImgUrl = result.data.pic_url; // 将图片地址放到容器里面

                }
                else if ( result.code === -1 ) {
                  EventHub.$emit('uploadingFail', result.message);
                  let preview = document.getElementById('logo-upload-img'); //预览图片的容器
                  preview.removeAttribute('src');
                }
                else if ( result.code === -100 ) {
                  EventHub.$emit('uploadingFail', result.message);
                  let preview = document.getElementById('logo-upload-img'); //预览图片的容器
                  preview.removeAttribute('src');
                }
                else {
                  EventHub.$emit('toastOpen', result.message);
                }

              },
              error:  () => {
                console.log(data)
              }
            });


          },
          // 营业执照上传
          onLicenseReady : function () {

            let fileTarget = document.getElementById('license-upload');
            let file = fileTarget.files[0];
            let fileSize = (fileTarget.files[0].size / 1024).toFixed(2);

            let fileReader = new FileReader();
            fileReader.onloadend = () => {
              if ( fileReader.readyState === fileReader.DONE ) {
                this.licenseImgUrl = true; // 将容器显示
                this.$nextTick( ()=>{ // 将图片回显
                  let preview = document.getElementById('license-upload-img');
                  preview.setAttribute('src', fileReader.result);
                } );
              }
            };
            fileReader.readAsDataURL(file);

            let formData = new FormData();

            formData.append('store[bizlicense_pic]', file);


            $.ajax({
              url: BaseURL+MyStoreUploadPic+"&ssid="+sessionStorage.getItem("ssid"),
              type: "POST",
              data: formData,
              /**
               *必须false才会自动加上正确的Content-Type
               */
              contentType: false,
              /**
               * 必须false才会避开jQuery对 formdata 的默认处理
               * XMLHttpRequest会对 formdata 进行正确的处理
               */
              processData: false,
              beforeSend:function(){
                EventHub.$emit('uploading', "图片上传中");
              },
              success:  (data) => {

                let result = data;

                if ( result.code > 0 ) {
                  EventHub.$emit('uploadingDone', "上传成功");
                  EventHub.$emit('toastOpen', "上传成功");
                  this.bizlicense_pic_id =  result.data.pic_id;

                  let preview = document.getElementById('license-upload-img');
                  preview.setAttribute('src', '' );

                  this.licenseImgUrl = result.data.pic_url;
                }
                else if ( result.code === -1 ) {
                  EventHub.$emit('uploadingFail', result.message);
                  let preview = document.getElementById('license-upload-img');
                  preview.removeAttribute('src');
                }
                else if ( result.code === -100 ) {
                  EventHub.$emit('uploadingFail', result.message);
                  let preview = document.getElementById('license-upload-img');
                  preview.removeAttribute('src');
                }
                else {
                  EventHub.$emit('toastOpen', result.message);
                }
              },
              error:  () => {
                console.log(data)
              }
            });

          },
          //获取店铺类型
          getStoreCategories : function () {
            axios({
              method: 'get',
              url: StoreCategories,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              }
            }).then( (response) => {

              let result = response.data;
              this.categoriesData = result.data;

              if ( result.code > 0 ) {
                this.getMyStoreDefault(); //获取完 店铺类型cid再获取店铺数据

              }
              else {
                EventHub.$emit('toastOpen', "获取数据出错，刷新重试");
              }
            }).catch( (error) => {
              console.log(error);
            });
          },
          //获取店铺信息（可能有，可能没有）
          getMyStoreDefault : function () {
            axios({
              method: 'get',
              url: MyStoreDefault,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
              params : {
                ssid: sessionStorage.getItem("ssid")
              }
            }).then( (response) => {

              let result = response.data;


              if ( result.code > 0 ) {

                this.myStoreDefaultData = result.data;
                console.log(this.myStoreDefaultData);

                this.store_id = this.myStoreDefaultData.store_id;

                console.log("*********************************" + typeof this.store_id);

                this.name = this.myStoreDefaultData.name;
                this.cid = this.myStoreDefaultData.cid;

                this.shop_admin_pic_id = this.myStoreDefaultData.shop_admin_pic_id;
                this.bizlicense_pic_id = this.myStoreDefaultData.bizlicense_pic_id;
                this.logo_id = this.myStoreDefaultData.logo_id;

                this.coname = this.myStoreDefaultData.coname;
                this.core_products = this.myStoreDefaultData.core_products;
                this.qq = this.myStoreDefaultData.qq;

                this.shopImgUrl = this.myStoreDefaultData.shop_admin_pic_url;
                this.logoImgUrl = this.myStoreDefaultData.logo_url;
                this.licenseImgUrl = this.myStoreDefaultData.bizlicense_pic_url;

              }
              else if ( result.code === -1 ) {
              }
              else if ( result.code === -100 ) {
              }
              else {
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
            let _this = this;
            this.getStoreCategories();
            this.bindImgUpload(); // 用 jquery 检测 input 的改变,触发上传方法
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
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 44px;
    padding-bottom: 100px;
    overflow-x: hidden;

    &.app-overflow-hidden {
      height: 100%;
      overflow: hidden;
    }

    .section {
      & .admin-item:last-child .item-info:after  {
        background-color: transparent;
      }

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
            min-width: 80px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
            margin-right: 29px;
          }

          .item-unit {
            font-size:16px;
            color: #999;
            line-height:22px;
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
            left: 10px;
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

    .detail-list {
      position: relative;
      padding: 0 15px 24px;
      background-color: #fff;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 1px;
        background-color: #e5e5e5;
        transform: scaleY(1);
      }

      .detail-item {
        position: relative;
        padding: 12px 0 11px;

        .item-icon {
          margin-right: 20px;
        }
        .item-info {

          .item-name {
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;
          }
          .item-data {
            font-size:16px;
            color:rgba(153,153,153,1);
            line-height:22px;
          }
          .open-case {
            font-size:14px;
            color: #1d8ae7;
          }
        }

        .item-tips {
          margin-top: 10px;
          font-size:14px;
          color: #999;
          line-height:20px;
        }
      }

      .shopping-step {

        .shop-list {
          .step-tips {
            position: relative;
            padding-left: 8px;
            font-size:16px;
            color:rgba(42,42,42,1);
            line-height:22px;

            &::before {
              position: absolute;
              top: 3px;
              left: 0;
              content: '';
              width: 2px;
              height: 15px;
              background-color: #1d8ae7;
            }
          }

          .shop-box {

            & .shop-img:last-child {
              margin-right: 0;
            }

            .add {
              position: relative;
              width: 30%;
              height: 105px;
              margin-right: 3.3%;
              margin-bottom: 12px;
              border: 2px dotted #E5E5E5;
              font-size: 18px;
              color: #60646E;

              #screenshots-upload-img, #logo-upload-img, #license-upload-img {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                z-index: 9;
              }

              .screenshots-upload, .logo-upload, .license-upload {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 10;

                &:focus {
                  outline: none;
                }
              }

            }

            .shop-img {
              width: 30%;
              height: 105px;
              margin-right: 3.3%;
              margin-bottom: 12px;
              font-size: 0;

              .view-lg {
                margin-top: 9px;
                margin-bottom: 19px;
                font-size:13px;
                color:rgba(153,153,153,1);
                line-height:18px;
                text-align: center;
              }

            }

            div {
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }

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

    .img-wrapper {
      position: absolute;
      top : 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.6);
      z-index: 100;

      .img-box {
        position: fixed;
        top: 100px;
        left: 0;
        right: 0;
        width: 94%;
        height: auto;
        margin: 0 auto;
        padding: 14px 16px 40px;
        background-color: #fff;
        border-radius: 2px;

        .close {
          position: absolute;
          right: 0;
          top: 0;
          width: 30px;
          height: 30px;
        }

        .large-text {
          font-size: 14px;
          color: #666;
          line-height: 22px;
          margin-bottom: 28px;
          text-align: center;
        }

        .large-image {
          width: 100%;
          height: auto;
          max-height: 400px;
          box-shadow: 0 0 3px 1px #888888;
        }
      }


    }

  }



</style>
