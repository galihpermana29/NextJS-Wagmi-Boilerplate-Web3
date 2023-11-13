import Head from "next/head"
import Navbar from "components/navbar"

export default function Web() {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://next-enterprise.vercel.app/" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Next.js Web3 Boilerplate</title>
      </Head>
      <Navbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Next.js Web3 Boilerplate
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Elevate your enterprise project with our cutting-edge Next.js boilerplate powered by the latest
              technologies - Web3.js, Wagmi, and Ant Design! Our boilerplate is tailored to provide a high-performance
              development environment, complemented by AI-powered code reviews and an extensive suite of tools, ensuring
              a streamlined and delightful development process. Dive into the future of tech with our innovative
              solution!
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

// export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
//   if (req.headers?.host?.includes("next-enterprise.vercel.app")) {
//     return {
//       redirect: {
//         destination: "https://blazity.com/open-source/nextjs-enterprise-boilerplate",
//         permanent: true,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }
