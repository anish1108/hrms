from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from .models import Employee, Attendance
from .utils import employee_to_dict, attendance_to_dict


# Create your views here.


class EmployeeListCreateView(APIView):

    def get(self, request):
        employees = Employee.objects.all()
        data = [employee_to_dict(emp) for emp in employees]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data

        required_fields = ['employee_id', 'full_name', 'email', 'department']
        for field in required_fields:
            if field not in data or not data[field]:
                return Response(
                    {"error": f"{field} is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Email validation
        try:
            validate_email(data['email'])
        except ValidationError:
            return Response({"error": "Invalid email format"}, status=400)

        # Duplicate checks
        if Employee.objects.filter(employee_id=data['employee_id']).exists():
            return Response({"error": "Employee ID already exists"}, status=400)

        if Employee.objects.filter(email=data['email']).exists():
            return Response({"error": "Email already exists"}, status=400)

        employee = Employee.objects.create(
            employee_id=data['employee_id'],
            full_name=data['full_name'],
            email=data['email'],
            department=data['department']
        )

        return Response(employee_to_dict(employee), status=status.HTTP_201_CREATED)


class EmployeeDeleteView(APIView):

    def delete(self, request, pk):
        employee = get_object_or_404(Employee, pk=pk)
        employee.delete()
        return Response(
            {"message": "Employee deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )


class AttendanceCreateView(APIView):

    def post(self, request):
        data = request.data

        required_fields = ['employee_id', 'date', 'status']
        for field in required_fields:
            if field not in data or not data[field]:
                return Response(
                    {"error": f"{field} is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        employee = get_object_or_404(Employee, id=data['employee_id'])

        if data['status'] not in ['PRESENT', 'ABSENT']:
            return Response(
                {"error": "Status must be PRESENT or ABSENT"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if Attendance.objects.filter(employee=employee, date=data['date']).exists():
            return Response(
                {"error": "Attendance already marked for this date"},
                status=status.HTTP_400_BAD_REQUEST
            )

        attendance = Attendance.objects.create(
            employee=employee,
            date=data['date'],
            status=data['status']
        )

        return Response(attendance_to_dict(attendance), status=status.HTTP_201_CREATED)



class AttendanceListView(APIView):

    def get(self, request, employee_id):
        employee = get_object_or_404(Employee, id=employee_id)
        attendance = Attendance.objects.filter(employee=employee)

        data = [attendance_to_dict(att) for att in attendance]
        return Response(data, status=status.HTTP_200_OK)
