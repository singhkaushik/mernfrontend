import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Create = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        project: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission

        try {
            const response = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // User created successfully
                const result = await response.json();
                console.log(result);
                window.alert("User created successfully!");
                // Optionally, you can clear the form after successful creation
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile: "",
                    project: "",
                });
            } else {
                // Error creating user
                console.error("Error creating user");
                window.alert("Error creating user. Please try again.");
            }
        } catch (error) {
            console.error(error);
            window.alert("Error creating user. Please try again.");
        }
    };

    return (
        <div className="create">
            <h1>Create Client</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fName" className="form-label">First Name:</label>
                    <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) =>
                            setFormData({ ...formData, first_name: e.target.value })
                        }
                        className="form-control"
                        name="first_name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="lName" className="form-label">Last Name:</label>
                    <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) =>
                            setFormData({ ...formData, last_name: e.target.value })
                        }
                        className="form-control"
                        name="last_name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email:</label>
                    <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-control"
                        name="email"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile No:</label>
                    <input
                        type="text"
                        value={formData.mobile}
                        onChange={(e) =>
                            setFormData({ ...formData, mobile: e.target.value })
                        }
                        className="form-control"
                        name="mobile"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="project" className="form-label">Project:</label>
                    <input
                        type="text"
                        value={formData.project}
                        onChange={(e) =>
                            setFormData({ ...formData, project: e.target.value })
                        }
                        className="form-control"
                        name="project"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Create Client</button>
            </form>
        </div>
    );
};

export default Create;
