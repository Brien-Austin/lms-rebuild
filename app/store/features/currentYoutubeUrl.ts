import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type ChapterUrlState= {
    chapterYoutubeUrl : string 
}

const initialState : ChapterUrlState = {
    chapterYoutubeUrl : ""
}
const chapterUrlSlice = createSlice({
    name : 'chapterYoutubeUrl',
    initialState,
    reducers:{
       
        setCurrentChapterUrl : (state,action:PayloadAction<string>) =>{
            state.chapterYoutubeUrl = action.payload
        },
    }});


export const {setCurrentChapterUrl} = chapterUrlSlice.actions;
export const counterValue = (state:{counter : ChapterUrlState})=>state.counter.chapterYoutubeUrl;
export default chapterUrlSlice.reducer;