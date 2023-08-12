import { Axios } from "../ServerConfig/Axios";

class User {
    Register(req:any){
     return Axios.post('user/register',req);
    }

    Login(req:any){
     return Axios.post('user/login',req);
    }

    CreateRoom(req:any){
        return Axios.post('create-room',req);
    }

    GetRoom(){
        return Axios.get('get-room');
    }

    GetAllQuizRoom(){
        return Axios.get('get-quiz-room');
    }

    GetByIdRoom(req:any){
        return Axios.get(`get-room/${req}`);
    }

    UpdateRoom(req:any){
        return Axios.put(`update-room/${req._id}`,req);
    }

    DeleteByIdRoom(req:any){
        return Axios.delete(`delete-room/${req}`);
    }

}

export default new User();