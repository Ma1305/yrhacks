import sys
from datetime import timedelta
from flask import Flask, render_template, request, redirect, session, flash
from cs50 import SQL
from werkzeug.security import check_password_hash, generate_password_hash
from helpers import *
import logging

# set up the flask app
IP = ""
app = Flask(__name__)

# setup session info
SESSION_LIFESPAN = timedelta(days=3)

# setup logger
logging.basicConfig(filename='record.log', level=logging.DEBUG)

# configure database
db = SQL("sqlite:///database.db")


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
    if not request.form.get("login-studentnum") or not request.form.get("login-password"):
        flash("Student number and password can not be blank")
        return render_template("login.html")

    # get the user info from database
    rows = db.execute("SELECT * FROM users WHERE username=:student_number",
                      student_number=request.form.get("login-studentnum"))

    login_check = check_login(rows)
    if login_check == -1:
        flash("This account does not exist!")
        return render_template("login.html")
    if login_check == -2:
        flash("Wrong student number or password!")
        return render_template("login.html")
    if login_check == -3:
        flash("You are not verified yet!")
        return render_template("login.html")

    # user logged in

    # setup session information
    session["student-number"] = request.form.get("login-studentnum")

    app.logger(f"Student number #{session['student-number']} logged in, with IP {request.remote_addr}")

    # Redirect user to the next page
    next_url = request.form.get("next")
    if next_url and '//' not in next_url and ':' not in next_url:
        return redirect(next_url)

    # Redirect to home if no direction are given
    return redirect('/')


if __name__ == "__main__":
    app.run(debug=True, port=5000)
