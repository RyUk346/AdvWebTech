import { useTheme } from 'next-themes';
import { SunIcon } from '@heroicons/react/solid';

import {MoonIcon} from'@heroicons/react/solid'

const ThemeButton=()=>{
    const {resolvedTheme,setTheme} = useTheme()
    return(
        <button
        arial-label="Toogle Dark Mode"
        type="button"
        className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white"
        onClick={()=>setTheme(resolvedTheme === 'dark'? 'light': 'dark')}
        >
            {resolvedTheme === 'dark' ?(
                <SunIcon className="h-5 w-5 text-orange-300"/>
            ) :(
                <MoonIcon className="h-5 w-5 text-slate-800"/>
            )}
        </button>
    )
}

export default ThemeButton