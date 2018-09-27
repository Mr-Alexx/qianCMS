export default {
  tooltip: {
    trigger: 'item',
    formatter: '{b}'
  },
  series: [
    {
      name: '中国',
      type: 'map',
      mapType: 'china',
      selectedMode: 'single', // 'multiple',
      aspectScale: 0.75, // 地图长宽比
      zoom: 1.2,
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: [
        { name: '广东', selected: true }
      ]
    }
  ]
}
