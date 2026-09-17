from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )


@app.route("/api/jobs", methods=["GET"])
def get_jobs():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM jobs ORDER BY created_at DESC")
    jobs = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(jobs)


@app.route("/api/jobs", methods=["POST"])
def add_job():
    data = request.get_json()

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO jobs (company, role, status, applied_date) VALUES (%s, %s, %s, %s)",
        (
            data["company"],
            data["role"],
            data["status"],
            data["applied_date"]
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Job added"}), 201


@app.route("/api/jobs/<int:id>", methods=["PUT"])
def update_job(id):
    data = request.get_json()

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE jobs SET status=%s WHERE id=%s",
        (data["status"], id)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Updated"})

@app.route("/api/jobs/<int:id>", methods=["DELETE"])
def delete_job(id):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM jobs WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Deleted"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)