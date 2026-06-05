USE event_portal;

SELECT 
    events.event_id,
    events.title,
    events.status
FROM events
LEFT JOIN sessions
ON events.event_id = sessions.event_id
WHERE sessions.session_id IS NULL;