SELECT
  COUNT(*)
FROM
  follows_users_users
WHERE
  target = ${user};
