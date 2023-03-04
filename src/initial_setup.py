from flask import redirect
from app import app
import sys

try:
    app.config.from_object('settings')
except Exception as e:
    sys.stderr.write(str(e))
    app.config.from_object('default_settings')

app.jinja_env.globals['USE_CAPTCHA'] = app.config['USE_CAPTCHA']
