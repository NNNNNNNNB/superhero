const urlBase = "https://www.imovietrailer.com/superhero"
const authentication = "280555437"

//初始数据请求
function getData(url, method,urlParam = "",data = {},header = {}) {
    return uni.request({
        url: urlBase + url + "?qq=" + authentication + urlParam,
        method: method,
        data: data,
        header: header
    })
}

//获取轮播图数据
export function getSwiperData() {
    return getData("/index/carousel/list","POST")
}

//获取热门超英数据
export function getHotSuperhero() {
    return getData("/index/movie/hot","POST","&type=superhero")
}

//获取热门预告数据
export function getHotTrailer() {
    return getData("/index/movie/hot","POST","&type=trailer")
}

//获取猜你喜欢数据
export function getGuessLikeData() {
    return getData("/index/guessULike","POST")
}

//获取搜索预告数据
export function getSearchNoticeData(keywords = "", page = "", pageSize = "") {
    let param = "&keywords=" + keywords + "&page=" + page + "&pageSize=" + pageSize
    return getData("/search/list","POST", param)
}

//获取预告片详情
export function getTrailerData(TrailerId) {
    return getData("/search/trailer/" + TrailerId,"POST")
}

//获取演员信息数据
export function getPerformerData(TrailerId,index) {
    return getData("/search/staff/" + TrailerId + "/"+ index, "POST")
}

//用户注册/登录
export function setUserLogin(username,password) {
    return getData("/user/registOrLogin","POST","",{
        "username": username,
        "password": password
    })
}

//用户退出登录
export function userLogout(userId) {
    return getData("/user/logout","POST","&userId=" + userId)
}

//图片上传
export function uploadImage(filePath,userId,userToken) {
    return uni.uploadFile({
        url: urlBase + "/user/uploadFace?qq=280555437&userId=" + userId,
        filePath: filePath,
        name: "file",
        header: {
            "headerUserId": userId,
            "headerUserToken": userToken
        }
    })
}

//修改昵称
export function setNickName(nickname,userId,userToken) {
    return getData("/user/modifyUserinfo","POST","",{
        "userId": userId,
        "nickname": nickname
    },{
        "headerUserId": userId,
        "headerUserToken": userToken
    })
}

//修改生日
export function setBirthday(birthday,userId,userToken) {
    return getData("/user/modifyUserinfo","POST","",{
        "userId": userId,
        "birthday": birthday
    },{
        "headerUserId": userId,
        "headerUserToken": userToken
    })
}

//修改性别
export function setSex(sex,userId,userToken) {
    return getData("/user/modifyUserinfo","POST","",{
        "userId": userId,
        "sex": sex
    },{
        "headerUserId": userId,
        "headerUserToken": userToken
    })
}



