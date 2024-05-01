import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const classNames = require("classnames/bind");
const cx = classNames.bind(styles);


export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("female");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [address, setAddress] = useState("");
    let navigate = useNavigate();


    async function handleSubmitSignUp(){
        if (!email.trim() || !password.trim() || !fullName.trim() || !gender.trim() 
        || !phoneNumber.trim() || !dob.trim() || !bankName.trim() || !bankAccountNumber.trim()) {
            alert("Please fill all the fields");
            return;
            
        }
        try {
            const resp = await axios.post("http://localhost:8080/api/customer/sign-up", {
                "email": email,
                "fullName": fullName,
                "password": password,
                "address": address,
                "phoneNumber": phoneNumber,
                "gender": gender,
                "dob": dob,
                "bankAccountNumber": bankAccountNumber,
                "bankName": bankName
            });
         
            if (resp.status === 200){
                alert("Sign up successfully");
                return navigate("/sign-in");
            } else {
                alert(resp.data);
            }
        } catch (error) {
           
            alert(error.response.data);

        }
    }

    return (
        <section className={`vh-100 ${cx("gradient-custom")}`} style={{height: "100vh"}}>
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div
                            className={`card shadow-2-strong ${cx("card-registration")}`}
                            style={{borderRadius: 15}}
                        >
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                                    Registration Form
                                </h3>
                                <div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div
                                                data-mdb-input-init
                                                className="form-outline datepicker w-100"
                                            >
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    id="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <label
                                                    for="email"
                                                    className="form-label"
                                                >
                                                    Email
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div
                                                data-mdb-input-init
                                                className="form-outline"
                                            >
                                                <input
                                                    type="text"
                                                    id="password"
                                                    className="form-control form-control-lg"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <label
                                                    className="form-label"
                                                    for="password"
                                                >
                                                    Password
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div
                                                data-mdb-input-init
                                                className="form-outline datepicker w-100"
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="fullName"
                                                    name="fullName"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                />
                                                <label
                                                    for="fullName"
                                                    className="form-label"
                                                >
                                                    Full Name
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <h6 className="mb-2 pb-1">Gender: </h6>

                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="femaleGender"
                                                    value="female"
                                                    checked={
                                                        gender === "female"
                                                    }
                                                    onChange={()=>setGender("female")}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="femaleGender"
                                                >
                                                    Female
                                                </label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="maleGender"
                                                    value="male"
                                                    checked={
                                                        gender === "male"
                                                    }
                                                    onChange={()=>setGender("male")}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="maleGender"
                                                >
                                                    Male
                                                </label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="otherGender"
                                                    value="other"
                                                    checked={
                                                        gender === "other"
                                                    }
                                                    onChange={()=>setGender("other")}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="otherGender"
                                                >
                                                    Other
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div
                                                data-mdb-input-init
                                                className="form-outline"
                                            >
                                                <input
                                                    type="text"
                                                    id="phoneNumber"
                                                    className="form-control form-control-lg"
                                                    name="phoneNumber"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                                <label
                                                    className="form-label"
                                                    for="phoneNumber"
                                                >
                                                    Phone Number
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div
                                                data-mdb-input-init
                                                className="form-outline"
                                            >
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    className="form-control form-control-lg"
                                                    name="dob"
                                                    value={dob}
                                                    onChange={(e) => setDob(e.target.value)}
                                                />
                                                <label
                                                    className="form-label"
                                                    for="dob"
                                                >
                                                    Date of birth
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                     
                                    <div className="row">
                                        <div className="col-md-12 mb-12 d-flex align-items-center mb-4 pb-2">
                                            <div
                                                data-mdb-input-init
                                                className="form-outline datepicker w-100"
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="address"
                                                    name="address"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                                <label
                                                    for="address"
                                                    className="form-label"
                                                >
                                                    Address
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">
                                            <div
                                                data-mdb-input-init
                                                className="form-outline datepicker w-100"
                                            >
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="bankName"
                                                    name="bankName"
                                                    value={bankName}
                                                    onChange={(e) => setBankName(e.target.value)}
                                                />
                                                <label
                                                    for="bankName"
                                                    className="form-label"
                                                >
                                                    Bank Name
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div
                                                data-mdb-input-init
                                                className="form-outline"
                                            >
                                                <input
                                                    type="text"
                                                    id="bankAccountNumber"
                                                    className="form-control form-control-lg"
                                                    name="bankAccountNumber"
                                                    value={bankAccountNumber}
                                                    onChange={(e) => setBankAccountNumber(e.target.value)}
                                                />
                                                <label
                                                    className="form-label"
                                                    for="bankAccountNumber"
                                                >
                                                    Bank Account Number
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-12">
                                            <select className="form-control form-control-lg">
                                                <option value="1" disabled>
                                                    Choose option
                                                </option>
                                                <option value="2">
                                                    Subject 1
                                                </option>
                                                <option value="3">
                                                    Subject 2
                                                </option>
                                                <option value="4">
                                                    Subject 3
                                                </option>
                                            </select>
                                            <label className="form-label select-label">
                                                Choose option
                                            </label>
                                        </div>
                                    </div> */}

                                    <div className="mt-4 pt-2">
                                        <button
                                            data-mdb-button-init
                                            data-mdb-ripple-init
                                            className="btn btn-primary btn-lg"
                                            onClick={handleSubmitSignUp}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
