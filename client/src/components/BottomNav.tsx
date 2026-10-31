import { ActivityIcon, HomeIcon, UserIcon, UtensilsIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

const BottomNav = () => {

 const navItems = [["/", "Home", HomeIcon], ['/food', 'Food', UtensilsIcon], ['/activity', 'Activity', ActivityIcon], ['/profile', 'Profile', UserIcon
 ]]



  return (
    <nav className="fixed bottom-[calc(10px+env(safe-area-inset-bottom))] left-0 right-0 bg-linear-to-br from-emerald-500 to-emerald-600 border-t border-slate-100 dark:border-slate-800 px-4 pb-safe lg:hidden transition-colors duration md:max-w-lg max-w-87.5 mx-auto rounded-full">

        <div className=" flex justify-around items-center h-16">
            {navItems.map(([href, label, Icon]) => (
                <NavLink key={href as string} to={href as string} className={({isActive}) => `flex flex-col items-center gap-1 px-3.5 py-1 rounded-xl transition-all duration-200 ${isActive ? " text-white" : "text-slate-800 hover:text-slate-700"}` }>
                    <Icon className="md:size-5.5 size-4"/>
                    <span className="text-xs font-medium">{label as string}</span>
                </NavLink>
            ))}

        </div>
      
    </nav>
  )
}

export default BottomNav
