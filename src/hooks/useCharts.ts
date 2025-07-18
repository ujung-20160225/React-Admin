import { useEffect, useRef, useState, RefObject } from 'react';
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入需要的图表，图表后缀都为 Chart
import { LineChart, PieChart, RadarChart } from 'echarts/charts';
// 引入标题，提示框，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { LegendComponent, TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    PieChart,
    RadarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
]);

export const useCharts = (): [RefObject<HTMLDivElement>, echarts.EChartsType | undefined] => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.EChartsType>();
    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);
            setChartInstance(chartInstance);
        }
    }, []);
    return [chartRef, chartInstance];
};
