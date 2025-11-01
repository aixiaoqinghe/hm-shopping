// 测试分类API数据结构
import { getCategoryData } from './category.js'

// 测试函数
export const testCategoryAPI = async () => {
  try {
    console.log('开始测试分类API...')
    const result = await getCategoryData()
    console.log('API返回结果:', result)
    console.log('数据类型:', typeof result)
    console.log('是否包含data属性:', 'data' in result)
    console.log('是否包含list属性:', 'list' in result)

    if (result.data && Array.isArray(result.data)) {
      console.log('data是数组，长度为:', result.data.length)
      if (result.data.length > 0) {
        console.log('第一个分类项结构:', result.data[0])
        console.log('第一个分类项是否包含children:', 'children' in result.data[0])
        if (result.data[0].children && Array.isArray(result.data[0].children)) {
          console.log('children是数组，长度为:', result.data[0].children.length)
          if (result.data[0].children.length > 0) {
            console.log('第一个子分类项结构:', result.data[0].children[0])
            console.log('图片属性可能的字段:',
              'image' in result.data[0].children[0] ? result.data[0].children[0].image : '不存在',
              'image_url' in result.data[0].children[0] ? result.data[0].children[0].image_url : '不存在',
              'external_url' in result.data[0].children[0] ? result.data[0].children[0].external_url : '不存在'
            )
          }
        }
      }
    } else if (result.list && Array.isArray(result.list)) {
      console.log('list是数组，长度为:', result.list.length)
      if (result.list.length > 0) {
        console.log('第一个分类项结构:', result.list[0])
        // 类似的其他日志输出...
      }
    }

    return result
  } catch (error) {
    console.error('测试分类API失败:', error)
    return null
  }
}

// 如果直接运行此脚本，则执行测试
if (typeof window !== 'undefined') {
  // 在浏览器环境中
  console.log('在浏览器中运行测试')
} else {
  // 在Node.js环境中
  console.log('在Node.js中运行测试')
  testCategoryAPI().then(() => {
    console.log('测试完成')
  })
}
