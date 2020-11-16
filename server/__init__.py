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

from .config import config
from .models import db
from .users import user

app = Flask(__name__, static_url_path='')
app.config.from_object(Config)
CORS(app)

app.register_blueprint(user, url_prefix='/users')

db.init_app(app)
jwt = JWTManager(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')


@app.route('/api', methods=['GET'])
def api():
    return jsonify(message='Successful API ping'), 200


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
        'favicon.ico',mimetype='image/vnd.microsoft.icon')