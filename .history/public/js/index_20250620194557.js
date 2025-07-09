/*eslint-disable*/
import '@babel/polyfill'
import { login,logout } from "./login";




const loginForm=document.querySelector('form');
const logOutButn=document.querySelector('.nav__el--logout')

if(loginForm)
loginForm.addEventListener('submit', e => {
  e.preventDefault();  
  const email=document.getElementById('email').value
const password=document.getElementById('password').value
  login(email,password)
});
if(logOutButn)
    logOutButn.addEventListener('click',logout)