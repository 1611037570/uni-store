<template>
    <view>
		<mySearch></mySearch>
        <!-- 轮播图区域 -->
        <swiper
            :indicator-dots="true"
            :autoplay="true"
            :interval="3000"
            :duration="1000"
            cirular="true"
        >
            <swiper-item v-for="(item, index) in swiperList" :key="index">
                <navigator
                    :url="'/subpkg/goods/goods?goods_id=' + item.goods_id"
                    class="swiper-item"
                >
                    <!-- 动态绑定图片的 src 属性 -->
                    <image :src="item.image_src"></image>
                </navigator>
            </swiper-item>
        </swiper>
        <!-- 分类导航区域 -->
        <view class="nav-list">
            <view
                class="nav-item"
                v-for="(item, i) in navList"
                :key="i"
                @click="navClickHandler(item)"
            >
                <image :src="item.image_src" class="nav-img"></image>
            </view>
        </view>
        <!-- 楼层区域 -->
        <!-- 楼层的容器 -->
        <view class="floor-list">
            <!-- 每一个楼层的 item 项 -->
            <view class="floor-item" v-for="(item, i) in floorList" :key="i">
                <!-- 楼层的标题 -->
                <image
                    :src="item.floor_title.image_src"
                    class="floor-title"
                ></image>
                <!-- 楼层的图片区域 -->
                <view class="floor-img-box">
                    <!-- 左侧大图片的盒子 -->
                    <navigator
                        class="left-img-box"
                        :url="item.product_list[0].url"
                    >
                        <image
                            :src="item.product_list[0].image_src"
                            :style="{
                                width: item.product_list[0].image_width + 'rpx',
                            }"
                            mode="widthFix"
                        ></image>
                    </navigator>
                    <!-- 右侧 4 个小图片的盒子 -->
                    <view class="right-img-box">
                        <navigator
                            class="right-img-item"
                            v-for="(item2, i2) in item.product_list"
                            :key="i2"
                            v-if="i2 !== 0"
                            :url="item2.url"
                        >
                            <image
                                :src="item2.image_src"
                                :style="{ width: item2.image_width + 'rpx' }"
                                mode="widthFix"
                            ></image>
                        </navigator>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { getSwiper, getNav, getFloor } from "../../service/api/unify";
export default {
    data() {
        return {
            swiperList: [], // 轮播图数据
            navList: [], // 导航数据
            floorList: [], // 楼层的数据列表
        };
    },
    onLoad() {
        this.getSwiperList(); // 初始化轮播图数据
        this.getNavList(); // 初始化导航数据
        this.getFloorList();
    },
    methods: {
        async getSwiperList() {
            let res = await getSwiper();
            if (res.meta.status !== 200) {
                return uni.$msg();
            }
            this.swiperList = res.message;
        },
        async getNavList() {
            let res = await getNav();
            if (res.meta.status !== 200) {
                return uni.$msg();
            }
            this.navList = res.message;
        },
        navClickHandler(item) {
            if (item.name === "分类") {
                uni.switchTab({
                    url: "/pages/cate/cate",
                });
            }
        },
        async getFloorList() {
            let res = await getFloor();
            if (res.meta.status !== 200) {
                return uni.$msg();
            }

            res.message.forEach((item) => {
                item.product_list.forEach((prod) => {
                    let query = prod.navigator_url.split("?");
                    prod.url = "/subpkg/goodsList/goodsList?" + query[1];
                });
            });
            this.floorList = res.message;
        },
    },
    created() {
        console.log(1);
    },
};
</script>

<style lang="scss">
swiper {
    height: 330rpx;

    .swiper-item,
    image {
        width: 100%;
        height: 100%;
    }
}

.nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    .nav-img {
        width: 128rpx;
        height: 140rpx;
    }
}
.floor-list {
    width: 100%;

    .floor-title {
        height: 60rpx;
        width: 100%;
        border: 1px solid;
        display: flex;
    }
    .floor-img-box {
        display: flex;
        padding-left: 10rpx;
        .right-img-box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
    }
}
</style>
