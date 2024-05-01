import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames/bind";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import configs from "../../config";
const cx = classNames.bind(styles);


export default function ListingMyItems() {
    const navigate = useNavigate();
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [sizePageNo, setSizePageNo] = useState(5);
    const userInfo = useSelector((state) => state.user.user);
    const [devices, setDevices] = useState([]);

    async function handleGetListItemPaging() {
        try {
            const resp = await axios.get(
                `http://localhost:8080/api/device/get-devices?pageNo=${currentPageNo}&size=${sizePageNo}&username=${userInfo.email}`
            );
            if (resp.status === 200) {
                console.log(resp.data);
                setDevices(resp.data.devices);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handlePreviousPage(){
        if (currentPageNo <= 1){
            setCurrentPageNo(1);
            return;
        }
        setCurrentPageNo(currentPageNo - 1);
        handleGetListItemPaging();

    } 
    function handleNextPage(){
        if (devices.length < sizePageNo){
            return;
        }
        setCurrentPageNo(currentPageNo + 1);
        handleGetListItemPaging();
    }

    useEffect(() => {
        if (!userInfo){
            navigate(configs.routes.signIn)
            return;
        }
        handleGetListItemPaging();
    }, []);

    return (
        <div class="container">
            <div class="row">
                <div class="col-12 mb-3 mb-lg-5">
                    <div class="position-relative card table-nowrap table-card">
                        <div class="card-header align-items-center">
                            <h5 class="mb-0">Latest Recycle Items</h5>
                            <p class="mb-0 small text-muted">{devices.length} items</p>
                        </div>
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead class="small text-uppercase bg-body text-muted">
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Name</th>
                                        <th>Model</th>
                                        <th>Price Negotiated</th>
                                        <th>Tracking ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {devices &&
                                        Array.isArray(devices) &&
                                        devices.map((device, index) => (
                                            <tr
                                                class="align-middle"
                                                key={index}
                                            >
                                                <td>{device.deviceId}</td>
                                                <td>{device.name}</td>
                                                <td>{device.model}</td>
                                                <td>{device.priceSuggested}</td>
                                                <td>{device.deliveryId}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"
                            onClick={handlePreviousPage}
                        >
                            <a class="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">
                                {currentPageNo}
                            </a>
                        </li>
                        <li class="page-item"
                            onClick={handleNextPage}
                        >
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
