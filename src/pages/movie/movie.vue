<template>
    <view class="page">
        <!-- 预告视频 start -->
        <view class="player">
            <video id="myTrailer" class="movie" :src="trailerInfo.trailer" :poster="trailerInfo.poster" controls></video>
        </view>
        <!-- 预告视频 end -->

        <!-- 预告详情信息 start -->
        <view class="movie-info">
            <navigator :url="'../cover/cover?cover=' + trailerInfo.cover">
                <image :src="trailerInfo.cover" class="cover"/>
            </navigator>

            <view class="movie-desc">
                <view class="title">{{trailerInfo.name}}</view>
                <view class="basic-info">{{trailerInfo.basicInfo}}</view>
                <view class="basic-info">{{trailerInfo.originalName}}</view>
                <view class="basic-info">{{trailerInfo.totalTime}}</view>
                <view class="basic-info">{{trailerInfo.releaseDate}}</view>

                <view class="score-block">
                    <view class="big-score">
                        <view class="score-words">综合评分：</view>
                        <view class="movie-score">{{trailerInfo.score}}</view>
                    </view>

                    <view class="score-stars">
                        <trailer-stars :innerScore="trailerInfo.score"></trailer-stars>
                        <view class="prise-counts">{{trailerInfo.prisedCounts}} 人点赞</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 预告详情信息 end -->

        <!-- 剧情介绍 start -->
        <view class="plots-block">
            <view class="plots-title">剧情介绍</view>
            <view class="plots-desc">{{trailerInfo.plotDesc}}</view>
        </view>
        <!-- 剧情介绍 end -->

        <!-- 演职人员 start -->
        <view class="acting-staff">
            <view class="title">演职人员</view>

            <scroll-view scroll-x show-scrollbar class="scroll-acting">
                <view :class="['scroll-item',{'scroll-item-index': index !== 0}]" v-for="(item,index) in actingStaffDataList" :key="index">
                    <image :src="item.photo" class="item-photo" @click="previewActing(index)" />
                    <view class="item-name">{{item.name}}</view>
                    <view class="item-actName">{{item.actName}}</view>
                </view>
            </scroll-view>
        </view>
        <!-- 演职人员 end -->

        <!-- 剧照 start -->
        <view class="acting-staff">
            <view class="title">剧照</view>
            <scroll-view scroll-x show-scrollbar class="scroll-acting">
                <image
                    :class="['item-plotPics',{'item-plotPics-index': index !== 0}]"
                    :src="item"
                    v-for="(item,index) in plotPicsArray"
                    :key="index" @click="previewImg(index)" />
            </scroll-view>
        </view>
        <!-- 剧照 end -->

    </view>
</template>

