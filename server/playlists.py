from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from sqlalchemy import func
from .models import db, Playlist
import requests
import json
from flask_jwt_extended  import jwt_required

from flask_cors import CORS

from server.models import db, Playlist

playlists = Blueprint('playlists', __name__)


@playlists.route('/post', methods=["POST"])
def post_playlist():

    data = json.loads(request.data)
    playlist = Playlist(
        user_id=data["user_id"],
        playlist_name=data["playlist_name"]
    )
    db.session.add(playlist)
    db.session.commit()
    return jsonify(Goodjob='you posted a playlist to the db')


