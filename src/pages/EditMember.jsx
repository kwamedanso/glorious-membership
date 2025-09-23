import { useState, useEffect } from 'react';
import '../components/editmember.css';
import supabase from '../supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

const mydetails = {
    "id": "2",
    "membership_type": "Full Member",
    "fullname": "Kwame Amoafo Danso",
    "date_of_birth": "2025-09-21",
    "gender": "male",
    "calling": "Deacon",
    "marital_status": "Single",
    "call_number": 208001343,
    "whatsapp_number": 208001343,
    "email": "dansokwame96@gmail.com",
    "gps_address": "GA-132-3456",
    "location": "Mamprobi",
    "hometown": "Accra",
    "place_of_birth": "Accra",
    "country_of_birth": "Ghana",
    "nationality": "Ghanaian",
    "holy_ghost_baptism": "Yes",
    "date_of_holy_ghost_baptism": "2025-09-21",
    "water_baptism": "Yes",
    "date_of_water_baptism": "2025-09-21",
    "officiating_minister": "Ps. Opuni Boateng",
    "communicant": "Yes",
    "level_of_education": "Degree",
    "occupation": "Web Developer",
    "emergency_contact_name": "Kofi Addo Danso",
    "emergency_contact_number": 201230990
}


const EditMember = () => {
    // const [member, setMember] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [member, setMember] = useState({
        // Personal Bio-Data
        fullname: '',
        gender: '',
        maritalStatus: '',
        dateOfBirth: '',
        placeOfBirth: '',

        // Contact Information
        callNumber: '',
        whatsappNumber: '',
        email: '',
        gpsAddress: '',
        location: '',

        // Origin & Nationality
        hometown: '',
        nationality: '',
        countryOfBirth: '',

        // Spiritual Information
        holyGhostBaptism: '',
        dateOfHolyGhostBaptism: '',
        waterBaptism: '',
        dateOfWaterBaptism: '',
        officiatingMinister: '',
        communicant: '',

        // Education & Occupation
        levelOfEducation: '',
        occupation: '',

        // Emergency Contact
        emergencyContactName: '',
        emergencyContactNumber: '',

        // Membership Information
        membershipType: '',
    });

    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

    const navigate = useNavigate();
    const location = useLocation();
    const uniqueId = location?.state?.uniqueId;
    // Fetch data from Supabase
    const fetchMember = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('members')
                .select('*')
                .eq('id', uniqueId) // filter by id (or another unique field)
                .single();    // ensures only one item is returned

            if (error) throw error;
            setMember({ ...data });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMember();
    }, [])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setMember(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        let newMember = { ...member };
        delete newMember.id


        try {
            const { data, error } = await supabase
                .from("members")
                .update(newMember)
                .eq("id", uniqueId)
                .select();

            if (error) {
                throw error;
            } else {
                alert("Member updated successfully!");
                navigate("/id", { state: { member: data[0] } })
            }


        } catch (err) {
            console.error("Supabase update error:", err.message);
            alert("Failed to update member");
        }
    };


    return (
        <div className="form-container">
            <h1>Glorious (English) Assembly - Member Registration Form</h1>
            <form onSubmit={handleSubmit} className="user-form">

                {/* Personal Bio-Data Section */}
                <fieldset>
                    <legend>Personal Bio-Data</legend>
                    <div className="form-group">
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
                    </div>

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
                                <option value="male">Male</option>
                                <option value="female">Female</option>
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
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="separated">Separated</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
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
                                placeholder='Ghana'
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
                            checked={member.communicant}
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
                            <option value="primary">Basic/Primary School</option>
                            <option value="secondary">Secondary School</option>
                            <option value="diploma">Diploma</option>
                            <option value="bachelor">Bachelor's Degree</option>
                            <option value="master">Master's Degree</option>
                            <option value="phd">PhD</option>
                            <option value="other">Other</option>
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
                            placeholder="e.g. Teacher, Engineer, Nurse"
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
                            <option value="full">Full Member</option>
                            <option value="visitor">Visitor</option>
                            <option value="newConvert">New Convert</option>
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

export default EditMember;