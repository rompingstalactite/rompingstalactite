DELETE FROM
  followers_users_users
WHERE
  target = ${target}
  AND follower = ${follower}
RETURNING *;
