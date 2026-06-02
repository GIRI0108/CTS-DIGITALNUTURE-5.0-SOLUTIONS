USE event_portal;

SELECT 
    events.title,
    COUNT(registrations.registration_id) AS total_registrations
FROM events
LEFT JOIN registrations
ON events.event_id = registrations.event_id
GROUP BY events.event_id, events.title
ORDER BY total_registrations DESC
LIMIT 3;