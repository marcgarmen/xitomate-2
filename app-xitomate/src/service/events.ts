export const supplierChannel: BroadcastChannel =
  typeof window !== 'undefined'
    ? new BroadcastChannel('supplier-products')
    : ({} as BroadcastChannel)