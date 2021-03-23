import dragToAddItem from './dragToAddItem'
import hoverNodeActived from './hoverNodeActived'
import hoverAnchorActived from './hoverAnchorActived'
import dragEdge from './dragEdge'
import clickSelected from './clickSelected'
export default function (G6) {
  dragToAddItem(G6)
  hoverNodeActived(G6)
  hoverAnchorActived(G6)
  dragEdge(G6)
  clickSelected(G6)
}
