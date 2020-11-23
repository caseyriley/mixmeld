from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from .models import db, Track
# from .models import db, Tweet
import requests
import json
from flask_jwt_extended  import jwt_required

from flask_cors import CORS

from server.models import db, Track

tracks = Blueprint('tracks', __name__)

@tracks.route('/post', methods=["POST"])
def post_track():

    data = json.loads(request.data)
    track = Track(
        user_id=data["user_id"],
        trackname=data["trackname"],
        tracklocation=data["tracklocation"]
    )
    db.session.add(track)
    db.session.commit()
    return jsonify(Goodjob='you posted to db')


@tracks.route('/artist_name', methods=["POST"])
def update_track_artist_name():

    data = json.loads(request.data)
    
    track_id = data["id"]
    new_artist_name = data["name"]
  
    track = Track.query.filter(Track.id == track_id).first()
    print('parameters@@@@@@@@@@@@@@@', track)
    track.trackartist = new_artist_name
    db.session.commit()
    print('eeeeeeeedddddiiiiitt aaaarttttiiiiist nnnnnaaaaaammmeeeee')
    return jsonify(Good='you changed the track name%%%%%%%%%%%%%%%%%%%%%%%%%%%')


@tracks.route("/user/<id>", methods=["GET"])
def get_user_tracks(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)

    return jsonify(tracks)



