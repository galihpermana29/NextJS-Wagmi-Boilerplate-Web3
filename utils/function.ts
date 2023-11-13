import { message } from "antd"

interface CheckConnectedWalletAddressI {
  walletWhitelists: string[]
  disconnect: () => void
  connectedAccount: string
}

export function CheckConnectedWalletAddress(params: CheckConnectedWalletAddressI) {
  const { walletWhitelists, disconnect, connectedAccount } = params
  if (walletWhitelists.indexOf(connectedAccount) < 0) {
    message.error("Mismatched Wallet")
    disconnect()
  }
}
