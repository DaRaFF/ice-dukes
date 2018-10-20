const chart = window.c3.generate({
  data: {
    columns: [
      ['yes', 50],
      ['no', 50]
    ],
    type: 'donut'
  },
  donut: {
    title: 'Ice Dukes Ligaerhalt'
  }
})

setTimeout(function () {
  const res = window.calculate()
  const probability = Math.floor((100 / res.total) * res.stay)
  chart.load({
    columns: [
      ['yes', probability],
      ['no', 100 - probability]
    ]
  })
}, 1500)
