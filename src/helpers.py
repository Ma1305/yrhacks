from flask import redirect, session, request, flash
from flask_mail import Message
from functools import wraps
from datetime import datetime, timedelta
import re
import jwt
from werkzeug.security import check_password_hash


def login_required(f):
    """
        Decorate routes to require login.

        http://flask.pocoo.org/docs/1.0/patterns/viewdecorators/
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("student_number") is None:
            return redirect("/login?next=" + request.path)
        return f(*args, **kwargs)

    return decorated_function


def teach_assist_login_required(f):
    pass


# three possible codes: 1 good, -1 no exist, -2 wrong password, -3 not verified
def check_login(rows):
    # check if user exists
    if len(rows) == 0:
        return -1
    # check for correct password
    if not check_password_hash(rows[0]["password"], request.form.get("login-password")):
        return -2
    # check if user is verified
    if not rows[0]["verified"]:
        return -3

    # if everything is fine
    return 1


def verify_text(text):
    """
    Check if text only contains A-Z, a-z, 0-9, underscores, and dashes
    """
    return bool(re.match(r'^[\w\-]+$', text))


def send_email(subject, sender, recipients, text, bcc=None, mail=None):
    if not mail:
        from app import mail
    message = Message(subject, sender=sender, recipients=recipients, html=text, bcc=bcc)
    mail.send(message)
    print("sent email")


def create_jwt(data, secret_key, time=1800):
    """
    Creates a JWT token containing data and encrypted using secret_key
    """
    data['expiration'] = (datetime.utcnow() + timedelta(seconds=time)).isoformat()
    return jwt.encode(data, secret_key, algorithm='HS256')


# if password does not exist returns -1
def get_email_pass():
    with open("private_data/email_password.txt") as file:
        password = file.readline()
    if not password:
        return -1
    return password


def email_to_student_number(email):
    return email.strip().replace("@gapps.yrdsb.ca", " ")


# testing the functions
if __name__ == "__main__":
    # get_email_password test
    print(get_email_pass())
