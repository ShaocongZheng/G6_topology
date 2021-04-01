const state = () => ({
  graph: null,
  selectedItems: {
    nodes: [],
    combos: []
  }
})
const getters = {}

const actions = {}

const mutations = {
  setGraph (state, graph) {
    state.graph = graph
  },
  setSelectedItems (state, selectedItems) {
    state.selectedItems = selectedItems
    console.log({ ...state.selectedItems })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
