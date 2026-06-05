USE event_portal;

SELECT 
    users.user_id,
    users.full_name,
    COUNT(DISTINCT registrations.registration_id) AS events_attended,
    COUNT(DISTINCT feedback.feedback_id) AS feedback_submitted
FROM users
LEFT JOIN registrations
ON users.user_id = registrations.user_id
LEFT JOIN feedback
ON users.user_id = feedback.user_id
GROUP BY users.user_id, users.full_name;