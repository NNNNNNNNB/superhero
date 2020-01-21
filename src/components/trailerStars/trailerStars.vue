<template>
    <view class="movie-score-wapper">
        <image
            v-for="(yellowNum,index) in yellowScore"
            :key="index"
            src="../../static/icos/star-yellow.png"
            class="star-ico"/>
        <image
            v-for="{grayNum,index} in grayScore"
            :key="index"
            src="../../static/icos/star-gray.png"
            class="star-ico"/>
        <view class="movie-score" v-if="showInner">
            {{innerScore}}
        </view>
    </view>
</template>

<script>
    export default {
        name: "trailerStars",
        props: {
            //评分
            innerScore: {
                type: Number,
                default: 0
            },
            showInner: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                //黄星和绿星
                yellowScore: 0,
                grayScore: 5
            }
        },
        created() {
            this.getScore()
        },
        methods: {
            //获取星星数量
            getScore() {
                let tempScore = 0
                if(this.innerScore != null && this.innerScore != undefined) {
                    tempScore = this.innerScore > 10 ? 10 : this.innerScore
                }

                this.yellowScore = parseInt(tempScore / 2)
                this.grayScore -= this.yellowScore

            }
        }
    }
</script>

<style lang="less" scoped>
    .movie-score-wapper {
        display: flex;
        flex-direction: row;

        .star-ico {
            width: 20upx;
            height: 20upx;
            margin-top: 6upx;
        }

        .movie-score {
            font-size: 14px;
            color: grey;
            margin-left: 8upx;
        }
    }
</style>
