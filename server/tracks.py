from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from sqlalchemy import func
from .models import db, Track, User
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
        trackalbum="",
        trackgenre="",
        trackrating="",
        trackart="",
        created_date= func.current_timestamp()

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


@tracks.route('/art', methods=["POST"])
def update_track_art():

    data = json.loads(request.data)
    
    track_location = data["tracklocation"]
    track_art = data["trackart"]
    user_id = data["user_id"]

    track = Track.query.filter(Track.tracklocation == track_location, Track.user_id == user_id).first()
    track.trackart = track_art
    db.session.commit()
    return jsonify(Good='you changed the track art')


@tracks.route('/track_info', methods=["POST"])
def update_track_info():

    data = json.loads(request.data)
    
    track_artist = data["trackartist"]
    track_name = data["trackname"]
    track_genre = data["trackgenre"]
    track_album = data["trackalbum"]
    track_location = data["tracklocation"]

    track = Track.query.filter(Track.tracklocation == track_location).first()
    track.trackartist = track_artist
    track.trackname = track_name
    track.trackgenre = track_genre
    track.trackalbum = track_album
    db.session.commit()
    return jsonify(Good='you changed the track info')


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
    track.trackartist = new_artist_name
    db.session.commit()
    return jsonify(Good='you changed the track name')


@tracks.route('/album_name', methods=["POST"])
def update_track_album_name():

    data = json.loads(request.data)
    
    track_id = data["id"]
    new_album_name = data["albumname"]
  
    track = Track.query.filter(Track.id == track_id).first()
    track.trackalbum = new_album_name
    db.session.commit()
    return jsonify(Good='you changed the album name')


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


@tracks.route("/search/<params>", methods=["GET"])
def search_tracks(params):
    parameters = json.loads(params)
    # print("parameters**************************",parameters)
    id = parameters["id"]
    val = parameters["val"]

    tracks = Track.query.filter(func.lower(Track.trackname).contains(val.lower()), User.id == id)

    search_list = []
  
    for track in tracks:
       track_name = track.trackname
       search_list.append(track_name)
 
    # print("yyyyyyyyyyyyyyyyyyyyyyyyyyy",jsonify(model_track))
    return jsonify(search_list)

@tracks.route("/user/trackrating/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackrating(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, reverse=True, key=lambda i: i["trackrating"].lower()))


@tracks.route("/user/trackname/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackname(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackname"].lower()))


@tracks.route("/user/trackalbum/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackalbum(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackalbum"].lower()))


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


@tracks.route("/user/date/<id>", methods=["GET"])
def get_user_tracks_sort_by_date(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, reverse=True, key=lambda i: i["created_date"]))



@tracks.route("/user/id/<id>", methods=["GET"])
def get_user_tracks(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["id"]))



@tracks.route("/first/<id>", methods=["GET"])
def get_first_track(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, reverse=True, key=lambda i: i["id"]))