export const supplierChannel: BroadcastChannel =
  typeof window !== 'undefined'
    ? new BroadcastChannel('supplier-products')
    : ({} as BroadcastChannel)

// Asegurarnos de que el canal se cierre solo cuando la aplicación se cierre
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    supplierChannel.close()
  })
}