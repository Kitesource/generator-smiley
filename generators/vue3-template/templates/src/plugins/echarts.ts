import VChart from 'vue-echarts'

import { use } from 'echarts/core'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import {
  BarChart,
  CustomChart,
  EffectScatterChart,
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
  CustomChart,
  GridComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  TooltipComponent,
  ToolboxComponent,
  MarkPointComponent,
  EffectScatterChart,
  MarkLineComponent,
  MarkAreaComponent,
])

export default VChart
