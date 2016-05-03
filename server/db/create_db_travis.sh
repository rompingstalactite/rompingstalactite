#!/bin/bash

# DB ADMIN TASKS
function createUsers {
  psql -U postgres -c "CREATE USER admin SUPERUSER";
  psql -U postgres -c "CREATE USER developer";

  if [ checkUser ]; then
    echo '✔  admin created';
    return 1;
  else
    echo '✘  there was an error creating users';
    return 0;
  fi;
};

function createDatabase {
  psql -U postgres -c "CREATE DATABASE recipes WITH ENCODING 'UTF8'";

  if [ checkDatabase ]; then
    echo '✔  recipes database created';
    grantPrivileges;
    return 1;
  else
    echo '✘  there was an error creating the database';
    return 0;
  fi;
};

function checkDatabase {
  echo 'check db does nothing right now';
  return 0;
};

function checkUser {
  echo 'check user does nothing right now';
  return 1;
};

function grantPrivileges {
  psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE recipes TO admin";
  echo '✔  all privileges granted to admin on database recipes';
  psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE recipes TO developer";
  echo '✔  all privileges granted to developer on database recipes';

  return 1;
};

function createTables {
  psql recipes -U admin < server/db/recipes_db_schema.sql;
};

# check if postgres is installed
if [ 'which postgres' ]; then
  if [ 'pgrep psql' ]; then
    echo '✔  postgres installed';
    createUsers;
    createDatabase;
    createTables;
  else
    echo '✘  please start your postgres server!';
  fi;
else
  echo '✘  you need to install postgres to continue';
  echo 'Please follow this guide: https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql';
fi;
