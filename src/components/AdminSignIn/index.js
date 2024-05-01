import { useState } from "react";
import {useDispatch} from "react-redux"
import { setAdminInfo } from "../../redux-toolkit/slices/admin.slice";
import { useNavigate } from "react-router-dom";
import configs from "../../config";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import axios from "axios";
const cx = classNames.bind(styles);


export default function AdminSignIn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")



    async function handleSubmitLoginForm(e){
        if (!username.trim() || !password.trim()) return alert("Please fill all fields")

        e.preventDefault()
        try {
            const resp =  await axios.post("http://localhost:9090/api/admin/login", {
                username: username,
                password: password
            })
            if (resp.status == 200){
                dispatch(setAdminInfo(resp.data))
                navigate(configs.routes.homePage)
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <section class="mt-5 pt-5" style={{minHeight: "100vh"}}>
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-12 col-lg-12">
                        <h3 class="text-primary text-center mb-2">Sign In as Admin</h3>
                    </div>
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            class="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form
                            action="#"
                            onSubmit={handleSubmitLoginForm}
                        >
                          
                            <div data-mdb-input-init class="form-outline mb-4">
                                <input
                                    type="text"
                                    id="form3Example3"
                                    class="form-control form-control-lg"
                                    placeholder="Enter a username"
                                    value={username}
                                    onChange={(e)=>setUsername(e.target.value)}
                                />
                                <label class="form-label" for="form3Example3">
                                    Username
                                </label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-3">
                                <input
                                    type="password"
                                    id="form3Example4"
                                    class="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                                <label class="form-label" for="form3Example4">
                                    Password
                                </label>
                            </div>

                            <div class="d-flex justify-content-between align-items-center">
                                <div class="form-check mb-0">
                                    <input
                                        class="form-check-input me-2"
                                        type="checkbox"
                                        value=""
                                        id="form2Example3"
                                    />
                                    <label
                                        class="form-check-label"
                                        for="form2Example3"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" class="text-body">
                                    Forgot password?
                                </a>
                            </div>

                            <div class="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    data-mdb-button-init
                                    data-mdb-ripple-init
                                    class="btn btn-primary btn-lg"
                                    style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}
                                >
                                    Login
                                </button>
                                <p class="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?{" "}
                                    <a href="#!" class="link-danger">
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between
             py-4 px-4 px-xl-5 bg-primary mt-5 pt-5">
                <div class="text-white mb-3 mb-md-0">
                    Copyright © 2020. All rights reserved.
                </div>

                <div>
                  
                </div>
            </div>
        </section>
    );
}
