SELECT
  COUNT(*)
FROM
  followers_users_users
WHERE
  target = ${user};
