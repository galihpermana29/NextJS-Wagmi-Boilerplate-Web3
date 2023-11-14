import { LoadingOutlined, SmileOutlined } from "@ant-design/icons"
import { Modal, Steps } from "antd"
import { Dispatch, SetStateAction } from "react"

interface DetailAccountI {
  isModalOpen: boolean
  handleOk: Dispatch<SetStateAction<boolean>>
  handleCancel: Dispatch<SetStateAction<boolean>>
  state: number
  error: { shortMessage: string }
}

export const LoadingModal = ({ isModalOpen, handleOk, handleCancel, state, error }: DetailAccountI) => {
  return (
    <div suppressHydrationWarning={true}>
      <Modal
        title="Status"
        open={isModalOpen}
        onOk={() => handleOk(false)}
        onCancel={() => handleCancel(false)}
        okButtonProps={{ className: "bg-blue-500" }}
      >
        <div className="flex flex-col gap-[10px]">
          <Steps
            status={error ? "error" : "finish"}
            direction="vertical"
            current={state}
            items={[
              {
                title: "Waiting for the process",
                description: "Please wait a second for the metamask popup interaction",
                icon: state === 0 ? <LoadingOutlined /> : <SmileOutlined />,
              },

              {
                title: error ? "Error" : "Success",
                description: error ? "Error occur" : "Transaction Success",
              },
            ]}
          />
        </div>
      </Modal>
    </div>
  )
}
