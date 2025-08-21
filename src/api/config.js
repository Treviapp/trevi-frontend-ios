// C:\Users\Amanda Hughes\Projects\trevi-frontend\src\api\config.js

import axios from 'axios';
import { store } from '../redux';

/* ------------------------------------------------------------------
   Base URLs
   ------------------------------------------------------------------ */

// ✅ Use your PRODUCTION domain here
const ROOT_URL = 'https://9e03982aff8a.ngrok-free.app';

const BASE_URL = `${ROOT_URL}/api`;

/* ------------------------------------------------------------------
   Axios instance
   ------------------------------------------------------------------ */
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/* ------------------------------------------------------------------
   Attach bearer-token (if a creator logs in later)
   ------------------------------------------------------------------ */
client.interceptors.request.use(
  (config) => {
    const { authenticationToken } = store.getState().userSession || {};

    return {
      ...config,
      headers: {
        Accept: 'application/json',
        'Content-Type': config.headers['Content-Type'] || 'application/json',
        ...(authenticationToken && {
          Authorization: `Bearer ${authenticationToken.token}`,
        }),
      },
    };
  },
  (err) => Promise.reject(err)
);

/* ------------------------------------------------------------------
   Export everything needed
   ------------------------------------------------------------------ */
export { ROOT_URL, BASE_URL, client };
export const API_BASE_URL = BASE_URL;

