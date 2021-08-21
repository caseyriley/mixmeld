from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import bcrypt
from .models import db, User, Track

auth = Blueprint('auth', __name__)


def set_password(password):
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password


def verify_password(password, hashed_password):
    if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return True
    else:
        return False


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        email = data['email']
        password = data['password']

        if not email:
            return jsonify(message='Email Required'), 400
        elif not password:
            return jsonify(message='Password Required'), 400

        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify(message='Email Required'), 400

        verified = verify_password(password, user.hashed_password)

        if not verified:
            return jsonify(message='Password verify failed')
        else:
            auth_token = create_access_token(
                identity={"email": user.email}, fresh=True)
        return jsonify(auth_token=auth_token)

    except Exception as e:
        print(e)
        return jsonify(message='Login Failed')


@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    try:
        username = data['username']
        email = data['email']
        firstname = data['firstname']
        lastname = data['lastname']
        zipcode = int(data['zipcode'])

        if not username:
            return jsonify(message="Username Required"), 400
        elif not email:
            return jsonify(message='Email Required'), 400
        elif not firstname:
            return jsonify(message='First Name Required'), 400
        elif not lastname:
            return jsonify(message='Last Name Required'), 400
        elif not zipcode:
            return jsonify(message='Zipcode Required'), 400

        try:
            hashed_password = set_password(data['password'])

        except Exception:
            return jsonify(message='Password Required'), 400

        user = User(
            username=username,
            email=email,
            hashed_password=hashed_password,
            firstname=firstname,
            lastname=lastname,
            zipcode=zipcode,
        )

        db.session.add(user)
        db.session.commit()

        m_user_id = '2'
        m_trackname = '3121'
        m_trackartist = 'Prince'
        m_trackalbum = '3121'
        m_tracklocation = 'https://formless.s3.amazonaws.com/01 3121.mp3'
        m_tracktime = '04:31'
        m_trackrating = ''
        m_trackgenre = 'Pop'
        m_trackart = 'https://formless.s3.amazonaws.com/220px-Prince_-_3121.jpg'

        current_user = User.query.filter(User.email == email).first()

        first_track = Track(
            user_id=current_user.id,
            trackname=m_trackname,
            trackartist=m_trackartist,
            trackalbum=m_trackalbum,
            tracklocation=m_tracklocation,
            tracktime=m_tracktime,
            trackrating=m_trackrating,
            trackgenre=m_trackgenre,
            trackart=m_trackart,
        )

        db.session.add(first_track)
        db.session.commit()

        auth_token = create_access_token(
            identity={"email": user.email}, fresh=True)
        return jsonify(auth_token=auth_token), 200

    except Exception:
        return jsonify(message="try failed"), 409
