import {createAsyncThunk} from '@reduxjs/toolkit'
import User from '../Services';

export const RegisterUser = createAsyncThunk(
    'quizApi/register',
    async(req:any)=>{
       return await User.Register(req);
    }
)

export const LoginUser = createAsyncThunk(
    'quizApi/login',
    async(req:any)=>{
       return await User.Login(req);
    }
)

export const CreateRoom = createAsyncThunk(
    'quizApi/createroom',
    async(req:any)=>{
       return await User.CreateRoom(req);
    }
)

export const GetAllRoom = createAsyncThunk(
    'quizApi/getallroom',
    async()=>{
       return await User.GetRoom();
    }
)

export const GetAllQuizRoom = createAsyncThunk(
    'quizApi/GetAllQuizRoom',
    async()=>{
       return await User.GetAllQuizRoom();
    }
)


export const GetByIdRoom = createAsyncThunk(
    'quizApi/getbyidroom',
    async(req:any)=>{
       return await User.GetByIdRoom(req);
    }
)

export const UpdateRoom = createAsyncThunk(
    'quizApi/updateroom',
    async(req:any)=>{
       return await User.UpdateRoom(req);
    }
)

export const DeleteByIdRoom = createAsyncThunk(
    'quizApi/deletebyid',
    async(req:any)=>{
       return await User.DeleteByIdRoom(req);
    }
)

export const GetAllUsers = createAsyncThunk(
    'quizApi/GetAllUsers',
    async()=>{
       return await User.GetAllUsers();
    }
)

export const GetUserById = createAsyncThunk(
    'quizApi/GetUserById',
    async(req:any)=>{
       return await User.GetUserById(req);
    }
)

export const GetMessageById = createAsyncThunk(
    'quizApi/GetMessageById',
    async(req:any)=>{
       return await User.GetMessageById(req);
    }
)
