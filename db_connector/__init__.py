from functools import wraps
import sqlite3, os, traceback
from utils import dict_factory_for_sqlite
import appconfig
import logging
from flask import current_app



class DBConnection:
    """
    This class is used to perform DB operations
    """
    def __init__(self):
        pass

    def __enter__(self):
        self.conn = sqlite3.connect(appconfig.DB_FILE_PATH)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.close()

        if exc_type is not None:
            current_app.logger.error(traceback.format_tb(exc_tb))
        return exc_type is None

    def execute_dict(self,sqlString):
        """
        Execute SQL and return rows with column names
        :param sqlString:
        :return: dict
        """
        self.conn.row_factory = dict_factory_for_sqlite
        cursor = self.conn.cursor()
        cursor.execute(sqlString)
        return cursor.fetchall()

    def execute_array(self,sqlString):
        """
        Execute SQL and return list of rows
        :param sqlString:
        :return: list
        """
        cursor = self.conn.cursor()
        cursor.execute(sqlString)
        return cursor.fetchall()


    def execute_void(self,sqlString):
        """
        Execute SQL, returns nothing
        :param sqlString:
        :return: None
        """
        cursor = self.conn.cursor()
        cursor.execute(sqlString)
        retVal = cursor.rowcount
        self.conn.commit()
        return retVal


    def execute_insert(self,sqlString, params):
        """
        Execute SQL, returns inserted id
        :param sqlString:
        :return: None
        """
        cursor = self.conn.cursor()
        cursor.execute(sqlString, params)
        newId = cursor.lastrowid
        self.conn.commit()
        return newId


    def execute_single(self,sqlString):
        """
        Execute SQL which returns only one row and one column
        :param sqlString:
        :return:
        """
        cursor = self.conn.cursor()
        cursor.execute(sqlString)
        res = cursor.fetchall()
        if len(res) <= 0:
            return None
        else:
            return res[0][0]