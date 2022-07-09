import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Loader from "components/loader/Loader"

const AuthForm = dynamic(() => import("components/auth/authForm"), {
  ssr: false,
  loading: () => <Loader />
})

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { data: session, status } = useSession()
  const isAuthenticated = status !== "loading" && status === "authenticated"

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/${session?.user.username}/dashboard`)
    } else {
      setIsLoading(false)
    }
  }, [status])

  const SEO = () => (
    <Head>
      <title>Sign In</title>
    </Head>
  )

  return (
    <>
      <SEO />
      {isLoading ? <Loader /> : <AuthForm isLogin={true} />}
    </>
  )
}

export default SignInPage
