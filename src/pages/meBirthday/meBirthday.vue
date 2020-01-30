<template>
    <view class="page page-fill">
        <form @submit="formSubmitBrithday">
            <view class="page-block">
                <picker mode="date" @change="dateChange">
                    <view class="birthday">{{birthday}}</view>
                </picker>
            </view>
            <button type="primary" form-type="submit" class="submitBtn">提交</button>
        </form>
    </view>
</template>

<script>
    import {setBirthday} from "@/network/Interface";

    export default {
        name: "meBirthday",
        data() {
            return {
                globalUser: {},
                birthday: ''
            }
        },
        onLoad() {
            this.globalUser = uni.getStorageSync("userInfo")
            this.birthday = this.globalUser.birthday
        },
        methods: {
            //选择器事件被确认
            dateChange(e) {
                this.birthday = e.detail.value
            },
            //表单提交
            async formSubmitBrithday(e) {
                const [error,success] = await setBirthday(this.birthday,this.globalUser.id,this.globalUser.userUniqueToken)
                const {data: res} = success
                if(res.status !== 200) {
                    uni.showToast({
                        title: "修改生日失败"
                    })
                    return
                }

                this.globalUser = res.data
                uni.setStorageSync("userInfo",res.data)
                uni.navigateBack({
                    delta: 1
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

    .birthday {
        background-color: white;
        height: 80upx;
        padding-left: 20upx;
        padding-top: 30upx;
    }

    .submitBtn {
        width: 90%;
        margin-top: 40upx;
    }
</style>
