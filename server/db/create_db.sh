#!/bin/bash

# DB ADMIN TASKS
function createUsers {
  psql -c "CREATE USER admin SUPERUSER";
  psql -c "CREATE USER developer";

  if [ checkUser ]; then
    echo '✔  admin created';
    return 1;
  else
    echo '✘  there was an error creating users';
    return 0;
  fi;
};

function createDatabase {
  psql -c "CREATE DATABASE recipes WITH ENCODING 'UTF8'";

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
  #USERS
  psql recipes -c "INSERT INTO users(
    username
  ) VALUES (
    'user1'
  )"

  psql recipes -c "INSERT INTO users(
    username
  ) VALUES (
    'user2'
  )"

  psql recipes -c "INSERT INTO users(
    username
  ) VALUES (
    'user3'
  )"

  psql recipes -c "INSERT INTO users(
    username
  ) VALUES (
    'user4'
  )"
  
  #CUPCAKES
  psql recipes -c "INSERT INTO recipes (
    author,
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
    tags
  ) VALUES (
    1,
    'Vegan Red Velvet Cupcakes',
    ARRAY [
      'http://40aprons.com/wp-content/uploads/2013/10/red_velvet_cupcakes+2+of+81.jpg',
      'http://cf.tasteandtellblog.com/wp-content/uploads/2014/09/Red-Velvet-Cupcakes-recipe-taste-and-tell-1b-opt.jpg',
      'http://ww2.hdnux.com/photos/13/62/31/3089985/3/920x920.jpg'
    ],
    ARRAY [
      1,
      2,
      3
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

  #SAMOSAS
  psql recipes -c "INSERT INTO recipes (
    author,
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
    tags
  ) VALUES (
    2,
    'Samosas',
    ARRAY [
      'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/11/74/55/picO1qehQ.jpg',
      'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/11/74/55/picGG8P8T.jpg'
    ],
    ARRAY [
      1,
      2,
      3
    ],
    24,
    'Samosas',
    ARRAY [
      '3 cups all-purpose flour',
      '1 teaspoon salt',
      '4 tablespoons melted butter or 4 tablespoons ghee',
      '3⁄4 cup cold water',
      '2 lbs potatoes, peeled',
      '4 tablespoons vegetable oil',
      '2 teaspoons mustard seeds (yellow or black)',
      '2 medium onions, finely chopped',
      '4 tablespoons fresh ginger, chopped',
      '3 teaspoons fennel seeds',
      '1 teaspoon ground cumin',
      '1 tablespoon ground coriander',
      '1 teaspoon turmeric',
      '1 cup frozen green pea, defrosted',
      '1 teaspoon salt',
      '2 tablespoons water',
      '1 teaspoon garam masala',
      '1⁄2 teaspoon ground cayenne pepper'
    ],
    120,
    ARRAY [
      'First put the potatoes on to boil until tender, then drain and cool.',
      'While the potatoes are cooking, make the pastry by mixing the flour and salt in a bowl.',
      'Pour in the butter or ghee and rub together wtih the flour until it becomes slightly flaky.',
      'Pour 3/4 cup water over the flour and pull the dough together with your hands.',
      'You can add up to 4 tbsp more water, one spoonful at a time, until everything comes together in a bowl.',
      'From here you can knead the dough by hand for about 10 minutes or throw it in a mixer with a dough attachment, going until the dough is smooth and elastic.',
      'When the dough is done, place it in a bowl, rub with oil and cover until you are ready to fill the samosas.',
      'Next, start making the filling by cutting your cooked potatoes into cubes.',
      'Heat the oil in a frying pan and throw in the mustard seeds.',
      'Cook until they start to crackle and burst and when that happens immediately add your chopped onion and ginger.',
      'Cook for a few minutes until the onion softens and then add the fennel, cumin, turmeric, potatoes, peas, salt and water.',
      'Stir well and then reduce the heat to low and let cook for about 5 minutes.',
      'Sprinkle over the garam masala and hot pepper and stir again.',
      'Taste for seasoning and then take off the heat.',
      'Now it is time to start filling your samosas.',
      'Grab a piece of dough by pinching off a piece and rolling it thinly and into a circle.',
      'You can make the samosas any size you like.',
      'With a knife, cut the circle in half, moisten the straight edge with a finger dipped in water and then shape it into a cone, pressing the straight edges together to form a seal.',
      'You should now have a little ice cream cone shaped piece of dough which you can spoon filling into.',
      'Fill and then moisten the top edges and press closed.',
      'Set on a plate and cover with foil or plastic wrap until you are ready to cook (up to 2-3 hours later).'
    ],
    15,
    ARRAY [
      'To deep fry the samosas, pour 3 cups of vegetable oil into a 12 inch wok and heat until a piece of dough thrown into the oil bubbles.',
      'If you have a deep fryer, you want a temperature around 375°F.',
      'Brown on both sides and drain on paper towel.'
    ],
    ARRAY [
      'Cool on the paper towel or drying rack',
      'Finally, you can enjoy a samosa!'
    ],
    ARRAY[
      'vegetarian'
    ]
  )";

  echo '✔  Dosas and Samosas!';


  #vanilla ICE CREAM
  psql recipes -c "INSERT INTO recipes (
    author,
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
    tags
  ) VALUES (
    3,
    'Vanilla Ice Cream',
    ARRAY [
      'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/47/90/picDnUZU9.jpg',
      'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/47/90/piceKa5F5.jpg'
    ],
    ARRAY [
      1,
      2,
      3
    ],
    1,
    'Quart',
    ARRAY [
      '2 large eggs',
      '3⁄4 cup sugar',
      '2 cups heavy whipping cream',
      '1 cup milk',
      '2 teaspoons vanilla extract'
    ],
    5,
    ARRAY [
      'Prepare Ice Cream Maker if necessary.'
    ],
    20,
    ARRAY [
     'Whisk the eggs in a mixing bowl until light and fluffy, 1 to 2 minutes.',
     'Whisk in the sugar, a little at a time, then continue whisking until completely blended, about 1 minute more. Pour in the cream, milk, and vanilla and whisk to blend.',
     'Transfer the mixture to an ice cream maker and freeze following the manufacturer instructions.'
    ],
    ARRAY [
      'Top with sprinkles, whipped cream, a cherry, and enjoy!'
    ],
    ARRAY[
      'dessert'
    ]
  )";
  
  echo '✔  I Scream You Scream';

  #Cake Batter ICE CREAM
  psql recipes -c "INSERT INTO recipes (
    author,
    parent,
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
    tags
  ) VALUES (
    4,
    3,
    'Cake Batter Ice Cream',
    ARRAY [
      'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/12/89/52/f15xnUJJQc2kJB0O1v6o_birthday-cake-ice-cream-7207.jpg',
      'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/12/89/52/J3XsYX6tTTeN2E1pi9uB_birthday-cake-ice-cream-7204.jpg',
      'http://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/12/89/52/pic7sRu1R.jpg'
    ],
    ARRAY [
      1,
      2,
      3
    ],
    11,
    'Cup Servings',
    ARRAY [
      '1 cup whole milk, well chilled',
      '3⁄4 cup granulated sugar',
      '2 cups heavy cream, well chilled',
      '1 teaspoon pure vanilla extract',
      '2⁄3 cup cake mix'
    ],
    5,
    ARRAY [
      'Place freezer bowl of ice cream maker into the freezer. It is better to keep it in there 24/7 that way it is always ready.'
    ],
    25,
    ARRAY [
      'In a medium bowl, whisk the milk and granulated sugar until the sugar is dissolved.',
      'Stir in the heavy cream and vanilla to taste.',
      'Stir in cake mix, making sure there are no lumps.',
      'Pour mixture into the freezer bowl and let mix until it has thickened (about 25-30 minutes).',
      'Remove ice cream from freezer bowl and place into a separate container.',
      'Place freezer bowl and the ice cream into the freezer to further harden.'
    ],
    ARRAY [
      'Top with sprinkles, whipped cream, a cherry, and enjoy!'
    ],
    ARRAY[
      'dessert'
    ]
  )";
  
  echo '✔  We All Scream for Ice Cream!';
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
  psql -c "GRANT ALL PRIVILEGES ON DATABASE recipes TO admin";
  echo '✔  all privileges granted to admin on database recipes';
  psql -c "GRANT ALL PRIVILEGES ON DATABASE recipes TO developer";
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