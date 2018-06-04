ITEM_SQL = {
"INSERT_SQL":"""
    insert into items(data_json,del_flag)
    values (?,'N')
""",
"SELECT_SQL_ALL":"""
    select id, data_json from items
    where del_flag = 'N'
""",
"SELECT_SQL_ID":"""
    select data_json from items 
    where id = {0}
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