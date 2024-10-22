import { createSlice } from "@reduxjs/toolkit"
import { CreateRoom, DeleteByIdRoom, GetAllQuizRoom, GetAllRoom, GetAllUsers, GetByIdRoom, GetMessageById, GetUserById, LoginUser, RegisterUser, UpdateRoom } from "../Actions/QuizAction";

const initialState = {
    userData: [],
    token:'',
    allRoom:[],
    Room:[],
    loading: false,
    QuizRoom: [],
    users: [],
    userDetails:{},
    messages : []
}

export const QuizSlice = createSlice({
    name: "QuizReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.userData = action.payload.data;
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            localStorage.setItem('token',action.payload.data.token);
            localStorage.setItem('userDetails',JSON.stringify(action.payload.data.user));
            state.userData = action.payload.data;
            state.token = action.payload.data.token;
        })
        builder.addCase(CreateRoom.fulfilled, (state, action) => {
        })
        builder.addCase(GetAllRoom.fulfilled, (state, action) => {
            state.allRoom = action.payload.data;
        })
        builder.addCase(GetByIdRoom.fulfilled, (state, action) => {
            state.Room = action.payload.data;
        })
        builder.addCase(GetAllQuizRoom.fulfilled, (state, action) => {
            state.QuizRoom = action.payload.data.data;
        })
        builder.addCase(UpdateRoom.fulfilled, (state, action) => {

        })
        builder.addCase(DeleteByIdRoom.fulfilled, (state, action) => {
 
        })
        builder.addCase(GetAllUsers.fulfilled, (state, action) => {
          state.users = action.payload.data;
        })
        builder.addCase(GetUserById.fulfilled, (state, action) => {
            state.userDetails = action.payload.data;
        })
        builder.addCase(GetMessageById.fulfilled, (state, action) => {
            state.messages = action.payload.data;
        })
        .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
              state.loading = true;
            }
          )
          .addMatcher(
            (action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
            (state) => {
              state.loading = false;
            }
          );
    }
});

export default QuizSlice.reducer;