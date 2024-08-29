import os
import psycopg2


def get_db_connection():
    connection = psycopg2.connect(
        host='localhost',
        database='jobs_db',
        user=os.environ['POSTGRES_USER'],
    )
    return connection
