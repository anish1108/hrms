from django.urls import path
from .views import (
    EmployeeListCreateView,
    EmployeeDeleteView,
    AttendanceCreateView,
    AttendanceListView
)

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view()),
    path('employees/<uuid:pk>/', EmployeeDeleteView.as_view()),
    path('attendance/', AttendanceCreateView.as_view()),
    path('attendance/<uuid:employee_id>/', AttendanceListView.as_view()),
]
