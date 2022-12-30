import flask
import psycopg2
import psycopg2.extras
import backend

def get_db():
    """Open a new database connection.
    Flask docs:
    https://flask.palletsprojects.com/en/1.0.x/appcontext/#storing-data
    """
    if "db_con" not in flask.g:
        flask.g.db_con = psycopg2.connect(
            host=backend.app.config['POSTGRESQL_DATABASE_HOST'],
            port=backend.app.config['POSTGRESQL_DATABASE_PORT'],
            user=backend.app.config['POSTGRESQL_DATABASE_USER'],
            password=backend.app.config['POSTGRESQL_DATABASE_PASSWORD'],
            database=backend.app.config['POSTGRESQL_DATABASE_DB'],
        )
        flask.g.db_cur = flask.g.db_con.cursor(
            cursor_factory=psycopg2.extras.RealDictCursor
        )
    return flask.g.db_cur


@backend.app.teardown_appcontext
def close_db(error):
    """Close the database at the end of a request.
    Flask docs:
    https://flask.palletsprojects.com/en/1.0.x/appcontext/#storing-data
    """
    assert error or not error  # Needed to avoid superfluous style error
    db_cur = flask.g.pop('db_cur', None)
    db_con = flask.g.pop('db_con', None)
    if db_con is not None:
        db_con.commit()
        db_cur.close()
        db_con.close()