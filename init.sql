CREATE TABLE User(

    user_id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    first_name VARCHAR(25), 
    last_name VARCHAR(25),
    email VARCHAR(70) UNIQUE NOT NULL,
    password CHAR NOT NULL,
    is_admin BOOL DEFAULT(false),
    is_staff BOOL DEFAULT(false),
    is_active BOOL DEFAULT(true),
    date_joined DATE NOT NULL,
    last_login DATE NOT NULL
    
);

CREATE TABLE Permission(
    permission_code VARCHAR(4) PRIMARY KEY NOT NULL
);


CREATE TABLE user_has_permession(
    user_id VARCHAR(36) NOT NULL,
    permission_code VARCHAR(4) NOT NULL,
    PRIMARY KEY(user_id, permission_code),
    FOREIGN KEY(user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY(permission_code) REFERENCES Permission(permission_code) ON DELETE CASCADE

);

/* Virtual file */
CREATE Table File(
    file_id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    user_id VARCHAR(36) NOT NULL,
    content VARCHAR(1000),
    date_created DATE,
    FOREIGN KEY(user_id) REFERENCES User(user_id) ON DELETE CASCADE
);