from db_connector import DBConnection
from .sql import FORMULA_SQL

def get_fieldcodes():
    ret_resp = {}
    try:
        with DBConnection() as conn:
            field_codes = conn.execute_dict(FORMULA_SQL["SELECT_FIELDCODES_ALL"])

            ret_resp = {row['field_code']: row for row in field_codes}

    except Exception as e:
        raise

    return ret_resp