<script>
    import {getTrailerData, getPerformerData} from "@/network/Interface";

    import trailerStars from "@/components/trailerStars/trailerStars";
    export default {
        name: "movie",
        data() {
            return {
                //预告片详情信息数据
                trailerInfo: {},
                //演职人员数据列表
                actingStaffDataList: [],
                //剧照列表
                plotPicsArray: []
            }
        },
        components: {
            trailerStars
        },
        //将搜索点进来的参数传入
        onLoad(params) {
            this.getTrailerData(params.trailerId)
            this.getPerformerData(params.trailerId)
            // console.log(params.trailerId)
        },
        //页面初次渲染完成
        onReady() {
            //获取视频对象
            this.videoContext = uni.createVideoContext('myTrailer')
        },
        //页面被隐藏
        onHide() {
            this.videoContext.pause()
        },
        //页面显示
        onShow() {
            this.videoContext && this.videoContext.play()
        },
        //分享
        onShareAppMessage(res) {

            return {
                title: this.trailerInfo.name,
                path: '/pages/movie/moive?trailerId=' + this.trailerInfo.id
            }
        },
        methods: {
            //获取预告片详情数据
            async getTrailerData(TrailerId) {
                const [error, success] = await getTrailerData(TrailerId)
                const {data: res} = success
                if(res.status !== 200) return
                this.trailerInfo = res.data

                //剧照转数组
                this.plotPicsArray = JSON.parse(this.trailerInfo.plotPics)
            },
            //获取导演和演员数据
            async getPerformerData(TrailerId) {
                //导演数据
                const [errorDirector, successDirector] = await getPerformerData(TrailerId,1)
                const {data: resDirector} = successDirector
                if(resDirector.status !== 200) return
                const directorDataList = resDirector.data

                //演员数据
                const [errorPerformer, successPerformer] = await getPerformerData(TrailerId,2)
                const {data: resPerformer} = successPerformer
                if(resPerformer.status !== 200) return
                const performerDataList = resPerformer.data

                //合并数据列表
                this.actingStaffDataList = directorDataList.concat(performerDataList)
            },
            //预览剧照图片
            previewImg(index) {
                uni.previewImage({
                    current: index,
                    urls: this.plotPicsArray
                })
            },
            //预览演职人员图片
            previewActing(index) {
                const tempPhoto =[]
                for (let i = 0; i < this.actingStaffDataList.length ; i++) {
                    tempPhoto.push(this.actingStaffDataList[i].photo)
                }

                uni.previewImage({
                    current: index,
                    urls: tempPhoto
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    /* 预告视频 start */
    .player {
        display: flex;
        justify-content: center;
        background-color: #000;

        .movie {
            width: 100%;
            height: 460upx;
        }
    }
    /* 预告视频 end */

    /*预告详情信息 start*/
    .movie-info {
        display: flex;
        flex-direction: row;
        padding: 40upx 20upx;
        background-color: #f7f4f9;

        .cover {
            width: 280upx;
            height: 380upx;
        }

        /*描述信息 start*/
        .movie-desc {
            display: flex;
            flex-direction: column;
            margin-left: 30upx;
            width: 400upx;

            .title {
                font-size: 30px;
            }

            .basic-info {
                font-size: 13px;
                line-height: 20px;
                color: darkgray;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        /*描述信息 end*/

        /*评分 start*/
        .score-block {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            width: 360upx;
            height: 90upx;
            margin-top: 20upx;
            background-color: #fff;
            box-shadow: 3px 2px 10px #dedede;
            padding: 20upx;

            .score-words {
                font-size: 12px;
                color: grey;
            }

            .movie-score {
                font-size: 26px;
                font-weight: bold;
                margin-left: 8upx;
                color: #FEAB2A;
                line-height: 60upx;
            }

            .prise-counts {
                font-size: 12px;
                color: grey;
                line-height: 44upx;
            }
            /*评分 end*/
        }
    }
    /*预告详情信息 end*/

    /*剧情介绍 start*/
    .plots-block {
        padding: 20upx 40upx;
        border-top: 1px solid #eee;

        .plots-title {
            color: #A9A9A9;
            font-size: 14px;
        }

        .plots-desc {
            margin-top: 10upx;
            font-size: 16px;
        }
    }
    /*剧情介绍 end*/

    /*演职人员 start*/
    .acting-staff {
        padding: 20upx 40upx;

        .title {
            font-size: 14px;
            color: #A9A9A9;
        }

        /*滚动元素 start*/
        .scroll-acting {
            width: 100%;
            white-space: nowrap;
            margin-top: 20upx;
        }

        .scroll-item {
            display: inline-block;
        }

        .scroll-item-index {
            margin-left: 10upx;
        }

        .item-photo {
            width: 170upx;
            height: 240upx;
        }

        .item-name {
            width: 170upx;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 15px;

        }

        .item-actName {
            font-size: 13px;
            color: #A9A9A9;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /*剧照 照片*/
        .item-plotPics {
            width: 320upx;
            height: 220upx;
        }

        .item-plotPics-index {
            margin-left: 10upx;
        }
        /*滚动元素 end*/
    }
    /*演职人员 end*/
</style>
