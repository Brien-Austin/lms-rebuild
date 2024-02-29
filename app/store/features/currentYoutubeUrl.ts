import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type ChapterUrlState= {
    chapterYoutubeUrl : string 
    prev : string
    currentIndex : number
    totalChapter : number
    prevIndex : number
}

const initialState : ChapterUrlState = {
    chapterYoutubeUrl : "",
    prev : '',
    currentIndex : 0,
    totalChapter : 0,
    prevIndex : 0
}
const chapterUrlSlice = createSlice({
    name : 'chapterYoutubeUrl',
    initialState,
    reducers:{
       
        setCurrentChapterUrl : (state,action:PayloadAction<string>) =>{
            state.prev = state.chapterYoutubeUrl
            state.chapterYoutubeUrl = action.payload
            
        },

        setTotalChapter : (state,action:PayloadAction<number>) =>{
            state.totalChapter = action.payload
        },
        setCurrentIndex : (state,action:PayloadAction<number>) =>{
            state.currentIndex = action.payload;


        },
        setNextChapter : (state) =>{
            if(state.currentIndex < state.totalChapter-1){
                state.prevIndex = state.currentIndex
                state.currentIndex += 1;
            }
        },
        setPreviousChapter: (state) => {
            if (state.currentIndex > 0) {  
                state.prevIndex = state.currentIndex;
                state.currentIndex -= 1;
            }
        },
        
    }});


export const {setCurrentChapterUrl,setNextChapter,setTotalChapter,setCurrentIndex,setPreviousChapter} = chapterUrlSlice.actions;
export const counterValue = (state:{counter : ChapterUrlState})=>state.counter.chapterYoutubeUrl;
export default chapterUrlSlice.reducer;