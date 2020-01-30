<template>
    <view class="page page-fill">
        <form @submit="formSubmitSex">
            <view class="page-block">
                <radio-group class="radio-sex" @change="sexChange">
                    <label class="radio-single">
                        <radio value="1" :checked="sex == 1">男</radio>
                    </label>
                    <label class="radio-single">
                        <radio value="0" :checked="sex == 0">女</radio>
                    </label>
                </radio-group>
            </view>

            <button type="primary" form-type="submit" class="submitBtn">提交</button>
        </form>
    </view>
</template>

<script>
    import {setSex} from "@/network/Interface";

    export default {
        name: "sex",
        data() {
            return {
                globalUser: {},
                sex: ''
            }
        },
        onLoad() {
            this.globalUser = uni.getStorageSync("userInfo")
            this.sex = this.globalUser.sex
        },
        methods: {
            //复选框选项发送变化
            sexChange(e) {
                this.sex = e.detail.value
            },
            //表单提交
            async formSubmitSex() {
                const [error,success] = await setSex(this.sex,this.globalUser.id,this.globalUser.userUniqueToken)
                const {data: res} = success
                if(res.status !== 200) {
                    uni.showToast({
                        title: "修改性别失败"
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


    .radio-sex {
        display: flex;
        flex-direction: column;
    }
    .radio-single {
        padding: 20upx;
    }
    .submitBtn {
        width: 90%;
        margin-top: 40upx;
    }
</style>
