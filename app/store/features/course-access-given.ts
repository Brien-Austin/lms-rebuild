
import  {PayloadAction,createSlice} from '@reduxjs/toolkit'

interface CourseAccess {
  CourseAccess : Record<string, boolean>

}
const initialState:CourseAccess = {
  CourseAccess : {}


}


const courseAccessSlice = createSlice({
  name : 'CourseAccess',
  initialState,
  reducers : {

    setAccess : (state,action:PayloadAction<{courseId : string , isAccessGiven : boolean}>) =>{
      const {courseId,isAccessGiven} = action.payload
      state.CourseAccess[courseId] = isAccessGiven

    },
    setAccessNotGiven : (state,action:PayloadAction<{courseId : string }>) =>{
      const {courseId} = action.payload
      state.CourseAccess[courseId] = false

    }

  }

})

export const {setAccess,setAccessNotGiven} = courseAccessSlice.actions;
export default courseAccessSlice.reducer;

