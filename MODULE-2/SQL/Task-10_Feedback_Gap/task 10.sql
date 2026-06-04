USE event_portal;

SELECT
    events.title,
    COUNT(DISTINCT registrations.registration_id) AS registration_count,
    COUNT(DISTINCT feedback.feedback_id) AS feedback_count
FROM events
JOIN registrations
ON events.event_id = registrations.event_id
LEFT JOIN feedback
ON events.event_id = feedback.event_id
GROUP BY events.event_id, events.title
HAVING COUNT(DISTINCT feedback.feedback_id) = 0;