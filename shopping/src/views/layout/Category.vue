<template>
  <div class="category">
    <!-- 分类 -->
    <van-nav-bar title="全部分类" fixed />

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />

    <!-- 分类列表 -->
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item, index) in list" :key="item.category_id">
            <a :class="{ active: index === activeIndex }" @click="activeIndex = index" href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <!-- 根据左侧选中的分类显示对应的子分类 -->
        <div
          v-if="activeCategory && activeCategory.children && activeCategory.children.length > 0"
          class="right-content"
        >
          <div
            @click="$router.push(`/searchlist?categoryId=${item.category_id}`)"
            v-for="item in activeCategory.children"
            :key="item.category_id"
            class="cate-goods"
          >
            <!-- 正确处理图片显示逻辑：检查image字段是否存在且有有效路径 -->
            <div v-if="item.image && item.image.preview_url"
                 class="image-wrapper">
              <img :src="item.image.preview_url" :alt="item.name" class="category-image" />
            </div>
            <!-- 没有图片时显示占位图 -->
            <div v-else class="image-placeholder">
              <span>{{ item.name.charAt(0) }}</span>
            </div>
            <p>{{ item.name }}</p>
          </div>
        </div>
        <!-- 没有子分类时显示提示 -->
        <div v-else class="empty-tip">
          <p>暂无分类数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'
import { testCategoryAPI } from '@/api/test-category.js'
export default {
  name: 'CategoryPage',
  created () {
    this.getCategoryList()
    // 调用测试函数来查看API返回的数据结构
    this.testCategoryAPI()
  },
  data () {
    return {
      list: [],
      activeIndex: 0,
      activeCategory: null
    }
  },
  watch: {
    // 监听列表变化，更新当前选中的分类
    list: {
      handler (newList) {
        if (newList.length > 0 && !this.activeCategory) {
          this.activeCategory = newList[this.activeIndex]
        }
      },
      immediate: true
    },
    // 监听激活索引变化，更新当前选中的分类
    activeIndex: {
      handler (newIndex) {
        if (this.list[newIndex]) {
          this.activeCategory = this.list[newIndex]
        }
      },
      immediate: true
    }
  },
  methods: {
    async getCategoryList () {
      try {
        const res = await getCategoryData()
        // 根据API返回的实际数据结构调整 - API返回的是{"data":{"list":[...]}}
        this.list = res.data?.list || []
        console.log('分类数据:', this.list)

        // 详细打印API返回结构，以便调试图片路径问题
        console.log('API完整响应:', res)

        // 如果有数据，设置第一个分类为激活状态
        if (this.list.length > 0) {
          this.activeCategory = this.list[this.activeIndex]

          // 详细打印第一个分类
          const firstCategory = this.list[0]
          console.log('第一个分类完整结构:', firstCategory)
          console.log('分类项的所有属性:', Object.keys(firstCategory))

          // 检查是否有children属性及结构
          if (firstCategory.children && firstCategory.children.length > 0) {
            console.log('第一个分类的子分类数量:', firstCategory.children.length)
            console.log('第一个子分类结构:', firstCategory.children[0])

            // 检查子分类是否有图片
            const firstChild = firstCategory.children[0]
            if (firstChild.image) {
              console.log('子分类图片信息:', firstChild.image)
              console.log('预览图片URL:', firstChild.image.preview_url || '无')
            }
          }
        }
      } catch (error) {
        console.error('获取分类数据失败:', error)
      }
    },
    async testCategoryAPI () {
      try {
        console.log('开始测试分类API数据结构...')
        await testCategoryAPI()
      } catch (error) {
        console.error('测试分类API失败:', error)
      }
    }

  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.category {
  padding-top: 100px;
  padding-bottom: 50px;
  height: 100vh;
  .list-box {
    height: 100%;
    display: flex;
    .left {
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;
      overflow: auto;
      a {
        display: block;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #444444;
        font-size: 12px;
        &.active {
          color: #fb442f;
          background-color: #fff;
        }
      }
    }
    .right {
        flex: 1;
        height: 100%;
        background-color: #ffffff;
        padding: 10px 0;
        overflow: auto;

        .right-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: flex-start;
        }

        .cate-goods {
          width: 33.3%;
          margin-bottom: 10px;
          .image-wrapper {
            width: 70px;
            height: 70px;
            display: block;
            margin: 5px auto;
            overflow: hidden;
            border-radius: 8px;
          }
          .category-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .image-placeholder {
            width: 70px;
            height: 70px;
            display: block;
            margin: 5px auto;
            background-color: #f0f0f0;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            color: #666;
            font-weight: bold;
          }
          p {
            text-align: center;
            font-size: 12px;
          }
        }

        .empty-tip {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: #999;
          font-size: 14px;
        }
      }
  }
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}
</style>
