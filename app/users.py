from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from .models import db, User


user = Blueprint('users', __name__,)


@user.route('/')
def all_users():
    res = User.query.all()
    return jsonify({"users": [user.to_safe_object() for user in res]})


@user.route('/<id>')
def user_by_id(id):
    user = User.query.get(int(id))
    return jsonify(user.to_safe_object())

# get current user from access token
@user.route('/token', methods=['GET'])
@jwt_required()
# ---- old @jwt_required syntax:
# @jwt_required()
#-----
def api():
    user = get_jwt_identity()
    current_user = User.query.filter_by(email=user['email']).first()
    safe_user = current_user.to_safe_object()
    print("/user/token safe_user11111111111111", safe_user)
    if safe_user:
      print("/user/token jsonify(safe_user)22222222222222", jsonify(safe_user))
      return jsonify(safe_user), 200
    else:
      print('Failed in users/token')
