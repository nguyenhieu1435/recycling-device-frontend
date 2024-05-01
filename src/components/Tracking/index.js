import { useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import axios from "axios";
const cx = classNames.bind(styles);

export default function Tracking() {
    const [trackingID, setTrackingID] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [trackingInfo, setTrackingInfo] = useState(null);
    const [listTrackingStatus, setListTrackingStatus] = useState([
        {
            status: "DELIVERING",
            classIcon: "pe-7s-cart",
        },
        {
            status: "DELIVERED",
            classIcon: "pe-7s-config",
        },
        {
            status: "QUALITY_CHECK",
            classIcon: "pe-7s-medal",
        },
        {
            status: "ACCOUNTED",
            classIcon: "pe-7s-car",
        },
        {
            status: "RETURNED",
            classIcon: "pe-7s-home",
        }
    ])
    let flagIndex = -1;

    async function handleTrackingMyItem() {
        try {
            const resp = await axios.post(
                `http://localhost:8080/api/delivery/tracking-my-item`,
                {
                    trackingID: trackingID,
                    phoneNumber: phoneNumber,
                }
            );
            if (resp.status === 200) {
                console.log(resp.data);
                setTrackingInfo(resp.data);
                setErrorMsg(null);
                setTrackingID("");
                setPhoneNumber("");
            }
        } catch (error) {
            setErrorMsg(
                <div class={cx("form-element")}>
                    <div class="row invalid">
                        <div class="col-1">
                            <i
                                class="fa fa-exclamation-triangle"
                                aria-hidden="true"
                            ></i>
                        </div>
                        <div class="col-11">
                            <span>
                                Order does not match with mobile number!
                                <br /> The information seems invalid
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            {trackingInfo ? (
                <div class="container padding-bottom-3x mb-1">
                    <div class="card mb-3">
                        <div class="p-4 text-center text-white text-lg bg-dark rounded-top">
                            <span class="text-uppercase">
                                Tracking ID No -{" "}
                            </span>
                            <span class="text-medium">{trackingInfo.deliveryId}</span>
                        </div>
                        <div class="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary bg-gradient">
                            <div class="w-100 text-center py-1 px-2 text-white">
                                <span class="text-medium text-white">Send from:</span>{" "}
                                {
                                    trackingInfo.sourceAddress
                                }
                            </div>
                            <div class="w-100 text-center py-1 px-2 text-white">
                                <span class="text-medium">Status:</span>{" "}
                                {
                                    trackingInfo.status
                                }
                            </div>
                            <div class="w-100 text-center py-1 px-2 text-white">
                                <span class="text-medium">Date time:</span>{" "}
                                {
                                    new Date(trackingInfo.updatedAt).toUTCString()
                                }
                            </div>
                        </div>
                        <div class="card-body">
                            <div
                                class={`${cx(
                                    "steps"
                                )} d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x`}
                            >
                                {
                                    listTrackingStatus.map((status, index) => {
                                        if (status.status === trackingInfo.status) {
                                            flagIndex = index;
                                        }
                                        if (trackingInfo.status !== "RETURNED") {
                                            if (status.status === "RETURNED") {
                                                return <></>;
                                            } else {
                                                return <div key={index} class={`${cx("step", (status.status === trackingInfo.status || flagIndex == -1) ? "completed" : "") }`}>
                                                    <div class={`${cx("step-icon-wrap")}`}>
                                                        <div class={`${cx("step-icon")}`}>
                                                            <i class={status.classIcon}></i>
                                                        </div>
                                                    </div>
                                                    <h4 class={`${cx("step-title")}`}>
                                                        {status.status}
                                                    </h4>
                                                </div>
                                            }
                                        } else {
                                            if (status.status === "ACCOUNTED") {
                                                return <></>
                                            } else {
                                                return <div key={index} class={`${cx("step", (status.status === trackingInfo.status || flagIndex == -1) ? "completed" : "") }`}>
                                                    <div class={`${cx("step-icon-wrap")}`}>
                                                        <div class={`${cx("step-icon")}`}>
                                                            <i class={status.classIcon}></i>
                                                        </div>
                                                    </div>
                                                    <h4 class={`${cx("step-title")}`}>
                                                        {status.status}
                                                    </h4>
                                                </div>
                                            }
                                        }
                                      
                                    })
                                }
                                {/* <div class={`${cx("step")} completed`}>
                                    <div class={`${cx("step-icon-wrap")}`}>
                                        <div class={`${cx("step-icon")}`}>
                                            <i class="pe-7s-cart"></i>
                                        </div>
                                    </div>
                                    <h4 class={`${cx("step-title")}`}>
                                        DELIVERING
                                    </h4>
                                </div>
                                <div class={`${cx("step", "completed")} completed`}>
                                    <div class={`${cx("step-icon-wrap")}`}>
                                        <div class={`${cx("step-icon")}`}>
                                            <i class="pe-7s-config"></i>
                                        </div>
                                    </div>
                                    <h4 class={`${cx("step-title")}`}>
                                        DELIVERED
                                    </h4>
                                </div>
                                <div class={`${cx("step")} completed`}>
                                    <div class={`${cx("step-icon-wrap")}`}>
                                        <div class={`${cx("step-icon")}`}>
                                            <i class="pe-7s-medal"></i>
                                        </div>
                                    </div>
                                    <h4 class={`${cx("step-title")}`}>
                                        QUALITY_CHECK
                                    </h4>
                                </div>
                                <div class={`${cx("step")} `}>
                                    <div class={`${cx("step-icon-wrap")}`}>
                                        <div class={`${cx("step-icon")}`}>
                                            <i class="pe-7s-car"></i>
                                        </div>
                                    </div>
                                    <h4 class={`${cx("step-title")}`}>
                                        ACCOUNTED
                                    </h4>
                                </div>
                                <div class={`${cx("step")} `}>
                                    <div class={`${cx("step-icon-wrap")}`}>
                                        <div class={`${cx("step-icon")}`}>
                                            <i class="pe-7s-home"></i>
                                        </div>
                                    </div>
                                    <h4 class={`${cx("step-title")}`}>
                                        Product Delivered
                                    </h4>
                                </div> */}
                            </div>
                            <p>Delivery Info: {trackingInfo.description}</p>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
                        <div class="custom-control custom-checkbox mr-3">
                            <input
                                class="custom-control-input"
                                type="checkbox"
                                id="notify_me"
                                checked=""
                            />
                            <label class="custom-control-label" for="notify_me">
                                Notify me when order is delivered
                            </label>
                        </div>
                        <div class="text-left text-sm-right">
                            
                        </div>
                    </div>
                </div>  
            ) : (
                <div className={cx("trackFormContainer")}>
                    <div class={`card ${cx("trackFormCard")}`}>
                        <div class={cx("upper")}>
                            <div class="row">
                                <div class={`col-8 ${cx("headingTrack")}`}>
                                    <h5>
                                        <b>Track Your Item</b>
                                    </h5>
                                </div>
                                <div class="col-4">
                                    <img
                                        class="img-fluid"
                                        src="https:i.imgur.com/Rzjor3M.png"
                                    />
                                </div>
                            </div>
                            <form>
                                <div class="form-element">
                                    <span id="input-header">Tracking ID</span>
                                    <input
                                        type="text"
                                        id="order_id"
                                        placeholder="2548745588958"
                                        className={cx("classInput")}
                                        value={trackingID}
                                        onChange={(e) =>
                                            setTrackingID(e.target.value)
                                        }
                                    />
                                </div>
                                <div class="form-element">
                                    <span id="input-header">Phone No.</span>
                                    <div class="row">
                                        <div class="col-9">
                                            <input
                                                type="text"
                                                id="phone"
                                                placeholder="0975654628"
                                                className={cx("classInput")}
                                                value={phoneNumber}
                                                onChange={(e) =>
                                                    setPhoneNumber(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {errorMsg}
                        </div>
                        <hr />
                        <div class={cx("lower")}>
                            <button
                                className={cx("btnTrack")}
                                onClick={handleTrackingMyItem}
                            >
                                Track Status
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
