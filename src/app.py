import sys
from datetime import timedelta
from flask import Flask, render_template, request, redirect, session, flash
from flask_mail import Mail
from flask_session import Session
from cs50 import SQL
from werkzeug.security import check_password_hash, generate_password_hash
from helpers import *
import logging
from initial_setup import app, validate_email

# setup session info
SESSION_LIFESPAN = timedelta(days=3)

# setup logger, it reads from setting, incase it does not work uncomment this line
# logging.basicConfig(filename='record.log', level=logging.DEBUG)

# configure database
db = SQL("sqlite:///database.db")

# Configure flask-session
Session(app)

# setup mail
mail = Mail(app)

validate_email(mail)


@app.route("/")
@app.route("/home")
def home():
    return render_template("portal.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()
    session.permanent = True
    session.permanent_life_time = SESSION_LIFESPAN

    if request.method == "GET":
        return render_template("auth/login.html")

    # Reached using POST

    # Ensure all fields are filled
    if not request.form.get("login-studentnum") or not request.form.get("login-password"):
        flash("Student number and password can not be blank")
        return render_template("auth/login.html")

    # get the user info from database
    rows = db.execute("SELECT * FROM users WHERE username=:student_number",
                      student_number=request.form.get("login-studentnum"))

    login_check = check_login(rows)
    if login_check == -1:
        flash("This account does not exist!")
        return render_template("auth/login.html")
    if login_check == -2:
        flash("Wrong student number or password!")
        return render_template("auth/login.html")
    if login_check == -3:
        flash("You are not verified yet!")
        return render_template("auth/login.html")

    # user logged in

    # setup session information
    session["student-number"] = request.form.get("login-studentnum")

    app.logger.info(f"Student number #{session['student-number']} logged in, with IP {request.remote_addr}")

    # Redirect user to the next page
    next_url = request.form.get("next")
    if next_url and '//' not in next_url and ':' not in next_url:
        return redirect(next_url)

    # Redirect to home if no direction are given
    return redirect('/')


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("auth/register.html")

    # Reached using POST

    student_number = request.form.get("register-studentnum")
    password = request.form.get("register-password")
    name = request.form.get("register-name")
    lastname = request.form.get("register-lastname")
    confirmation = request.form.get("register-password-confirmation")  # replace name

    # Ensure username is valid
    if not student_number or not verify_text(student_number):
        flash('Invalid username', 'danger')
        return render_template("auth/register.html",
                               site_key=app.config['HCAPTCHA_SITE']), 400

    # Ensure password is not blank
    if not password or len(password) < 8:
        flash('Password must be at least 8 characters', 'danger')
        return render_template("auth/register.html",
                               site_key=app.config['HCAPTCHA_SITE']), 400
    # Ensure password is the same as confirmation password
    if not confirmation or password != confirmation:
        flash('Passwords do not match', 'danger')
        return render_template("auth/register.html"), 400

    # Ensure student number does not already exist
    rows = db.execute("SELECT * FROM users WHERE student_number=:student_number", student_number=student_number)
    if len(rows) > 0:
        flash("This student number is already in the system")
        return render_template("auth/register.html"), 409

    # sending the email
    token = create_jwt({'email': f"{student_number}@gapps.yrdsb.ca"}, app.config['SECRET_KEY'])
    text = render_template('email/confirm_account.html',
                           name=name, lastname=lastname, token=token)

    db.execute(("INSERT INTO users(student_number, password, first_name, last_name) "
                "VALUES(:student_number, :password, :firstname, :lastname"),
               student_number=student_number, password=generate_password_hash(password), firstname=name, lastname=lastname)

    if not app.config['TESTING']:
        send_email('COURSUCCESS account confirmation',
                   app.config['MAIL_DEFAULT_SENDER'], [f"{student_number}@gapps.yrdsb.ca"], text)

    flash(('An account creation confirmation email has been sent to your gapps account. '
           'Be sure to check your spam folder!'))
    app.logger.info((f"User {name} ({lastname}) with student number #{student_number} has initiated a "
                     f"registration request, with IP {request.remote_addr}"))
    return render_template("auth/register.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
