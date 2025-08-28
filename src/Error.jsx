import { useEffect } from "react"
import { Link, useLocation } from "react-router"
import Header from "./user/components/Header"
import Footer from "./user/components/Footer"

function Error() {
  const { pathname } = useLocation()
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
  useEffect(() => {document.title = "Error Page | GUESS®"}, [])
  return (
    <>
      <Header />
      <div className="my-10 flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            We're sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <div className="inline-block px-6 py-3 text-white bg-black hover:bg-gray-800 transition rounded">Go to Homepage</div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Error

