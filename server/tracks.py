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

    print("before daaaaatttaaaaaa===========>")
    data = json.loads(request.data)
    print("daaaaaattttaaaa=======>",data)
    track = Track(
        user_id=data["user_id"],
        trackname=data["trackname"],
        tracklocation=data["tracklocation"]
    )
    db.session.add(track)
    db.session.commit()
    return jsonify(Goodjob='you posted to db')