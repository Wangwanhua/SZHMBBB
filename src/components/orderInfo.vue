<template>
    <div>
        {{orderid}}
    </div>
</template>
<script>
export default {
    data:function(){
        return{
            orderid:0
        }
    },
    // 赋值
    created() {
        // console.log(this.$route);
        this.orderid = this.$route.params.orderid ;
    },
}
</script>

