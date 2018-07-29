<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜 -->
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer :baseImages="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>

                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease" :class="{'is-disabled':buyNum==1}">
                                                        <i @click="buyNum==1?1:buyNum--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i @click="buyNum<goodsinfo.stock_quantity?buyNum++:goodsinfo.stock_quantity" class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buyNum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner"
                                                            role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1"
                                                            aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- 图钉 -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="isShowDese = true" href="javascript:;" :class="{selected:isShowDese}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="isShowDese = false" href="javascript:;" :class="{selected:!isShowDese}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 直接解析html 是有安全性问题的 -->
                            <div v-html="goodsinfo.content" class="tab-content entry" v-show="isShowDese">
                            </div>
                            <div class="tab-content" v-show="!isShowDese">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="error" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>testtesttest</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
    <BackTop></BackTop>
    </div>
</template>

<script>
    // 导入放大镜组件
    import ProductZoomer from 'vue-product-zoomer';

    export default {
        name: "goodsinfo",
        // 数据
        data: function () {
            return {
                goodsinfo: {},
                imglist: [],
                hotgoodslist: [],
                // 购买数量
                buyNum:1,
                // 记录显示哪个区域的变量
                isShowDese: true,
                // 轮播图的数据
                images: {
                    normal_size: []
                },
                // 轮播图的配置
                zoomerOptions: {
                    zoomFactor: 2,
                    pane: "container-round",
                    hoverDelay: 300,
                    namespace: "inline-zoomer",
                    move_by_click: true,
                    scroll_items: 5,
                    choosed_thumb_border_color: "#bbdefb"

                }
            }
        },
        // 方法
        methods: {
            // 抽取的公共的方法 根据id 获取数据
            getgoodsInfo() {
                // 强制初始化
                this.imglist = [];
                // 清空预览图片的数组
                this.images.normal_size = [];

                // 调接口,获取数据
                this.axios.get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
                    .then(respose => {
                        // console.log(respose);
                        this.goodsinfo = respose.data.message.goodsinfo;
                        this.imglist = respose.data.message.imglist;
                        this.hotgoodslist = respose.data.message.hotgoodslist;
                        // 赋值到images中
                        this.imglist.forEach((v,i)=>{
                            this.images.normal_size.push({
                                id:v.id,
                                url:v.original_path
                            });
                        });
                    })
                    .catch(error => {

                    })
            },
            // 发表评论弹框
            error () {
                this.$Message.error('对方不想说话,并向你抛出了一个异常');
            }
        },
        // 注册放大镜组件
        components: {
            ProductZoomer
        },
        // 生命周期函数created,在实例创建完成后被立即调用。
        created() {
            this.getgoodsInfo();
        },
        // watch观察属性 属性值改变时自动调用
        watch: {
            // to 新值  from 老值
            $route(to, from) {
                this.getgoodsInfo();
            }
        }
    }
</script>

<style>
/* 导入字体图标的样式 */
@import url("../../node_modules/font-awesome/css/font-awesome.min.css");
.inline-zoomer-zoomer-box{
    width: 368px;
}
.pic-box .control-box .thumb-list{
    display: flex;
}
.thumb-list img {
  height: 78px;
  width: 78px;
  margin: 5px;
}
.control i{
    text-align: center;
}
</style>