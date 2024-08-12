import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Mean from '../Mean';
import Navbar from '../Navbar';

const TransactionDetails = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const apiUrl = `${process.env.REACT_APP_API_DETAILS}`;

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${apiUrl}/transaction`);
            setTransactionData(response.data);
            console.log('response.data.blog: ', response?.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = transactionData?.slice(indexOfFirstItem, indexOfLastItem);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math?.ceil(transactionData?.length / itemsPerPage); i++) {
        pageNumbers?.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="bg-menu-theme">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Mean />
                    <div className="layout-page bg-smoke">
                        <Navbar />
                        <div className="container ">
                            <div className="row">
                                <div className="col-lg-12 transaction">
                                    <>
                                        <table className="table table-hover mt-4">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Number</th>
                                                    <th scope="col">Address</th>
                                                    <th scope="col">Pay Mode</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">COD Payment</th>
                                                    <th scope="col">Transaction ID</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItems?.map((item, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">{indexOfFirstItem + index + 1}</th>
                                                        <td>{item?.name}</td>
                                                        <td>{item?.mobileNumber}</td>
                                                        <td>{item?.address}</td>
                                                        <td>{item?.paymode}</td>
                                                        <td>{item?.amount}</td>
                                                        <td>{item?.cod_payment}</td>
                                                        <td>{item?.transactionID}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <nav>
                                            <ul className="pagination justify-content-center">
                                                {pageNumbers?.map(number => (
                                                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                                                        <button onClick={() => paginate(number)} className={`page-link ${number === currentPage ? 'bg-secondary' : ''}`}>
                                                            {number}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </nav>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TransactionDetails;
