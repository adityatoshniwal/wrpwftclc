ITEM_SQL = {
"INSERT_SQL_ITEM":"""
    insert into items({0})
    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
""",
"SELECT_SQL_ALL":"""
    select id, title, totalWt, totalWtWstg, totalCost from items
""",
"SELECT_ID_ITEM":"""
    select * from items 
    where id = {0}
""",
"SELECT_ID_WARP":"""
    select * from items_warp_grid 
    where item_id = {0}
""",
"SELECT_ID_WEFT":"""
    select * from items_weft_grid
    where item_id = {0}
""",
"SELECT_ID_WARPPACK":"""
    select * from items_warppack_grid
    where item_id = {0}
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