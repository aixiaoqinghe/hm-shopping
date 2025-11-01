// 用于直接测试API响应数据的脚本
const axios = require('axios')

// 分类API地址
const API_BASE_URL = 'http://smart-shop.itheima.net/index.php?s=/api'
const CATEGORY_API = `${API_BASE_URL}/category/list`

// 测试分类API
async function testCategoryAPI () {
  try {
    console.log('\n=====================================')
    console.log('开始测试分类API...')
    console.log(`请求地址: ${CATEGORY_API}`)

    const response = await axios.get(CATEGORY_API)
    const data = response.data

    console.log('\nAPI返回状态码:', response.status)
    console.log('\nAPI完整响应结构:')
    console.log(JSON.stringify(data, null, 2))

    // 分析数据结构
    console.log('\n=====================================')
    console.log('数据结构分析:')

    // 检查数据是否存在
    if (!data) {
      console.log('错误: API返回数据为空')
      return
    }

    // 检查数据的主要字段
    const mainDataFields = ['data', 'list']
    let categoriesData = null

    for (const field of mainDataFields) {
      if (field in data) {
        categoriesData = data[field]
        console.log(`发现主要数据字段: ${field}`)
        break
      }
    }

    if (!categoriesData) {
      console.log('错误: 未找到有效的分类数据字段')
      console.log('API返回的所有字段:', Object.keys(data))
      return
    }

    console.log('主要数据字段类型:', Array.isArray(categoriesData) ? '数组' : typeof categoriesData)

    if (Array.isArray(categoriesData)) {
      console.log(`分类数量: ${categoriesData.length}`)

      if (categoriesData.length > 0) {
        // 分析第一个分类
        const firstCategory = categoriesData[0]
        console.log('\n第一个分类的所有属性:')
        console.log(Object.keys(firstCategory))

        // 检查是否有children属性
        if ('children' in firstCategory && Array.isArray(firstCategory.children)) {
          console.log(`\n第一个分类的子分类数量: ${firstCategory.children.length}`)

          if (firstCategory.children.length > 0) {
            // 分析第一个子分类
            const firstChild = firstCategory.children[0]
            console.log('\n第一个子分类的所有属性:')
            console.log(Object.keys(firstChild))

            // 检查图片相关字段
            console.log('\n图片相关字段详细信息:')
            const imageFields = ['image', 'image_url', 'img_url', 'pic_url', 'picture', 'icon']

            imageFields.forEach(field => {
              if (field in firstChild) {
                console.log(`- ${field}:`, firstChild[field])
                console.log(`  - 类型: ${typeof firstChild[field]}`)
                console.log(`  - 是否为空: ${!firstChild[field]}`)
                if (typeof firstChild[field] === 'string') {
                  console.log(`  - 字符串长度: ${firstChild[field].length}`)
                  console.log(`  - 包含http: ${firstChild[field].includes('http')}`)
                }
              } else {
                console.log(`- ${field}: 不存在`)
              }
            })

            // 打印完整的第一个子分类数据
            console.log('\n第一个子分类的完整数据:')
            console.log(JSON.stringify(firstChild, null, 2))
          }
        } else {
          console.log('警告: 第一个分类没有children属性或children不是数组')
        }
      }
    } else {
      console.log('警告: 主要数据字段不是数组，无法继续分析')
    }

    console.log('\n=====================================')
    console.log('测试完成')
  } catch (error) {
    console.error('\n=====================================')
    console.error('API测试失败:', error.message)
    if (error.response) {
      console.error('响应状态码:', error.response.status)
      console.error('响应数据:', error.response.data)
    } else if (error.request) {
      console.error('没有收到响应:', error.request)
    }
    console.error('\n=====================================')
  }
}

// 执行测试
if (require.main === module) {
  console.log('分类API数据结构测试工具')
  console.log('此工具将直接请求API并分析返回的数据结构')
  testCategoryAPI()
}

module.exports = { testCategoryAPI }
