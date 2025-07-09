/*eslint-disable*/

const login=(email,password)=>{

}

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  const email=document.getElementById('email').value
  const paassword=document.getElementById('password').value
  login(email,password)
});
