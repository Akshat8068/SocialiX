"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setTheme,type Theme } from "@/store/slices/theme.slice"
import { useEffect, useState } from "react"


const THEME_STORAGE_KEY="socialix-theme"
const isValidTheme=(theme:string|null):theme is Theme=>{
    return (
        theme==="orange"||
        theme==="light"||theme==="dark"
    )

}

export default function ThemeProvider({
    children}:{children:React.ReactNode}){
        const dispatch=useAppDispatch()
        const theme=useAppSelector((state)=>state.theme.theme)
        const [mounted,setMounted]=useState(false)
        useEffect(()=>{
            const savedTheme=localStorage.getItem(THEME_STORAGE_KEY)
            if(isValidTheme(savedTheme)){
                dispatch(setTheme(savedTheme))
            }
            setMounted(true)
        },[dispatch])
        useEffect(()=>{
            if(!mounted) return;
            document.documentElement.setAttribute("data-theme",theme)
            localStorage.setItem(THEME_STORAGE_KEY,theme)

        },[theme,mounted])
        return <>{children}</>

    }