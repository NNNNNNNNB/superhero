<template>
    <view class="page page-fill">
        <view class="pending-wapper">
            <image :src="tempFace" class="pending-face" model="scaleToFill" />
        </view>

        <view class="notice">
            <view class="notice-words">
                * 请从相册中选择等比宽高的图片噢~
            </view>
        </view>

        <view class="footer-opertor">
            <view class="opertor-words" @click="changePendingFace">重新选择</view>
            <view class="opertor-words" @click="upload">确认上传</view>
        </view>

    </view>
</template>

<script>
    import {uploadImage} from "@/network/Interface";

    export default {
        name: "meFace",
        data() {
            return {
                tempFace: ""
            }
        },
        onLoad(params) {
            this.tempFace = params.tempFilePath
        },
        methods: {
            //重新选择被点击
            changePendingFace() {
                uni.chooseImage({
                    count: 1,
                    sizeType: ["compressed"],
                    sourceType: ["album"],
                    success: result => {
                        this.tempFace = result.tempFilePaths[0]
                    }
                })
            },
            //上传被点击
            async upload() {
                let globalUser = uni.getStorageSync("userInfo")
                uni.showLoading({
                    title: "上传中...",
                    mask: true
                })

                const [error,success] = await uploadImage(this.tempFace,globalUser.id,globalUser.userUniqueToken)
                if (success.statusCode !== 200) {
                    uni.hideLoading()
                    uni.showToast({
                        title: "上传失败",
                        icon: "none"
                    })
                    return
                }

                let res = JSON.parse(success.data)
                if(res.status !== 200) {
                    uni.hideLoading()
                    uni.showToast({
                        title: "上传失败",
                        icon: "none"
                    })
                    return
                }

                uni.setStorageSync("userInfo",res.data)
                uni.navigateBack({
                    delta: 1
                })
                uni.hideLoading()

            }
        }
    }
</script>

<style lang="less" scoped>
    .page-fill {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #000;
    }

    .pending-wapper {
        display: flex;
        justify-content: center;

        .pending-face {
            width: 600upx;
            height: 600upx;
        }
    }

    .notice {
        margin-top: 50upx;
        display: flex;
        justify-content: center;
        .notice-words {
            color: gray;
            font-size: 13px;
        }
    }

    .footer-opertor {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: #515050 solid 1px;
        padding: 30upx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .opertor-words {
            font-size: 16px;
            color: #e8e5e5;
        }
    }
</style>
