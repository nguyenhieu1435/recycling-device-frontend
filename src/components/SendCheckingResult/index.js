import styles from "./styles.module.css";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import configs from "../../config";
import axios from "axios";
const cx = classNames.bind(styles);

export default function SendCheckingResult() {
    const navigate = useNavigate();
    const admin = useSelector((state) => state.admin);
   
    const { state } = useLocation();
    const { device } = state;

    const [deviceId, setDeviceId] = useState(device.deviceId);
    const [name, setName] = useState(device.name);
    const [model, setModel] = useState(device.model);
    const [email, setEmail] = useState(device.customerID?.email);
    const [priceSuggested, setPriceSuggested] = useState(device.priceSuggested);
    const [realPrice, setRealPrice] = useState("");
    const [message, setMessage] = useState("");
    console.log("DEVICE", device);

    useEffect(() => {
        if (!admin.info) {
            navigate(configs.routes.adminSignIn);
        }
    }, []);

    async function handleUpdateStatusQualityCheck(deviceId) {
        try {
            const resp = await axios.get(
                `http://localhost:9090/api/delivery/update-delivery-status?deviceId=${deviceId}&status=3`
            );
            if (resp.status == 200) {
                navigate(configs.routes.filterDevicesByStatus);
            }
        } catch (error) {
            console.log(error);
        }
    }


    async function handleSubmitSendDeviceCheckingResult(e){
        e.preventDefault()
        console.log("CheckInfoDescription: ", message);
        try {
            const resp =  await axios.post("http://localhost:9090/api/checking-device-status/addAndSendEmail", {
                deviceId: deviceId,
                name: name,
                model: model,
                email: email,
                priceSuggested: Number(priceSuggested),
                realPrice: Number(realPrice),
                message: message,
                createdBy: admin.info.username
            })
            if (resp.status === 200){
                handleUpdateStatusQualityCheck(deviceId);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section class="bg-light py-2 py-xl-6">
            <div class="container mb-3 mb-md-6">
                <div class="row justify-content-md-center">
                    <div class="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6 text-center">
                        <h2 class="mb-2 display-5">Send checking result</h2>
                        <p class="text-secondary mb-2 mb-md-2">
                            System will save the checking result and send checking result to the customer email
                        </p>
                        <hr class="w-50 mx-auto mb-0 text-secondary" />
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row justify-content-lg-center">
                    <div class="col-12 col-lg-9">
                        <div class="bg-white border rounded shadow-sm overflow-hidden">
                            <form action="#"
                                onSubmit={handleSubmitSendDeviceCheckingResult}
                            >
                                <div class="row gy-4 gy-xl-5 p-4 p-xl-5">
                                    <div class="col-12 col-md-6">
                                        <label
                                            for="fullname"
                                            class="form-label"
                                        >
                                            Device ID{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="fullname"
                                            value={deviceId}
                                            required
                                            readOnly
                                        />
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label for="name" class="form-label">
                                            Name{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-info-circle"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                value={name}
                                                required
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label for="name" class="form-label">
                                            Model{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-info-circle"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                </svg>
                                            </span>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="name"
                                                value={model}
                                                required
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label for="email" class="form-label">
                                            Email{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-envelope"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                                </svg>
                                            </span>
                                            <input
                                                type="email"
                                                class="form-control"
                                                id="email"
                                                value={email}
                                                required
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label
                                            for="suggestedPrice"
                                            class="form-label"
                                        >
                                            Price suggested{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-coin"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                                </svg>
                                            </span>
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="suggestedPrice"
                                                value={priceSuggested.toFixed(2)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label
                                            for="readPrice"
                                            class="form-label"
                                        >
                                            Real price{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <div class="input-group">
                                            <span class="input-group-text">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-coin"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                                                </svg>
                                            </span>
                                            <input
                                                type="number"
                                                class="form-control"
                                                id="readPrice"
                                                value={realPrice}
                                                onChange={(e) => setRealPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label for="message" class="form-label">
                                            Full description{" "}
                                            <span class="text-danger">*</span>
                                        </label>
                                        <textarea
                                            class="form-control"
                                            id="message"
                                            rows="3"
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div class="col-12 mt-4">
                                        <div class="d-grid">
                                            <button
                                                class="btn btn-primary btn-lg"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
