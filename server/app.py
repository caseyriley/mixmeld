import os
from flask import Flask, render_template, redirect, jsonify, request, send_from_directory
from flask_login import LoginManager
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    get_jwt_identity,
    get_raw_jwt,
    verify_jwt_in_request)
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
cors = CORS(app)

app.register_blueprint(user, url_prefix='/users')
app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(tracks, url_prefix='/tracks')
app.register_blueprint(playlists, url_prefix='/playlists')


db.init_app(app)
jwt = JWTManager(app)


@app.route('/')
def root():
    return send_from_directory(app.static_folder, 'index.html')



# @app.route('/', defaults={'path': ''})
# @app.route('/<path>')
# def react_root(path):
    # return "Helloooooooo"
    # return app.send_static_file('index.html')
    # return send_from_directory(os.path.join(root_dir, 'react-ui', 'public'), 'index.html')
    


@app.route('/api', methods=['GET'])
def api():
    return jsonify(message='Successful API ping'), 200


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
        'favicon.ico',mimetype='image/vnd.microsoft.icon')