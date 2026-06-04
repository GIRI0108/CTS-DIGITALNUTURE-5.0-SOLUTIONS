USE event_portal;

SELECT 
    DATE_FORMAT(registration_date, '%Y-%m') AS registration_month,
    COUNT(registration_id) AS registration_count
FROM registrations
GROUP BY DATE_FORMAT(registration_date, '%Y-%m')
ORDER BY registration_month;