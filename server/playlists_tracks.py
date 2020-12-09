from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from sqlalchemy import func
from .models import db, Playlists_Tracks
import requests
import json
from flask_jwt_extended  import jwt_required

from flask_cors import CORS

# from server.models import db, Playlist

playlists_tracks = Blueprint('playlists_tracks', __name__)


@playlists_tracks.route('/post', methods=["POST"])
def post_playlist():

    data = json.loads(request.data)
    playlists_tracks = Playlists_Tracks(
        track_id=data["track_id"],
        playlist_id=data["playlist_id"]
    )
    db.session.add(playlists_tracks)
    db.session.commit()
    return jsonify(Goodjob='you posted a playlist track to the db')