from rest_framework import serializers 
from .models import Admin,Doctor,Department,Billing,Patient,Prescription,Appointment

class AdminSerializer(serializers.ModelSerializer):
    class Meta():
        model=Admin
        fields="__all__"

class DoctorSerializer(serializers.ModelSerializer):
    class Meta():
        model=Doctor
        fields="__all__"

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta():
        model=Department
        fields="__all__"      

class BillingSerializer(serializers.ModelSerializer):
    class Meta():
        model=Billing
        fields="__all__"

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta():
        model=Appointment
        fields="__all__"

class PatientSerializer(serializers.ModelSerializer):
    class Meta():
        model=Patient
        fields="__all__"

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta():
        model=Prescription
        fields="__all__"