import flask
import backend
import random
import math
import datetime
from backend.config import GOOGLE_API_KEY



@backend.app.route("/", methods=["GET"])
def show_index():
    context = {"API_KEY": GOOGLE_API_KEY}
    return flask.render_template('index.html', **context)


@backend.app.route("/list/", methods=["GET"])
def show_eventlist():

    cur = backend.model.get_db()
    cur.execute("SELECT * FROM events LIMIT 10",)
    raw_events = cur.fetchall()

    events = []
    for event in raw_events:
        events.append({'name': event['eventname'],
                       'owner': event['owner'],
                       'address': event['eventaddress'],
                       'time': event['eventtime'],
                       'id': event['eventid']})

    context = {'events': events}

    print(context)

    return flask.render_template('eventlist.html', **context)


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

    # num_events = 5

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
        label = f"{event['eventname']} -- {event['owner']}"
        
        events.append({'lat': event['latitude'], 'lng': event['longitude'], 'label': label})
    print(len(events))
    
    payload = {'events': events}

    return flask.jsonify(**payload)



@backend.app.route("/new/event/")
def serve_event_creation_screen():
    context = {"API_KEY": GOOGLE_API_KEY}
    return flask.render_template('create_event.html', **context)


@backend.app.route("/create/event/", methods=['POST'])
def create_event():
    print(flask.request.form)

    event = flask.request.form
    print(event)

    cur = backend.model.get_db()

    timestamp = datetime.datetime.now()

    cur.execute(
        "INSERT INTO events(owner, eventname, latitude, longitude, eventtime, eventaddress, eventdesc) \
        VALUES (%s, %s, %s, %s, %s, %s, %s);",
        ('joshsilv', event.get('eventname'), float(event.get('latitude')), float(event.get('longitude')), timestamp, event.get('eventaddress'), event.get('eventdesc'))
    )

    cur.execute("SELECT eventid FROM events WHERE owner=%s AND eventtime=%s", ('joshsilv', timestamp))
    eventid = cur.fetchall()[0]['eventid']

    return flask.redirect(f"/event/{eventid}/")


@backend.app.route("/event/<eventid>/")
def serve_event_page(eventid):
    print(eventid)
    
    cur = backend.model.get_db()
    cur.execute(
        "SELECT * FROM events WHERE eventid=%s", (eventid,)
    )

    rawevents = cur.fetchall()

    if not rawevents:
        flask.render_template('404.html')

    eventinfo = rawevents[0]
    print(eventinfo)

    context = {
        "API_KEY": GOOGLE_API_KEY,
        'eventowner': eventinfo.get('owner'),
        'eventname': eventinfo.get('eventname'),
        'latitude': eventinfo.get('latitude'),
        'longitude': eventinfo.get('longitude'),
        'timestamp': eventinfo.get('eventtime'),
        'description': eventinfo.get('eventdesc') if eventinfo.get('eventdesc') else "",
        'address': eventinfo.get('eventaddress'),
        'eventid': eventinfo.get('eventid'),
    }

    print(context)

    return flask.render_template('eventpage.html', **context)