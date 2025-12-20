-- rev 1
-- CREATE TABLE IF NOT EXISTS accounts {
--   id integer PRIMARY KEY,
--   username varchar NOT NULL,
--   pass varchar NOT NULL
-- };
--
-- CREATE TABLE IF NOT EXISTS armies {
--   id integer PRIMARY KEY,
--   owner_id integer REFERENCES accounts (id),
--   name varchar,
--   max_points integer,
--   created_at timestamp
-- };
--
-- CREATE TABLE IF NOT EXISTS units {
--   id varchar PRIMARY KEY,
--   army_id integer REFERENCES armies (id),
--   name varchar NOT NULL,
--   xml_id varchar NOT NULL,
-- };
--
-- CREATE TABLE IF NOT EXISTS selection_groups {
--   id integer PRIMARY KEY,
--   unit_id integer REFERENCES units (id),
--   ref_id integer,
--   name varchar NOT NULL,
--   xml_id varchar NOT NULL
-- };
--
-- CREATE TABLE IF NOT EXISTS selection_entries {
--   id integer PRIMARY KEY,
--   group_id integer REFERENCES selection_groups (id),
--   name varchar NOT NULL,
--   checked bool NOT NULL,
--   xml_id varchar NOT NULL
-- };

-- rev 2
DROP TABLE IF EXISTS unit;
DROP TABLE IF EXISTS army;
DROP TABLE IF EXISTS account;

CREATE TABLE IF NOT EXISTS account (
  id SERIAL PRIMARY KEY,
  username varchar NOT NULL UNIQUE,
  email varchar NOT NULL UNIQUE,
  password varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS army (
  id SERIAL PRIMARY KEY,
  owner_id integer REFERENCES account (id) ON DELETE CASCADE,
  name varchar NOT NULL,
  max_points integer NOT NULL,
  created_at timestamp
);

CREATE TABLE IF NOT EXISTS unit (
  id SERIAL PRIMARY KEY,
  army_id integer REFERENCES army (id) ON DELETE CASCADE,
  name varchar NOT NULL,
  xml_id varchar NOT NULL,
  selection json NOT NULL
);
