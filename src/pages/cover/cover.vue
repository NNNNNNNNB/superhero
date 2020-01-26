<template>
    <view class="black">
        <image
            :src="cover"
            class="cover"
            mode="widthFix"
            @longpress="operator" />
    </view>
</template>

<script>
    export default {
        name: "cover",
        data() {
            return {
                //传入的图片参数
                cover: ''
            }
        },
        onLoad(params) {
            this.cover = params.cover
        },
        methods: {
            //长按图片事件
            operator() {
                uni.showActionSheet({
                    itemList: ['保存图片'],
                    success: res => {
                        switch (res.tapIndex) {
                            //选中了保存图片
                            case 0:
                                uni.showLoading({title:"图片保存中..."})
                                uni.downloadFile({
                                    url: this.cover,
                                    success: res => {
                                        if(res.statusCode === 200) {
                                            let tempFilePath = res.tempFilePath
                                            uni.saveImageToPhotosAlbum({
                                                filePath: tempFilePath,
                                                success: res => {
                                                    uni.showToast({
                                                        title: '图片保存成功！',
                                                        icon: 'success'
                                                    })
                                                },
                                                complete: () => {
                                                    uni.hideLoading()
                                                }
                                            })
                                        }
                                    }
                                })
                                break
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .black {
        width: 100%;
        height: 100%;
        background-color: #000000;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: fixed;
    }
</style>
