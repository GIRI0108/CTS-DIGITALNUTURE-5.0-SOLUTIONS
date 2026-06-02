USE event_portal;

SELECT 
    events.title,
    COUNT(resources.resource_id) AS total_resources,
    SUM(CASE WHEN resources.resource_type = 'pdf' THEN 1 ELSE 0 END) AS pdf_count,
    SUM(CASE WHEN resources.resource_type = 'image' THEN 1 ELSE 0 END) AS image_count,
    SUM(CASE WHEN resources.resource_type = 'link' THEN 1 ELSE 0 END) AS link_count
FROM events
LEFT JOIN resources
ON events.event_id = resources.event_id
GROUP BY events.event_id, events.title;