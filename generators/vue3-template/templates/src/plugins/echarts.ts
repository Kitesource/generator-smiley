import VChart from 'vue-echarts'

import { use } from 'echarts/core'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import {
  BarChart,
  GraphChart,
  LineChart,
  PieChart,
} from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'

use([
  SVGRenderer,
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  GraphChart,
  GridComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  TooltipComponent,
  ToolboxComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
])

export default VChart
