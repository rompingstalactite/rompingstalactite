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

#Insert test row to Recipes Table
function seedData {
  psql recipes -U postgres -c "INSERT INTO recipes (
    title,
    images ,
    followers ,
    yield,
    yield_unit ,
    ingredients ,
    prep_time,
    prep_steps,
    cook_time,
    cook_steps,
    finish_steps,
    tags,
  ) VALUES (
    'Vegan Red Velvet Cupcakes',
    ARRAY [
      'http://40aprons.com/wp-content/uploads/2013/10/red_velvet_cupcakes+2+of+81.jpg',
      'http://cf.tasteandtellblog.com/wp-content/uploads/2014/09/Red-Velvet-Cupcakes-recipe-taste-and-tell-1b-opt.jpg',
      'http://ww2.hdnux.com/photos/13/62/31/3089985/3/920x920.jpg'
    ],
    ARRAY [
      'user1',
      'user2',
      'user3'
    ],
    12,
    'Cupcakes',
    ARRAY [
      '1 cup soymilk',
      '1 teaspoon apple cider vinegar',
      '1 1⁄4 cups all-purpose flour',
      '1 cup granulated sugar',
      '2 tablespoons cocoa powder',
      '1⁄2 teaspoon baking powder',
      '1⁄2 teaspoon baking soda',
      '1⁄2 teaspoon salt',
      '1⁄3 cup canola oil',
      '2 tablespoons red food coloring',
      '2 teaspoons vanilla extract',
      '1⁄4 teaspoon almond extract',
      '1 teaspoon chocolate extract',
      '1⁄4 cup vegan margarine, non-hydrogenated, softened',
      '1⁄4 cup vegan cream cheese, softened',
      '2 cups powdered sugar, sifted',
      '1 teaspoon vanilla extract'
    ],
    15,
    ARRAY [
      'Preheat oven to 350 degrees and line muffin pans with liners.'
    ],
    20,
    ARRAY [
      'Whisk together the soy milk and vinegar and set aside to curdle.',
      'Sift the flour, sugar, cocoa, baking powder, baking soda, and salt into a large bowl and mix.',
      'Add the oil, food coloring, chocolate extract, Vanilla extract and almond extract to the curdled soy milk. Whisk well to combine.',
      'Make well in center of dry ingredients and gently fold wet ingredients into dry, mixing until large lumps disappear.',
      'Do not over mix, or your cupcakes will turn out gummy - small lumps are okay.',
      'Fill cupcake liners about three-quarters full as these cupcakes will rise fairly high.',
      'Place in hot oven and bake 18-20 minutes until done, or until toothpick inserted in cetner comes out clean.',
      'Cool cupcakes in the pan for five mintues, and then transfer to a cooling rack or surface to cool completely.',
      'For frosting:',
      'Using a hand mixer, cream together margarine and cream cheese until just combined, then whip in the powdered sugar in 1/2 cup batches.',
      'Scrape down the sides and mix until smooth and creamy.',
      'Mix in the vanilla.'
    ],
    ARRAY [
      'Keep tightly covered and refrigerated until ready to use.',
      'Add sprinkles/garnish if desirerd.'
    ],
    ARRAY[
      'vegan',
      'vegetarian',
      'dairy-free'
    ]
  )";
  echo '✔  Cupcakes in the oven!';
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
    seedData;
  else
    echo '✘  please start your postgres server!';
  fi;
else
  echo '✘  you need to install postgres to continue';
  echo 'Please follow this guide: https://www.codefellows.org/blog/three-battle-tested-ways-to-install-postgresql';
fi;
