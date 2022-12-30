CREATE TABLE users(
    username VARCHAR(20) PRIMARY KEY,
    fullname VARCHAR(40) NOT NULL,
    email VARCHAR(40) NOT NULL,
    filename VARCHAR(128) NOT NULL,
    password VARCHAR(256) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events(
    owner VARCHAR(20) NOT NULL,
    eventname VARCHAR(40) NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
    eventtime TIMESTAMP,
    eventid SERIAL NOT NULL,
    PRIMARY KEY (owner, eventid),
    FOREIGN KEY (owner) REFERENCES users (username) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREATE TABLE likes(
--     owner VARCHAR(20) NOT NULL,
--     eventid SERIAL NOT NULL,
--     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (owner, eventid),
--     FOREIGN KEY (owner) REFERENCES users (username) ON DELETE CASCADE ON UPDATE CASCADE,
--     FOREIGN KEY (eventid) REFERENCES events (eventid) ON DELETE CASCADE ON UPDATE CASCADE
-- );
