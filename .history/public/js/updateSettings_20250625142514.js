/*eslint-disable*/
import axios from 'axios';

export const updateSettings= async(username,email)=>{
    try{
        const res= await axios({
            method:'POST',
            url:'http://127.0.0.1:8000/api/v1/submit-user-data',
            data:{
                username,
                email
            }
        })
    }catch(err){
       console.log('unable to do what you requested')
  }
};
