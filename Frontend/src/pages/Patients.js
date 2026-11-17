
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patient.css';

function Patient() {
    const API_URL = 'http://127.0.0.1:8000/Patient/';

    const [patients, setPatients] = useState([]);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        address: ''
    });

    const getPatients = async () => {
        try {
            const response = await axios.get(API_URL + 'Read/');
            setPatients(response.data);
        } catch (error) {
            console.log(error);
            alert('Unable to load patients');
        }
    };

    useEffect(() => {
        getPatients();
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
                alert('Patient updated successfully');
            } else {
                await axios.post(API_URL + 'Create/', form);
                alert('Patient added successfully');
            }

            setForm({
                name: '',
                age: '',
                gender: '',
                phone: '',
                address: ''
            });

            setEditId(null);
            getPatients();

        } catch (error) {
            console.log(error.response?.data || error);
            alert('Something went wrong');
        }
    };

    const handleEdit = (patient) => {
        setEditId(patient.id);
        setForm({
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            phone: patient.phone,
            address: patient.address
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await axios.delete(API_URL + `Delete/${id}/`);
                alert('Patient deleted successfully');
                getPatients();
            } catch (error) {
                console.log(error);
                alert('Unable to delete patient');
            }
        }
    };

    return (
        <div className="patient-container">

            <h1>Patients Management</h1>
            <p>Manage hospital patient details</p>

            <div className="patient-form-card">
                <h2>{editId ? 'Update Patient' : 'Add New Patient'}</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Patient Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={form.age}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Patient Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        {editId ? 'Update Patient' : 'Add Patient'}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="patient-cancel-btn"
                            onClick={() => {
                                setEditId(null);
                                setForm({
                                    name: '',
                                    age: '',
                                    gender: '',
                                    phone: '',
                                    address: ''
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            <div className="patient-table-card">
                <h2>Patient Details</h2>

                <div className="patient-table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {patients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.address}</td>
                                    <td>
                                        <button
                                            className="patient-edit-btn"
                                            onClick={() => handleEdit(patient)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="patient-delete-btn"
                                            onClick={() => handleDelete(patient.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {patients.length === 0 && (
                                <tr>
                                    <td colSpan="7">No patients found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Patient;
