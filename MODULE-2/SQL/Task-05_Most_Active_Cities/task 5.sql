USE event_portal;

SELECT 
    users.city,
    COUNT(DISTINCT registrations.registration_id) AS total_registrations
FROM users
JOIN registrations
ON users.user_id = registrations.user_id
GROUP BY users.city
ORDER BY total_registrations DESC
LIMIT 5;