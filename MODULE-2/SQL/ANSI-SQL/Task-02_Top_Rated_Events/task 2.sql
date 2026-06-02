USE event_portal;

SELECT 
    events.title,
    AVG(feedback.rating) AS average_rating,
    COUNT(feedback.feedback_id) AS feedback_count
FROM events
JOIN feedback
ON events.event_id = feedback.event_id
GROUP BY events.event_id, events.title
HAVING COUNT(feedback.feedback_id) >= 10
ORDER BY average_rating DESC;