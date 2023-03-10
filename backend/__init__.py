"""localevents backend package initializer."""
import flask

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name

# Read settings from config module (backend/config.py)
app.config.from_object('backend.config')

import backend.api  # noqa: E402  pylint: disable=wrong-import-position
import backend.model