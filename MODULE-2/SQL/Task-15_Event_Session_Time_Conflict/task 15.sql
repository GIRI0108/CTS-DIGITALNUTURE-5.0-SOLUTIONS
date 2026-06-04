USE event_portal;

SELECT 
    events.title AS event_title,
    s1.title AS session_1,
    s1.start_time AS session_1_start,
    s1.end_time AS session_1_end,
    s2.title AS session_2,
    s2.start_time AS session_2_start,
    s2.end_time AS session_2_end
FROM sessions s1
JOIN sessions s2
ON s1.event_id = s2.event_id
AND s1.session_id < s2.session_id
AND s1.start_time < s2.end_time
AND s2.start_time < s1.end_time
JOIN events
ON s1.event_id = events.event_id;