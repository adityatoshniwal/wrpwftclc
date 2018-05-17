drop table users;

CREATE TABLE users (
    id integer primary key autoincrement,
    username text not null,
    pass text not null,
    display_name not null,
    is_active text not null
);

drop table items;

create table items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_json text not null,
    del_flag text
);