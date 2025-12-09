<template>
  <div class="min-h-screen space-y-6 p-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">数据分析</h2>
      <div class="flex space-x-2">
        <el-select v-model="timeRange" placeholder="选择时间范围" style="width: 150px">
          <el-option label="最近7天" value="7" />
          <el-option label="最近30天" value="30" />
          <el-option label="最近90天" value="90" />
          <el-option label="最近一年" value="365" />
        </el-select>
        <el-button type="primary" @click="refreshData">
          <el-icon><Refresh /></el-icon>
          刷新数据
        </el-button>
      </div>
    </div>

    <!-- 数据概览卡片 -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg bg-white p-6 shadow-md">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500">总访问量</div>
            <div class="mt-2 text-3xl font-bold text-gray-900">{{ overviewData.totalVisits.toLocaleString() }}</div>
            <div class="mt-2 flex items-center text-sm">
              <el-icon v-if="overviewData.visitsTrend > 0" class="text-green-500"><ArrowUp /></el-icon>
              <el-icon v-else class="text-red-500"><ArrowDown /></el-icon>
              <span :class="overviewData.visitsTrend > 0 ? 'text-green-500' : 'text-red-500'">
                {{ Math.abs(overviewData.visitsTrend) }}%
              </span>
              <span class="ml-1 text-gray-500">较上期</span>
            </div>
          </div>
          <div class="rounded-full bg-blue-100 p-3">
            <el-icon class="text-2xl text-blue-600"><View /></el-icon>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-md">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500">转化率</div>
            <div class="mt-2 text-3xl font-bold text-gray-900">{{ overviewData.conversionRate }}%</div>
            <div class="mt-2 flex items-center text-sm">
              <el-icon v-if="overviewData.conversionTrend > 0" class="text-green-500"><ArrowUp /></el-icon>
              <el-icon v-else class="text-red-500"><ArrowDown /></el-icon>
              <span :class="overviewData.conversionTrend > 0 ? 'text-green-500' : 'text-red-500'">
                {{ Math.abs(overviewData.conversionTrend) }}%
              </span>
              <span class="ml-1 text-gray-500">较上期</span>
            </div>
          </div>
          <div class="rounded-full bg-green-100 p-3">
            <el-icon class="text-2xl text-green-600"><TrendCharts /></el-icon>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-md">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500">平均停留时间</div>
            <div class="mt-2 text-3xl font-bold text-gray-900">{{ overviewData.avgStayTime }}分钟</div>
            <div class="mt-2 flex items-center text-sm">
              <el-icon v-if="overviewData.stayTimeTrend > 0" class="text-green-500"><ArrowUp /></el-icon>
              <el-icon v-else class="text-red-500"><ArrowDown /></el-icon>
              <span :class="overviewData.stayTimeTrend > 0 ? 'text-green-500' : 'text-red-500'">
                {{ Math.abs(overviewData.stayTimeTrend) }}%
              </span>
              <span class="ml-1 text-gray-500">较上期</span>
            </div>
          </div>
          <div class="rounded-full bg-yellow-100 p-3">
            <el-icon class="text-2xl text-yellow-600"><Clock /></el-icon>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-white p-6 shadow-md">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-gray-500">跳出率</div>
            <div class="mt-2 text-3xl font-bold text-gray-900">{{ overviewData.bounceRate }}%</div>
            <div class="mt-2 flex items-center text-sm">
              <el-icon v-if="overviewData.bounceRateTrend < 0" class="text-green-500"><ArrowDown /></el-icon>
              <el-icon v-else class="text-red-500"><ArrowUp /></el-icon>
              <span :class="overviewData.bounceRateTrend < 0 ? 'text-green-500' : 'text-red-500'">
                {{ Math.abs(overviewData.bounceRateTrend) }}%
              </span>
              <span class="ml-1 text-gray-500">较上期</span>
            </div>
          </div>
          <div class="rounded-full bg-red-100 p-3">
            <el-icon class="text-2xl text-red-600"><SwitchButton /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- 访问趋势图 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">访问趋势分析</h3>
        <div ref="visitTrendChartRef" class="h-80"></div>
      </div>

      <!-- 用户行为漏斗 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">用户行为转化</h3>
        <div ref="behaviorFunnelRef" class="h-80"></div>
      </div>

      <!-- 页面访问排行 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">页面访问排行</h3>
        <div ref="pageRankChartRef" class="h-80"></div>
      </div>

      <!-- 用户来源分析 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">用户来源分析</h3>
        <div ref="sourceAnalysisRef" class="h-80"></div>
      </div>

      <!-- 设备分布 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">设备分布</h3>
        <div ref="deviceDistributionRef" class="h-80"></div>
      </div>

      <!-- 地域分布 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">地域分布</h3>
        <div ref="geoDistributionRef" class="h-80"></div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="rounded-lg bg-white p-6 shadow-lg">
      <div class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold">详细数据</h3>
        <el-button type="primary" plain>
          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
      </div>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="visits" label="访问量" width="100" />
        <el-table-column prop="uniqueVisitors" label="独立访客" width="100" />
        <el-table-column prop="pageViews" label="页面浏览量" width="120" />
        <el-table-column prop="avgStayTime" label="平均停留时间" width="120" />
        <el-table-column prop="bounceRate" label="跳出率" width="100" />
        <el-table-column prop="conversionRate" label="转化率" width="100" />
        <el-table-column label="趋势" width="100">
          <template #default="scope">
            <div class="flex items-center">
              <el-icon v-if="scope.row.trend > 0" class="text-green-500"><TrendCharts /></el-icon>
              <el-icon v-else class="text-red-500"><TrendCharts /></el-icon>
              <span :class="scope.row.trend > 0 ? 'text-green-500' : 'text-red-500'" class="ml-1">
                {{ scope.row.trend > 0 ? '+' : '' }}{{ scope.row.trend }}%
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="mt-4 flex justify-center">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { Refresh, View, TrendCharts, Clock, SwitchButton, ArrowUp, ArrowDown, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 图表引用
const visitTrendChartRef = ref<HTMLDivElement>()
const behaviorFunnelRef = ref<HTMLDivElement>()
const pageRankChartRef = ref<HTMLDivElement>()
const sourceAnalysisRef = ref<HTMLDivElement>()
const deviceDistributionRef = ref<HTMLDivElement>()
const geoDistributionRef = ref<HTMLDivElement>()

// 图表实例
let visitTrendChart: echarts.ECharts | null = null
let behaviorFunnelChart: echarts.ECharts | null = null
let pageRankChart: echarts.ECharts | null = null
let sourceAnalysisChart: echarts.ECharts | null = null
let deviceDistributionChart: echarts.ECharts | null = null
let geoDistributionChart: echarts.ECharts | null = null

// 时间范围
const timeRange = ref('30')

// 概览数据
const overviewData = ref({
  totalVisits: 156789,
  visitsTrend: 12.5,
  conversionRate: 3.8,
  conversionTrend: 5.2,
  avgStayTime: 4.5,
  stayTimeTrend: -2.3,
  bounceRate: 42.3,
  bounceRateTrend: -3.1,
})

// 表格数据
const tableData = ref([
  {
    date: '2023-12-01',
    visits: 5234,
    uniqueVisitors: 3456,
    pageViews: 12456,
    avgStayTime: '4分32秒',
    bounceRate: '41.2%',
    conversionRate: '3.5%',
    trend: 5.2,
  },
  {
    date: '2023-12-02',
    visits: 6123,
    uniqueVisitors: 4234,
    pageViews: 15678,
    avgStayTime: '5分12秒',
    bounceRate: '39.8%',
    conversionRate: '4.1%',
    trend: 8.7,
  },
  {
    date: '2023-12-03',
    visits: 5890,
    uniqueVisitors: 3987,
    pageViews: 14567,
    avgStayTime: '4分45秒',
    bounceRate: '40.5%',
    conversionRate: '3.9%',
    trend: -2.1,
  },
  {
    date: '2023-12-04',
    visits: 6234,
    uniqueVisitors: 4567,
    pageViews: 16789,
    avgStayTime: '5分34秒',
    bounceRate: '38.9%',
    conversionRate: '4.3%',
    trend: 12.3,
  },
  {
    date: '2023-12-05',
    visits: 5789,
    uniqueVisitors: 4123,
    pageViews: 13987,
    avgStayTime: '4分18秒',
    bounceRate: '42.1%',
    conversionRate: '3.7%',
    trend: -4.5,
  },
])

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(100)

// 生成Mock数据
const generateMockData = () => {
  const days = parseInt(timeRange.value)
  const dates = [] as string[]
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`)
  }

  // 生成随机数据
  const generateRandomArray = (length: number, min: number, max: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)
  }

  return {
    dates,
    visits: generateRandomArray(days, 3000, 8000),
    uniqueVisitors: generateRandomArray(days, 2000, 5000),
    pageViews: generateRandomArray(days, 8000, 20000),
    avgStayTime: generateRandomArray(days, 180, 600), // 秒
    bounceRate: generateRandomArray(days, 30, 60),
    conversionRate: generateRandomArray(days, 20, 80), // 基数，实际除以10得到百分比
    pageRankData: [
      { name: '/home', value: Math.floor(Math.random() * 5000) + 3000 },
      { name: '/products', value: Math.floor(Math.random() * 4000) + 2000 },
      { name: '/about', value: Math.floor(Math.random() * 3000) + 1500 },
      { name: '/contact', value: Math.floor(Math.random() * 2000) + 1000 },
      { name: '/blog', value: Math.floor(Math.random() * 1500) + 500 },
      { name: '/services', value: Math.floor(Math.random() * 1000) + 300 },
      { name: '/faq', value: Math.floor(Math.random() * 800) + 200 },
      { name: '/careers', value: Math.floor(Math.random() * 500) + 100 },
    ],
    sourceData: [
      { value: Math.floor(Math.random() * 3000) + 2000, name: '直接访问' },
      { value: Math.floor(Math.random() * 2500) + 1500, name: '搜索引擎' },
      { value: Math.floor(Math.random() * 2000) + 1000, name: '社交媒体' },
      { value: Math.floor(Math.random() * 1500) + 800, name: '邮件营销' },
      { value: Math.floor(Math.random() * 1000) + 500, name: '外部链接' },
    ],
    deviceData: [
      { value: Math.floor(Math.random() * 4000) + 3000, name: '桌面端' },
      { value: Math.floor(Math.random() * 3000) + 2000, name: '移动端' },
      { value: Math.floor(Math.random() * 1000) + 500, name: '平板' },
    ],
    geoData: [
      { name: '北京', value: Math.floor(Math.random() * 3000) + 2000 },
      { name: '上海', value: Math.floor(Math.random() * 2500) + 1500 },
      { name: '广州', value: Math.floor(Math.random() * 2000) + 1000 },
      { name: '深圳', value: Math.floor(Math.random() * 1800) + 800 },
      { name: '杭州', value: Math.floor(Math.random() * 1500) + 700 },
      { name: '成都', value: Math.floor(Math.random() * 1200) + 600 },
      { name: '武汉', value: Math.floor(Math.random() * 1000) + 500 },
      { name: '西安', value: Math.floor(Math.random() * 800) + 400 },
    ],
    funnelData: [
      { value: 10000, name: '访问网站' },
      { value: 7500, name: '浏览产品' },
      { value: 5000, name: '加入购物车' },
      { value: 3000, name: '进入结算' },
      { value: 2000, name: '完成支付' },
      { value: 1500, name: '完成交易' },
    ],
  }
}

// 初始化图表
const initCharts = () => {
  const mockData = generateMockData()

  // 访问趋势图
  if (visitTrendChartRef.value) {
    visitTrendChart = echarts.init(visitTrendChartRef.value)
    visitTrendChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['访问量', '独立访客', '页面浏览量'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: mockData.dates,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '访问量',
          type: 'line',
          smooth: true,
          data: mockData.visits,
          itemStyle: {
            color: '#5470c6',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(84, 112, 198, 0.5)' },
              { offset: 1, color: 'rgba(84, 112, 198, 0.1)' },
            ]),
          },
        },
        {
          name: '独立访客',
          type: 'line',
          smooth: true,
          data: mockData.uniqueVisitors,
          itemStyle: {
            color: '#91cc75',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(145, 204, 117, 0.5)' },
              { offset: 1, color: 'rgba(145, 204, 117, 0.1)' },
            ]),
          },
        },
        {
          name: '页面浏览量',
          type: 'line',
          smooth: true,
          data: mockData.pageViews,
          itemStyle: {
            color: '#fac858',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(250, 200, 88, 0.5)' },
              { offset: 1, color: 'rgba(250, 200, 88, 0.1)' },
            ]),
          },
        },
      ],
    })
  }

  // 用户行为漏斗
  if (behaviorFunnelRef.value) {
    behaviorFunnelChart = echarts.init(behaviorFunnelRef.value)
    behaviorFunnelChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        data: mockData.funnelData.map((item) => item.name),
      },
      series: [
        {
          name: '用户行为',
          type: 'funnel',
          left: '10%',
          top: 60,
          bottom: 60,
          width: '80%',
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid',
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
            },
          },
          data: mockData.funnelData,
        },
      ],
    })
  }

  // 页面访问排行
  if (pageRankChartRef.value) {
    pageRankChart = echarts.init(pageRankChartRef.value)
    pageRankChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: mockData.pageRankData.map((item) => item.name),
      },
      series: [
        {
          name: '访问量',
          type: 'bar',
          data: mockData.pageRankData.map((item) => item.value),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
        },
      ],
    })
  }

  // 用户来源分析
  if (sourceAnalysisRef.value) {
    sourceAnalysisChart = echarts.init(sourceAnalysisRef.value)
    sourceAnalysisChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 10,
      },
      series: [
        {
          name: '用户来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: mockData.sourceData,
        },
      ],
    })
  }

  // 设备分布
  if (deviceDistributionRef.value) {
    deviceDistributionChart = echarts.init(deviceDistributionRef.value)
    deviceDistributionChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        bottom: 10,
        left: 'center',
      },
      series: [
        {
          name: '设备分布',
          type: 'pie',
          radius: ['30%', '70%'],
          center: ['50%', '45%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: mockData.deviceData,
        },
      ],
    })
  }

  // 地域分布
  if (geoDistributionRef.value) {
    geoDistributionChart = echarts.init(geoDistributionRef.value)
    geoDistributionChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}',
      },
      xAxis: {
        type: 'category',
        data: mockData.geoData.map((item) => item.name),
        axisLabel: {
          interval: 0,
          rotate: 30,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '地域分布',
          type: 'bar',
          data: mockData.geoData.map((item) => item.value),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#ff9a76' },
              { offset: 0.5, color: '#ff6b6b' },
              { offset: 1, color: '#ee5a6f' },
            ]),
          },
        },
      ],
    })
  }
}

// 刷新数据
const refreshData = () => {
  // 重新生成数据
  const mockData = generateMockData()

  // 更新概览数据
  overviewData.value = {
    totalVisits: Math.floor(Math.random() * 100000) + 50000,
    visitsTrend: Math.floor(Math.random() * 40) - 20,
    conversionRate: (Math.random() * 5 + 1).toFixed(1) as unknown as number,
    conversionTrend: Math.floor(Math.random() * 20) - 10,
    avgStayTime: (Math.random() * 5 + 2).toFixed(1) as unknown as number,
    stayTimeTrend: Math.floor(Math.random() * 20) - 10,
    bounceRate: (Math.random() * 30 + 30).toFixed(1) as unknown as number,
    bounceRateTrend: Math.floor(Math.random() * 20) - 10,
  }

  // 更新图表
  initCharts()

  ElMessage.success('数据已刷新')
}

// 分页处理
const handleSizeChange = (val: number) => {
  pageSize.value = val
  // 这里可以添加获取数据的逻辑
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
  // 这里可以添加获取数据的逻辑
}

// 响应式调整
const handleResize = () => {
  visitTrendChart?.resize()
  behaviorFunnelChart?.resize()
  pageRankChart?.resize()
  sourceAnalysisChart?.resize()
  deviceDistributionChart?.resize()
  geoDistributionChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  visitTrendChart?.dispose()
  behaviorFunnelChart?.dispose()
  pageRankChart?.dispose()
  sourceAnalysisChart?.dispose()
  deviceDistributionChart?.dispose()
  geoDistributionChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* 组件样式 */
</style>
