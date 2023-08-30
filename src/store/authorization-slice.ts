/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL, REQUEST_STATUS } from '../constants';
import { IAuthData, IForgotPassData, IRegistrationData, IResetPassData } from '../types/custom-types';
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

interface IError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
}

interface IAuthorizationSlice {
  token: string;
  userData: IUserData | null;
  authStatus: string;
  authMessage: {
    code: string;
    error: string;
  };
  urlToken: string;
}

const initialState: IAuthorizationSlice = {
  token,
  userData: null,
  authStatus: '',
  authMessage: {
    code: '',
    error: '',
  },
  urlToken: '',
};

export const createUser = createAsyncThunk<
  IUserData,
  IRegistrationData,
  { rejectValue: { code: string; error: string } }
>(
  'user/createUser',
  async (data, { rejectWithValue }) =>
    fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const datares = await response.json();

        if (response.ok) {
          return datares;
        }
        if (datares.error.status === 400) {
          return rejectWithValue({
            code: '400',
            error:
              'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
          });
        }
        throw new Error();
      })
      .then((response) => response)
      .catch(() =>
        rejectWithValue({
          code: '',
          error: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
        })
      ),
  {
    condition: (_, { getState }) => {
      const { user } = getState() as { user: IAuthorizationSlice };

      if (user.authStatus === REQUEST_STATUS.pending) {
        return false;
      }

      return true;
    },
  }
);

export const setUser = createAsyncThunk<IUserData, IAuthData, { rejectValue: { code: string; error: string } }>(
  'user/setUser',
  async (data, { rejectWithValue }) =>
    fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const datares = await response.json();

        if (response.ok) {
          return datares;
        }
        if (datares.error.status === 400) {
          return rejectWithValue({
            code: '400',
            error: 'Неверный логин или пароль!',
          });
        }
        throw new Error();
      })
      .then((response) => response)
      .catch(() =>
        rejectWithValue({
          code: '',
          error: 'Что-то пошло не так. Попробуйте ещё раз',
        })
      ),
  {
    condition: (_, { getState }) => {
      const { user } = getState() as { user: IAuthorizationSlice };

      if (user.authStatus === REQUEST_STATUS.pending) {
        return false;
      }

      return true;
    },
  }
);

export const passRecovery = createAsyncThunk<
  boolean,
  IForgotPassData,
  { rejectValue: { code: string; error: string } }
>(
  'user/passRecovery',
  async (data, { rejectWithValue }) =>
    fetch(`${API_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const datares = await response.json();

        if (response.ok) {
          return datares;
        }
        if (datares.error.message) {
          return rejectWithValue({
            code: '',
            error: datares.error.message,
          });
        }
        throw new Error();
      })
      .then((response) => response)
      .catch((error) =>
        rejectWithValue({
          code: '',
          error: error.text || 'Что-то пошло не так. Попробуйте ещё раз',
        })
      ),
  {
    condition: (_, { getState }) => {
      const { user } = getState() as { user: IAuthorizationSlice };

      if (user.authStatus === REQUEST_STATUS.pending) {
        return false;
      }

      return true;
    },
  }
);

export const resetPass = createAsyncThunk<IUserData, IResetPassData, { rejectValue: { code: string; error: string } }>(
  'user/resetPass',
  async (data, { rejectWithValue }) =>
    fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const datares = await response.json();

        if (response.ok) {
          return datares;
        }
        throw new Error();
      })
      .then((response) => response)
      .catch(() =>
        rejectWithValue({
          code: '',
          error: 'Что-то пошло не так. Попробуйте ещё раз',
        })
      ),
  {
    condition: (_, { getState }) => {
      const { user } = getState() as { user: IAuthorizationSlice };

      if (user.authStatus === REQUEST_STATUS.pending) {
        return false;
      }

      return true;
    },
  }
);

export const authorizationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuthorization: (state) => {
      state.authStatus = '';
      state.authMessage = {
        code: '',
        error: '',
      };
    },
    setUrlToken: (state, action) => {
      state.urlToken = action.payload;
    },
    removeUser: (state) => {
      state.token = '';
      state.userData = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.authStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.authStatus = REQUEST_STATUS.fulfilled;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.authStatus = REQUEST_STATUS.rejected;
      if (action.payload) {
        state.authMessage.code = action.payload.code;
        state.authMessage.error = action.payload.error;
      }
    });
    builder.addCase(setUser.pending, (state) => {
      state.authStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(setUser.fulfilled, (state, action) => {
      state.authStatus = REQUEST_STATUS.fulfilled;
      state.token = action.payload.jwt;
      state.userData = action.payload;
      localStorage.setItem('token', action.payload.jwt);
    });
    builder.addCase(setUser.rejected, (state, action) => {
      state.authStatus = REQUEST_STATUS.rejected;
      if (action.payload) {
        state.authMessage.code = action.payload.code;
        state.authMessage.error = action.payload.error;
      }
    });
    builder.addCase(passRecovery.pending, (state) => {
      state.authStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(passRecovery.fulfilled, (state, action) => {
      state.authStatus = REQUEST_STATUS.fulfilled;
    });
    builder.addCase(passRecovery.rejected, (state, action) => {
      state.authStatus = REQUEST_STATUS.rejected;
      if (action.payload) {
        state.authMessage.error = action.payload.error;
      }
    });
    builder.addCase(resetPass.pending, (state) => {
      state.authStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(resetPass.fulfilled, (state, action) => {
      state.authStatus = REQUEST_STATUS.fulfilled;
    });
    builder.addCase(resetPass.rejected, (state, action) => {
      state.authStatus = REQUEST_STATUS.rejected;
      if (action.payload) {
        state.authMessage.error = action.payload.error;
      }
    });
  },
});

export const { resetAuthorization, setUrlToken, removeUser } = authorizationSlice.actions;
