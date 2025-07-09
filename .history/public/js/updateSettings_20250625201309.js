/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings= async(username,email)=>{
    try{
        const res= await axios({
            method:'PATCH',
            url:'http://127.0.0.1:8000/api/v1/users/updateMe',
            data:{
                username,
                email
            }
        })
        if(res.data.status==='success'){
             showAlert('success',' data updated successfully')
        }
    }catch(err){
         showAlert('error',err.response.data.message)
  }
};
