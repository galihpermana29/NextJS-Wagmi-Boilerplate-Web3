import { useContractWrite, UseContractWriteConfig, useWaitForTransaction } from "wagmi"

export default function useWrite(config: UseContractWriteConfig) {
  /**
   * This contract write hooks is for writing interaction to smart contract
   */
  const { write, data, isLoading, error } = useContractWrite(config)

  /**
   * This hooks is for knowing the transaction hash status
   */
  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  return { data: { isLoading, isSuccess, error }, write }
}
