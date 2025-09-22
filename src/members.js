// functions/users.js
const { Pool } = require('pg');

// Initialize PostgreSQL client
const pool = new Pool({
    connectionString: psql`postgresql://neondb_owner:npg_pBtMnlrw4S0F@ep-wandering-grass-adh36lzk-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
    ssl: {
        rejectUnauthorized: false
    }
});

exports.handler = async (event, context) => {
    // Handle CORS preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
            },
            body: JSON.stringify({ message: 'CORS preflight successful' })
        };
    }

    // Set CORS headers for all responses
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    };

    try {
        // GET - Fetch all users
        if (event.httpMethod === 'GET') {
            const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result.rows)
            };
        }

        // POST - Create a new user
        if (event.httpMethod === 'POST') {
            const userData = JSON.parse(event.body);

            const result = await pool.query(
                `INSERT INTO users 
         (full_name, gender, marital_status, call_number, whatsapp_number, email, date_of_birth, occupation, gps_address, location, hometown, nationality, country_of_birth, holy_ghost_baptism, water_baptism, communicant, place_of_birth, membership_type, date_of_holy_ghost_baptism, date_of_water_baptism, officiating_minister, level_of_education, emergency_contact_name, emergency_contact_number) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24) 
         RETURNING *`,
                [
                    userData.fullName,
                    userData.gender,
                    userData.maritalStatus,
                    userData.callNumber,
                    userData.whatsappNumber,
                    userData.email,
                    userData.dateOfBirth,
                    userData.occupation,
                    userData.gpsAddress,
                    userData.location,
                    userData.hometown,
                    userData.nationality,
                    userData.countryOfBirth,
                    userData.holyGhostBaptism,
                    userData.waterBaptism,
                    userData.communicant,
                    userData.placeOfBirth,
                    userData.membershipType,
                    userData.dateOfHolyGhostBaptism,
                    userData.dateOfWaterBaptism,
                    userData.officiatingMinister,
                    userData.levelOfEducation,
                    userData.emergencyContactName,
                    userData.emergencyContactNumber
                ]
            );

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(result.rows[0])
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};