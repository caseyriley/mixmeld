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
        tracklocation=data["tracklocation"],
        tracktime=data["tracktime"],
        trackartist="",
        trackgenre="",
        trackrating="",
        trackart=""

    )
    db.session.add(track)
    db.session.commit()
    return jsonify(Goodjob='you posted to db')


@tracks.route('/track_rating', methods=["POST"])
def update_track_rating():

    data = json.loads(request.data)
    
    track_id = data["id"]
    rating = data["rating"]
  
    track = Track.query.filter(Track.id == track_id).first()
    track.trackrating = rating
    db.session.commit()
    return jsonify(Good='you changed the track rating')


@tracks.route('/delete', methods=['DELETE'])
def delete_track():

    data = json.loads(request.data)
    track_id = data["id"]

    track = Track.query.filter(Track.id == track_id).first()
    db.session.delete(track)
    db.session.commit()
    return jsonify(Good='you deleted a track')


    

@tracks.route('/track_name', methods=["POST"])
def update_track_name():

    data = json.loads(request.data)
    track_id = data["id"]
    new_name = data["rating"]
    track = Track.query.filter(Track.id == track_id).first()
    track.trackname = new_name
    db.session.commit()
    return jsonify(Good='you changed the track rating')


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


@tracks.route('/genre', methods=["POST"])
def update_track_genre():

    data = json.loads(request.data)
    
    track_id = data["id"]
    genre = data["genre"]
  
    track = Track.query.filter(Track.id == track_id).first()
    track.trackgenre = genre
    db.session.commit()
    return jsonify(Good='you changed the genre')


@tracks.route("/user/trackartist/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackartist(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackartist"].lower()))


@tracks.route("/user/trackrating/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackrating(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackrating"].lower()))


@tracks.route("/user/trackname/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackname(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackname"].lower()))


@tracks.route("/user/trackgenre/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackgenre(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackgenre"].lower()))



@tracks.route("/user/tracktime/<id>", methods=["GET"])
def get_user_tracks_sort_by_tracktime(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["tracktime"].lower()))



@tracks.route("/user/<id>", methods=["GET"])
def get_user_tracks(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["id"]))



