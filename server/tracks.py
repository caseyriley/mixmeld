from flask import Blueprint, jsonify, request
from sqlalchemy.orm import subqueryload, joinedload
from sqlalchemy import func
from .models import db, Track, User
import requests
import json, difflib
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
    
    track_artist = data["trackartist"].rstrip()
    track_name = data["trackname"].rstrip()
    track_genre = data["trackgenre"].rstrip()
    track_album = data["trackalbum"].rstrip()
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
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackartist"].lower()))


@tracks.route("/search/<params>", methods=["GET"])
def search_tracks(params):
    parameters = json.loads(params)
    id = parameters["id"]
    val = parameters["val"]

    tracks_trackname = Track.query.filter(func.lower(Track.trackname).contains(val.lower()), User.id == id)
    tracks_trackartist = Track.query.filter(func.lower(Track.trackartist).contains(val.lower()), User.id == id)
    tracks_trackalbum = Track.query.filter(func.lower(Track.trackalbum).contains(val.lower()), User.id == id)

    search_list = []
    track_name_list = []
    artist_name_list = []
    album_name_list = []

    def closeMatch(x):
        difflib.get_close_matches(val, x, n=100, cutoff=0.0)

    for track in tracks_trackname:
        if track.trackname != "":
            track_dict = track.to_dict()
            track_name_list.append(track_dict)
        else:
            pass

    for track in tracks_trackartist:
        if track.trackartist != "":
            isIn = False
            for track_obj in artist_name_list:
                if track_obj["trackartist"] == track.trackartist:
                    isIn = True
            if isIn == False:
                track_dict = track.to_dict()
                artist_name_list.append(track_dict)
            isIn = False
        else:
            pass

    for track in tracks_trackalbum:
        if track.trackalbum != "":
            track_dict = track.to_dict()
            album_name_list.append(track_dict)
        else:
            pass
    
    search_list.append(track_name_list)
    search_list.append(artist_name_list)
    search_list.append(album_name_list)

    return jsonify(search_list)

@tracks.route("/user/trackrating/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackrating(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, reverse=True, key=lambda i: i["trackrating"].lower()))


@tracks.route("/user/trackname/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackname(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackname"].lower()))


@tracks.route("/user/trackalbum/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackalbum(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackalbum"].lower()))


@tracks.route("/user/albums/<id>", methods=["GET"])
def get_user_albums(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    tracks_by_album = sorted(tracks, key=lambda i: i["trackalbum"].lower())

    albums = []
    # album = []
    prev_album = None
    for track_obj in tracks_by_album:
        # print("traaaaaaaaaaaaaaaaaaaaaack", hasattr(track_obj, "trackalbum"))
        if track_obj["trackalbum"]:
            print("yesssssssss traaaaackalbummmmmm")
            if prev_album == None:
                albums.append([track_obj])
                prev_album = track_obj["trackalbum"]
            elif prev_album == track_obj["trackalbum"]:
                albums[-1].append(track_obj)
            elif prev_album != track_obj["trackalbum"]:
                albums.append([track_obj])
                prev_album = track_obj["trackalbum"]
        else:
            print("nnnnooooooooooo traaackalbummmmmm")
    return jsonify(albums)


@tracks.route("/user/artists/<id>", methods=["GET"])
def get_user_artists(id):

    # artist_names_query = db.session.query(Track.trackartist).filter(Track.user_id == id).all()
    # artist_names = ["".join(name) for name in artist_names_query]

    # album_names_query = db.session.query(Track.trackalbum).filter(Track.user_id == id).all()
    # album_names = ["".join(name) for name in album_names_query]

    model_tracks = Track.query.filter(Track.user_id == id).all()

    artist_dict = {}
    album_dict = {}

    tracks = []
    for model_track in model_tracks:

        track = model_track.to_dict()

        if track["trackartist"] in artist_dict:
            if artist_dict[track["trackartist"]][0] == track["trackalbum"]: 
                pass
            else:
                artist_dict[track["trackartist"]].append(track["trackalbum"])
        else:
            if track["trackalbum"] != "":
                artist_dict[track["trackartist"]] = [track["trackalbum"]]
            else:
                pass

    for model_track in model_tracks:

        track = model_track.to_dict()

        if track["trackalbum"] in album_dict:
            album_dict[track["trackalbum"]].append(track)
        else:
            album_dict[track["trackalbum"]] = [track]

        # tracks.append(track)

    # tracks_by_album = sorted(tracks, key=lambda i: i["trackartist"].lower())

    # artist_albums = []
    # for artist in artist_names:
        
    #     artist_albums_query = db.session.query(Track.trackalbum).filter(Track.user_id == id, Track.trackartist == artist).all()
    #     artist_album_names = ["".join(name) for name in artist_albums_query]
    #     artist_albums.append({f'{artist}': artist_album_names})

    print("artist_name00000000000000000000000000", album_dict)
    return jsonify([artist_dict, album_dict])


# @tracks.route("/user/artists/<id>", methods=["GET"])
# def get_user_artists(id):

    # model_tracks = Track.query.filter(Track.user_id == id).all()
    # tracks = []
    # for model_track in model_tracks:
    #     track = model_track.to_dict()
    #     track["user"] = model_track.user.to_safe_object()
    #     tracks.append(track)
    # tracks_by_album = sorted(tracks, key=lambda i: i["trackartist"].lower())
    # ------All-Tracks-Should-Be-Organised-By-Album-----

    # artists = []    

    # prev_artist = None
    # for track_obj in tracks_by_album:
        # print("traaaaaaaaaaaaaaaaaaaaaack", hasattr(track_obj, "trackalbum"))
        # if track_obj["trackartist"]:
        #     print("yesssssssss traaaaackartiiiiiist")
        #     if prev_artist == None:
        #         artists.append([[[track_obj]]])  #artists[ artist [ albums[[],[]]]artist]artists
        #         prev_artist = track_obj["trackartist"]
        #     elif prev_artist == track_obj["trackartist"]:
        #         for album in artists[-1]:

        #         artists[-1].append([track_obj])
        #     elif prev_artist != track_obj["trackartist"]:
        #         artists.append([track_obj])
        #         prev_artist = track_obj["trackartist"] 
        # else:
        #     print("nnnnooooooooooo traaackartiiiiist")

# --------tracks-should-be-Artists=>[Aritist=>[]]------------
    
    # new_artists = []
    # for artist in artists:
    #     new_artists.append(sorted(artist, key=lambda i: i["trackalbum"].lower()))
    
    # print("nnnnneeeeeeeew_arrrrrrrtistttttttts", artists)
    # return jsonify(artists)
        



@tracks.route("/user/trackgenre/<id>", methods=["GET"])
def get_user_tracks_sort_by_trackgenre(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["trackgenre"].lower()))



@tracks.route("/user/tracktime/<id>", methods=["GET"])
def get_user_tracks_sort_by_tracktime(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, key=lambda i: i["tracktime"].lower()))


@tracks.route("/user/date/<id>", methods=["GET"])
def get_user_tracks_sort_by_date(id):

    model_tracks = Track.query.filter(Track.user_id == id).all()
    tracks = []
    for model_track in model_tracks:
        track = model_track.to_dict()
        # track["user"] = model_track.user.to_safe_object()
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
        # track["user"] = model_track.user.to_safe_object()
        tracks.append(track)
    return jsonify(sorted(tracks, reverse=True, key=lambda i: i["id"]))