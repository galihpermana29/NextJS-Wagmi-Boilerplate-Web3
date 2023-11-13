import * as _tanstack_react_query from "@tanstack/react-query"
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
}

export interface WalletContextI {
  children: JSX.Element
  config: any
}
