import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chapterUrlSlice from './features/currentYoutubeUrl'


import { TypedUseSelectorHook, useSelector } from "react-redux";





const generatePersistConfig = (key: string) => ({
  key,
  storage,
});







const persistedChapterYTUrl = persistReducer(generatePersistConfig("chapterUrlSlice"),chapterUrlSlice)

export const store = configureStore({
  reducer : {
    ChapterYTUrl: persistedChapterYTUrl
  }
})


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;