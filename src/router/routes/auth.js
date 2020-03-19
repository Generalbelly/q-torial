import SignInPage from '../../components/pages/SignInPage';
import SignUpPage from '../../components/pages/SignUpPage';
import ResetPasswordPage from '../../components/pages/ResetPasswordPage';
import ForgetPasswordPage from '../../components/pages/ForgetPasswordPage';
import VerifyEmailPage from '../../components/pages/VerifyEmailPage';
import RegisterFirebasePage from '../../components/pages/RegisterFirebasePage';

export default [
  {
    path: '/auth',
    redirect: (to) => {
      const {
        mode = null,
        oobCode = null,
      } = to.query;
      const query = {
        code: oobCode,
      };

      switch (mode) {
        case 'resetPassword':
          return {
            name: 'password.reset',
            query,
          };
        // case 'recoverEmail':
        //   return {
        //     name: 'recover-email',
        //     query,
        //   };
        case 'verifyEmail':
          return {
            name: 'email.verify',
            query,
          };
        default:
          throw new Error('invalid mode');
        // Error: invalid mode.
      }
    },
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpPage,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInPage,
  },
  {
    path: '/password/reset',
    name: 'password.reset',
    component: ResetPasswordPage,
  },
  {
    path: '/password/forget',
    name: 'password.forget',
    component: ForgetPasswordPage,
  },
  {
    path: '/email/verify',
    name: 'email.verify',
    component: VerifyEmailPage,
    meta: { requireAuth: true },
  },
  {
    name: 'register-firebase',
    path: '/register-firebase',
    component: RegisterFirebasePage,
    meta: { requireAuth: true },
  },
];
