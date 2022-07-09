import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import Loader from "components/loader/Loader"
const AuthForm = dynamic(() => import("components/auth/authForm"), {
  ssr: false,
  loading: () => <Loader />
})

const SignUpPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isAuthenticated = status !== "loading" && status === "authenticated"

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/${session?.user.username}/dashboard`)
    }
  }, [status])

  const SEO = () => (
    <Head>
      <title>Create an Account</title>
    </Head>
  )

  return (
    <>
      <SEO />
      {status === "loading" ? <Loader /> : <AuthForm isLogin={false} />}
    </>
  )
}

export default SignUpPage
