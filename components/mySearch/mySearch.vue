<template>
    <view class="my-search-container">
        <!-- 使用 view 组件模拟 input 输入框的样式 -->
        <view class="my-search-box">
            <uni-icons type="search" size="17"></uni-icons>
            <text class="placeholder">搜索</text>
        </view>
    </view>
</template>

<script>
export default {
    name: "my-search",
    data() {
        return {};
    },
    onLoad() {
        console.log("111111111 :>> ", 111111111);
    },
};
</script>

<style lang="scss">
.my-search-container {
    background-color: #c00000;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
}
</style>
