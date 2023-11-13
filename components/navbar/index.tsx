import { Button } from "antd"
import { Connector } from "wagmi"
import { InitialContextStateI } from "utils/interface_type"

interface NavbarI {
  config: InitialContextStateI
  onDetail: () => void
}

export default function Navbar({ config, onDetail }: NavbarI) {
  const { connect, connectors, disconnect, isConnected } = config

  return (
    <div className="flex justify-between p-[20px]">
      <div>Next Web3 Boilerplate</div>

      <div className="flex gap-[10px]">
        {!isConnected &&
          connectors!.map((connector: Connector, idx: number) => (
            <Button
              key={idx}
              onClick={isConnected ? () => ({}) : () => connect!({ connector })}
              size="large"
              className="bg-blue-500 text-white hover:text-white"
            >
              <h1 suppressHydrationWarning>{isConnected ? "CONNECTED" : "CONNECT WALLET"}</h1>
            </Button>
          ))}
        {isConnected && (
          <Button
            type="link"
            onClick={() => disconnect!()}
            size="large"
            className="border-blue-500  bg-white text-blue-500 hover:border-[1px] hover:bg-white"
          >
            <h1 suppressHydrationWarning>DISCONNECT</h1>
          </Button>
        )}

        {isConnected && (
          <Button onClick={onDetail} size="large" className="bg-blue-500 text-white hover:text-white">
            <h1 suppressHydrationWarning>DETAIL</h1>
          </Button>
        )}
      </div>
    </div>
  )
}
