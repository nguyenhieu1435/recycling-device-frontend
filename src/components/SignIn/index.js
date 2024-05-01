import { useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import axios from "axios";
import { setUser } from "../../redux-toolkit/slices/user.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmitLogin(){
        if (!email.trim() || !password.trim()) {
            return;
        }
        try {
            const resp = await axios.post("http://localhost:8080/api/customer/sign-in", {
                email,
                password
            })
            if (resp.status === 200){
                console.log("Login success", resp.data)
                dispatch(setUser(resp.data))
                return navigate("/")
            }
        
        } catch (error) {
            console.log(error)
            alert(error.response.data || "Login failed")
        }
    }

    return (
        <section class="vh-100 mt-5 pt-5">
            <div class="container py-5 h-100">
                <div class="row d-flex align-items-center justify-content-center h-100">
                    <div class="col-md-8 col-lg-7 col-xl-6">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            class="img-fluid"
                            alt="Phone image"
                        />
                    </div>
                    <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h2 className="text-center mb-5">Sign In</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmitLogin();
                            }}
                        >
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input
                                    type="email"
                                    id="form1Example13"
                                    class="form-control form-control-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label class="form-label" for="form1Example13">
                                    Email address
                                </label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input
                                    type="password"
                                    id="form1Example23"
                                    class="form-control form-control-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label class="form-label" for="form1Example23">
                                    Password
                                </label>
                            </div>

                            <div class="d-flex justify-content-around align-items-center mb-4">
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="form1Example3"
                                        checked
                                    />
                                    <label
                                        class="form-check-label"
                                        for="form1Example3"
                                    >
                                        {" "}
                                        Remember me{" "}
                                    </label>
                                </div>
                                <a href="#!">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                data-mdb-button-init
                                data-mdb-ripple-init
                                class="btn btn-primary btn-lg btn-block"
                                
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
