
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Appointment.css';

function Appointment() {
    const API_URL = 'http://127.0.0.1:8000/Appointment/';
    const PATIENT_URL = 'http://127.0.0.1:8000/Patient/';
    const DOCTOR_URL = 'http://127.0.0.1:8000/Doctor/';

    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        patient: '',
        doctor: '',
        date: '',
        time: '',
        status: 'pending'
    });

    const getData = async () => {
        try {
            const [appointmentRes, patientRes, doctorRes] = await Promise.all([
                axios.get(API_URL + 'Read/'),
                axios.get(PATIENT_URL + 'Read/'),
                axios.get(DOCTOR_URL + 'Read/')
            ]);

            setAppointments(appointmentRes.data);
            setPatients(patientRes.data);
            setDoctors(doctorRes.data);
        } catch (error) {
            console.log(error);
            alert('Unable to load appointment details');
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
                alert('Appointment updated successfully');
            } else {
                await axios.post(API_URL + 'Create/', form);
                alert('Appointment added successfully');
            }

            setForm({
                patient: '',
                doctor: '',
                date: '',
                time: '',
                status: 'pending'
            });

            setEditId(null);
            getData();

        } catch (error) {
            console.log(error.response?.data || error);
            alert('Something went wrong');
        }
    };

    const handleEdit = (appointment) => {
        setEditId(appointment.id);

        setForm({
            patient: appointment.patient,
            doctor: appointment.doctor,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await axios.delete(API_URL + `Delete/${id}/`);
                alert('Appointment deleted successfully');
                getData();
            } catch (error) {
                console.log(error);
                alert('Unable to delete appointment');
            }
        }
    };

    return (
        <div className="appointment-container">

            <h1>Appointments Management</h1>
            <p>Manage patient appointments</p>

            <div className="appointment-form-card">
                <h2>{editId ? 'Update Appointment' : 'Add New Appointment'}</h2>

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
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="time"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <button type="submit">
                        {editId ? 'Update Appointment' : 'Add Appointment'}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="appointment-cancel-btn"
                            onClick={() => {
                                setEditId(null);
                                setForm({
                                    patient: '',
                                    doctor: '',
                                    date: '',
                                    time: '',
                                    status: 'pending'
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            <div className="appointment-table-card">
                <h2>Appointment Details</h2>

                <div className="appointment-table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient ID</th>
                                <th>Doctor ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.patient}</td>
                                    <td>{appointment.doctor}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        <button
                                            className="appointment-edit-btn"
                                            onClick={() => handleEdit(appointment)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="appointment-delete-btn"
                                            onClick={() => handleDelete(appointment.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {appointments.length === 0 && (
                                <tr>
                                    <td colSpan="7">No appointments found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Appointment;
