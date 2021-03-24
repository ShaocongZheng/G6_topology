export default function (G6) {
  G6.registerNode('anchor', {
    shapeType: 'circle',
    setState (name, value, item) {
      const group = item.getContainer()
      console.log(item)
    }
  }, 'circle')
}
