<template>
    <view class="page page-fill">
        <!-- 个人信息 start-->
        <view class="user-info page-block">
            <!-- 头像-->
            <view class="item-head" @click="operator">
                <view class="head-text title-text">头像</view>
                <view class="item-head-image">
                    <image :src="globalUser.faceImage" class="head-image"/>
                </view>
                <view class="item-head-ico">
                    <image src="/static/icos/left-gray-arrow.png" class="arrow-ico"/>
                </view>
            </view>
            <view class="face-line"></view>

            <!-- 昵称 -->
            <view class="item-head" @click="modifyNickname">
                <view class="head-text title-text">昵称</view>
                <view class="item-head-image item-head-name">{{globalUser.nickname}}</view>
                <view class="item-head-ico">
                    <image src="/static/icos/left-gray-arrow.png" class="arrow-ico"/>
                </view>
            </view>
            <view class="face-line"></view>

            <!-- 生日 -->
            <view class="item-head" @click="modifyBirthday">
                <view class="head-text title-text">生日</view>
                <view class="item-head-image item-head-name">{{globalUser.birthday}}</view>
                <view class="item-head-ico">
                    <image src="/static/icos/left-gray-arrow.png" class="arrow-ico"/>
                </view>
            </view>
            <view class="face-line"></view>
            <!-- 性别 -->
            <view class="item-head" @click="modifySex">
                <view class="head-text title-text">性别</view>
                <view class="item-head-image item-head-name">{{globalUser.sex|showSex}}</view>
                <view class="item-head-ico">
                    <image src="/static/icos/left-gray-arrow.png" class="arrow-ico"/>
                </view>
            </view>
            <view class="face-line"></view>
        </view>
        <!-- 个人信息 end-->

        <!-- 用户状态设置 start -->
        <view class="setting">
            <view class="setting-item" @click="clearCache">清除缓存</view>
            <view class="setting-item" @click="logout">退出登录</view>
        </view>
        <!-- 用户状态设置 end -->
    </view>
</template>

<script>
    import {userLogout} from "@/network/Interface";

    export default {
        name: "meInfo",
        data() {
            return {
                globalUser: {}
            }
        },
        //页面显示
        onShow() {
            this.globalUser = uni.getStorageSync("userInfo")
        },
        filters: {
            //过滤性别
            showSex(sexNumber) {
                if(sexNumber === 1) {
                    return "男"
                }else if(sexNumber === 0) {
                    return "女"
                }else {
                    return "未选择"
                }
            }
        },
        methods: {
            //清除缓存按钮点击
            clearCache() {
                uni.clearStorageSync()
                uni.showToast({
                    title: "清除缓存成功"
                })
            },
            //退出登录按钮点击
            async logout() {
                const [error, success] = await userLogout(this.globalUser.id)
                const {data: res} = success
                if(res.status !== 200) return
                uni.removeStorageSync("userInfo")
                uni.switchTab({
                    url: "/pages/me/me"
                })
            },
            //头像行被点击
            operator() {
                uni.showActionSheet({
                    itemList: ["查看我的头像","从相册上传"],
                    success: res => {
                        let index = res.tapIndex
                        switch(index) {
                            //查看头像
                            case 0:
                                let faceArr = []
                                faceArr.push(this.globalUser.faceImage)
                                uni.previewImage({
                                    urls: faceArr,
                                    current: faceArr[0]
                                })
                                break

                            //相册上传
                            case 1:
                                uni.chooseImage({
                                    count: 1,
                                    sizeType: ["original","compressed"],
                                    sourceType: ["album"],
                                    success: result => {
                                        let tempFilePath = result.tempFilePaths[0]
                                        uni.navigateTo({
                                            url: "/pages/meFace/meFace?tempFilePath=" + tempFilePath
                                        })
                                    }
                                })
                                break
                        }
                    }
                })
            },
            //名称行被点击
            modifyNickname() {
                uni.navigateTo({
                    url: "/pages/meNickname/meNickname"
                })
            },
            //生日行被点击
            modifyBirthday() {
                uni.navigateTo({
                    url: "/pages/meBirthday/meBirthday"
                })
            },
            //性别行被选中
            modifySex() {
                uni.navigateTo({
                    url: "/pages/sex/sex"
                })
            }
        }
    }
</script>

<style lang="less" scoped>

    .page-fill {
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .user-info {
        margin-top: 20upx;
        padding: 0 20upx;
    }

    /*公共样式 start*/
    .item-head {
        padding: 30upx 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        .title-text {
            width: 20%;
            font-size: 18px;
        }

        .item-head-image {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            width: 75%;
            margin-right: 10upx;
        }

        .item-head-name {
            font-size: 16px;
            color: #333333;
        }

    }
    /*公共样式 end*/

    .head-image {
        width: 80upx;
        height: 80upx;
        border-radius: 50%;
    }

    .arrow-ico {
        width: 30upx;
        height: 30upx;
        margin-top: 12upx;
    }

    .face-line{
        padding: 0 20upx;
        border-bottom: solid 1px #EAEAEA;
    }

    /*用户状态设置 start*/
    .setting {
        position: fixed;
        bottom: 0;
        display: flex;
        flex-direction: column;
        width: 100%;

        .setting-item {
            background-color: #fff;
            margin-bottom: 10upx;
            text-align: center;
            font-size: 18px;
            line-height: 90upx;
        }
    }
    /*用户状态设置 end*/
</style>
