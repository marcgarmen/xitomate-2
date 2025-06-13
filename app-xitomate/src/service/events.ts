export const supplierChannel: BroadcastChannel =
  typeof window !== 'undefined'
    ? new BroadcastChannel('supplier-products')
    : ({} as BroadcastChannel)

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    supplierChannel.close()
  })
}