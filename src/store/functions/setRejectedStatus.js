export default function setRejectedStatus(state, action) {
  state.status = 'rejected'
  state.error = action.payload
}
