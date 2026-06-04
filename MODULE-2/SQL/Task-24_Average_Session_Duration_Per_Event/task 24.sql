USE event_portal;

SELECT 
    events.title,
    AVG(TIMESTAMPDIFF(MINUTE, sessions.start_time, sessions.end_time)) AS average_duration_minutes
FROM events
JOIN sessions
ON events.event_id = sessions.event_id
GROUP BY events.event_id, events.title;