USE event_portal;

SELECT 
    users.full_name,
    COUNT(feedback.feedback_id) AS feedback_count
FROM users
JOIN feedback
ON users.user_id = feedback.user_id
GROUP BY users.user_id, users.full_name
ORDER BY feedback_count DESC
LIMIT 5;