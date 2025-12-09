<template>
  <div class="min-h-screen space-y-6 p-6">
    <h2 class="text-2xl font-bold">数据概览</h2>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-blue-100">今日访问</div>
            <div class="mt-2 text-3xl font-bold">{{ stats.todayVisits }}</div>
            <div class="mt-2 text-sm text-blue-100">
              较昨日 {{ stats.visitChange > 0 ? '+' : '' }}{{ stats.visitChange }}%
            </div>
          </div>
          <div class="text-4xl opacity-80">
            <el-icon><View /></el-icon>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-gradient-to-r from-green-500 to-green-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-green-100">新增用户</div>
            <div class="mt-2 text-3xl font-bold">{{ stats.newUsers }}</div>
            <div class="mt-2 text-sm text-green-100">
              较昨日 {{ stats.userChange > 0 ? '+' : '' }}{{ stats.userChange }}%
            </div>
          </div>
          <div class="text-4xl opacity-80">
            <el-icon><User /></el-icon>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-yellow-100">订单总数</div>
            <div class="mt-2 text-3xl font-bold">{{ stats.totalOrders }}</div>
            <div class="mt-2 text-sm text-yellow-100">
              较昨日 {{ stats.orderChange > 0 ? '+' : '' }}{{ stats.orderChange }}%
            </div>
          </div>
          <div class="text-4xl opacity-80">
            <el-icon><Document /></el-icon>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-purple-100">销售额</div>
            <div class="mt-2 text-3xl font-bold">¥{{ stats.totalSales.toLocaleString() }}</div>
            <div class="mt-2 text-sm text-purple-100">
              较昨日 {{ stats.salesChange > 0 ? '+' : '' }}{{ stats.salesChange }}%
            </div>
          </div>
          <div class="text-4xl opacity-80">
            <el-icon><Money /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- 折线图 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">访问趋势</h3>
        <div ref="lineChartRef" class="h-80"></div>
      </div>

      <!-- 柱状图 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">销售统计</h3>
        <div ref="barChartRef" class="h-80"></div>
      </div>

      <!-- 饼图 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">产品类别分布</h3>
        <div ref="pieChartRef" class="h-80"></div>
      </div>

      <!-- 雷达图 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">性能指标</h3>
        <div ref="radarChartRef" class="h-80"></div>
      </div>

      <!-- 散点图 -->
      <div class="rounded-lg bg-white p-6 shadow-lg lg:col-span-2">
        <h3 class="mb-4 text-lg font-semibold">用户活跃度分析</h3>
        <div ref="scatterChartRef" class="h-80"></div>
      </div>

      <!-- 热力图 -->
      <div class="rounded-lg bg-white p-6 shadow-lg lg:col-span-2">
        <h3 class="mb-4 text-lg font-semibold">访问热力图</h3>
        <div ref="heatmapChartRef" class="h-80"></div>
      </div>

      <!-- 漏斗图 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">转化漏斗</h3>
        <div ref="funnelChartRef" class="h-80"></div>
      </div>

      <!-- 仪表盘 -->
      <div class="rounded-lg bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">完成率</h3>
        <div ref="gaugeChartRef" class="h-80"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { View, User, Document, Money } from '@element-plus/icons-vue'

// 图表引用
const lineChartRef = ref<HTMLDivElement>()
const barChartRef = ref<HTMLDivElement>()
const pieChartRef = ref<HTMLDivElement>()
const radarChartRef = ref<HTMLDivElement>()
const scatterChartRef = ref<HTMLDivElement>()
const heatmapChartRef = ref<HTMLDivElement>()
const funnelChartRef = ref<HTMLDivElement>()
const gaugeChartRef = ref<HTMLDivElement>()

// 图表实例
let lineChart: echarts.ECharts | null = null
let barChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null
let radarChart: echarts.ECharts | null = null
let scatterChart: echarts.ECharts | null = null
let heatmapChart: echarts.ECharts | null = null
let funnelChart: echarts.ECharts | null = null
let gaugeChart: echarts.ECharts | null = null

// 统计数据
const stats = ref({
  todayVisits: 1234,
  visitChange: 12.5,
  newUsers: 56,
  userChange: -3.2,
  totalOrders: 789,
  orderChange: 8.7,
  totalSales: 12345,
  salesChange: 15.3,
})

// 生成Mock数据
const generateMockData = () => {
  // 生成最近7天的日期
  const dates = [] as string[]
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
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
    visits: generateRandomArray(7, 800, 1500),
    pageViews: generateRandomArray(7, 2000, 4000),
    salesData: generateRandomArray(12, 10000, 50000),
    categoryData: [
      { value: Math.floor(Math.random() * 1000) + 500, name: '电子产品' },
      { value: Math.floor(Math.random() * 800) + 300, name: '服装配饰' },
      { value: Math.floor(Math.random() * 600) + 200, name: '家居用品' },
      { value: Math.floor(Math.random() * 400) + 100, name: '食品饮料' },
      { value: Math.floor(Math.random() * 300) + 50, name: '图书音像' },
    ],
    radarData: [
      { value: Math.floor(Math.random() * 40) + 60, name: '访问速度' },
      { value: Math.floor(Math.random() * 30) + 70, name: '系统稳定性' },
      { value: Math.floor(Math.random() * 20) + 80, name: '用户满意度' },
      { value: Math.floor(Math.random() * 25) + 75, name: '功能完整性' },
      { value: Math.floor(Math.random() * 35) + 65, name: '安全性' },
    ],
    scatterData: Array.from({ length: 100 }, () => [
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 20) + 5,
    ]),
    heatmapData: Array.from({ length: 24 }, (_, hour) =>
      Array.from({ length: 7 }, (_, day) => Math.floor(Math.random() * 100)),
    ),
    funnelData: [
      { value: 1000, name: '访问' },
      { value: 800, name: '浏览商品' },
      { value: 600, name: '加入购物车' },
      { value: 400, name: '提交订单' },
      { value: 300, name: '支付' },
      { value: 200, name: '完成交易' },
    ],
    completionRate: Math.floor(Math.random() * 30) + 70,
  }
}

