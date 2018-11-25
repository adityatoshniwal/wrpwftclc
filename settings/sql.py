FORMULA_SQL = {
"INSERT_SQL":"""
    insert into items(data_json,del_flag)
    values (?,'N')
""",
"SELECT_FIELDCODES_ALL":"""
    select * from field_codes
""",
"SELECT_FORMULA_FIELD":"""
    select * from formula_fields
    order by priority
""",
"SELECT_SQL_USER_EXISTS":"""
    select count(1) from users 
    where username = '{0}'
""",
"DELETE_SQL":"""
    delete from items 
    where id = {0}
""",
"UPDATE_SQL":"""
    update items
    set data_json = '{1}' 
    where id = {0}
"""
}