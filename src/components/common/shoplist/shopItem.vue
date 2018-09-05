<template>
    <div class="shop-item">
        <div class="item-left">
            <img :src="logoUrl" alt="">
            <div class="item-left-right">
                <span class="shop-title">{{shopName}}</span>
                <p  v-if = "auditStatus===1">审核通过</p>
                <p  v-if = "auditStatus===0">未审核</p>
            </div>
        </div>
        <div class="item-right">查看</div>
    </div>
</template>


<script>
export default {
    name:"shop-Item",
    props: ['logoUrl', 'shopName','auditStatus','storeId']
}
</script>


<style lang="scss" scoped>
    .shop-item{
        padding: 0.2rem 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:0.01rem solid #ccc;
        .item-left{
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                width: 0.8rem;
                height: 1rem;
                margin-right:10px; 
            }
            .item-left-right{
                width:4rem;
                height:44px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .item-right{
            width: 1rem;
            height: 30px;
            border: 0.01rem solid #000000;
            text-align: center;
            line-height: 30px;
        }
    }
</style>
