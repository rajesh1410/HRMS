

select id,employee_name,permission_date,leave_type,status, 
IF(from_date <= '2019-12-27' ,'2019-12-27',from_date)  as from_date,
IF(to_date >= '2019-12-31','2019-12-31',to_date) as to_date
from leave_forms 
where employee_name = 'cl0003'
AND status='Approved' 
AND ((permission_date BETWEEN '2019-12-27' AND '2019-12-31') 
OR (from_date BETWEEN '2019-12-27' AND '2019-12-31') 
OR (to_date BETWEEN '2019-12-27' AND '2019-12-31') OR (from_date <= '2019-12-27' AND to_date >='2019-12-31'))

