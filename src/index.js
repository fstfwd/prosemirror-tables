const {Plugin} = require("prosemirror-state")

const {handleTripleClick, handleKeyDown, handleTextInput, mousedown} = require("./input")
const {key} = require("./util")
const {drawCellSelection} = require("./cellselection")

exports.tableEditing = function() {
  return new Plugin({
    key,

    state: {
      init() { return null },
      apply(tr, cur) {
        let set = tr.getMeta(key)
        if (set != null) return set == -1 ? null : set
        if (cur == null || !tr.docChanged) return cur
        let {deleted, pos} = tr.mapping.mapResult(cur)
        return deleted ? null : pos
      }
    },

    props: {
      decorations: drawCellSelection,

      handleDOMEvents: {mousedown},

      createSelectionBetween(view) {
        if (key.getState(view.state) != null) return view.state.selection
      },

      handleTripleClick,

      handleKeyDown,

      handleTextInput
    }
  })
}
