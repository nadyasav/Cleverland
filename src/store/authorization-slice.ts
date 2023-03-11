/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getLocalStorage } from '../utils/get-local-storage';

const token = getLocalStorage('token');

interface IUserData {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}

interface IAuthorizationSlice {
  token: string;
  userData: IUserData | null;
  authStatus: string;
  authMessage: string;
}

const initialState: IAuthorizationSlice = {
  token,
  userData: null,
  authStatus: '',
  authMessage: '',
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
