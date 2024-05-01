import { useSelector } from "react-redux";
import normalStyle from "./normalStyle.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Quote() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [usingMonth, setUsingMonth] = useState("1");
    const [displayStatus, setDisplayStatus] = useState("0");
    const [cameraStatus, setCameraStatus] = useState("0");
    const [batteryStatus, setBatteryStatus] = useState("0");
    const [faceDetection, setFaceDetection] = useState("0");
    const [fingerPrint, setFingerPrint] = useState("0");
    const [description, setDescription] = useState("");
    const [isOpenNextStep, setIsOpenNextStep] = useState(false);
    const [deviceInfoResponse, setDeviceInfoResponse] = useState(null);
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (!user?.user) {
            navigate("/sign-in");
            
        }
    });

    async function handleSubmitRequestQuote(e) {
        e.preventDefault();
        if (
            !name.trim() ||
            !model.trim() ||
            !usingMonth.trim() ||
            !description.trim()
        ) {
            alert("Please fill all required fields");
            return;
        }
        if (isNaN(usingMonth)) {
            alert("Using month must be a number");
            return;
        }
        try {
            console.log("Username", user.user?.email);
            const resp = await axios.post(
                "http://localhost:8080/api/device/receive-divice-info",
                {
                    name: name,
                    model: model,
                    usingMonth: Number.parseInt(usingMonth),
                    displayStatus: Number.parseInt(displayStatus),
                    cameraStatus: Number.parseInt(cameraStatus),
                    batteryStatus: Number.parseInt(batteryStatus),
                    faceDetectionStatus: Number.parseInt(faceDetection),
                    fingerPrintStatus: Number.parseInt(fingerPrint),
                    description: description,
                    username: user.user?.email,
                }
            );
            if (resp.status == 200) {
                console.log("Request quote success");
                console.log(resp.data);
                setDeviceInfoResponse(resp.data);
                setIsOpenNextStep(true);
            }
        } catch (error) {
            console.log("Error", error);
            if (error.response.status == 400) {
                alert(error.response.data);
            } else {
                alert("Error when request quote");
            }
        }
    }
    async function handleSubmitAcceptSendDevice(e) {
        e.preventDefault();
        if (!address.trim()) {
            alert("Please fill all required fields");
            return;
        }
        try {
            const resp = await axios.post(
                "http://localhost:8080/api/device/accept-send-device",
                {
                    deviceId: deviceInfoResponse.deviceId,
                    sourceAddress: address,
                    username: user.user?.email,
                }
            );
            if (resp.status == 200) {
                alert(resp.data);
                console.log("Request quote success");
                
            }
        } catch (error) {
            if (error.status == 400) {
                alert(error.response.data);
            } else {
                alert("Error when request quote");
                
            }
        }
    }

    return (
        <>
            {isOpenNextStep ? (
                <div class={`container ${normalStyle.container}`}>
                    <header class="header">
                        <h1 id="title" class="text-center">
                            Báo giá Điện thoại
                        </h1>
                        <p id="description" class="text-center">
                            {`Điện thoại của bạn có giá: $${deviceInfoResponse?.priceSuggested.toFixed(2)}, nếu bạn đồng ý với mức giá
                        này vui lòng điền thông tin địa chỉ lấy hàng và nhấn submit`}
                        </p>
                    </header>
                    <div class="form-wrap">
                        <form
                            id="survey-form2"
                            onSubmit={handleSubmitAcceptSendDevice}
                        >
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
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
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
                            <div class="row">
                                <div class="col-md-4 mr-5 pr-5">
                                    <button
                                        type="submit"
                                        id="submit"
                                        class="btn btn-primary btn-block"
                                    >
                                        Submit send device
                                    </button>
                                </div>
                                <div class="col-md-4">
                                    <button
                                        type="submit"
                                        id="submit"
                                        class="btn btn-primary btn-block"
                                        onClick={() => {
                                            setIsOpenNextStep(false)
                                            setDeviceInfoResponse(null)
                                        }}
                                    >
                                        Quote another device
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div class={`container ${normalStyle.container}`}>
                    <header class="header">
                        <h1 id="title" class="text-center">
                            Báo giá Điện thoại
                        </h1>
                        <p id="description" class="text-center">
                            Vui lòng điền chính xác thông tin điện thoại vào
                            form dưới đây để nhận báo giá
                        </p>
                    </header>
                    <div class="form-wrap">
                        <form
                            id="survey-form"
                            onSubmit={handleSubmitRequestQuote}
                        >
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label id="name-label" for="name">
                                            Mobile Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter mobile name"
                                            class="form-control"
                                            required
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label id="email-label" for="email">
                                            Model Name
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            placeholder="Enter model name"
                                            class="form-control"
                                            required
                                            value={model}
                                            onChange={(e) =>
                                                setModel(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label id="number-label" for="number">
                                            Using Months
                                        </label>
                                        <input
                                            type="number"
                                            id="number"
                                            min="1"
                                            max="120"
                                            class="form-control"
                                            placeholder="Using month number"
                                            required
                                            value={usingMonth}
                                            onChange={(e) =>
                                                setUsingMonth(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Display status</label>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="displayStatus1"
                                                value="0"
                                                name="displayStatus"
                                                class="custom-control-input"
                                                checked={
                                                    displayStatus === "0"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setDisplayStatus("0")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="displayStatus1"
                                            >
                                                Repaired
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="displayStatus2"
                                                value="1"
                                                name="displayStatus"
                                                class="custom-control-input"
                                                checked={
                                                    displayStatus === "1"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setDisplayStatus("1")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="displayStatus2"
                                            >
                                                Have problem
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="displayStatus3"
                                                value="2"
                                                name="displayStatus"
                                                class="custom-control-input"
                                                checked={
                                                    displayStatus === "2"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setDisplayStatus("2")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="displayStatus3"
                                            >
                                                Normal
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Camera status</label>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="cameraStatus1"
                                                value="0"
                                                name="cameraStatus"
                                                class="custom-control-input"
                                                checked={
                                                    cameraStatus === "0"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setCameraStatus("0")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="cameraStatus1"
                                            >
                                                Repaired
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="cameraStatus2"
                                                value="1"
                                                name="cameraStatus"
                                                class="custom-control-input"
                                                checked={
                                                    cameraStatus === "1"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setCameraStatus("1")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="cameraStatus2"
                                            >
                                                Have problem
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="cameraStatus3"
                                                value="2"
                                                name="cameraStatus"
                                                class="custom-control-input"
                                                checked={
                                                    cameraStatus === "2"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setCameraStatus("2")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="cameraStatus3"
                                            >
                                                Normal
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Battery status</label>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="batteryStatus1"
                                                value="0"
                                                name="batteryStatus"
                                                class="custom-control-input"
                                                checked={
                                                    batteryStatus === "0"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setBatteryStatus("0")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="batteryStatus1"
                                            >
                                                Repaired
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="batteryStatus2"
                                                value="1"
                                                name="batteryStatus"
                                                class="custom-control-input"
                                                checked={
                                                    batteryStatus === "1"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setBatteryStatus("1")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="batteryStatus2"
                                            >
                                                Have problem
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="batteryStatus3"
                                                value="2"
                                                name="batteryStatus"
                                                class="custom-control-input"
                                                checked={
                                                    batteryStatus === "2"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setBatteryStatus("2")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="batteryStatus3"
                                            >
                                                Normal
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Face Detection</label>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="faceDetection1"
                                                value="0"
                                                name="faceDetection"
                                                class="custom-control-input"
                                                checked={
                                                    faceDetection === "0"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setFaceDetection("0")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="faceDetection1"
                                            >
                                                Repaired
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="faceDetection2"
                                                value="1"
                                                name="faceDetection"
                                                class="custom-control-input"
                                                checked={
                                                    faceDetection === "1"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setFaceDetection("1")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="faceDetection2"
                                            >
                                                Have problem
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="faceDetection3"
                                                value="2"
                                                name="faceDetection"
                                                class="custom-control-input"
                                                checked={
                                                    faceDetection === "2"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setFaceDetection("2")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="faceDetection3"
                                            >
                                                Normal
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="faceDetection4"
                                                value="3"
                                                name="faceDetection"
                                                class="custom-control-input"
                                                checked={
                                                    faceDetection === "3"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setFaceDetection("3")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="faceDetection4"
                                            >
                                                Have not
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Finger Print</label>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="fingerPrint1"
                                                value="0"
                                                name="fingerPrint"
                                                class="custom-control-input"
                                                checked={
                                                    fingerPrint === "0"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setFingerPrint("0")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="fingerPrint1"
                                            >
                                                Repaired
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="fingerPrint2"
                                                value="1"
                                                name="fingerPrint"
                                                class="custom-control-input"
                                                checked={
                                                    fingerPrint === "1"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setFingerPrint("1")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="fingerPrint2"
                                            >
                                                Have problem
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="fingerPrint3"
                                                value="2"
                                                name="fingerPrint"
                                                class="custom-control-input"
                                                checked={
                                                    fingerPrint === "2"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setFingerPrint("2")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="fingerPrint3"
                                            >
                                                Normal
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio custom-control-inline">
                                            <input
                                                type="radio"
                                                id="fingerPrint4"
                                                value="3"
                                                name="fingerPrint"
                                                class="custom-control-input"
                                                checked={
                                                    fingerPrint === "3"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(e) =>
                                                    setFingerPrint("3")
                                                }
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="fingerPrint4"
                                            >
                                                Have not
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Description</label>
                                        <textarea
                                            id="comments"
                                            class="form-control"
                                            name="comment"
                                            placeholder="Enter your description here..."
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <button
                                        type="submit"
                                        id="submit"
                                        class="btn btn-primary btn-block"
                                    >
                                        Submit Survey
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
