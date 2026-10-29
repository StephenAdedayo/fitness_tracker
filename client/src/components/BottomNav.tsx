import { ActivityIcon, HomeIcon, UserIcon, UtensilsIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

const BottomNav = () => {

 const navItems = [["/", "Home", HomeIcon], ['/food', 'Food', UtensilsIcon], ['/activity', 'Activity', ActivityIcon], ['/profile', 'Profile', UserIcon
 ]]



  return (
    <nav className="fixed bottom-[calc(10px+env(safe-area-inset-bottom))] left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 pb-safe lg:hidden transition-colors duration max-w-lg mx-auto rounded-full">

        <div className=" flex justify-around items-center h-16">
            {navItems.map(([href, label, Icon]) => (
                <NavLink key={href as string} to={href as string} className={({isActive}) => `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500 dark:hover:text-slate-300 hover:text-slate-600"}` }>
                    <Icon className="size-5.5"/>
                    <span className="text-xs font-medium">{label as string}</span>
                </NavLink>
            ))}

        </div>
      
    </nav>
  )
}

export default BottomNav
