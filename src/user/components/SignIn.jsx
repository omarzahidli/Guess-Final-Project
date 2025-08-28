import { Eye, EyeOff, Rotate3D } from "lucide-react"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useLoginMutation } from "../../strore/guessApi"
import { useNavigate } from "react-router"
import { useFormik } from "formik"
import * as Yup from 'yup'

function SignIn() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .matches(
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    'Invalid email format'
                )
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            }),
        onSubmit: handleSignIn
    })
    

    const [showPass, setShowPass] = useState(false)
    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    async function handleSignIn(values, { setSubmitting }) {
        const {email, password} = values
        try {
            let user = await login({ email, password }).unwrap()
            localStorage.setItem("token", user.token)
            localStorage.setItem("role", user.user.role)
            localStorage.setItem("firstName", user.user.firstName)
            localStorage.setItem("lastName", user.user.lastName)
            
            navigate(user.user.role == "admin" ? '/admin' : '/')
        } catch (error) {
            const msg = Array.isArray(error.data.message)
                    ? error.data.message[0]
                    : error.data.message || "An unexpected error occurred"
            toast.error(msg)
        }
        finally {
            setSubmitting(false)
        }
    }
    return (
        <>
            <ToastContainer position="top-right" style={{zIndex: 999}} autoClose={2000} />
            <p className="text-gray-700 text-sm mb-6">Enter your email and password to login.</p>
            <form onSubmit={formik.handleSubmit} className="space-y-4 px-4 text-left">
                <div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="E-mail*"
                        className="w-full border border-gray-300 px-4 py-3 rounded-sm text-sm focus:outline-none"
                    />
                    {formik.errors.email && formik.touched.email && <div className="text-sm text-red-600">{formik.errors.email}</div>}
                </div>
                <div>
                    <div className="relative">
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder="Password*"
                            name="password"
                            id="password"
                            autoComplete="off"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className="w-full border border-gray-300 px-4 py-3 rounded-sm text-sm focus:outline-none pr-10"
                        />
                        {showPass ? <EyeOff onClick={() => setShowPass(false)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" /> : <Eye onClick={() => setShowPass(true)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />}
                    </div>
                    {formik.errors.password && formik.touched.password && <div className="text-sm text-red-600">{formik.errors.password}</div>}
                </div>
                <button
                    type="submit"
                    className="flex justify-center items-center w-full bg-black text-white py-3 text-sm font-semibold hover:bg-gray-900"
                >
                    {isLoading ? <Rotate3D className="animate-spin" /> : 'Sign in'}
                </button>
            </form>
        </>
    )
}

export default SignIn