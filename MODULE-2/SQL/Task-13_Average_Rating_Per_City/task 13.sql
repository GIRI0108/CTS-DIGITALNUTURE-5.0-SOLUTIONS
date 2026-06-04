USE event_portal;

SELECT 
    events.city,
    AVG(feedback.rating) AS average_rating
FROM events
JOIN feedback
ON events.event_id = feedback.event_id
GROUP BY events.city;