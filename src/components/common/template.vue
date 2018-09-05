<template>
</template>

<script type="text/ecmascript-6">


  import back from './common/back.vue'
  import axios from 'axios';

    export default {
        name: "",
        data() {
            return {}
        },
        props: [],
        watch: {},
        computed: {},
        methods: {},
        components: {},
        beforeCreate() {
        },
        created() {
        },
        mounted() {



          this.$router.push({ name : 'main' }); // 去首页



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


</style>
