import { FetchBalanceResult } from "@wagmi/core"
import { Modal } from "antd"
import { Chain } from "wagmi"

interface DataI {
  address: string | undefined
  name: string | undefined | null
  chain: (Chain & { unsupported?: boolean }) | undefined
  accountBalance: FetchBalanceResult | undefined
}

interface DetailAccountI {
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  data: DataI
}

export const DetailAcountModal = ({ isModalOpen, handleOk, handleCancel, data }: DetailAccountI) => {
  const { address, name, chain, accountBalance } = data

  return (
    <div suppressHydrationWarning={true}>
      <Modal
        title="Detail Account"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div className="flex flex-col gap-[10px]">
          <div>
            <h1>ENS Name: </h1>
            <div suppressHydrationWarning={true}> {name ? name : "-"}</div>
          </div>
          <div>
            <h1>Wallet Address:</h1>
            <div suppressHydrationWarning={true}>{address ? address : "-"}</div>
          </div>
          <div>
            <h1>Chain</h1>
            <div suppressHydrationWarning={true}> {chain ? chain.name : "-"}</div>
          </div>
          <div>
            <h1>Account Balance</h1>
            <div suppressHydrationWarning={true}> {accountBalance ? accountBalance?.formatted : "-"}</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
