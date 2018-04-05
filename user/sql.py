USER_SQL = {
"INSERT_SQL":"""
    insert into users(username,pass,display_name,is_active)
    values ('{0}','{1}','{2}','Y')
""",
"SELECT_SQL_ALL":"""
    select display_name,username,is_active from users
""",
"SELECT_SQL_USER_DATA":"""
    select * from users 
    where username = '{0}'
""",
"SELECT_SQL_UID_DATA":"""
    select username, display_name from users 
    where id = {0}
""",
"SELECT_SQL_USER_EXISTS":"""
    select count(1) from users 
    where username = '{0}'
""",
"SELECT_SQL_UNPASS":"""
    select count(1) from users
    where username = '{0}' and pass = '{1}'
""",
"UPDATE_SQL_DISABLE":"""
    update users
    set is_active = 'N'
    where id = {0}'
""",
"DELETE_SQL":"""
    delete from users
    where id = {0}
"""
}