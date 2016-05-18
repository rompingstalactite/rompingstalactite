DELETE FROM
  followers_users_users
WHERE
  target = ${targetID}
  AND follower = ${userID}
RETURNING *;
