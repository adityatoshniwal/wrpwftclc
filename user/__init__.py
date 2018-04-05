from flask import Blueprint, request, Response, url_for
from appdata import db_connection
import json
from .sql import USER_SQL
from utils import form_response


blueprint = Blueprint('user',__name__,template_folder='templates')


@blueprint.route('', methods=["GET"])
@db_connection
def allusers(conn):
    listUsers = []
    try:
        listUsers = conn.execute_dict(USER_SQL["SELECT_SQL_ALL"])
    except Exception as e:
        return form_response(False, "Some Exception Occurred", 500, e)
    return form_response(True, "",200,listUsers)


@blueprint.route('/<id>', methods=["GET"])
@db_connection
def user(conn,id):
    userData = None
    try:
        userData = conn.execute_dict(USER_SQL["SELECT_SQL_UID_DATA"].format(id))
    except Exception as e:
        return form_response(False, "Some Exception Occurred", 500)
    return form_response(True, "",200, userData)


@blueprint.route('/login', methods=["POST"])
@db_connection
def login(conn):
    username = request.form['username']
    password = request.form['pass']
    retVal = conn.execute_single(USER_SQL["SELECT_SQL_UNPASS"].format(username,password))
    if retVal > 0:
        return form_response(True, "Login Success.", 200)
    else:
        return form_response(True, "Invalid Username and Password", 401)


@blueprint.route('/logout', methods=["DELETE"])
@db_connection
def logout(conn):
    return form_response(True, "Logout Successful", 200)


@blueprint.route("/register", methods=["POST"])
@db_connection
def register(conn):
    username = request.form["username"]
    password = request.form["pass"]
    dispName = request.form["display_name"]

    try:
        retVal = conn.execute_single(USER_SQL["SELECT_SQL_USER_EXISTS"]
                                     .format(username))
        if retVal > 0:
            return form_response(True,"Username already exists",403)

        retVal = conn.execute_insert(USER_SQL["INSERT_SQL"]
                          .format(username, password, dispName))
    except Exception as e:
        return form_response(False, "Some Exception Occurred", 500, e)

    return form_response(True, "Username Successfully Registered", 200, retVal)


@blueprint.route("/<id>/disable", methods=["PUT"])
@db_connection
def disable(conn, id):
    try:
        retVal = conn.execute_void(USER_SQL["UPDATE_SQL_DISABLE"]
                                     .format(id))
    except Exception as e:
        return form_response(False, "Some Exception Occurred", 500)
    if retVal > 0:
        return form_response(True,"User deactivated",200)
    else:
        return form_response(True, "User does not exist", 404)


@blueprint.route("/<id>", methods=["DELETE"])
@db_connection
def remove(conn, id):
    try:
        retVal = conn.execute_void(USER_SQL["DELETE_SQL"]
                                     .format(id))
    except Exception as e:
        return form_response(False, "Some Exception Occurred", 500)
    if retVal > 0:
        return form_response(True,"User removed successfully",200)
    else:
        return form_response(True, "User does not exist", 404)
