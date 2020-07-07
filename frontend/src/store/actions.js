import TargetService from '@/services/target'
import AttackerService from '@/services/attacker'
import { groupBy } from 'underscore'

export default {
  updateSelections (context, { target, attacker, selected }) {
    if (selected) {
      context.commit('addSelection', { target, attacker })
    } else {
      context.commit('removeSelection', { target, attacker })
    }
  },
  async getInfo (context) {
    context.dispatch('getTargets')
    context.dispatch('getAttackers')
  },
  async getTargets (context) {
    const res = await TargetService.getAll()
    const groupedRes = groupBy(res, 'playerName')
    const players = []
    Object.keys(groupedRes)
      .sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase())
      })
      .forEach((key) => {
        players.push(groupedRes[key].sort((a, b) => {
          return a.villageName.localeCompare(b.villageName)
        }))
      })
    context.commit('setTargets', players)
  },
  async getAttackers (context) {
    const res = await AttackerService.getAll()
    context.commit('setAttackers', res)
  }
}
