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

    setIsProcessing : (state,action:PayloadAction<{courseId : string , isProcessing : boolean}>) =>{
      const {courseId,isProcessing} = action.payload
      state.courseRequest[courseId] = isProcessing

    }

  }

})

export const {setIsProcessing} = courseAccessSlice.actions;
export default courseAccessSlice.reducer;

