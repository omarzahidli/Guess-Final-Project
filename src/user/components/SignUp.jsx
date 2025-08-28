import { Eye, EyeOff, Rotate3D } from "lucide-react"
import { useState } from "react"
import { useSignUpMutation } from "../../strore/guessApi"
import { toast, ToastContainer } from "react-toastify"
import Select from "react-select"
import { useFormik } from 'formik'
import * as Yup from 'yup'

function SignUp({setActiveTab}) {
    const [signup, { isLoading }] = useSignUpMutation()
    async function handleSignUp(values, { setSubmitting }) {
        const { firstName, lastName, password, email, dateOfBirth, gender } = values
        try {
            await signup({firstName, lastName, password, email, dateOfBirth, gender}).unwrap()
            setActiveTab("login")
        } catch (error) {
            const msg = Array.isArray(error.data.message)
                    ? error.data.message[0]
                    : error.data.message || "An unexpected error occurred"
            toast.error(msg)
        } finally {
            setSubmitting(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            dateOfBirth: '',
            gender: '',
        },
        validationSchema: Yup.object({
        firstName: Yup.string()
            .matches(/^[A-Za-z\s\-]+$/, 'First name can only contain letters')
            .min(2, 'Too short')
            .required('First Name is required'),
        lastName: Yup.string()
            .matches(/^[A-Za-z\s\-]+$/, 'Last name can only contain letters')
            .min(2, 'Too short')
            .required('Last name is required'),
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
        dateOfBirth: Yup.date()
            .typeError('Invalid date format')
            .max(new Date().getFullYear() - 13, 'You must be at least 13 years old'),
        gender: Yup.string()
            .required('Gender is required')
        }),
        onSubmit: handleSignUp
    })

    const options = [
        {label: "Male", value: "male"},
        {label: "Female", value: "female"},
        {label: "Other", value: "other"}
    ]
    
    const [showPass, setShowPass] = useState(false)
    
    return (
        <>
            <ToastContainer position="top-right" autoClose={2000} />
            <p className="text-gray-700 text-sm mb-6">Complete all sections to track your online orders and enjoy a faster checkout.</p>
            <form onSubmit={formik.handleSubmit}  className="space-y-4 text-left px-4">
                <div>
                    <input
                        onInput={(e) => {
                            let capitalized = e.target.value
                            .toLowerCase()
                            .replace(/\b\w/g, char => char.toUpperCase())
                            formik.setFieldValue('firstName', capitalized)
                        }}
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name*"
                        autoComplete="given-name"
                        onBlur={formik.handleBlur}
                        onChange={() => formik.handleChange}
                        value={formik.values.firstName}
                        className="w-full border border-gray-300 px-4 py-3 rounded-sm text-sm focus:outline-none"
                    />
                    {formik.errors.firstName && formik.touched.firstName && <div className="text-sm  text-red-600">{formik.errors.firstName}</div>}
                </div>
                <div>
                    <input
                        onInput={(e) => {
                            let capitalized = e.target.value
                            .toLowerCase()
                            .replace(/\b\w/g, char => char.toUpperCase())
                            formik.setFieldValue('lastName', capitalized)
                        }}
                        onBlur={formik.handleBlur}
                        onChange={() => formik.handleChange}
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        value={formik.values.lastName}
                        type="text"
                        placeholder="Last Name*"
                        className="w-full border border-gray-300 px-4 py-3 rounded-sm text-sm focus:outline-none"
                    />
                    {formik.errors.lastName && formik.touched.lastName && <div className="text-sm text-red-600">{formik.errors.lastName}</div>}
                </div>
                <div className="flex flex-col justify-center">
                    <label htmlFor="date" className="w-full text-gray-400 border border-b-0 px-4 border-gray-300 py-1 rounded-sm text-sm">Date Of Birth*</label>
                    <input
                        id="date"
                        type="date"
                        name="dateOfBirth"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.dateOfBirth}
                        className="w-full border border-t-0 border-gray-300 px-4 py-1 rounded-sm text-sm focus:outline-none"
                    />
                    {formik.errors.dateOfBirth && formik.touched.dateOfBirth && <div className="text-sm text-red-600">{formik.errors.dateOfBirth}</div>}
                </div>
                <div>
                    <Select 
                        name="gender"
                        id="gender"
                        value={options.find(option => option.value === formik.values.gender)}
                        onBlur={formik.handleBlur}
                        onChange={(option) => formik.setFieldValue("gender", option.value)}
                        options={options} 
                        placeholder="Gender*" 
                        isOptionDisabled={(option) => option.disabled}
                    >
                    </Select>
                    {formik.errors.gender && formik.touched.gender && (<div className="text-sm text-red-600">{formik.errors.gender}</div>)}
                </div>
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
                    className="w-full flex justify-center items-center bg-black text-white py-3 text-sm font-semibold hover:bg-gray-900"
                >
                    {isLoading ? <Rotate3D className="animate-spin" />  : "Sign in"}
                </button>
            </form>
        </>
    )
}

export default SignUp