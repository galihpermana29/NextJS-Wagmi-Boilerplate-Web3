import { Button } from "antd"
import { useState } from "react"
import { UseContractWriteConfig, usePrepareContractWrite } from "wagmi"
import contractAbi from "abi/approval.json"
import { LoadingModal } from "components/modal/loading"
import { useWalletContext } from "context/wallet-context"
import useWrite from "hooks/useWrite"

export default function InteractWrite() {
  const { address } = useWalletContext()
  const { config } = usePrepareContractWrite({
    /**
     * This is just an example of how to do a write interaction into specific smart contract
     * this is the address of the smart contract that we want to interact with
     */
    address: "0x10b8b56d53bfa5e374f38e6c0830bad4ebee33e6",
    /**
     * This is the smart contract abi of that smart contract address
     */
    abi: contractAbi,
    /**
     * In that contract, there is a function named setApprovalForAll
     * Check: https://goerli.etherscan.io/address/0x10b8b56d53bfa5e374f38e6c0830bad4ebee33e6
     */
    functionName: "setApprovalForAll",
    /**
     * That function receives two argument, you can passed in here
     */
    args: [
      "0xb735c8D829B40D4C6203ed6539D23Ee13c25e73e", // address of listing
      true, // boolean
    ],
  }) as unknown as {
    config: UseContractWriteConfig
  }

  const [connectModal, setConnectModal] = useState<boolean>(false)

  const {
    /**
     * You can use the success and loading state to do other thing
     * like interact with backend or so on
     */
    data: { isLoading, error },
    write,
  } = useWrite(config)

  return (
    <div className="mt-[20px] flex flex-col items-center justify-center">
      <LoadingModal
        isModalOpen={connectModal}
        handleCancel={setConnectModal}
        handleOk={setConnectModal}
        state={isLoading ? 0 : 1}
        error={error as unknown as { shortMessage: string }}
      />
      <h1 className="mb-4 max-w-2xl text-3xl font-extrabold leading-none tracking-tight dark:text-white md:text-3xl xl:text-3xl">
        Write with Static Argument
      </h1>
      <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
        This is an example of how to interact with smart contract in write action. In this example, we will try to hit
        the SetApproveAll() function in NFT smart contract to permit and allow specific wallet address into specific NFT
        address
      </p>
      <div>
        <Button
          disabled={!address}
          onClick={() => {
            write?.()
            setConnectModal(true)
          }}
        >
          SetApproveForAll(Write)
        </Button>
      </div>
    </div>
  )
}
