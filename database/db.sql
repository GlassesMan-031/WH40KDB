
CREATE TABLE IF NOT EXISTS accounts {
  id integer PRIMARY KEY,
  username varchar NOT NULL,
  pass varchar NOT NULL
}

CREATE TABLE IF NOT EXISTS armies {
  id integer PRIMARY KEY,
  owner_id integer REFERENCES accounts (id),
  name varchar,
  max_points integer,
  created_at timestamp
}

CREATE TABLE IF NOT EXISTS units {
  id varchar PRIMARY KEY,
  army_id integer REFERENCES armies (id),
  name varchar NOT NULL,
  xml_id varchar NOT NULL,
}

CREATE TABLE IF NOT EXISTS selection_groups {
  id integer PRIMARY KEY,
  unit_id integer REFERENCES units (id),
  ref_id integer,
  name varchar NOT NULL,
  xml_id varchar NOT NULL
}

CREATE TABLE IF NOT EXISTS selection_entries {
  id integer PRIMARY KEY,
  group_id integer REFERENCES selection_groups (id),
  name varchar NOT NULL,
  checked bool NOT NULL,
  xml_id varchar NOT NULL
}
