USE event_portal;

SELECT 
    events.title,
    COUNT(sessions.session_id) AS session_count
FROM events
LEFT JOIN sessions
ON events.event_id = sessions.event_id
GROUP BY events.event_id, events.title
HAVING COUNT(sessions.session_id) = (
    SELECT MAX(session_count)
    FROM (
        SELECT COUNT(session_id) AS session_count
        FROM sessions
        GROUP BY event_id
    ) AS session_counts
);