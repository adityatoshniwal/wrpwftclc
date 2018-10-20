from flask import Blueprint, request
from db_connector import DBConnection
from .formula import get_formulas
from utils import form_response

import json, time

blueprint = Blueprint('settings', __name__, template_folder='templates')

@blueprint.route('', methods=['GET'])
def get_settings():
    ret_resp = {}
    try:
        ret_resp['formulas'] = get_formulas()
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e))

    # time.sleep(5)
    return form_response(200,"", ret_resp)

@blueprint.route('', methods=['POST'])
def add_item():
    data = request.json

    try:
        with DBConnection() as conn:
            newId = conn.execute_insert(ITEM_SQL["INSERT_SQL"], (json.dumps(data),))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))

    return form_response(200, "Item Successfully added",newId)


@blueprint.route('/<id>', methods=['DELETE'])
def remove_item(id):
    try:
        with DBConnection() as conn:
            retVal = conn.execute_void(ITEM_SQL["DELETE_SQL"]
                     .format(id))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))

    if retVal > 0:
        return form_response(200, "Item Successfully removed")
    else:
        return form_response(404, "Item Does not exist")

@blueprint.route('/<id>', methods=['PUT'])
def update_item(id):
    data = request.json

    try:
        with DBConnection() as conn:
            retVal = conn.execute_void(ITEM_SQL["UPDATE_SQL"]
                                        .format(id, json.dumps(data)))
    except Exception as e:
        return form_response(500, "Some Exception Occurred[{0}]".format(e.message))

    if retVal > 0:
        return form_response(200, "Item Successfully Updated")
    else:
        return form_response(404, "Item Does not exist")