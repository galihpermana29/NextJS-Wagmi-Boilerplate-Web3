import { Button } from "antd"
import { useEffect, useState } from "react"
import { UseContractWriteConfig, usePrepareContractWrite } from "wagmi"
import contractAbi from "abi/approval.json"
import { LoadingModal } from "components/modal/loading"
import { useWalletContext } from "context/wallet-context"
import useWrite from "hooks/useWrite"

export default function InteractWriteMultiple() {
  /**
   * This state will handle multiple address that we want to change as the purpose specific smart contract addres
   * Note: every time this state is changed, we run the write() function
   */
  const [addressToApprove, setAddressToApprove] = useState<`0x${string}` | undefined>(undefined)

  const { address } = useWalletContext()
  const { config } = usePrepareContractWrite({
    /**
     * This is just an example of how to do a write interaction into specific smart contract
     * this is the address of the nft smart contract that we want to interact with
     */
    address: addressToApprove ? addressToApprove : "0x10b8b56d53bfa5e374f38e6c0830bad4ebee33e6",
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

  const handleWriteMultiple = async () => {
    const multipleAddressToApprove = [
      "0x4a1c82542ebdb854ece6ce5355b5c48eb299ecd8",
      "0xbb234d9a79db8bcb880b7a52a243be2087b70812",
    ]

    setConnectModal(true)

    /**
     * This forEach function will make a change asynchronously to the state
     * We run it with timeout because we want every state that we passed
     * is execute and detected as a changed
     *
     * The output of the metamask popup will be 2 queued because we want to make some
     * approval into 2 addres in the multipleAddressToApprove array
     */
    multipleAddressToApprove.forEach((data, idx) => {
      setTimeout(
        () => {
          setAddressToApprove(data as `0x${string}`)
        },
        1000 * idx + 1
      )
    })
  }

  useEffect(() => {
    write?.()
  }, [addressToApprove])

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
        Write with Multiple Static Argument
      </h1>
      <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
        This is an exmaple of how to interact with smart contract in write action. We will try to hit SetApproveAll
        function in NFT and passed multiple argument. This will results multiple metamask popup with queue.
        <br />
        This can be used as reference if you want to write a function multiple times
      </p>
      <div>
        <Button
          disabled={!address}
          onClick={() => {
            handleWriteMultiple()
          }}
        >
          SetApproveForAll(Write)
        </Button>
      </div>
    </div>
  )
}
