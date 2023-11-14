import * as _tanstack_react_query from "@tanstack/react-query"
import { FetchBalanceResult } from "@wagmi/core"
import * as _wagmi_core from "@wagmi/core"
import { Chain, Connector } from "wagmi"
import EventEmitter from "events"

export type ActiveConnectorType = (abstract new ({
  chains,
  options,
}: {
  chains?: Chain[] | undefined
  options: any
}) => Connector<any, any>) & {
  prototype: Connector<any, any>
  prefixed: string | boolean
  readonly EventEmitter: EventEmitter.EventEmitter
}

export interface InitialContextStateI {
  connect?: any
  connectors?: Connector<any, any>[]
  isLoading?: Boolean
  pendingConnector?: Connector<any, any>
  isConnected?: Boolean
  activeConnector?: Connector<any, any> | ActiveConnectorType
  address?: `0x${string}`
  disconnect?: _tanstack_react_query.UseMutateFunction<void, Error, void, unknown>
  name?: string | undefined | null
  chain?: (Chain & { unsupported?: boolean }) | undefined
  accountBalance?: FetchBalanceResult | undefined
  chains?: _wagmi_core.Chain[]
  switchNetwork?: ((chainId_?: number | undefined) => void) | undefined
}

export interface WalletContextI {
  children: JSX.Element
  config: any
}
