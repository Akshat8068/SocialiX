import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "orange" | "light" | "dark"
interface ThemeState {
  theme: Theme;
}
const initialState: ThemeState = {
  theme: "orange",
}

const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme(state,action:PayloadAction<Theme>){
            state.theme=action.payload
        }
    }
})
export const {setTheme}=themeSlice.actions
export default themeSlice.reducer