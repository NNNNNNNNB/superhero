<template>
    <view class="page">
        <!-- 轮播图 start -->
        <swiper circular indicator-dots autoplay class="carousel">
            <swiper-item v-for="(item,index) in swiperData" :key="item.id">
                <image :src="item.image" class="carousel"/>
            </swiper-item>
        </swiper>
        <!-- 轮播图 end -->

        <!-- 热门超英 start -->
        <view class="page-block super-hot">
            <view class="hot-title-wapper">
                <image src="../../static/icos/hot.png" class="hot-ico"/>
                <view class="hot-title">
                    热门超英
                </view>
            </view>

            <scroll-view scroll-x class="page-block hot">
                <view class="single-poster" v-for="(item,index) in hotSuperheroList" :key="index">
                    <view class="poster-wapper">
                        <image :src="item.cover" class="poster"/>
                        <view class="movie-name">
                            {{item.name}}
                        </view>
                        <trailer-stars :innerScore="item.score" showInner/>
                    </view>
                </view>
            </scroll-view>
        </view>
        <!-- 热门超英 end -->

        <!-- 热门预告 start -->
        <view class="page-block notice-hot">
            <view class="hot-title-wapper page-block">
                <image src="../../static/icos/interest.png" class="hot-ico"/>
                <view class="hot-title">
                    热门预告
                </view>
            </view>

            <view class="hot-movie">
                <video
                    class="hot-movie-single"
                    v-for="item in hotTrailerList"
                    :key="item.id"
                    :src="item.trailer"
                    :poster="item.poster"
                    controls>
                </video>
            </view>
        </view>
        <!-- 热门预告 end -->

        <!-- 猜你喜欢 start -->
        <view class="page-block guess-like">
            <view class="hot-title-wapper page-block">
                <image src="../../static/icos/guess-u-like.png" class="hot-ico"/>
                <view class="hot-title">
                    猜你喜欢
                </view>
            </view>

            <view class="guess-like-item" v-for="(item,index) in guessLikeList" :key="item.id">
                <image :src="item.cover" class="item-ima"/>

                <view class="item-describe">
                    <view class="item-describe-title">{{item.name}}</view>
                    <trailer-stars :innerScore="item.score"/>
                    <view class="item-describe-body">{{item.basicInfo}}</view>
                    <view class="item-describe-body">{{item.releaseDate}}</view>
                </view>

                <view class="item-fabulous" @click="praiseMe(index)">
                    <image src="../../static/icos/praise.png" class="praise-ico" />
                    <view class="praise-text">赞一下</view>
                    <view :animation="animationDataArr[index]" class="praise-text animation-opacity">+1</view>
                </view>
            </view>

        </view>
        <!-- 猜你喜欢 end -->

    </view>
</template>

<script>
    import {getSwiperData,getHotSuperhero, getHotTrailer,getGuessLikeData} from "@/network/Interface.js";

    import trailerStars from "@/components/trailerStars/trailerStars";
    export default {
        data() {
            return {
                //轮播图数据
                swiperData: [],
                //热门超英数据
                hotSuperheroList: [],
                //热门预告数据列表
                hotTrailerList: [],
                //猜你喜欢数据列表
                guessLikeList: [],
                //动画数据
                animationData: {},
                //动画数据数组
                animationDataArr: []
            }
        },
        onLoad() {
            this.getSwiperData()
            this.getHotSuperhero()
            this.getHotTrailer()
            this.getGuessLikeData()

            // 创建动画
            this.animation = uni.createAnimation();
        },
        onUnload() {
            //清除动画
            this.animation = {}
        },
        //监听下拉刷新
        onPullDownRefresh() {
            this.getGuessLikeData()

            //停止下拉刷新
            setTimeout(function () {
                uni.stopPullDownRefresh()
            },1000)
        },
        methods: {
            //获取轮播图数据
            async getSwiperData() {
                const [error, success] = await getSwiperData()
                const {data: res} = success
                if(res.status === 200) {
                    this.swiperData = res.data
                }
            },
            //获取热门超英数据
            async getHotSuperhero() {
                const [error, success] = await getHotSuperhero()
                const {data: res} = success
                if(res.status === 200) {
                    this.hotSuperheroList = res.data
                }
            },
            //获取热门预告数据
            async getHotTrailer() {
                const [error, success] = await getHotTrailer()
                const {data: res} = success
                if(res.status === 200) {
                    this.hotTrailerList = res.data
                }
            },
            //获取猜你喜欢数据
            async getGuessLikeData() {
                const [error, success] = await getGuessLikeData()
                const {data: res} = success
                if(res.status === 200) {
                    this.guessLikeList = res.data
                }
            },
            //赞一下被点击，实现动画效果
            praiseMe(index) {
                this.animation.translateY(-35).opacity(1).step({
                    duration: 400
                })
                this.animationData = this.animation
                this.animationDataArr[index] = this.animationData.export()

                setTimeout(function() {
                    this.animation.translateY(0).opacity(0).step({
                        duration: 0
                    })
                    this.animationData = this.animation
                    this.animationDataArr[index] = this.animationData.export()
                }.bind(this),500)
            }
        },
        components: {
            trailerStars
        }
    }
</script>

<style lang="less" scoped>
    .carousel {
        width: 100%;
        height: 440upx;
    }

    /*热门超英 start*/
    .super-hot {
        margin-top: 12upx;
        padding: 20upx 0 20upx 20upx;
    }

    /*滚动*/
    .hot {
        width: 100%;
        white-space: nowrap;

        .single-poster {
            display: inline-block;
            margin-top: 20upx;
            margin-right: 20upx;

            .poster-wapper {
                display: flex;
                flex-direction: column;

                .poster {
                    width: 200upx;
                    height: 270upx;
                }

                .movie-name {
                    width: 200upx;
                    margin-top: 10upx;
                    font-size: 14px;
                    font-weight: 700;

                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }

    /*标题*/
    .hot-title-wapper {
        display: flex;
        flex-direction: row;

        .hot-ico {
            width: 30upx;
            height: 30upx;
            margin-top: 10upx;
        }

        .hot-title {
            font-size: 20px;
            font-weight: 700;
            margin-left: 20upx;
        }
    }

    /*热门预告 start*/
    .notice-hot {
        margin-top: 12upx;
        padding: 20upx;
    }

    .hot-movie {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .hot-movie-single {
        width: 350upx;
        height: 220upx;
        margin-top: 10upx;
    }

    /*猜你喜欢 start*/
    .guess-like {
        margin-top: 12upx;
        padding: 20upx 0 20upx 20upx;
    }

    .guess-like-item {
        display: flex;
        flex-direction: row;
        margin-top: 20upx;

        .item-ima {
            width: 180upx;
            height: 260upx;
            border-radius: 5%;
        }

        .item-describe {
            width: 350upx;
            height: 260upx;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 12upx;

            .item-describe-title {
                font-size: 20px;
                font-weight: 700;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .item-describe-body {
                font-size: 16px;
                color: #808080;
            }
        }

        .item-fabulous {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 160upx;
            border-left: 2px dashed #eee;
            margin-left: 15upx;
            position: relative;

            .praise-ico {
                width: 40upx;
                height: 40upx;
            }

            .praise-text {
                font-size: 14px;
                color: #feab2a;
            }

            .animation-opacity {
                position: absolute;
                font-weight: 700;
                opacity: 0;
            }
        }
    }




</style>
