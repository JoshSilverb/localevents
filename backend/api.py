import flask
import backend


@backend.app.route("/login", methods=["GET"])
def get_login_page():
    return flask.render_template('/signin.html')


@backend.app.route("/", methods=["GET"])
def get_map_page():
    return flask.render_template('/index.html')

