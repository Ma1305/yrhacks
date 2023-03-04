from flask import Flask, render_template, request, redirect

ip = ""
app = Flask(__name__)


@app.route("/")
@app.route("/home")
def home_page():
    render_template("")


if __name__ == "__main__":
    app.run(debug=True, port=5000)
