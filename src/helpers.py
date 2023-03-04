from flask import redirect, session, request, flash
from functools import wraps


def login_required(f):
    """
        Decorate routes to require login.

        http://flask.pocoo.org/docs/1.0/patterns/viewdecorators/
        """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("student-number") is None:
            return redirect("/login?next=" + request.path)
        return f(*args, **kwargs)

    return decorated_function


# three possible codes: 1 good, -1 no exist, -2 wrong password, -3 not verified
def check_login(rows):
    # check if user exists
    if len(rows) < 0:
        return -1
    # check for correct password
    if rows[0]["password"] != request.form.get("login-password"):
        return -2
    # check if user is verified
    if not rows[0]["verified"]:
        return -3

    # if everything is fine
    return 1
