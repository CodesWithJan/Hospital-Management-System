
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Billing.css';

function Billing() {
    const API_URL = 'http://127.0.0.1:8000/Billing/';
    const PATIENT_URL = 'http://127.0.0.1:8000/Patient/';

    const [billings, setBillings] = useState([]);
    const [patients, setPatients] = useState([]);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        patient: '',
        amount: '',
        payment_status: 'pending'
    });

    const getData = async () => {
        try {
            const [billingRes, patientRes] = await Promise.all([
                axios.get(API_URL + 'Read/'),
                axios.get(PATIENT_URL + 'Read/')
            ]);

            setBillings(billingRes.data);
            setPatients(patientRes.data);
        } catch (error) {
            console.log(error);
            alert('Unable to load billing details');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(API_URL + `Update/${editId}/`, form);
                alert('Bill updated successfully');
            } else {
                await axios.post(API_URL + 'Create/', form);
                alert('Bill added successfully');
            }

            setForm({
                patient: '',
                amount: '',
                payment_status: 'pending'
            });

            setEditId(null);
            getData();

        } catch (error) {
            console.log(error.response?.data || error);
            alert('Something went wrong');
        }
    };

    const handleEdit = (billing) => {
        setEditId(billing.id);

        setForm({
            patient: billing.patient,
            amount: billing.amount,
            payment_status: billing.payment_status
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this bill?')) {
            try {
                await axios.delete(API_URL + `Delete/${id}/`);
                alert('Bill deleted successfully');
                getData();
            } catch (error) {
                console.log(error);
                alert('Unable to delete bill');
            }
        }
    };

    return (
        <div className="billing-container">

            <h1>Billing Management</h1>
            <p>Manage patient bills and payments</p>

            <div className="billing-form-card">
                <h2>{editId ? 'Update Bill' : 'Add New Bill'}</h2>

                <form onSubmit={handleSubmit}>

                    <select
                        name="patient"
                        value={form.patient}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Patient</option>

                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.name} (ID: {patient.id})
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Bill Amount"
                        min="0"
                        value={form.amount}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="payment_status"
                        value={form.payment_status}
                        onChange={handleChange}
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <button type="submit">
                        {editId ? 'Update Bill' : 'Add Bill'}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="billing-cancel-btn"
                            onClick={() => {
                                setEditId(null);
                                setForm({
                                    patient: '',
                                    amount: '',
                                    payment_status: 'pending'
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            <div className="billing-table-card">
                <h2>Billing Details</h2>

                <div className="billing-table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient ID</th>
                                <th>Amount</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {billings.map((billing) => (
                                <tr key={billing.id}>
                                    <td>{billing.id}</td>
                                    <td>{billing.patient}</td>
                                    <td>₹ {billing.amount}</td>
                                    <td>
                                        <span className={`billing-status ${billing.payment_status}`}>
                                            {billing.payment_status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="billing-edit-btn"
                                            onClick={() => handleEdit(billing)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="billing-delete-btn"
                                            onClick={() => handleDelete(billing.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {billings.length === 0 && (
                                <tr>
                                    <td colSpan="5">No billing records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Billing;
