from django.urls import path
from . import views

urlpatterns = [
    #Admin
    path("admin/Create/", views.Create_Admin),
    path("admin/Read/",views.Read_Admin),
    path("admin/Update/<int:id>/",views.Update_Admin),
    path("admin/Delete/<int:id>/",views.Delete_Admin),

    #Department
    path("Department/Create/", views.Create_Department),
    path("Department/Read/",views.Read_Department),
    path("Department/Update/<int:id>/",views.Update_Department),
    path("Department/Delete/<int:id>/",views.Delete_Department),

    #Doctor
    path("Doctor/Create/", views.Create_Doctor),
    path("Doctor/Read/",views.Read_Doctor),
    path("Doctor/Update/<int:id>/",views.Update_Doctor),
    path("Doctor/Delete/<int:id>/",views.Delete_Doctor),

    #Patient
    path("Patient/Create/", views.Create_Patient),
    path("Patient/Read/",views.Read_Patient),
    path("Patient/Update/<int:id>/",views.Update_Patient),
    path("Patient/Delete/<int:id>/",views.Delete_Patient),

    #Appointment
    path("Appointment/Create/", views.Create_Appointment),
    path("Appointment/Read/",views.Read_Appointment),
    path("Appointment/Update/<int:id>/",views.Update_Appointment),
    path("Appointment/Delete/<int:id>/",views.Delete_Appointment),

    #Prescription
    path("Prescription/Create/", views.Create_Prescription),
    path("Prescription/Read/",views.Read_Prescription),
    path("Prescription/Update/<int:id>/",views.Update_Prescription),
    path("Prescription/Delete/<int:id>/",views.Delete_Prescription),

    #Billing
    path("Billing/Create/", views.Create_Billing),
    path("Billing/Read/",views.Read_Billing),
    path("Billing/Update/<int:id>/",views.Update_Billing),
    path("Billing/Delete/<int:id>/",views.Delete_Billing)
]