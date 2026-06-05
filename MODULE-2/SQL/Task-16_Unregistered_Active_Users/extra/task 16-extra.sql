USE event_portal;

SELECT 
    users.user_id,
    users.full_name,
    users.email,
    users.city,
    users.registration_date
FROM users
LEFT JOIN registrations
ON users.user_id = registrations.user_id
WHERE users.registration_date >= CURDATE() - INTERVAL 30 DAY
AND registrations.registration_id IS NULL;