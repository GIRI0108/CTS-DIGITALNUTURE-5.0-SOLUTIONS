USE event_portal;

SELECT 
    users.user_id,
    users.full_name,
    users.email,
    users.city
FROM users
WHERE users.user_id NOT IN (
    SELECT registrations.user_id
    FROM registrations
    WHERE registrations.registration_date >= CURDATE() - INTERVAL 90 DAY
);