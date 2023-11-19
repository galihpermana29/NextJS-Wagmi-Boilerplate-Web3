import { Badge, Button, Select } from "antd"
import { useEffect, useState } from "react"
import { WalletSwitcherModal } from "components/modal/wallet-switcher"
import { InitialContextStateI } from "utils/interface_type"

interface NavbarI {
  config: InitialContextStateI
  onDetail: () => void
}

export default function Navbar({ config, onDetail }: NavbarI) {
  const { connect, connectors, disconnect, isConnected, chains, switchNetwork, chain } = config

  const [currentNetwork, setCurrentNetwork] = useState<number | undefined>(chain?.id)
  const [connectModal, setConnectModal] = useState<boolean>(false)

  useEffect(() => {
    setCurrentNetwork(chain?.id)
    if (chain) setConnectModal(false)
  }, [chain])

  return (
    <div className="flex justify-between p-[20px]">
      <div className="font-bold">Cheers</div>
      <div>
        <WalletSwitcherModal config={{ connectModal, connectors, connect, setConnectModal }} />
      </div>
      <div className="flex gap-[10px]">
        {!isConnected && (
          <Button
            size="large"
            className="bg-blue-500 text-white hover:text-white"
            onClick={() => setConnectModal(true)}
          >
            <h1 suppressHydrationWarning className="text-[13px]">
              CONNECT WALLET
            </h1>
          </Button>
        )}
        {isConnected && (
          <Button
            type="link"
            onClick={() => disconnect!()}
            size="large"
            className="border-gray-500  bg-white text-gray-500 hover:border-[1px] hover:bg-white"
          >
            <h1 suppressHydrationWarning className="text-[13px]">
              DISCONNECT
            </h1>
          </Button>
        )}

        {isConnected && (
          <Button onClick={onDetail} size="large" className="bg-blue-500 text-white hover:text-white">
            <h1 suppressHydrationWarning className="text-[13px]">
              DETAIL
            </h1>
          </Button>
        )}

        {isConnected && chain && (
          <Select value={currentNetwork} className="h-[40px] min-w-[120px]" onChange={(val) => switchNetwork?.(val)}>
            {chains?.map((cx, idx) => (
              <Select.Option key={idx} value={cx.id}>
                {chain?.id === cx.id && <Badge status="success" className="mr-[5px]" />}
                {cx.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </div>
    </div>
  )
}
