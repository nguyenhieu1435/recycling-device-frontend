import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import configs from "../../config";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

export default function FilterDeviceByStatus() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [devices, setDevices] = useState([]);
    const admin = useSelector((state) => state.admin);

    async function fetchDevicesByStatus(status, pageNo, pageSize) {
        try {
            const resp = await axios.get(
                `http://localhost:9090/api/device/filter-devices-by-status?pageNo=${pageNo}&sizeNo=${pageSize}&status=${status}`
            );
            if (resp.status == 200) {
                console.log(resp.data);
                setDevices(resp.data.devices);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!admin?.info) {
            navigate(configs.routes.adminSignIn);
        }
    });

    useEffect(() => {
        setPageNo(1);
        fetchDevicesByStatus(status, pageNo, pageSize);
    }, [status]);

    async function handleUpdateStatusDelivered(deviceId) {
        try {
            const resp = await axios.get(
                `http://localhost:9090/api/delivery/update-delivery-status?deviceId=${deviceId}&status=1`
            );
            if (resp.status == 200) {
                fetchDevicesByStatus(status, pageNo, pageSize);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleShowActionsByStatus(device) {
        if (status === 0) {
            return (
                <>
                    <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => handleUpdateStatusDelivered(device.deviceId)}
                    >
                        Update to Delivered
                    </button>
                </>
            );
        } else if (status === 1) {
            return (
                <>
                    <button type="button" class="btn btn-primary"
                        onClick={()=> navigate("/send-checking-result", {
                            state: {device: device}
                        })}
                    >
                        Send checking result
                    </button>
                </>
            );
        } else if (status === 3) {
            return (
                <>
                    <button type="button" class="btn btn-info">
                        Accounting for Customer
                    </button>
                    <button type="button" class="btn btn-secondary">
                        Return device for Customer
                    </button>
                </>
            );
        }
    }

    function handlePreviousPage(){
        if (pageNo <= 1){
            setPageNo(1);
            return;
        }
        setPageNo(pageNo - 1);
        fetchDevicesByStatus(status, pageNo, pageSize);

    } 
    function handleNextPage(){
        if (devices.length < pageSize){
            return;
        }
        setPageNo(pageNo + 1);
        fetchDevicesByStatus(status, pageNo, pageSize);
    }

    return (
        <div class="container-xl">
            <div class="table-responsive">
                <div class={`table-wrapper ${cx("tableWrapper")}`}>
                    <div class={`table-title ${cx("tableTitle")}`}>
                        <div class="row no-gutters">
                            <div class="col-sm-6">
                                <h4>Process Status</h4>
                            </div>
                            <div class="col-sm-6">
                                <div
                                    class={`btn-group ${cx("btnGroup")}`}
                                    data-toggle="buttons"
                                >
                                    <label
                                        class={`btn btn-info active ${cx(
                                            "btnCss"
                                        )}`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value="0"
                                            onChange={() => setStatus(0)}
                                            checked={status === 0}
                                        />{" "}
                                        Delivering
                                    </label>
                                    <label
                                        class={`btn btn-success ${cx(
                                            "btnCss"
                                        )}`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value="1"
                                            onChange={() => setStatus(1)}
                                            checked={status === 1}
                                        />{" "}
                                        Delivered
                                    </label>
                                    <label
                                        class={`btn btn-warning ${cx(
                                            "btnCss"
                                        )}`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value="3"
                                            onChange={() => setStatus(3)}
                                            checked={status === 3}
                                        />{" "}
                                        Quality check
                                    </label>
                                    <label
                                        class={`btn btn-danger ${cx("btnCss")}`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value="4"
                                            onChange={() => setStatus(4)}
                                            checked={status === 4}
                                        />{" "}
                                        Returned
                                    </label>
                                    <label
                                        class={`btn btn-success ${cx(
                                            "btnCss"
                                        )}`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value="5"
                                            onChange={() => setStatus(5)}
                                            checked={status === 5}
                                        />{" "}
                                        Accounted
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table
                        class={`table table-striped table-hover ${cx(
                            "tableCss",
                            "tableStriped",
                            "tableHover"
                        )}`}
                    >
                        <thead>
                            <tr>
                                <th>Device Id</th>
                                <th>Name</th>
                                <th>Model</th>
                                <th>Price Suggested ($)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices &&
                                devices.map((device, index) => {
                                    return (
                                        <tr data-status="active" key={index}>
                                            <td>{device.deviceId}</td>
                                            <td>
                                                <a href="#">{device.name}</a>
                                            </td>
                                            <td>{device.model}</td>
                                            <td>
                                                {device.priceSuggested.toFixed(
                                                    2
                                                )}
                                            </td>
                                            <td>
                                                {handleShowActionsByStatus(
                                                    device
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item" onClick={handlePreviousPage}>
                            <a class="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">
                                {pageNo}
                            </a>
                        </li>
                        <li class="page-item" onClick={handleNextPage}>
                            <a class="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
