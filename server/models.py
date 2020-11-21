from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref


db = SQLAlchemy()

follows = db.Table(
  "follows",
  db.Model.metadata,
  db.Column('follow_relations', db.Integer, primary_key=True),
  db.Column('following_id', db.Integer, db.ForeignKey("users.id")),  # noqa
  db.Column('followed_by_id', db.Integer, db.ForeignKey("users.id"))  # noqa
)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.Binary(100), nullable=False)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    zipcode = db.Column(db.String(20), nullable=False)
    about = db.Column(db.Text)
    profile_pic = db.Column(db.String)
    banner_pic = db.Column(db.String)

    tracks = db.relationship("Track", backref="user")

    def to_safe_object(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "zipcode": self.zipcode,
            "about": self.about,
            "profile_pic": self.profile_pic,
            "banner_pic": self.banner_pic,
        }

class Track(db.Model):
    __tablename__ = 'tracks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    trackname = db.Column(db.String(100), nullable=False)
    trackartist = db.Column(db.String(100), nullable=True)
    tracklocation = db.Column(db.String(200), nullable=False)
    tracktime = db.Column(db.String(7), nullable=True)
    trackrating = db.Column(db.String(10), nullable=True)
    trackgenre = db.Column(db.String(200), nullable=True)
    trackart = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
          "id": self.id,
          "user_id": self.user_id,
          "trackname": self.trackname,
          "trackartist": self.trackartist,
          "tracklocation": self.tracklocation,
          "tracktime": self.tracktime,
          "trackrating": self.trackrating,
          "trackgenre": self.trackgenre,
          "trackart": self.trackart,
        }



