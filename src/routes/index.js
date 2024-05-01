import { DefaultLayout } from "../layout";
import configs from "../config";
import HomePage from "../components/HomePage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Quote from "../components/Quote";
import Tracking from "../components/Tracking";
import ListingMyItems from "../components/ListingMyItems";
import AdminSignIn from "../components/AdminSignIn";
import FilterDeviceByStatus from "../components/FilterDevicesByStatus";
import SendCheckingResult from "../components/SendCheckingResult";

const routes = [
    {
        path: configs.routes.homePage,
        element: HomePage,
        layout: DefaultLayout
    },
    {
        path: configs.routes.signIn,
        element: SignIn,
        layout: DefaultLayout
    },
    {
        path: configs.routes.signUp,
        element: SignUp,
        layout: DefaultLayout
    },
    {
        path: configs.routes.quote,
        element: Quote,
        layout: DefaultLayout
    },
    {
        path: configs.routes.tracking,
        element: Tracking,
        layout: DefaultLayout
    },
    {
        path: configs.routes.listingMyItems,
        element: ListingMyItems,
        layout: DefaultLayout
    },
    {
        path: configs.routes.adminSignIn,
        element: AdminSignIn,
        layout: DefaultLayout
    },
    {
        path: configs.routes.filterDevicesByStatus,
        element: FilterDeviceByStatus,
        layout: DefaultLayout
    },
    {
        path: configs.routes.sendCheckingResult,
        element: SendCheckingResult,
        layout: DefaultLayout
    }
]

export default routes;