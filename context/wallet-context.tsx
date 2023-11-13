import * as _tanstack_react_query from "@tanstack/react-query"
import * as _wagmi_core from "@wagmi/core"
import { createContext, useContext, useEffect, useState } from "react"
import { ConnectorData, useAccount, useConnect, useDisconnect } from "wagmi"

import { CheckConnectedWalletAddress } from "utils/function"
import { InitialContextStateI, WalletContextI } from "utils/interface_type"

let INITIAL_STATE: InitialContextStateI = {}

const WalletContext = createContext(INITIAL_STATE)

export const useWalletContext = () => useContext(WalletContext)

const walletWhitelists = ["0xF97C7A13439DA91254B2D499685D52CC3E64E4EF"]

export const WalletContextProvider = ({ children, config }: WalletContextI) => {
  const { connectors } = config

  const { disconnect } = useDisconnect()
  const { connector: activeConnector, isConnected, address } = useAccount()
  const { connect, isLoading, pendingConnector } = useConnect({
    onSuccess(data) {
      const { account: connectedAccount } = data

      /**
       * You can do anything after success fully connect with the provider wallet
       */

      /**
       * Example: You can do checking if the connected wallet is the one you want to connect into this website
       */
      CheckConnectedWalletAddress({ walletWhitelists, disconnect, connectedAccount })
    },

    onError(error) {
      console.log(error)
    },
  })

  const [contextValue, setContextValue] = useState<InitialContextStateI>({
    activeConnector,
    connectors,
    connect,
    pendingConnector,
    disconnect,
  })

  useEffect(() => {
    const handleConnectorUpdate = (data: ConnectorData) => {
      const { account: connectedAccount } = data
      if (connectedAccount) {
        CheckConnectedWalletAddress({ walletWhitelists, disconnect, connectedAccount })
      }
    }

    /**
     * This mean that every time the change of the selected wallet account happen, re-check
     */
    if (activeConnector) {
      activeConnector.on("change", handleConnectorUpdate)
    }
  }, [activeConnector, disconnect])

  useEffect(() => {
    setContextValue((contextValue) => ({ ...contextValue, address, isLoading, isConnected }))
  }, [address, isConnected, isLoading])

  return <WalletContext.Provider value={contextValue}>{children}</WalletContext.Provider>
}