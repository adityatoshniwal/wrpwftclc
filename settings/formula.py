from db_connector import DBConnection
from .sql import FORMULA_SQL

def get_formulas():
    ret_resp = {}
    try:
        with DBConnection() as conn:
            formula_fields = conn.execute_dict(FORMULA_SQL["SELECT_FORMULA_FIELD"])
            ret_resp = {
                'warp_field_codes': {
                    'fields': formula_fields
                }
            }
    except Exception as e:
        raise

    return ret_resp