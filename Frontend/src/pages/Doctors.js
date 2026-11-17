
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doctors.css';

function Doctors() {
    const API_URL = 'http://127.0.0.1:8000/Doctor/';

    const [doctors, setDoctors] = useState([]);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        specialization: '',
        department: ''
    });

    const [editId, setEditId] = useState(null);

    const [departments, setDepartments] = useState([]);

    const getDepartments = async () => {
    try {
        const response = await axios.get(
            'http://127.0.0.1:8000/Department/Read/'
        );

        setDepartments(response.data);
    } catch (error) {
        console.log(error);
        alert('Unable to load departments');
    }
};
    

    const getDoctors = async () => {
        try {
            const response = await axios.get(API_URL + 'Read/');
            setDoctors(response.data);
        } catch (error) {
            console.log(error);
            alert('Unable to load doctors');
        }
    };
    useEffect(() => {
    getDoctors();
    getDepartments();
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
        const doctorData = {
            ...form,
            experience: Number(form.experience),
            department: form.department === ''
                ? null
                : Number(form.department)
        };

        if (editId) {
            await axios.put(
                API_URL + `Update/${editId}/`,
                doctorData
            );

            alert('Doctor updated successfully');
        } else {
            await axios.post(
                API_URL + 'Create/',
                doctorData
            );

            alert('Doctor added successfully');
        }

        setForm({
            name: '',
            email: '',
            phone: '',
            experience: '',
            specialization: '',
            department: ''
        });

        setEditId(null);
        getDoctors();

    } catch (error) {
        console.log('Status:', error.response?.status);
        console.log('Backend error:', error.response?.data);
        console.log('Full error:', error);

        alert(
            JSON.stringify(
                error.response?.data || error.message
            )
        );
    }
};

    const handleEdit = (doctor) => {
        setEditId(doctor.id);

        setForm({
            name: doctor.name,
            email: doctor.email,
            phone: doctor.phone,
            experience: doctor.experience,
            specialization: doctor.specialization,
            department: doctor.department || ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                await axios.delete(API_URL + `Delete/${id}/`);
                alert('Doctor deleted successfully');
                getDoctors();
            } catch (error) {
                console.log(error);
                alert('Unable to delete doctor');
            }
        }
    };

    return (
        <div className="doctors-container">

            <h1>Doctors Management</h1>
            <p>Manage hospital doctors</p>

            <div className="doctor-form-card">
                <h2>{editId ? 'Update Doctor' : 'Add New Doctor'}</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Doctor Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="experience"
                        placeholder="Experience"
                        value={form.experience}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="specialization"
                        value={form.specialization}
                        onChange={handleChange}
                        required>
                        <option value="">Select Specialization</option>
                        <option value="1">Cardiologist</option>
                        <option value="2">Neurologist</option>
                        <option value="3">Dermatologist</option>
                        <option value="4">Orthopedist</option>
                        <option value="5">Pediatrician</option>
                        <option value="6">Gynecologist</option>
                        <option value="7">Dentist</option>
                        <option value="8">Ophthalmologist</option>
                    </select>

                    

                    <button type="submit">
                        {editId ? 'Update Doctor' : 'Add Doctor'}
                  
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setEditId(null);
                                setForm({
                                    name: '',
                                    email: '',
                                    phone: '',
                                    experience: '',
                                    specialization: '',
                                    department: ''
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            <div className="doctor-table-card">
                <h2>Doctor Details</h2>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Experience</th>
                                <th>Specialization</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>{doctor.id}</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.phone}</td>
                                    <td>{doctor.experience}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(doctor)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(doctor.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {doctors.length === 0 && (
                                <tr>
                                    <td colSpan="8">No doctors found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Doctors;
