from functools import wraps
import sqlite3, os
from utils import dict_factory_for_sqlite
import appconfig

class ConnectionManager:
    """
    This class is used to perform DB operations
    """
    def __init__(self):
        print("DB File :",appconfig.DB_FILE_PATH)

    def execute_dict(self,sqlString):
        """
        Execute SQL and return rows with column names
        :param sqlString:
        :return: dict
        """
        with sqlite3.connect(appconfig.DB_FILE_PATH) as conn:
            conn.row_factory = dict_factory_for_sqlite
            cursor = conn.cursor()
            cursor.execute(sqlString)
            return cursor.fetchall()

    def execute_array(self,sqlString):
        """
        Execute SQL and return list of rows
        :param sqlString:
        :return: list
        """
        with sqlite3.connect(appconfig.DB_FILE_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(sqlString)
            return cursor.fetchall()
    

    def execute_void(self,sqlString):
        """
        Execute SQL, returns nothing
        :param sqlString:
        :return: None
        """
        with sqlite3.connect(appconfig.DB_FILE_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(sqlString)
            retVal = cursor.rowcount
            conn.commit()
            return retVal



    def execute_insert(self,sqlString):
        """
        Execute SQL, returns inserted id
        :param sqlString:
        :return: None
        """
        with sqlite3.connect(appconfig.DB_FILE_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(sqlString)
            newId = cursor.lastrowid
            conn.commit()
            return newId


    def execute_single(self,sqlString):
        """
        Execute SQL which returns only one row and one column
        :param sqlString:
        :return:
        """
        with sqlite3.connect(appconfig.DB_FILE_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(sqlString)
            res = cursor.fetchall()
            if len(res) <= 0:
                return None
            else:
                return res[0][0]

def db_connection(func):
    @wraps(func)
    def ret_func(*args, **kwargs):
        kwargs['conn'] = ConnectionManager()
        return func(*args,**kwargs)
    return ret_func
