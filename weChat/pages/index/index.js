//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: [
      {
        'url': 'http://11.33.186.42:8008/signInfo/faces/images/main_11.gif', 'navUrl': '/pages/hotEnoughForFun/hotEnoughForFun','title':'够热才好玩'},
      {
        'url': 'http://11.33.186.42:8008/signInfo/faces/images/main_10.gif', 'navUrl': '/pages/hotEnoughForFun/hotEnoughForFun', 'title': '分享相聚的味道'
      }, {
        'url': 'http://11.33.186.42:8008/signInfo/faces/images/main_07.gif', 'navUrl': '/pages/hotEnoughForFun/hotEnoughForFun', 'title': '星巴克用星说'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgIcon: 'http://11.33.186.42:8008/signInfo/faces/images/main_05.gif',
    iconName: '分享相聚的味道',
    tableOfHeart: '咖啡 + 祝福 即刻表心意',
    navUrl: '/pages/hotEnoughForFun/hotEnoughForFun',
    allImgUrls: [
      {
        'url': 'http://11.33.186.42:8008/signInfo/faces/images/main_11.gif', 'navUrl': '/pages/hotEnoughForFun/hotEnoughForFun', 'title': '够热才好玩'
      },
      {
        'url': 'http://11.33.186.42:8008/signInfo/faces/images/main_10.gif', 'navUrl': '/pages/hotEnoughForFun/hotEnoughForFun', 'title': '分享相聚的味道'
      }, 
      {
        'url': 'http://11.33.186.42:8008/signInfo/faces/images/main_07.gif', 'navUrl': '/pages/hotEnoughForFun/hotEnoughForFun', 'title': '星巴克用星说'
      }
    ]
  }
})
