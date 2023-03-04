import sys
from flask import Flask, render_template, request, redirect
from cs50 import SQL

ip = ""
app = Flask(__name__)

# configure database
try:
    db = SQL("sqlite:///database.db")
except Exception as e:  # when testing
    sys.stderr.write(str(e))
    open("database_test.db", "w").close()
    db = SQL("sqlite:///database_test.db")


@app.route("/")
@app.route("/home")
def home_page():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
