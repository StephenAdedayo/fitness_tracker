import { AtSignIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const Login = () => {

    const [state, setState] = useState('login'),
    [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [showpassword, setShowPassword] = useState(false),
    [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate()

    const {signup, login, user} = useAppContext()

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        if(state === "login") await login({email, password})
            else await signup({username, email, password})
        setIsSubmitting(false)
    }

    useEffect(() => {
        if(user) navigate("/")
    }, [user, navigate])


  return (
    <>
      <main className="login-page-container">
        <form onSubmit={handleSubmit} className="login-form">
             <h2 className="text-3xl font-medium text-gray-900 dark:text-white">
                {state === "login" ? "Sign In" : "Sign Up"}
             </h2>
             <p className="mt-2 text-sm text-gray-500/90 dark:text-gray-400">{state === "login" ? "Please enter your email and password to access." : "Please enter your details to create an account."}</p>

             {state !== "login" && (
                <div className="mt-4">
                    <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Username</label>
                    <div className="relative mt-2">
                    <AtSignIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="login-input" placeholder="enter your username" required/>

                    </div>
                    
                </div>
             )}

             {/* email */}
                             <div className="mt-4">
                    <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Email</label>
                    <div className="relative mt-2">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="login-input" placeholder="enter your email" required/>

                    </div>
                    
                </div>

                {/* password */}
<div className="mt-4">
                    <label className="font-medium text-sm text-gray-700 dark:text-gray-300">Password</label>
                    <div className="relative mt-2">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4.5"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={showpassword ? "text" : "password"} className="login-input pr-10" placeholder="enter your password" required/>
                     <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(p => !p)}>
                        {showpassword ? <EyeOffIcon size={16}/> : <EyeIcon size={16}/>}
                     </button>
                    </div>
                    
                </div>


    <button type="submit" disabled={isSubmitting} className="login-button">
        {isSubmitting ? "Signing in...." : state === "login" ? "Login" : "Sign up"}
    </button>

    {state === "login" ? (
        <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">Don't have an account? <button onClick={() => setState("sign-up")} className="ml-1 text-green-600 hover:underline cursor-pointer">Sign up</button></p>
    ) : (
        <p className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">Already have an account? <button onClick={() => setState("login")} className="ml-1 text-green-600 hover:underline cursor-pointer">Login</button></p>
    )}
        </form>
        
      </main>
    </>
  )
}

export default Login
