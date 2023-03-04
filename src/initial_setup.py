from flask import request, Flask
from flask_session import Session
from flask_mail import Mail
from helpers import *
import logging
import sys
import requests

# set up the flask app
IP = ""
app = Flask(__name__)

# Configure app config from settings
try:
    app.config.from_object('settings')
except Exception as e:
    sys.stderr.write(str(e))
    app.config.from_object('default_settings')

app.jinja_env.globals['USE_CAPTCHA'] = app.config['USE_CAPTCHA']

# Configure logging
LOG_HANDLER = logging.FileHandler(app.config['LOGGING_FILE_LOCATION'])
LOG_HANDLER.setFormatter(
    logging.Formatter(fmt="[BSCS] [{section}] [{levelname}] [{asctime}] {message}",
                      style='{'))
logger = logging.getLogger("BCSC")
logger.addHandler(LOG_HANDLER)
logger.propagate = False
for handler in logging.root.handlers[:]:
    logging.root.removeHandler(handler)
logging.basicConfig(
    filename=app.config['LOGGING_FILE_LOCATION'],
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s',
)
logging.getLogger().addHandler(logging.StreamHandler())


# Validate email
def validate_email(mail):
    with app.app_context():
        try:
            send_email('COURSUCCESS Email Setup', app.config['MAIL_DEFAULT_SENDER'],
                       [app.config['MAIL_DEFAULT_SENDER']],
                       'Confirmation that the website email system is working fine. You can ignore this email.', mail=mail)
        except Exception as error:
            # Problems with email
            logging.warning("Settings validation: Email credentials invalid.")
            logging.warning(str(error))
        else:
            # Email is valid
            logging.debug("Settings validation: Email credentials valid.")
