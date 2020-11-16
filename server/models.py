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



