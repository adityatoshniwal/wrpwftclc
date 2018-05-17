from flask import Blueprint, request
from db_connector import DBConnection
import json
from .sql import ITEM_SQL
from utils import form_response

blueprint = Blueprint('item',__name__,template_folder='templates')


@blueprint.route('/', defaults={"id":None}, methods=['GET'])
@blueprint.route('/<id>', methods=['GET'])


def getitem(conn, id):
    if id is None:
        itemList = conn.execute_dict(ITEM_SQL["SELECT_SQL_ALL"])
        return form_response(200,"",itemList)
    else:
        retVal = conn.execute_single(ITEM_SQL["SELECT_SQL_ID"].format(id))
        if retVal is None:
            return form_response(404,"Item does not exist")
        else:
            return form_response(200,"",retVal)

@blueprint.route('', methods=['POST'])

def additem(conn):
    data = request.form['data']

    try:
        newId = conn.execute_insert(ITEM_SQL["INSERT_SQL"]
                          .format(data))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))

    return form_response(200, "Item Successfully added",newId)


@blueprint.route('/<id>', methods=['DELETE'])

def removeitem(conn,id):
    try:
        retVal = conn.execute_void(ITEM_SQL["DELETE_SQL"]
                                    .format(id))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))

    if retVal > 0:
        return form_response(200, "Item Successfully removed")
    else:
        return form_response(404, "Item Does not exist")

@blueprint.route('/<id>', methods=['PUT'])

def updateitem(conn,id):
    data = request.form['data']

    try:
        retVal = conn.execute_void(ITEM_SQL["UPDATE_SQL"]
                                    .format(id, data))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))

    if retVal > 0:
        return form_response(200, "Item Successfully Updated")
    else:
        return form_response(404, "Item Does not exist")