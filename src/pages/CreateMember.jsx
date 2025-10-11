import { useState, useEffect } from 'react';
import '../components/editmember.css';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo_cop.png"


const CreateMember = () => {
    const [uniqueId, setUniqueId] = useState("")
    const [member, setMember] = useState({
        id: "",
        // Personal Bio-Data
        fullname: '',
        first_name: '',
        other_names: '',
        surname: '',
        gender: '',
        calling: '',
        marital_status: '',
        date_of_birth: '',
        place_of_birth: '',

        // Contact Information
        call_number: '',
        whatsapp_number: '',
        email: '',
        gps_address: '',
        location: '',

        // Origin & Nationality
        hometown: '',
        nationality: '',
        country_of_birth: '',

        // Spiritual Information
        holy_ghost_baptism: '',
        date_of_holy_ghost_baptism: '',
        water_baptism: '',
        date_of_water_baptism: '',
        officiating_minister: '',
        communicant: '',

        // Education & Occupation
        level_of_education: '',
        occupation: '',

        // Emergency Contact
        emergency_contact_name: '',
        emergency_contact_number: '',

        // Membership Information
        membership_type: '',
    });


    const navigate = useNavigate();


    let sampleID = member.first_name.slice(0, 1) + member.surname + Math.floor(Math.random() * 999)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMember(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked === true ? 'Yes' : 'No' : value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        let newMember = { ...member };
        delete newMember.id

        setUniqueId(sampleID)
        console.log(uniqueId)

        // try {
        //     const { data, error } = await supabase
        //         .from("members")
        //         .insert(newMember)
        //         .select();

        //     if (error) {
        //         throw error;
        //     } else {
        //         alert("Member updated successfully!");
        //         navigate("/id", { state: { member: data[0] } })
        //     }


        // } catch (err) {
        //     console.error("Supabase update error:", err.message);
        //     alert("Failed to update member");
        // }
    };


    return (
        <div className="form-container">
            <div style={{ display: "flex", alignItems: "", justifyContent: "center" }}>
                <div><img src={logo} alt="COP_logo" style={{ width: "50px", height: "50px" }} /></div>
                <h1>Glorious (English) Assembly</h1>

            </div>
            <h1>Membership Data Update</h1>
            <form onSubmit={handleSubmit} className="user-form">

                {/* Personal Bio-Data Section */}
                <fieldset>
                    <legend>Personal Bio-Data</legend>
                    <div className='form-row'>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text"
                                id="firstName"
                                name="first_name"
                                placeholder='Enter first name...'
                                value={member.first_name || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="otherNames">Other Names</label>
                            <input
                                type="text"
                                id="otherNames"
                                name="other_names"
                                placeholder='Enter other names...'
                                value={member.other_names || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname *</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder='Enter surname...'
                                value={member.surname || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="fullName">Full Name *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullname"
                            placeholder='Enter your fullname...'
                            value={member.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div> */}

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="gender">Gender *</label>
                            <select
                                id="gender"
                                name="gender"
                                value={member.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="calling">Calling</label>
                            <select
                                id="calling"
                                name="calling"
                                value={member.calling}
                                onChange={handleChange}
                            >
                                <option value="">Select Calling</option>
                                <option value="Brother">Brother</option>
                                <option value="Sister">Sister</option>
                                <option value="Elder">Elder</option>
                                <option value="Deacon">Deacon</option>
                                <option value="Deaconess">Deaconess</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="maritalStatus">Marital Status</label>
                            <select
                                id="maritalStatus"
                                name="marital_status"
                                value={member.marital_status}
                                onChange={handleChange}
                            >
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Separated">Separated</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="date_of_birth"
                                value={member.date_of_birth}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="placeOfBirth">Place of Birth</label>
                            <input
                                type="text"
                                id="placeOfBirth"
                                name="place_of_birth"
                                placeholder='Enter your place of birth...'
                                value={member.place_of_birth}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Contact Information Section */}
                <fieldset>
                    <legend>Contact Information</legend>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder='Enter your email address...'
                            value={member.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="callNumber">Call Number *</label>
                            <input
                                type="tel"
                                id="callNumber"
                                name="call_number"
                                placeholder='e.g. 0201229009'
                                value={member.call_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="whatsappNumber">WhatsApp Number</label>
                            <input
                                type="tel"
                                id="whatsappNumber"
                                name="whatsapp_number"
                                placeholder='e.g. 0201229009'
                                value={member.whatsapp_number}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gpsAddress">GPS Address</label>
                        <input
                            type="text"
                            id="gpsAddress"
                            name="gps_address"
                            value={member.gps_address}
                            onChange={handleChange}
                            placeholder="e.g. AX-1234-5678"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location (Residential Area)</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={member.location}
                            onChange={handleChange}
                            placeholder='e.g. Mango down'
                        />
                    </div>
                </fieldset>

                {/* Origin & Nationality Section */}
                <fieldset>
                    <legend>Origin & Nationality</legend>
                    <div className="form-group">
                        <label htmlFor="hometown">Hometown</label>
                        <input
                            type="text"
                            id="hometown"
                            name="hometown"
                            value={member.hometown}
                            onChange={handleChange}
                            placeholder='e.g. Salt Pond'
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nationality">Nationality</label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                value={member.nationality}
                                onChange={handleChange}
                                placeholder='e.g. Ghanaian'
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="countryOfBirth">Country of Birth</label>
                            <input
                                type="text"
                                id="countryOfBirth"
                                name="country_of_birth"
                                value={member.country_of_birth}
                                onChange={handleChange}
                                placeholder='e.g. Ghana'
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Spiritual Information Section */}
                <fieldset>
                    <legend>Spiritual Information</legend>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="holyGhostBaptism">Holy Ghost Baptism</label>
                            <select
                                id="holyGhostBaptism"
                                name="holy_ghost_baptism"
                                value={member.holy_ghost_baptism}
                                onChange={handleChange}
                            >
                                <option value="">Select Option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateOfHolyGhostBaptism">Date of Holy Ghost Baptism</label>
                            <input
                                type="date"
                                id="dateOfHolyGhostBaptism"
                                name="date_of_holy_ghost_baptism"
                                value={member.date_of_holy_ghost_baptism}
                                onChange={handleChange}
                                disabled={member.holy_ghost_baptism !== 'Yes'}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="waterBaptism">Water Baptism</label>
                            <select
                                id="waterBaptism"
                                name="water_baptism"
                                value={member.water_baptism}
                                onChange={handleChange}
                            >
                                <option value="">Select Option</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="dateOfWaterBaptism">Date of Water Baptism</label>
                            <input
                                type="date"
                                id="dateOfWaterBaptism"
                                name="date_of_water_baptism"
                                value={member.date_of_water_baptism}
                                onChange={handleChange}
                                disabled={member.water_baptism !== 'Yes'}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="officiatingMinister">Officiating Minister</label>
                        <input
                            type="text"
                            id="officiatingMinister"
                            name="officiating_minister"
                            value={member.officiating_minister}
                            onChange={handleChange}
                            placeholder='e.g. Ps. Ben Noye'
                        />
                    </div>

                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="communicant"
                            name="communicant"
                            checked={member.communicant == 'Yes' ? true : false}
                            onChange={handleChange}
                        />
                        <label htmlFor="communicant">Communicant Member</label>
                    </div>
                </fieldset>

                {/* Education & Occupation Section */}
                <fieldset>
                    <legend>Education & Occupation</legend>
                    <div className="form-group">
                        <label htmlFor="levelOfEducation">Level of Education</label>
                        <select
                            id="levelOfEducation"
                            name="level_of_education"
                            value={member.level_of_education}
                            onChange={handleChange}
                        >
                            <option value="">Select Education Level</option>
                            <option value="Primary">Basic/Primary School</option>
                            <option value="Secondary">Secondary School</option>
                            <option value="Tech/Voc">Technical/Vocational Training</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor">Bachelor's Degree</option>
                            <option value="Master">Master's Degree</option>
                            <option value="PhD">PhD</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="occupation">Occupation</label>
                        <input
                            type="text"
                            id="occupation"
                            name="occupation"
                            value={member.occupation}
                            onChange={handleChange}
                            placeholder="e.g. Teacher, Engineer, Nurse..."
                        />
                    </div>
                </fieldset>

                {/* Emergency Contact Section */}
                <fieldset>
                    <legend>Emergency Contact</legend>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="emergencyContactName">Emergency Contact Name</label>
                            <input
                                type="text"
                                id="emergencyContactName"
                                name="emergency_contact_name"
                                value={member.emergency_contact_name}
                                onChange={handleChange}
                                placeholder='Emergency contact name...'
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="emergencyContactNumber">Emergency Contact Number</label>
                            <input
                                type="tel"
                                id="emergencyContactNumber"
                                name="emergency_contact_number"
                                value={member.emergency_contact_number}
                                onChange={handleChange}
                                placeholder='Emergency contact number...'
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Membership Information Section */}
                <fieldset>
                    <legend>Membership Information</legend>
                    <div className="form-group">
                        <label htmlFor="membershipType">Membership Type</label>
                        <select
                            id="membershipType"
                            name="membership_type"
                            value={member.membership_type}
                            onChange={handleChange}
                        >
                            <option value="">Select Membership Type</option>
                            <option value="Full Member">Full Member</option>
                            <option value="Visitor">Visitor</option>
                            <option value="New Convert">New Convert</option>
                        </select>
                    </div>
                </fieldset>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">Submit Form</button>
                    {/* <button type="button" className="cancel-btn">Cancel</button> */}
                </div>
            </form>
        </div>
    );
};

export default CreateMember;