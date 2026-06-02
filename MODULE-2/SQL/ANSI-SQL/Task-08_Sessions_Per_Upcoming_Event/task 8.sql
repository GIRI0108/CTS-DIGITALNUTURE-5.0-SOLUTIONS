USE event_portal;

SELECT
    events.title,
    events.status,
    COUNT(sessions.session_id) AS session_count
FROM events
LEFT JOIN sessions
ON events.event_id = sessions.event_id
WHERE events.status = 'upcoming'
GROUP BY events.event_id, events.title, events.status;