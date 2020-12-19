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


# @playlists_tracks.route('/post', methods=["POST"])
# def post_playlist_track():
#     print("ppppppoooooosssst_playlist")
#     data = json.loads(request.data)
#     print("daaaaattttttaaaaa", data)
#     playlists_track = Playlists_Track(
#         track_id=data["track_id"],
#         playlist_id=data["playlist_id"]
#     )
#     db.session.add(playlists_track)
#     db.session.commit()
#     return jsonify(Goodjob='you posted a playlist track to the db')

@playlists_tracks.route('/post', methods=["POST"])
def post_playlists_tracks():
    print("ppppppoooooosssst_playlist")
    data = json.loads(request.data)
    print("daaaaattttttaaaaa", data)
    playlists_track = Playlist_Track(
        track_id=data["track_id"],
        playlist_id=data["playlist_id"]
    )
    db.session.add(playlists_track)
    db.session.commit()
    return jsonify(Goodjob='you posted a playlist track to the db')