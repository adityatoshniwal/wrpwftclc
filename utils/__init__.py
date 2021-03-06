import json
from flask import Response
import traceback

def get_json(**kwargs):
    """
    This function will return json string for passed parameters
    :param kwargs:
    :return: JSON String
    """
    return json.dumps(kwargs)


def form_response(status, message, data={}):
    """
    This function is used to form response for a webservice call if only success fail required.
    :param success:
    :type bool
    :param message:
    :type str
    :param status:
    :type int
    :param data
    :return: JSON String
    """
    return Response(get_json(message=message, data=data), status=status)

def dict_factory_for_sqlite(cursor, row):
    """
    Factory for SQLlite SQL execution result
    :param cursor:
    :param row:
    :return:
    """
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def format_exception(e):
    return traceback.format_exc()