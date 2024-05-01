import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import configs from "../../config";
import classNames from "classnames";
import { logOut } from "../../redux-toolkit/slices/user.slice";
import { Link } from "react-router-dom";
import { adminLogOut } from "../../redux-toolkit/slices/admin.slice";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);


export default function Header() {
    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <i
                            className="fa fa-mobile"
                            aria-hidden="true"
                            style={{ fontSize: 40 }}
                        ></i>{" "}
                        Recycling Phone
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#nvbCollapse"
                        aria-controls="nvbCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nvbCollapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item pl-1">
                                <Link
                                    className="nav-link"
                                    to={configs.routes.homePage}
                                >
                                    <i className="fa fa-home fa-fw mr-1"></i>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item pl-1">
                                <Link
                                    className="nav-link"
                                    to={configs.routes.tracking}
                                >
                                    <i className="fa fa-info-circle fa-fw mr-1"></i>
                                    Tracking
                                </Link>
                            </li>

                            {admin?.info ? (
                                <>
                                    <li
                                        className="nav-item pl-1"
                                    >
                                        <Link className="nav-link" to={configs.routes.filterDevicesByStatus}>
                                            <i class="fa fa-filter mr-1" aria-hidden="true"></i>
                                            Filter Devices by Process Status 
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item pl-1"
                                        onClick={() => {
                                            dispatch(adminLogOut())
                                            navigate(configs.routes.homePage)
                                        }}
                                    >
                                        <Link className="nav-link" to="#">
                                            <i className="fa fa-sign-in fa-fw mr-1"></i>
                                            Sign out as Admin
                                        </Link>
                                    </li>
                                    
                                </>
                            ) : (
                                <>
                                    {user?.user ? (
                                        <></>
                                    ) : (
                                        <>
                                            <li className="nav-item pl-1">
                                                <Link
                                                    className="nav-link"
                                                    to={
                                                        configs.routes
                                                            .adminSignIn
                                                    }
                                                >
                                                    <i
                                                        className="fa fa-sign-in mr-1"
                                                        aria-hidden="true "
                                                    ></i>
                                                    Sign In as Admin
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </>
                            )}

                            {user?.user ? (
                                <>
                                    <li className="nav-item active pl-1">
                                        <Link
                                            className="nav-link"
                                            to={configs.routes.quote}
                                        >
                                            <i
                                                class="fa fa-money mr-1"
                                                aria-hidden="true"
                                            ></i>
                                            Quote
                                        </Link>
                                    </li>

                                    <li className="nav-item pl-1">
                                        <Link
                                            className="nav-link"
                                            to={configs.routes.listingMyItems}
                                        >
                                            <i
                                                class="fa fa-list-alt mr-1"
                                                aria-hidden="true"
                                            ></i>
                                            List My Items
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item pl-1"
                                        onClick={() => {
                                            dispatch(logOut())
                                            navigate(configs.routes.homePage)
                                        }}
                                    >
                                        <Link className="nav-link" to="#">
                                            <i className="fa fa-sign-in fa-fw mr-1"></i>
                                            Sign out
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {admin.info ? (
                                        <></>
                                    ) : (
                                        <>
                                            <li className="nav-item pl-1">
                                                <Link
                                                    className="nav-link"
                                                    to={configs.routes.signIn}
                                                >
                                                    <i
                                                        className="fa fa-sign-in mr-1"
                                                        aria-hidden="true "
                                                    ></i>
                                                    Sign In
                                                </Link>
                                            </li>
                                            <li className="nav-item pl-1">
                                                <Link
                                                    className="nav-link"
                                                    to={configs.routes.signUp}
                                                >
                                                    <i className="fa fa-user-plus fa-fw mr-1"></i>
                                                    Sign Up
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
