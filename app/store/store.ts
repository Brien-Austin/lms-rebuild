import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chapterUrlSlice from './features/current-yt-url'


import { TypedUseSelectorHook, useSelector } from "react-redux";
import courseAccess from "./features/course-access";
import courseAccessGiven from "./features/course-access-given";





const generatePersistConfig = (key: string) => ({
  key,
  storage,
});







const persistedChapterYTUrl = persistReducer(generatePersistConfig("chapterUrlSlice"),chapterUrlSlice)
const persistedCourseRequest= persistReducer(generatePersistConfig("courseRequest"),courseAccess)
const persistedCourseAccess = persistReducer(generatePersistConfig("courseAccess"),courseAccessGiven)

export const store = configureStore({
  reducer : {
    ChapterYTUrl: persistedChapterYTUrl,
    courseRequest : persistedCourseRequest,
    courseAccessGiven : persistedCourseAccess
  }
})


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;