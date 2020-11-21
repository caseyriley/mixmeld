from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from .models import db, Track
# from .models import db, Tweet
import requests
import json
from flask_jwt_extended  import jwt_required

from flask_cors import CORS

tracks = Blueprint('tracks', __name__)

@tracks.route('/post', methods=["POST", "DELETE"])
@jwt_required
def post_track():

    data = json.loads(request.data)
    track = Track(
        user_id=data["user_id"],
        trackname=data["trackname"],
        trackartist=data["trackartist"],
        tracklocation=data["tracklocation"],
        tracktime=data["tracktime"],
        trackrating=data["trackrating"],
        trackgenre=data["trackgenre"],
        trackart=data["trackart"]
    )
    db.session.add(track)
    db.session.commit()

    return jsonify(Confirm='Track sumitted')