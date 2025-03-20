DROP TABLE IF EXISTS chat;
CREATE TABLE IF NOT EXISTS chat (id INTEGER PRIMARY KEY, name TEXT, message TEXT, date TIMESTAMP);
INSERT INTO chat (id, name, message, date) VALUES (1, 'わか', 'hello', CURRENT_TIMESTAMP);
