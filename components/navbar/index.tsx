import { Button } from "antd"
import { useWalletContext } from "context/wallet-context"

export default function Navbar() {
  const { connect, connectors, disconnect, isConnected, address } = useWalletContext()

  return (
    <div className="flex justify-between p-[20px]">
      <div>Next Web3</div>
      <div>
        {!isConnected &&
          connectors!.map((connector, idx) => (
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
      </div>
    </div>
  )
}
