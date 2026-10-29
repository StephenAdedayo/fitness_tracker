import { createContext, useContext, useEffect, useState, type ReactNode } from "react";


interface ThemeContextType {
    theme : string,
    toggleTheme : () =>  void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)


export function ThemeProvider({children} : {children : ReactNode}){

    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme : dark)").matches ? "dark" : "light"))

    useEffect(() => {
         const root = window.document.documentElement
         root.classList.remove("light", "dark")
         root.classList.add(theme)
         localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev:string) => (prev === "light" ? "dark" : "light" as any))
    }

    const value = {theme, toggleTheme}

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )

} 


export function useTheme() {

const context = useContext(ThemeContext)
 
 if(context ===  undefined){
    throw new Error("useTheme must be within a ThemeProvider")
 }

 return context
}