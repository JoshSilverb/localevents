PRAGMA foreign_keys = ON;

INSERT INTO users(username, fullname, email, filename, password)
VALUES ('joshsilv','Josh Silverberg','joshsilv@umich.edu','e1a7c5c32973862ee15173b0259e3efdb6a391af.jpg','sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8');

INSERT INTO users(username, fullname, email, filename, password)
VALUES ('jflinn','Jason Flinn','jflinn@umich.edu','505083b8b56c97429a728b68f31b0b2a089e5113.jpg','sha512$a45ffdcc71884853a2cba9e6bc55e812$c739cef1aec45c6e345c8463136dc1ae2fe19963106cf748baf87c7102937aa96928aa1db7fe1d8da6bd343428ff3167f4500c8a61095fb771957b4367868fb8');


INSERT INTO events(owner, eventname, latitude, longitude, eventaddress, eventtime)
VALUES ('joshsilv', 'MDST meet and greet', 48.133837891689375, 17.103050926317675, 'Location1', CURRENT_TIMESTAMP);

INSERT INTO events(owner, eventname, latitude, longitude, eventaddress, eventtime)
VALUES ('joshsilv', 'Hockey game', 48.174163918081625, 17.063094237359337, 'Location2', CURRENT_TIMESTAMP);

INSERT INTO events(owner, eventname, latitude, longitude, eventaddress, eventtime)
VALUES ('joshsilv', 'Study sesh', 48.125772060279154, 17.047047924233034, 'Location3', CURRENT_TIMESTAMP);

INSERT INTO events(owner, eventname, latitude, longitude, eventaddress, eventtime)
VALUES ('jflinn', 'The footie', 48.17176766562853, 17.03464903238824, 'Location4', CURRENT_TIMESTAMP);

INSERT INTO events(owner, eventname, latitude, longitude, eventaddress, eventtime)
VALUES ('jflinn', 'My event', 48.12880014014767, 17.06644629550805, 'Location5', CURRENT_TIMESTAMP);

INSERT INTO events(owner, eventname, latitude, longitude, eventaddress, eventtime)
VALUES ('jflinn', 'Event that shouldnt show up', 48.1622974965475, 17.190758904020477, 'Location6', CURRENT_TIMESTAMP);