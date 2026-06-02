USE event_portal;

SELECT
    events.title,
    COUNT(sessions.session_id) AS session_count
FROM events
LEFT JOIN sessions
ON events.event_id = sessions.event_id
AND TIME(sessions.start_time) >= '10:00:00'
AND TIME(sessions.start_time) < '12:00:00'
GROUP BY events.event_id, events.title;