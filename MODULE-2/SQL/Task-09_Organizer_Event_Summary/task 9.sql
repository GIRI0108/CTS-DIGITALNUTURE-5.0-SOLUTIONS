USE event_portal;

SELECT
    users.full_name AS organizer_name,
    events.status,
    COUNT(events.event_id) AS total_events
FROM users
JOIN events
ON users.user_id = events.organizer_id
GROUP BY users.full_name, events.status;