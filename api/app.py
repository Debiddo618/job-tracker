# app.py

# Import the 'Flask' class from the 'flask' library.
from flask import Flask, request, jsonify, g
from dotenv import load_dotenv
from flask_cors import CORS
from auth_blueprint import authentication_blueprint
from jobs_blueprint import jobs_blueprint


load_dotenv()

# Initialize Flask
# We'll use the pre-defined global '__name__' variable to tell Flask where it is.
app = Flask(__name__)

# Enable CORS
CORS(app)

# register the blueprints in the flask application
app.register_blueprint(authentication_blueprint)
app.register_blueprint(jobs_blueprint)

# Run our application, by default on port 5000
app.run()
