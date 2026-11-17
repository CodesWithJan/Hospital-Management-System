
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Department.css';

function Department() {

    const API_URL = 'http://127.0.0.1:8000/Department/';

    const [departments, setDepartments] = useState([]);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        department_name: '',
        descriptions: ''
    });

    // Read Departments
    const getDepartments = async () => {
        try {
            const response = await axios.get(API_URL + 'Read/');
            setDepartments(response.data);
        } catch (error) {
            console.log('Read Error:', error.response?.data || error);
            alert('Unable to load departments');
        }
    };

    useEffect(() => {
        getDepartments();
    }, []);

    // Handle Input Changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Add and Update Department
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editId !== null) {

                await axios.put(
                    API_URL + `Update/${editId}/`,
                    form
                );

                alert('Department updated successfully');

            } else {

                await axios.post(
                    API_URL + 'Create/',
                    form
                );

                alert('Department added successfully');
            }

            setForm({
                department_name: '',
                descriptions: ''
            });

            setEditId(null);

            getDepartments();

        } catch (error) {

            console.log(
                'Backend Error:',
                error.response?.data || error
            );

            alert(
                JSON.stringify(
                    error.response?.data || error.message
                )
            );
        }
    };

    // Edit Department
    const handleEdit = (department) => {

        setEditId(department.id);

        setForm({
            department_name: department.department_name,
            descriptions: department.descriptions
        });

    };

    // Cancel Edit
    const handleCancel = () => {

        setEditId(null);

        setForm({
            department_name: '',
            descriptions: ''
        });

    };

    // Delete Department
    const handleDelete = async (id) => {

        if (window.confirm('Are you sure you want to delete this department?')) {

            try {

                await axios.delete(
                    API_URL + `Delete/${id}/`
                );

                alert('Department deleted successfully');

                getDepartments();

            } catch (error) {

                console.log(
                    'Delete Error:',
                    error.response?.data || error
                );

                alert('Unable to delete department');
            }
        }
    };

    return (

        <div className="department-container">

            <h1>Departments Management</h1>

            <p>Manage hospital departments</p>

            {/* Department Form */}

            <div className="department-form-card">

                <h2>
                    {editId !== null
                        ? 'Update Department'
                        : 'Add New Department'}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="department_name"
                        placeholder="Enter Department Name"
                        value={form.department_name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="descriptions"
                        placeholder="Department Description"
                        value={form.descriptions}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        {editId !== null
                            ? 'Update Department'
                            : 'Add Department'}

                    </button>

                    {editId !== null && (

                        <button
                            type="button"
                            className="department-cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                    )}

                </form>

            </div>

            {/* Department Table */}

            <div className="department-table-card">

                <h2>Department Details</h2>

                <div className="department-table-scroll">

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Department Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {departments.map((department) => (

                                <tr key={department.id}>

                                    <td>{department.id}</td>

                                    <td>
                                        {department.department_name}
                                    </td>

                                    <td>
                                        {department.descriptions}
                                    </td>

                                    <td>

                                        <button
                                            className="department-edit-btn"
                                            onClick={() => handleEdit(department)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="department-delete-btn"
                                            onClick={() => handleDelete(department.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                            {departments.length === 0 && (

                                <tr>
                                    <td colSpan="4">
                                        No departments found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Department;
