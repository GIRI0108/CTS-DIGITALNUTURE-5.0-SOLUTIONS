USE event_portal;

SELECT
    users.full_name,
    events.title,
    feedback.rating,
    feedback.comments
FROM feedback
JOIN users
ON feedback.user_id = users.user_id
JOIN events
ON feedback.event_id = events.event_id
WHERE feedback.rating < 3;