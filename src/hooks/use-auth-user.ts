import { useAppSelector } from './redux-hooks';

export function useAuthUser() {
  const { token, userData } = useAppSelector((state) => state.user);

  return {
    user: {
      token,
      userData,
    },
    userExist: token && userData,
  };
}
