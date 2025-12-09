import { App } from 'vue'
import VChart from 'vue-echarts'

import { use } from 'echarts/core'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  GraphChart,
  CustomChart,
  EffectScatterChart,
} from 'echarts/charts'
import {
  TitleComponent,
  LegendComponent,
  LegendScrollComponent,
  GridComponent,
  DatasetComponent,
  TooltipComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  MarkPointComponent,
  DataZoomSliderComponent,
} from 'echarts/components'
import 'echarts-wordcloud'

use([
  SVGRenderer,
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  ScatterChart,
  GraphChart,
  CustomChart,
  GridComponent,
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  LegendScrollComponent,
  TooltipComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  MarkPointComponent,
  DataZoomSliderComponent,
  EffectScatterChart,
])

export default (app: App): void => {
  app.component('VChart', VChart)
}
