import axios from 'axios';
import { useloginStore } from '@/stores/loginpinia';
import { GLOBAL_URL } from './utils';
import Cookies from 'js-cookie';

const url = `${GLOBAL_URL}`;

export const userdata = async () => {

  // const token = localStorage.getItem('token');
  const token = Cookies.get('token')
  const loginStore = useloginStore();
  const { doLogin } = loginStore;

  try {
    const res = await axios.get(`${url}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('res' + JSON.stringify(res.data.role));
    doLogin(res.data.name, res.data.role, res.data.accept);

  } catch (e) {
    const logincheck = useloginStore();
    logincheck.loginchecktrue();
  }
};


export const userrole = async () => {

  const token = Cookies.get('token');
  // const token = localStorage.getItem('token');
  if(token==null){
    return;
  }

  const res = await axios.get(`${url}/user/getrole`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  
  const logincheck = useloginStore();
  console.log(res.data);
  logincheck.userR(res.data);


};

export const logincontrol = async (data) => {
  const logincheck = useloginStore();
  const { logincheckfalse } = logincheck;

  try {
    const response = await axios.post(`${url}/sign/login`, data);

    Cookies.set('token', response.data )


    // localStorage.setItem('token', response.data);

    logincheckfalse();

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
