<template>
    <view class="page page-fill">
        <form @submit="formSubmitNickname">
            <view class="page-block">
                <input
                    type="text"
                    class="input"
                    name="nickname"
                    :value="globalUser.nickname"
                    placeholder="请输入昵称"
                    placeholder-class="graywords"
                    maxlength="10">
            </view>
            <button type="primary" form-type="submit" class="submitBtn">提交</button>
        </form>
    </view>
</template>

<script>
    import {setNickName} from "@/network/Interface";

    export default {
        name: "meNickname",
        data() {
            return {
                globalUser: {}
            }
        },
        onLoad() {
            this.globalUser = uni.getStorageSync("userInfo")
        },
        methods: {
            //表单提交事件
            async formSubmitNickname(e) {
                let nickName = e.detail.value.nickname
                const [error,success] = await setNickName(nickName,this.globalUser.id,this.globalUser.userUniqueToken)
                const {data: res} = success
                if(res.status !== 200) {
                    uni.showToast({
                        title: "修改名称失败"
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

    .page-block {
        padding: 0 40upx;
        margin-top: 20upx;
    }

    .input {
        width: 100%;
        height: 80upx;
        line-height: 80upx;
    }

    .submitBtn {
        width: 90%;
        margin-top: 40upx;
    }

    .graywords {
        color: #eaeaea;
    }
</style>
