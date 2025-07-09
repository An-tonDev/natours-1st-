/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateSettingsBtn = document.querySelector('.form-user-data');
const updatePasswordSettings = document.querySelector('.form-user-password');

// LOGIN HANDLER
if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

// LOGOUT HANDLER
if (logOutBtn) 
  logOutBtn.addEventListener('click', logout);

// UPDATE USER DATA HANDLER
if (updateSettingsBtn)
  updateSettingsBtn.addEventListener('submit', e => {
    e.preventDefault();
    const form= new FormData();
    form.append('name',document.getElementById('name').value)
    form.append('email',document.getElementById('email').value)
    form.append('photo',document.getElementById('photo').files)
    updateSettings(form , 'data');
  });

// UPDATE PASSWORD HANDLER
if (updatePasswordSettings)
  updatePasswordSettings.addEventListener('submit', async e => {
    e.preventDefault();

    const saveBtn = document.querySelector('.btn--save-password');
    if (saveBtn) saveBtn.textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    if (saveBtn) saveBtn.textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
