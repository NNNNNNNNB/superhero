<template>
    <view class="page">

        <!-- 搜索框 start -->
        <view class="search-block">
            <view class="search-ico-wapper">
                <image src="../../static/icos/search.png" class="search-ico"/>
            </view>
            <input
                v-model="keywords"
                placeholder="搜索预告"
                maxlength="10"
                class="search-text"
                confirm-type="search"
                @confirm="searchMe(keywords)"/>
        </view>
        <!-- 搜索框 end -->

        <!-- 搜索列表 start -->
        <view class="movie-list page-block">
            <view
                class="movie-wapper"
                v-for="(item,index) in searchNoticeList"
                :key="index">
                <image @click="showTrailer(item.id)" :src="item.cover" class="poster"/>
            </view>
        </view>
        <!-- 搜索列表 end -->

    </view>
</template>

<script>
    import {getSearchNoticeData} from "../../network/Interface";

    export default {
        name: "search",
        data() {
            return {
                searchNoticeList: [],
                //搜索框双向绑定数据
                keywords: '',
                //搜索参数
                queryInfo: {
                    page: 1,        //当前页面
                    pageSize: 15,   //获取的页面大小
                    total: 1        //总页面大小
                }
            }
        },
        onLoad() {
            this.getSearchNoticeData()
        },
        //上拉加载
        onReachBottom() {
            //搜索页面+1与总页面数量对比，小于则加载数据
            this.queryInfo.page += 1
            if(this.queryInfo.page > this.queryInfo.total) {
                return this.queryInfo.page -= 1
            }
            this.getSearchNoticeData(this.keywords,this.queryInfo.page,this.queryInfo.pageSize)
        },
        methods: {
            //同步搜索方法
            async getSearchNoticeData(keywords = "", page = "", pageSize = "") {
                //加载载入窗
                uni.showLoading({
                    title: "正在搜索..."
                })

                //判断数据是否获取成功
                const [error, success] = await getSearchNoticeData(keywords,page,pageSize)
                if(error) {
                    uni.hideLoading()
                    return uni.showToast({
                        title: "服务器异常！",
                        icon: "none",
                        duration: 3000
                    })
                }

                //保存数据
                const {data: res} = success
                if(res.status !== 200) {
                    uni.hideLoading()
                    return uni.showToast({
                        title: "获取数据失败，请重新搜索！",
                        icon: "none",
                        duration: 3000
                    })
                }
                this.searchNoticeList = this.searchNoticeList.concat(res.data.rows)
                this.queryInfo.page = res.data.page
                this.queryInfo.total = res.data.total
                uni.hideLoading()
            },
            //输入框搜索事件被点击
            searchMe(value) {
                this.searchNoticeList = []
                this.queryInfo.page = 1
                this.getSearchNoticeData(value,this.queryInfo.page,this.queryInfo.pageSize)
            },
            //图片被点击，显示对应的电影预告页面
            showTrailer(trailerId) {
                uni.navigateTo({
                    url: "../movie/movie?trailerId=" + trailerId
                })
            }

        }
    }
</script>

<style lang="less" scoped>
    /* 搜索框 start */
    .search-block {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-bottom: 20upx;

        /*固定搜索框*/
        position: fixed;
        top: 100;
        left: 0;
        right: 0;
        background-color: #f8f8f8;
        z-index: 999;

        .search-ico-wapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #eaeaea;
            padding: 0 10upx;
        }

        .search-ico {
            width: 40upx;
            height: 40upx;
        }

        .search-text {
            font-size: 14px;
            background-color: #eaeaea;
            height: 60upx;
            width: 650upx;
        }
    }
    /*  搜索框 end  */

    /* 搜索列表 start */
    .movie-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding: 100upx 20upx 10upx 20upx;

        .movie-wapper {
            padding: 0 18upx 10upx 18upx ;
        }

        .poster {
            width: 200upx;
            height: 270upx;
        }
    }
    /* 搜索列表 end */

</style>
