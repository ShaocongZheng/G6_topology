import registerImageBox from './imageBox'
import registerIconCircle from './iconCircle'
import registerAnchor from './anchor'
export default function (G6) {
  registerImageBox(G6)
  registerAnchor(G6)
  registerIconCircle(G6)
}
