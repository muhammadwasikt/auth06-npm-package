import Home from "../pages/Home";
import SignupForm from "../pages/Login";
import OTPVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";

const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <SignupForm />
    },
    {
        path: '/reset-password/:token',
        element: <ResetPassword />
    },
    {
        path: '/email-verification/:token',
        element: <OTPVerification />
    }
]

export default routes;