import time

from flask.cli import AppGroup
from flask_migrate import stamp
from sqlalchemy.exc import DatabaseError

manager = AppGroup(help="Manage the database (create/drop tables).")


def _wait_for_db_connection(db):
    retried = False
    while not retried:
        try:
            db.engine.execute('SELECT 1;')
            return
        except DatabaseError:
            time.sleep(30)

        retried = True


@manager.command()
def create_tables():
    """Create the database tables."""
    from redash.models import db

    _wait_for_db_connection(db)
    db.create_all()

    # Need to mark current DB as up to date
    stamp()


@manager.command()
def drop_tables():
    """Drop the database tables."""
    from redash.models import db

    _wait_for_db_connection(db)
    db.drop_all()
