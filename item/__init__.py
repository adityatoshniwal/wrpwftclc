from flask import Blueprint, request
from appdata import db_connection
import json
from .sql import ITEM_SQL
from utils import form_response

blueprint = Blueprint('item',__name__,template_folder='templates')


@blueprint.route('/', defaults={"id":None}, methods=['GET'])
@blueprint.route('/<id>', methods=['GET'])
@db_connection
def getitem(conn, id):
    if id is None:
        itemList = conn.execute_dict(ITEM_SQL["SELECT_SQL_ALL"])
        return form_response(True,"",200,itemList)
    else:
        retVal = conn.execute_single(ITEM_SQL["SELECT_SQL_ID"].format(id))
        if retVal is None:
            return form_response(True,"Item does not exist",404)
        else:
            return form_response(True,"",200,retVal)

@blueprint.route('', methods=['POST'])
@db_connection
def additem(conn):
    data = request.form['data']

    try:
        newId = conn.execute_insert(ITEM_SQL["INSERT_SQL"]
                          .format(data))
    except Exception as e:
        return form_response(False, "Some Exception Occurred", 500)

    return form_response(True, "Item Successfully added", 200,newId)


@blueprint.route('/<id>', methods=['DELETE'])
@db_connection
def removeitem(conn,id):
    try:
        retVal = conn.execute_void(ITEM_SQL["DELETE_SQL"]
                                    .format(id))
    except Exception as e:
        return form_response(False, "Some Exception Occurred", 500)

    if retVal > 0:
        return form_response(True, "Item Successfully removed", 200)
    else:
        return form_response(True, "Item Does not exist", 404)

@blueprint.route('/<id>', methods=['PUT'])
@db_connection
def updateitem(conn,id):
    data = request.form['data']

    try:
        retVal = conn.execute_void(ITEM_SQL["UPDATE_SQL"]
                                    .format(id, data))
    except Exception as e:
        return form_response(False, "Some Exception Occurred", 500)

    if retVal > 0:
        return form_response(True, "Item Successfully Updated", 200)
    else:
        return form_response(True, "Item Does not exist", 404)