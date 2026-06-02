USE event_portal;

SELECT 
    events.event_id,
    events.title
FROM events
LEFT JOIN resources
ON events.event_id = resources.event_id
WHERE resources.resource_id IS NULL;