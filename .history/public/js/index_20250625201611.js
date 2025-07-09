/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import updateSettings from './updateSettings'

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateSettingsBtn = document.querySelector('.form-user-data');


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
    updateSettings(username , email);
  });

