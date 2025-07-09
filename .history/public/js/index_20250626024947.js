/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import {updateSettings} from './updateSettings';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateSettingsBtn = document.querySelector('.form-user-data');
const updatePasswordSettings= document.querySelector('.form-user-password')


if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) 
  logOutBtn.addEventListener('click', logout);

if (updateSettingsBtn)
  updateSettingsBtn.addEventListener('submit', e => {
   e.preventDefault()
    const username = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({username , email},'data');
  });

if(updatePasswordSettings)
   updatePasswordSettings.addEventListener('submit', async e =>{
e.preventDefault()

 document.querySelector('btn--save-password').value='updating....'
const passwordCurrent=document.getElementById('password-current').value  
const password=document.getElementById('password').value  
const passwordConfirm=document.getElementById('password-confirm').value  

await updateSettings({passwordCurrent,password,passwordConfirm}, 'password')

 document.querySelector('btn--save-password').value='Save password'
 document.getElementById('password-current').value=''
 document.getElementById('password').value=''
 document.getElementById('password-confirm').value=''
  })