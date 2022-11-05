import { createSlice } from "@reduxjs/toolkit"
import type { AppState } from "../../store"

export interface ModalState {
  themeId: string
}

const initialState: ModalState = {
  themeId: "texturized-and-dynamic",
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.themeId = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions

export const selectThemeState = (state: AppState) => state.theme.themeId

export default themeSlice.reducer
