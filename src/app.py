import sys
from datetime import timedelta
from flask import Flask, render_template, request, redirect, session, flash
from cs50 import SQL
import helpers

# set up the flask app
IP = ""
app = Flask(__name__)

SESSION_LIFESPAN = timedelta(days=3)

# configure database
try:
    db = SQL("sqlite:///database.db")
except Exception as e:  # when testing
    sys.stderr.write(str(e))
    open("database_test.db", "w").close()
    db = SQL("sqlite:///database_test.db")


@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()
    session.permanent = True
    session.permanent_life_time = SESSION_LIFESPAN

    if request.method == "GET":
        return render_template("login.html")

    # Reached using POST

    # Ensure all fields are filled
    if not request.form.get("student-number") or not request.form.get("password"):
        flash("Student number and password can not be blank")
        return render_template("login.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
