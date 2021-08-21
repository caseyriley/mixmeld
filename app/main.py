import os
from flask import Flask, jsonify, request, send_from_directory
from flask_jwt_extended import JWTManager
from flask_cors import CORS 
from .config import Config
from .models import db
from .users import user
from .auth import auth
from .tracks import tracks
from .playlists import playlists


app = Flask(__name__, 
    static_url_path='',
    static_folder='../react-ui/build')
app.config.from_object(Config)
CORS(app)


app.register_blueprint(user, url_prefix='/users')
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(tracks, url_prefix='/tracks')
app.register_blueprint(playlists, url_prefix='/playlists')


db.init_app(app)
jwt = JWTManager(app)


@app.route('/')
def root():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api', methods=['GET'])
def api():
    return jsonify(message='Successful API ping')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
        'favicon.ico')
