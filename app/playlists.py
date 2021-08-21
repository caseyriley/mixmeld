from flask import Blueprint, jsonify, request
from .models import db, Playlist, Track
import json

from app.models import db, Playlist

playlists = Blueprint('playlists', __name__)


@playlists.route('/list/post', methods=["POST"])
def post_playlists_tracks():
    data = json.loads(request.data)
    playlist_id=data["playlist_id"]
    track_id=data["track_id"]
    
    model_playlist = Playlist.query.filter(Playlist.id == playlist_id).first()
    model_track = Track.query.filter(Track.id == track_id).first()

    playlist_list = json.loads(model_playlist.playlist_list)
    playlist_list.append(model_track.id)
    playlist_list_string = json.dumps(playlist_list)
    model_playlist.playlist_list = playlist_list_string
 
    db.session.commit()
    return jsonify(Goodjob='you posted to a playlist')


@playlists.route("/list/<id>", methods=["GET"])
def get_playlist_list(id):
    playlist = Playlist.query.filter(Playlist.id == id).first()
    
    playlist_l = json.loads(playlist.playlist_list)
    playlist = []
    for track_id in playlist_l:
        track = Track.query.filter(Track.id == track_id).first()
        track_dict = track.to_dict()
        playlist.append(track_dict)
    return jsonify(playlist)


@playlists.route('/update', methods=['POST'])
def update_playlist():
    data = json.loads(request.data)
    id=data["id"],
    playlist_l=data["playlist_list"]
    playlist = Playlist.query.filter(Playlist.id == id).first()

    playlist.playlist_list = f"{playlist_l}"
    db.session.commit()
    return jsonify(Goodjob="you updated a playlist")


@playlists.route('/delete', methods=['DELETE'])
def delete_from_playlist():
    data = json.loads(request.data)
    track_id = data["track_id"]
    playlist_id = data["playlist_id"]
    playlist = Playlist.query.filter(Playlist.id == playlist_id).first()
    new_list = json.loads(playlist.playlist_list)
    new_list.remove(track_id)
    playlist.playlist_list = f'{new_list}'
    db.session.commit()
    return jsonify(Good_job="You deleted a track from a playlist")


@playlists.route('/delete_playlist', methods=['DELETE'])
def delete_playlist():
    data = json.loads(request.data)
    playlist_id = data["playlist_id"]
    playlist = Playlist.query.filter(Playlist.id == playlist_id).first()
    db.session.delete(playlist)
    db.session.commit()
    return jsonify(Good_job="You deleted a playlist")

@playlists.route('/post', methods=["POST"])
def post_playlist():

    data = json.loads(request.data)
    playlist = Playlist(
        user_id=data["user_id"],
        playlist_name=data["playlist_name"],
        playlist_list="[]"
    )
    db.session.add(playlist)
    db.session.commit()
    return jsonify(Goodjob='you posted a playlist to the db')


@playlists.route("/<id>", methods=["GET"])
def get_user_playlists_sort_by_playlist_name(id):

    model_playlists = Playlist.query.filter(Playlist.user_id == id).all()
    playlists = []
    for model_playlist in model_playlists:
        playlist = model_playlist.to_dict()
        playlists.append(playlist)
    return jsonify(sorted(playlists, key=lambda i: i["playlist_name"].lower()))
