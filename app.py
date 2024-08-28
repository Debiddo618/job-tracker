# app.py

# Import the 'Flask' class from the 'flask' library.
from flask import Flask, request
from dotenv import load_dotenv
import os
import psycopg2
import psycopg2, psycopg2.extras


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

@app.route('/jobs')
def jobs_index():
  try:
    connection = get_db_connection()
    cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
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
    cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute("INSERT INTO jobs (title, company_name, job_location, type, salary, description) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *", 
                   (new_job['title'], new_job['company_name'], new_job['job_location'],new_job['type'], new_job['salary'],new_job['description']))
    created_pet = cursor.fetchone()
    connection.commit() # Commit changes to the database
    connection.close()
    return created_pet, 201
  except Exception as e:
     return str(e), 500





# Run our application, by default on port 5000
app.run()
