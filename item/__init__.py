from flask import Blueprint, request
from db_connector import DBConnection
import json
from .sql import ITEM_SQL
from utils import form_response

import json

blueprint = Blueprint('items',__name__,template_folder='templates')



@blueprint.route('', defaults={"id": None}, methods=['GET'])
@blueprint.route('/<id>', methods=['GET'])
def get_item(id):
    if id is None:
        try:
            with DBConnection() as conn:
                item_list = conn.execute_dict(ITEM_SQL["SELECT_SQL_ALL"])
        except Exception as e:
            return form_response(500, "Some Exception Occurred[{0}]".format(e))

        final_list = []
        for item in item_list:
            data_json = json.loads(item['data_json'])
            final_list.append({
                "id": item['id'],
                "data_json": {
                    "itemName": data_json['itemName'],
                    "totalWt": data_json['totalWt'],
                    "totalWtWaste": data_json['totalWtWaste'],
                    "actualCost": data_json['actualCost']
                }})
        return form_response(200,"",item_list)
    else:
        try:
            with DBConnection() as conn:
                ret_val = conn.execute_single(ITEM_SQL["SELECT_SQL_ID"].format(id))
        except Exception as e:
            return form_response(500, "Some Exception Occurred[{0}]".format(e))

        if ret_val is None:
            return form_response(404,"Item does not exist")
        else:
            return form_response(200,"",ret_val)


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
def remove_item(conn,id):
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
def update_item(conn,id):
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