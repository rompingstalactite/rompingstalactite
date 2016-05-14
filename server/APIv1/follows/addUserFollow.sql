INSERT INTO
  followers_users_users
    (follower, target)
VALUES
  (${currentUser}, ${target})
ON CONFLICT
  (follower, target)
DO NOTHING
RETURNING *;
