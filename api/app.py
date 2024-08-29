# app.py

# Import the 'Flask' class from the 'flask' library.
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import psycopg2
import psycopg2
import psycopg2.extras
from flask_cors import CORS
import jwt
import bcrypt

load_dotenv()


def get_db_connection():
    connection = psycopg2.connect(
        host='localhost',
        database='jobs_db',
        user=os.environ['POSTGRES_USER'],
    )
    return connection


# Initialize Flask
# We'll use the pre-defined global '__name__' variable to tell Flask where it is.
app = Flask(__name__)

# Enable CORS
CORS(app)


@app.route('/sign-token', methods=['GET'])
def sign_token():
    # Mock user object added
    user = {
        "id": 1,
        "username": "test",
        "password": "test"
    }
    token = jwt.encode(user, os.getenv('JWT_SECRET'), algorithm="HS256")
    return jsonify({"token": token})


@app.route('/verify-token', methods=['POST'])
def verify_token():
    try:
        token = request.headers.get('Authorization').split(' ')[1]
        decoded_token = jwt.decode(token, os.getenv(
            'JWT_SECRET'), algorithms=["HS256"])
        return jsonify({"user": decoded_token})
    except Exception as error:
        return jsonify({"error": error.message})


@app.route('/auth/signup', methods=['POST'])
def signup():
    try:
        new_user_data = request.get_json()
        connection = get_db_connection()
        cursor = connection.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT * FROM users WHERE username = %s;",
                       (new_user_data["username"],))
        existing_user = cursor.fetchone()
        if existing_user:
            cursor.close()
            return jsonify({"error": "Username already taken"}), 400
        hashed_password = bcrypt.hashpw(
            bytes(new_user_data["password"], 'utf-8'), bcrypt.gensalt())
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s) RETURNING username",
                       (new_user_data["username"], hashed_password.decode('utf-8')))
        created_user = cursor.fetchone()
        connection.commit()
        connection.close()
        return jsonify(created_user), 201
    except Exception as error:
        return jsonify({"error": str(error)}), 401


@app.route('/jobs')
def jobs_index():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT * FROM jobs;")
        jobs = cursor.fetchall()
        connection.close()
        return jobs
    except:
        return "Application Error", 500

# Create a job


@app.route('/jobs', methods=['POST'])
def create_jobs():
    try:
        new_job = request.json
        connection = get_db_connection()
        cursor = connection.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("INSERT INTO jobs (title, company_name, job_location, type, salary, description) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *",
                       (new_job['title'], new_job['company_name'], new_job['job_location'], new_job['type'], new_job['salary'], new_job['description']))
        created_pet = cursor.fetchone()
        connection.commit()  # Commit changes to the database
        connection.close()
        return created_pet, 201
    except Exception as e:
        return str(e), 500

# Show a job by id


@app.route('/jobs/<job_id>', methods=['GET'])
def show_job(job_id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("SELECT * FROM jobs WHERE id = %s", (job_id,))
        job = cursor.fetchone()
        if job is None:
            connection.close()
            return "Job Not Found", 404
        connection.close()
        return job, 200
    except Exception as e:
        return str(e), 500

# Delete job by id


@app.route('/jobs/<job_id>', methods=['DELETE'])
def delete_job(job_id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("DELETE FROM jobs WHERE id = %s", (job_id,))
        connection.commit()
        cursor.close()
        return "Job deleted successfully", 204
    except Exception as e:
        return str(e), 500

# Update Route


@app.route('/jobs/<job_id>', methods=['PUT'])
def update_job(job_id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor)
        cursor.execute("UPDATE jobs SET title = %s, company_name = %s, job_location = %s, type = %s, salary = %s, description = %s WHERE id = %s RETURNING *",
                       (request.json['title'], request.json['company_name'], request.json['job_location'], request.json['type'], request.json['salary'], request.json['description'], job_id))
        updated_job = cursor.fetchone()
        if updated_job is None:
            return "Job Not Found", 404
        connection.commit()
        connection.close()
        return updated_job, 202
    except Exception as e:
        return str(e), 500


# Run our application, by default on port 5000
app.run()
