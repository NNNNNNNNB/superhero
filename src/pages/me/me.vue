<template>
    <view class="page page-fill">
        <!-- 用户信息 start -->
        <view class="header">
            <view class="portrait">
                <image v-if="userIsLogin" :src="userInfo.faceImage" class="face"/>
                <image v-else src="/static/icos/108x108.png" class="face"/>
            </view>

            <view class="info-wapper">
                <view v-if="userIsLogin" class="nickname">{{userInfo.nickname}}</view>
                <navigator v-else url="/pages/registLogin/registLogin">
                    <view class="nickname">登录/注册</view>
                </navigator>
                <view v-if="userIsLogin" class="nav-info">{{userInfo.id}}</view>
            </view>

            <view class="set">
                <image v-if="userIsLogin" src="/static/icos/settings.png" class="settings" @click="gotoMeInfo"/>
            </view>

        </view>
        <!-- 用户信息 end -->

    </view>
</template>

<script>
    export default {
        name: "me",
        data() {
            return {
                //用户状态是否登录
                userIsLogin: false,
                //缓存中的用户信息
                userInfo: {}
            }
        },
        //页面显示
        onShow() {
            this.userInfo = uni.getStorageSync('userInfo');
            if(this.userInfo != null && this.userInfo != "" && this.userInfo != undefined) {
                this.userIsLogin = true
            }else {
                this.userIsLogin = false
            }
        },
        methods: {
            //用户设置按钮被点击
            gotoMeInfo() {
                uni.navigateTo({
                    url: "/pages/meInfo/meInfo"
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-fill {
        width: 100%;
        height: 100%;
    }

    /*用户信息 start*/
    .header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        background-color: #ffd655;
        padding: 30upx;

        .portrait {
            width: 25%;
            .face {
                width: 120upx;
                height: 120upx;
                border-radius: 50%;
            }
        }

        .info-wapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 50%;

            .nickname {
                font-size: 18px;
                font-weight: 700;
            }

            .nav-info {
                font-size: 14px;
                color: #6a5018;
                margin-top: 10upx;
            }
        }

        .set {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            width: 25%;

            .settings {
                width: 40upx;
                height: 40upx;
            }
        }

    }
    /*用户信息 end*/

</style>
