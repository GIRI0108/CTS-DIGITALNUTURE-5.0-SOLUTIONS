USE event_portal;

SELECT 
    events.title,
    COUNT(DISTINCT registrations.registration_id) AS total_registrations,
    AVG(feedback.rating) AS average_rating
FROM events
LEFT JOIN registrations
ON events.event_id = registrations.event_id
LEFT JOIN feedback
ON events.event_id = feedback.event_id
WHERE events.status = 'completed'
GROUP BY events.event_id, events.title;