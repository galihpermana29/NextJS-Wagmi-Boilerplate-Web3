import Head from "next/head"
import { useState } from "react"
import { DetailAcountModal } from "components/modal/detail-account"
import Navbar from "components/navbar"
import InteractWrite from "components/sections/interact-write"
import InteractWriteMultiple from "components/sections/interact-write-multiple"
import { useWalletContext } from "context/wallet-context"

export default function Web() {
  /**
   * By the time, we can only just called the useWalletContext
   * in components that we want to use the value for
   */
  const { connect, connectors, disconnect, isConnected, address, name, chain, accountBalance, chains, switchNetwork } =
    useWalletContext()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <div>
      <Head>
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Next.js Web3 Boilerplate</title>
      </Head>

      <section className="bg-white dark:bg-gray-900">
        <Navbar
          config={{ connect, connectors, disconnect, isConnected, address, chains, switchNetwork, chain }}
          onDetail={() => setIsModalOpen(true)}
        />
        <DetailAcountModal
          isModalOpen={isModalOpen}
          handleOk={() => setIsModalOpen(false)}
          handleCancel={() => setIsModalOpen(false)}
          data={{ address, name, chain, accountBalance }}
        />
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Next.js Web3 Boilerplate
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Elevate your enterprise project with our cutting-edge Next.js boilerplate powered by the latest
              technologies - Web3.js, Wagmi, and Ant Design! Our boilerplate is tailored to provide a high-performance
              development environment an extensive suite of tools, ensuring a streamlined and delightful development
              process. Dive into the future of tech with our innovative solution!
            </p>
          </div>
          <InteractWrite />
          <InteractWriteMultiple />
        </div>
      </section>
    </div>
  )
}
