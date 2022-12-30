import flask
import backend
import random
import math
from backend.config import GOOGLE_API_KEY



@backend.app.route("/", methods=["GET"])
def show_index():
    context = {"API_KEY": GOOGLE_API_KEY}
    return flask.render_template('index.html', **context)


@backend.app.route("/accounts/login/", methods=["GET"])
def serve_login():
    """Show login page with error msg or redirect to index if logged in."""
    # Check if user is logged in (non-empty username in cookie)
    if 'username' in flask.session:
        if flask.session['username'] != "":
            return flask.redirect(flask.url_for("show_index"))
    return flask.render_template("signin.html", **{})


@backend.app.route("/accounts/", methods=['POST'])
def check_credentials():
    print(f"username: {flask.request.form['username']}, password: {flask.request.form['password']}")
    return flask.redirect(flask.url_for("show_index"))


@backend.app.route("/events/", methods=['GET'])
def serve_local_events_list():
    center_lat = float(flask.request.args['center_lat'])
    center_lng = float(flask.request.args['center_lng'])
    radius = float(flask.request.args['radius'])
    # make radius in terms of degrees to work with latitude and longitude
    lat_diff = (radius/1000.0)/110.574
    lat_min = center_lat - lat_diff
    lat_max = center_lat + lat_diff

    lng_diff = (radius/1000.0)/(111.320)
    lng_min = center_lng - lng_diff
    lng_max = center_lng + lng_diff

    num_events = 5

    # Connect to database
    cur = backend.model.get_db()

    # Get nearby events from the databse
    cur.execute(
        "SELECT * FROM events WHERE latitude>=%s AND latitude<=%s AND longitude>=%s AND longitude<=%s",
        (lat_min, lat_max, lng_min, lng_max)
    )
    raw_events = cur.fetchall()
    print(raw_events)
    print(len(raw_events))
    
    # change this to get from DB later
    events = []
    for event in raw_events:
        print(event)
        label = f"{event['eventname']}\nOrganized by: {event['owner']}"
        
        events.append({'lat': event['latitude'], 'lng': event['longitude'], 'label': label})
    print(len(events))
    
    payload = {'events': events}

    return flask.jsonify(**payload)