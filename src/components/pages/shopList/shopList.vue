<template>
    <div id="app-shoplist">
        <ul class="shoplist-header">
            <li></li>
            <li>店铺列表</li>
            <li class="z_addshop" @click="toPageStoreBinding">新增店铺</li>
        </ul>
        <div class="shop-item-box">
            <ShopItem
                v-for = " Data in Datas "
                :key  = " Data.store_id "
                :logoUrl = "Data.logo_url"
                :auditStatus = "Data.audit_status"
                :shopName = "Data.name"
                :storeId = "Data.store_id"
            ></ShopItem>
        </div>
        
    </div>
</template>

<script type="text/ecmascript-6">
import ShopItem from "../../common/shoplist/shopItem"
export default{
    name:"app-shoplist",
    data () {
        return {
            Datas: []
        }
    },
    mounted(){
        this.$http.get("http://www.maishoutest.cn/my-store/get-stores?ajax=json&ssid=xxx",{
            ajax: 'json',
            params : {
                ssid: sessionStorage.getItem("ssid")
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        }).then((res)=>{
            console.log(res.data.data)
            this.Datas = res.data.data
        })
    },
    methods: {
        toPageStoreBinding : function () {
            this.$router.push({ name : 'storeBinding' });
        }
    },
    components:{
        ShopItem
    }
    
}
  
</script>


<style lang="scss" type="text/less" scoped>
    .shoplist-header{
        position: fixed;
        top: 0;
        width: 100%;
        height: 44px;
        background-color: #109FF2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.3rem;
        color: #fff;
        .z_addshop{
            width: 66px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #fff;
            text-align: center;
            border-radius: 5px;
        }
    }
    .shop-item-box{
        margin-top: 44px;
    }

</style>










//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑             永无BUG















