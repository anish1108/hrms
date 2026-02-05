from django.forms.models import model_to_dict

def employee_to_dict(employee):
    return {
        "id": str(employee.id),
        "employee_id": employee.employee_id,
        "full_name": employee.full_name,
        "email": employee.email,
        "department": employee.department,
        "created_at": employee.created_at,
    }


def attendance_to_dict(att):
    return {
        "id": str(att.id),
        "employee_id": str(att.employee.id),
        "employee_name": att.employee.full_name,
        "date": att.date,
        "status": att.status,
    }
