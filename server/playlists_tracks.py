from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from sqlalchemy import func
from .models import db, Playlist_Track
import requests
import json
from flask_jwt_extended  import jwt_required

from flask_cors import CORS

# from server.models import db, Playlist

playlists_tracks = Blueprint('playlists_tracks', __name__)


@playlists_tracks.route('/<id>', methods=["GET"])
def get_playlists_tracks(id):
    playlists_tracks = Playlist_Track.query.filter(Playlist_Track.playlist_id == id)
    playlist = []
    for playlist_track in playlists_tracks:
        track = playlist_track.to_dict()
        playlist.append(track)
    return jsonify(playlist)


@playlists_tracks.route('/post', methods=["POST"])
def post_playlists_tracks():
    data = json.loads(request.data)
    playlists_track = Playlist_Track(
        track_id=data["track_id"],
        playlist_id=data["playlist_id"]
    )
    db.session.add(playlists_track)
    db.session.commit()
    return jsonify(Goodjob='you posted a playlist track to the db')