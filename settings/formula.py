from db_connector import DBConnection
from .sql import FORMULA_SQL

def get_formulas():
    ret_resp = {}
    try:
        with DBConnection() as conn:
            formula_cat = conn.execute_dict(FORMULA_SQL["SELECT_FORMULA_CAT"])
            for cat in formula_cat:
                formula_fields = conn.execute_dict(FORMULA_SQL["SELECT_FORMULA_FIELD_CAT"].format(cat['formula_cat_code']))
                ret_resp[cat['formula_cat_code']] = {
                    'name': cat['formula_cat_name'],
                    'fields': formula_fields,
                }
    except Exception as e:
        raise

    return ret_resp