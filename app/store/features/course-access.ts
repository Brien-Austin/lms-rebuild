import { isProcessing } from './../../actions/request-access/haveAccess';
import  {PayloadAction,createSlice} from '@reduxjs/toolkit'

interface CourseRequest {
  courseRequest : Record<string, boolean>

}
const initialState:CourseRequest = {
  courseRequest : {}


}


const courseAccessSlice = createSlice({
  name : 'CourseRequest',
  initialState,
  reducers : {
    setDefaultProcessing : (state,action:PayloadAction<{courseId : string }>) =>{
      const {courseId} = action.payload
      state.courseRequest[courseId] = false;

    },
    
    
    setIsProcessing : (state,action:PayloadAction<{courseId : string , isProcessing : boolean}>) =>{
      const {courseId,isProcessing} = action.payload
      state.courseRequest[courseId] = isProcessing

    }

  }

})

export const {setIsProcessing,setDefaultProcessing} = courseAccessSlice.actions;
export default courseAccessSlice.reducer;

