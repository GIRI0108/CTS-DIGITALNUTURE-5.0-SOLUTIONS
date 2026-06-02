USE event_portal;

SELECT 
    users.full_name,
    users.city,
    events.title,
    events.start_date,
    events.status
FROM users
JOIN registrations
ON users.user_id = registrations.user_id
JOIN events
ON registrations.event_id = events.event_id
WHERE events.status = 'upcoming'
AND users.city = events.city
ORDER BY events.start_date;