// 初始化图表
const initCharts = () => {
  const mockData = generateMockData()

  // 折线图
  if (lineChartRef.value) {
    lineChart = echarts.init(lineChartRef.value)
    lineChart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['访问量', '页面浏览量'],
      },
      xAxis: {
        type: 'category',
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
        },
        {
          name: '页面浏览量',
          type: 'line',
          smooth: true,
          data: mockData.pageViews,
          itemStyle: {
            color: '#91cc75',
          },
        },
      ],
    })
  }

  // 柱状图
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value)
    barChart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '销售额',
          type: 'bar',
          data: mockData.salesData,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
        },
      ],
    })
  }

  // 饼图
  if (pieChartRef.value) {
    pieChart = echarts.init(pieChartRef.value)
    pieChart.setOption({
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
          name: '产品类别',
          type: 'pie',
          radius: ['50%', '70%'],
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
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: mockData.categoryData,
        },
      ],
    })
  }

  // 雷达图
  if (radarChartRef.value) {
    radarChart = echarts.init(radarChartRef.value)
    radarChart.setOption({
      tooltip: {},
      radar: {
        indicator: mockData.radarData.map((item) => ({
          name: item.name,
          max: 100,
        })),
      },
      series: [
        {
          name: '性能指标',
          type: 'radar',
          data: [
            {
              value: mockData.radarData.map((item) => item.value),
              name: '当前值',
              itemStyle: {
                color: '#5470c6',
              },
              areaStyle: {
                color: 'rgba(84, 112, 198, 0.5)',
              },
            },
          ],
        },
      ],
    })
  }

  // 散点图
  if (scatterChartRef.value) {
    scatterChart = echarts.init(scatterChartRef.value)
    scatterChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          return `活跃度: ${params.value[0]}<br/>停留时间: ${params.value[1]}分钟<br/>访问次数: ${params.value[2]}次`
        },
      },
      xAxis: {
        type: 'value',
        name: '活跃度',
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      yAxis: {
        type: 'value',
        name: '停留时间(分钟)',
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      series: [
        {
          name: '用户活跃度',
          type: 'scatter',
          symbolSize: function (data: any) {
            return Math.sqrt(data[2]) * 5
          },
          data: mockData.scatterData,
          itemStyle: {
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              { offset: 0, color: 'rgba(251, 118, 123, 1)' },
              { offset: 1, color: 'rgba(204, 46, 72, 1)' },
            ]),
          },
        },
      ],
    })
  }

  // 热力图
  if (heatmapChartRef.value) {
    heatmapChart = echarts.init(heatmapChartRef.value)
    const hours = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ]
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

    const data = [] as number[][]
    for (let i = 0; i < hours.length; i++) {
      for (let j = 0; j < days.length; j++) {
        data.push([i, j, mockData.heatmapData[i][j]])
      }
    }

    heatmapChart.setOption({
      tooltip: {
        position: 'top',
        formatter: function (params: any) {
          return `${days[params.value[1]]} ${hours[params.value[0]]}<br/>访问量: ${params.value[2]}`
        },
      },
      grid: {
        height: '80%',
        top: '10%',
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
          show: true,
        },
      },
      yAxis: {
        type: 'category',
        data: days,
        splitArea: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026',
          ],
        },
      },
      series: [
        {
          name: '访问热力图',
          type: 'heatmap',
          data: data,
          label: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })
  }

  // 漏斗图
  if (funnelChartRef.value) {
    funnelChart = echarts.init(funnelChartRef.value)
    funnelChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      legend: {
        data: mockData.funnelData.map((item) => item.name),
      },
      series: [
        {
          name: '转化漏斗',
          type: 'funnel',
          left: '10%',
          width: '80%',
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

  // 仪表盘
  if (gaugeChartRef.value) {
    gaugeChart = echarts.init(gaugeChartRef.value)
    gaugeChart.setOption({
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: '完成率',
          type: 'gauge',
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
            },
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            fontSize: 40,
            offsetCenter: [0, '70%'],
          },
          data: [
            {
              value: mockData.completionRate,
              name: '完成率',
            },
          ],
        },
      ],
    })
  }
}

// 响应式调整
const handleResize = () => {
  lineChart?.resize()
  barChart?.resize()
  pieChart?.resize()
  radarChart?.resize()
  scatterChart?.resize()
  heatmapChart?.resize()
  funnelChart?.resize()
  gaugeChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  lineChart?.dispose()
  barChart?.dispose()
  pieChart?.dispose()
  radarChart?.dispose()
  scatterChart?.dispose()
  heatmapChart?.dispose()
  funnelChart?.dispose()
  gaugeChart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* 组件样式 */
</style>
