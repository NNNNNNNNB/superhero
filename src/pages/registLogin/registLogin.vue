<template>
    <view class="body">
        <form @submit="formSubmit">
            <!-- 头像 start -->
            <view class="header">
                <image src="/static/icos/default-face.png" class="portrait" />
            </view>
            <!-- 头像 end -->

            <!-- 账号密码输入框 start -->
            <view class="info-wapper">
                <label class="words-lbl">账号</label>
                <input
                    class="input-text"
                    type="text"
                    name="username"
                    placeholder="请输入用户名"
                    placeholder-class="graywords">
            </view>
            <view class="info-wapper">
                <label class="words-lbl">密码</label>
                <input
                    class="input-text"
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    placeholder-class="graywords">
            </view>
            <!-- 账号密码输入框 end -->
            <button type="primary" class="loginbutton" form-type="submit">注册/登录</button>
        </form>

        <!-- 第三方登录 start-->
        <view class="third-wapper">
            <view class="third-line">
                <view class="single-line">
                    <view class="line"></view>
                </view>

                <view class="third-words">第三方账号登录</view>

                <view class="single-line">
                    <view class="line"></view>
                </view>
            </view>

            <view class="third-icons-wapper">
                <button open-type='getUserInfo' @getuserinfo="wxLogin" class="third-btn-ico">
                </button>
            </view>
        </view>

        <!-- 第三方登录 end-->
    </view>
</template>

<script>
    import {setUserLogin,wxLogin} from "@/network/Interface.js";

    export default {
        name: "registLogin",
        data() {
            return {}

        },
        methods: {
            //表单控件发送事件
            async formSubmit(e) {
                let username = e.detail.value.username
                let password = e.detail.value.password
                const [error,success] = await setUserLogin(username,password)
                const {data: res} = success

                //账号密码错误
                if(res.status === 500) {
                    uni.showToast({
                        title: "密码错误",
                        image: "/static/icos/error.png",
                        mask: false,
                        duration: 1500
                    })
                    return
                }

                if(res.status !== 200) return
                uni.setStorageSync('userInfo', res.data)
                uni.switchTab({
                    url: '/pages/me/me'
                })

            },
            //第三方微信登录被点击
            wxLogin(e) {
                uni.showToast({
                    title: "未开放",
                    icon: "none"
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .body {
        display: flex;
        flex-direction: column;
        padding: 0 40upx;
    }

    /*头像 start*/
    .header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 350upx;

        .portrait {
            width: 120upx;
            height: 120upx;
            border-radius: 50%;
        }
    }
    /*头像 end*/

    /*账号密码输入框 start*/
    .info-wapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        border-bottom: 1px solid #DBDBDA;
        padding-bottom: 20upx;
        margin-top: 40upx;

        .words-lbl {
            color: #808080;
        }

        .input-text {
            width: 500upx;
            margin-left: 20upx;
        }
    }

    .graywords {
        color: #EAEAEA;
    }
    /*账号密码输入框 end*/

    .loginbutton {
        width: 90%;
        margin-top: 60upx;
    }

    /*三方登录 start*/
    .third-wapper {
        padding: 0 40upx;
        margin-top: 40upx;
    }

    .third-line {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .third-words {
        color: #A9A9A9;
        font-size: 13px;
    }

    .single-line {
        display: flex;
        align-items: center;
        width: 25%;
        padding: 0 20upx;
        .line {
            width: 100%;
            height: 1px;
            background-color: #A9A9A9;
        }
    }

    .third-icons-wapper {
        display: flex;
        justify-content: center;
        margin-top: 30upx;

        .third-btn-ico {
            background-image:url("http://122.152.205.72:88/group1/M00/00/05/CpoxxFxFO-yAOjTaAAATCIZEzRU503.png");
            width: 60upx;
            height: 60upx;
            background-color: white;
            background-size: 60upx 60upx;
            background-repeat:no-repeat;
        }
    }


    /*三方登录 end*/

</style>
