import { Button, Modal } from "antd"
import { Dispatch, SetStateAction } from "react"
import { Connector } from "wagmi"

interface WalletConfigI {
  connectModal: boolean
  connect?: any
  connectors?: Connector<any, any>[]
  setConnectModal: Dispatch<SetStateAction<boolean>>
}

interface WalletSwitcherModalI {
  config: WalletConfigI
}

export const WalletSwitcherModal = ({ config }: WalletSwitcherModalI) => {
  const { connectModal, connect, connectors, setConnectModal } = config

  return (
    <Modal title="Select Wallet Connectors" open={connectModal} footer={null} onCancel={() => setConnectModal(false)}>
      <div className="my-[20px] flex flex-col gap-[10px] px-[50px]">
        {connectors!.map((connector: Connector, idx: number) => (
          <div key={idx}>
            <div>
              <Button
                key={idx}
                onClick={() => {
                  // check if the connector is ready on the browser
                  // including the metamask wallet extension
                  if (connector.ready) {
                    connect!({ connector })
                    setConnectModal(false)
                    return
                  }
                }}
                size="large"
                className="w-full bg-blue-500 text-white hover:text-white"
              >
                <h1 suppressHydrationWarning className="text-[13px]">
                  {connector.name}
                </h1>
              </Button>
            </div>
            <div className="my-[5px] text-center">{!connector.ready && `The ${connector.name} is not installed`}</div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
