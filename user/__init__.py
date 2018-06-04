from flask import Blueprint, request, Response, url_for, session
from db_connector import DBConnection
import json
from .sql import USER_SQL
from utils import form_response
from functools import wraps


blueprint = Blueprint('users',__name__,template_folder='templates')


def login_required(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        if 'userid' in request.cookies and 'userid' in session:
            if session['userid'] != request.cookies['userid']:
                return form_response(401, "Unauthorized Access. Login required")
            else:
                return func(*args, **kwargs)
        else:
            return form_response(401, "Unauthorized Access. Login required")
    return wrapped


@blueprint.route('', methods=["GET"])
def allusers():
    list_users = []
    try:
        with DBConnection() as conn:
            list_users = conn.execute_dict(USER_SQL["SELECT_SQL_ALL"])
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e))
    return form_response(200, "",list_users)

@blueprint.route('/<id>', methods=["GET"])
def user(id):
    user_data = None
    try:
        with DBConnection() as conn:
            user_data = conn.execute_dict(USER_SQL["SELECT_SQL_UID_DATA"].format(id))
            if len(user_data) == 0:
                return form_response(200, "User Data Not found", user_data)
            elif len(user_data) > 1:
                return form_response(200, "Bad User Data", user_data)
            else:
                user_data = user_data[0]
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))
    return form_response(200, "", user_data)


@blueprint.route('/login', methods=["POST"])
def login():
    import time
    time.sleep(2)
    username = request.json['username']
    password = request.json['pass']
    retval = None
    with DBConnection() as conn:
        retval = conn.execute_single(USER_SQL["SELECT_SQL_UNPASS"].format(username, password))

    if retval is not None:
        user_data = None
        try:
            with DBConnection() as conn:
                user_data = conn.execute_dict(USER_SQL["SELECT_SQL_UID_DATA"].format(retval))
                if len(user_data) == 0:
                    return form_response(200, "User Data Not found", user_data)
                elif len(user_data) > 1:
                    return form_response(200, "Bad User Data", user_data)
                else:
                    user_data = user_data[0]
        except Exception as e:
            return form_response(500, "Some Exception Occurred[{0}]".format(e.message))

        session['userid'] = str(retval)
        resp = form_response(200, "", {
            "isValid": True,
            "message": "Success Login"
        })
        resp.set_cookie('userid',str(retval))
        resp.set_cookie('username', user_data['username'])
        resp.set_cookie('display_name', user_data['display_name'])
        return resp
    else:
        return form_response(200, "", {
            "isValid":False,
            "message":"Invalid Username Password"
        })


@blueprint.route('/logout', methods=["POST"])
@login_required
def logout():
    session.pop('userid')
    resp = form_response(200, "Logout Successful")
    resp.delete_cookie('userid')
    resp.delete_cookie('username')
    resp.delete_cookie('display_name')
    return resp


@blueprint.route("/register", methods=["POST"])
def register(conn):
    username = request.form["username"]
    password = request.form["pass"]
    dispName = request.form["display_name"]

    try:
        retval = conn.execute_single(USER_SQL["SELECT_SQL_USER_EXISTS"]
                                     .format(username))
        if retval > 0:
            return form_response(200,"",{
                "isSuccess":False,
                "messagae":"Username already exists"
            })

        retval = conn.execute_insert(USER_SQL["INSERT_SQL"]
                          .format(username, password, dispName))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))

    return form_response(200, "", {
        "isSuccess":True,
        "message":"User registered successfully"
    })


@blueprint.route("/<id>/disable", methods=["PUT"])
def disable(conn, id):
    try:
        retval = conn.execute_void(USER_SQL["UPDATE_SQL_DISABLE"]
                                     .format(id))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))
    if retval > 0:
        return form_response(200,"", {
            "isSuccess":True, "message":"User Disabled"
        })
    else:
        return form_response(200, "", {
            "isSuccess":False, "message":"User Does not exist."
        })


@blueprint.route("/<id>", methods=["DELETE"])
def remove(conn, id):
    try:
        retval = conn.execute_void(USER_SQL["DELETE_SQL"]
                                     .format(id))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))
    if retval > 0:
        return form_response(200, "", {
            "isSuccess": True, "message": "User removed"
        })
    else:
        return form_response(200, "", {
            "isSuccess": False, "message": "User Does not exist."
        })





