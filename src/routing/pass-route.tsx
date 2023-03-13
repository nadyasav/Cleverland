import { useAppSelector } from '../hooks/redux-hooks';
import { ForgotPass } from '../pages/forgot-pass/forgot-pass';
import { ResetPass } from '../pages/reset-pass/reset-pass';

export const PassRoute = () => {
  const { urlToken } = useAppSelector((state) => state.user);

  if (urlToken) {
    return <ResetPass />;
  }

  return <ForgotPass />;
};
