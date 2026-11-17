
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Prescription.css';

function Prescription() {
    const API_URL = 'http://127.0.0.1:8000/Prescription/';
    const PATIENT_URL = 'http://127.0.0.1:8000/Patient/';
    const DOCTOR_URL = 'http://127.0.0.1:8000/Doctor/';

    const [prescriptions, setPrescriptions] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        patient: '',
        doctor: '',
        medicine: '',
        dosage: ''
    });

    const getData = async () => {
        try {
            const [prescriptionRes, patientRes, doctorRes] = await Promise.all([
                axios.get(API_URL + 'Read/'),
                axios.get(PATIENT_URL + 'Read/'),
                axios.get(DOCTOR_URL + 'Read/')
            ]);

            setPrescriptions(prescriptionRes.data);
            setPatients(patientRes.data);
            setDoctors(doctorRes.data);
        } catch (error) {
            console.log(error);
            alert('Unable to load prescription details');
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
                alert('Prescription updated successfully');
            } else {
                await axios.post(API_URL + 'Create/', form);
                alert('Prescription added successfully');
            }

            setForm({
                patient: '',
                doctor: '',
                medicine: '',
                dosage: ''
            });

            setEditId(null);
            getData();

        } catch (error) {
            console.log(error.response?.data || error);
            alert('Something went wrong');
        }
    };

    const handleEdit = (prescription) => {
        setEditId(prescription.id);

        setForm({
            patient: prescription.patient,
            doctor: prescription.doctor,
            medicine: prescription.medicine,
            dosage: prescription.dosage
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this prescription?')) {
            try {
                await axios.delete(API_URL + `Delete/${id}/`);
                alert('Prescription deleted successfully');
                getData();
            } catch (error) {
                console.log(error);
                alert('Unable to delete prescription');
            }
        }
    };

    return (
        <div className="prescription-container">

            <h1>Prescriptions Management</h1>
            <p>Manage patient medicines and prescriptions</p>

            <div className="prescription-form-card">
                <h2>{editId ? 'Update Prescription' : 'Add New Prescription'}</h2>

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

                    <select
                        name="doctor"
                        value={form.doctor}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name} (ID: {doctor.id})
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="medicine"
                        placeholder="Medicine Name"
                        value={form.medicine}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="dosage"
                        placeholder="Dosage (e.g. 1 tablet twice daily)"
                        value={form.dosage}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        {editId ? 'Update Prescription' : 'Add Prescription'}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="prescription-cancel-btn"
                            onClick={() => {
                                setEditId(null);
                                setForm({
                                    patient: '',
                                    doctor: '',
                                    medicine: '',
                                    dosage: ''
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            <div className="prescription-table-card">
                <h2>Prescription Details</h2>

                <div className="prescription-table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient ID</th>
                                <th>Doctor ID</th>
                                <th>Medicine</th>
                                <th>Dosage</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {prescriptions.map((prescription) => (
                                <tr key={prescription.id}>
                                    <td>{prescription.id}</td>
                                    <td>{prescription.patient}</td>
                                    <td>{prescription.doctor}</td>
                                    <td>{prescription.medicine}</td>
                                    <td>{prescription.dosage}</td>
                                    <td>
                                        <button
                                            className="prescription-edit-btn"
                                            onClick={() => handleEdit(prescription)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="prescription-delete-btn"
                                            onClick={() => handleDelete(prescription.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {prescriptions.length === 0 && (
                                <tr>
                                    <td colSpan="6">No prescriptions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Prescription;
