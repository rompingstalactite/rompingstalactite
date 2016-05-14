DELETE FROM
  follows_users_users
WHERE
  target = ${target}
  AND follower = ${follower}
RETURNING *;
