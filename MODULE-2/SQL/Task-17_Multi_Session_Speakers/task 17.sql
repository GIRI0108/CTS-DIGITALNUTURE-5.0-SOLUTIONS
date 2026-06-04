USE event_portal;

SELECT 
    speaker_name,
    COUNT(session_id) AS session_count
FROM sessions
GROUP BY speaker_name
HAVING COUNT(session_id) > 1;