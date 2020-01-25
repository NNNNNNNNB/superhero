const urlBase = "https://www.imovietrailer.com/superhero"
const authentication = "280555437"

//初始数据请求
function getData(url, method,urlParam = "",data = {}) {
    return uni.request({
        url: urlBase + url + "?qq=" + authentication + urlParam,
        method: method,
        data: data
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

