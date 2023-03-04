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
import json

# website name
WEB_NAME = "COURSUCCESS"

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


# pass variables to all templates
@app.context_processor
def inject_user():
    return dict(WEB_NAME=WEB_NAME)


@app.route("/")
@app.route("/home")
def home():
    if session.get('student_number'):
        return render_template("userhome.html")
    return render_template("home.html")


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
    rows = db.execute("SELECT * FROM users WHERE student_number=:student_number",
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
    session["student_number"] = request.form.get("login-studentnum")
    session["first-name"] = rows[0]["first_name"]
    session["last-name"] = rows[0]["last_name"]

    app.logger.info(f"Student number #{session['student_number']} logged in, with IP {request.remote_addr}")

    # Redirect user to the next page
    next_url = request.form.get("next")
    if next_url and '//' not in next_url and ':' not in next_url:
        return redirect(next_url)

    # Redirect to home if no direction are given
    return redirect('/home')


@app.route("/signout")
def logout():
    session.clear()
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("auth/register.html")

    # Reached using POST

    student_number = request.form.get("register-studentnum")
    password = request.form.get("register-password")
    name = request.form.get("register-firstname")
    lastname = request.form.get("register-lastname")
    confirmation = request.form.get("register-password-confirmation")  # replace name
    print(f"register attempt with:\nname:{name}, last name:{lastname}, student number: {student_number}, "
          f"password: {password}, confirmation pass: {confirmation}")

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
    text = render_template('email/account_confirmation.html',
                           name=name, lastname=lastname, token=token, WEB_NAME=WEB_NAME)

    db.execute(("INSERT INTO users(student_number, password, first_name, last_name, verified) "
                "VALUES(:student_number, :password, :firstname, :lastname, :verified)"),
               student_number=student_number, password=generate_password_hash(password), firstname=name,
               lastname=lastname, verified=False)

    if not app.config['TESTING']:
        send_email('COURSUCCESS account confirmation',
                   app.config['MAIL_DEFAULT_SENDER'], [f"{student_number}@gapps.yrdsb.ca"], text, mail=mail)

    flash(('An account creation confirmation email has been sent to your gapps account. '
           'Be sure to check your spam folder!'))
    app.logger.info((f"User {name} ({lastname}) with student number #{student_number} has initiated a "
                     f"registration request, with IP {request.remote_addr}"))
    return render_template("auth/register.html")


@app.route("/confirmregister/<token>")
def confirm_register(token):
    try:
        token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    except Exception as e:
        sys.stderr.write(str(e))
        token = 0

    # invalid token
    if not token:
        flash("Email verification link invalid")
        return redirect("/register")

    # expired link
    if datetime.strptime(token["expiration"], "%Y-%m-%dT%H:%M:%S.%f") < datetime.utcnow():
        db.execute(
            "DELETE FROM users WHERE verified=0 and student_number=:student_number",
            student_number=email_to_student_number(token['email']))
        flash("Email verification link expired. Please register again using the same email.")
        return redirect("/register")

    # update the account to verified
    db.execute("UPDATE users SET verified=1 WHERE student_number=:student_number",
               student_number=email_to_student_number(token['email']))

    # Log user in
    user = db.execute(
        "SELECT * FROM users WHERE student_number=:student_number", student_number=token['email'].strip()
        .replace("@gapps.yrdsb.ca", " "))[0]

    session["student_number"] = user["student_number"]
    session["first-name"] = user["first_name"]
    session["last-name"] = user["last_name"]

    app.logger.info((f"Registration confirmation for student number #{session['student_number']} from "
                     f"IP {request.remote_addr}"))
    return redirect("/")


@app.route("/cancelregister/<token>")
def cancel_register(token):
    try:
        token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
    except Exception as e:
        sys.stderr.write(str(e))
        token = 0

    # invalid token
    if not token:
        flash("Email verification link invalid", "danger")
        return redirect("/register")

    # delete data from database
    db.execute(
        "DELETE FROM users WHERE verified=0 and student_number=:student_number",
        student_number=email_to_student_number(token['email']))

    flash("Your registration has been successfully removed from our database.")
    app.logger.info((f"Confirmation cancellation of student number {email_to_student_number(token['email'])} from "
                     f"IP {request.remote_addr}"))

    return redirect("/register")


@app.route("/teach_assist_login", methods=["GET", "POST"])
@login_required
def teach_assist_login():
    if request.method == "GET":
        # data["course"][]["course_name"] data["course_grade"] data["course_code"]
        return render_template("auth/teach_assist_login.html", name=["name", "random"])

    # Reached using POST


@app.route("/teach_assist_logout", methods=["POST"])
def teach_assist_logout():
    pass


@app.route("/course_selection", methods=["GET", "POST"])
@login_required
def course_selection():
    rows = db.execute("SELECT * FROM time_tables WHERE student_number=:student_number",
                      student_number=session["student_number"])

    courses = []
    # Check if there is a timetable
    if len(rows) > 0:
        courses = rows[0]["courses"].split(", ")

    else:
        [courses.append([]) for i in range(18)]
        num = -2
        for i in range(18):
            num += 1
            for j in range(4):
                # Normal courses
                if i < 10:
                    courses[i].append(f"Course {num}")
                elif i == 10 and j == 0:
                    courses.append([])
                    num = 0

                # Summer courses
                elif i < 13:
                    courses[i].append(f"Summer Course {num}")
                elif i == 13 and j == 0:
                    num = 0
                    courses.append([])

                # Night courses
                elif i < 16:
                    courses[i].append(f"Night Course {num}")
                elif i == 16 and j == 0:
                    courses.append([])
                    num = 0

                # Repertoire courses
                else:
                    courses[i].append(f"Repertoire Course {num}")

        courses_text = str(courses).replace("[", "").replace("]", "")
        db.execute(("INSERT INTO time_tables(student_number, courses) "
                    "VALUES(:student_number, :courses)"),
                   student_number=session['student_number'], courses=courses_text)

    logging.info(f"The following courses are begin passed to time table {str(courses)}")
    if request.method == "GET":
        return render_template("timetable.html", course=courses, range=range)

    logging.info(request.form)
    logging.info(request.data)

    # Reached using POST
    offset = 16
    i = 0
    courses = []
    courses += list(range(16))
    # getting day school
    for i in range(32):
        courses.append(request.form.get(str(i)))

    courses += list(range(8))
    offset += 8
    # getting summer school
    for i in range(i, i + 16):
        courses.append(request.form.get(str(i + offset)))

    courses += list(range(8))
    offset += 8
    # getting summer school
    for i in range(i, i + 16):
        courses.append(request.form.get(str(i + offset)))

    courses += list(range(8))
    offset += 8
    # getting night school
    for i in range(i, i + 16):
        courses.append(request.form.get(str(i + offset)))

    courses += list(range(8))
    offset += 8
    # getting repertoire school
    for i in range(i, i + 8):
        courses.append(request.form.get(str(i + offset)))

    # writing the updated courses into database
    courses_text = str(courses).replace("[", "").replace("]", "")
    app.logger.info(f"courses being added to the database, {courses_text}")
    db.execute("UPDATE time_tables SET courses=:courses WHERE student_number=:student_number", courses=courses_text,
               student_number=session["student_number"])

    flash("Your time table has been saved successfully!")
    return render_template("timetable.html", course=courses, range=range)


@app.route("/grades", methods=["GET", "POST"])
@login_required
@teach_assist_login_required
def grades():
    if request.method == "GET":
        return render_template("grades.html")

    # Reached using POST


@app.route("/about")
def about():
    return render_template("about.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
