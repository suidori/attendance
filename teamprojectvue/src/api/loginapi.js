import axios from 'axios';
import { useloginStore } from '@/stores/loginpinia';
import { GLOBAL_URL } from './utils';
// import { ref } from "vue"

const url = `${GLOBAL_URL}`;

export const userdata = async () => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.get(`${url}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('유저정보' + JSON.stringify(res.data.name));
    const logincheck = useloginStore();
    logincheck.userN(JSON.stringify(res.data.name));
  } catch (e) {
    localStorage.removeItem('token');
    const logincheck = useloginStore();
    logincheck.loginchecktrue();
  }
};

export const userrole = async () => {
  const token = localStorage.getItem('token');

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
    localStorage.setItem('token', response.data);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
