
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Admin,Appointment,Billing,Patient,Prescription,Department,Doctor
from .serializers import AdminSerializer,AppointmentSerializer,BillingSerializer,DoctorSerializer,DepartmentSerializer,PrescriptionSerializer,PatientSerializer
# Create your views here.

#Create Admin
@api_view(["POST"])
def Create_Admin(request):
    serializers=AdminSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response (serializers.data,status=201)
    return Response(serializers.errors,status=400)

#Read Admin
@api_view(["GET"])
def Read_Admin(request):
    data=Admin.objects.all()
    serializers=AdminSerializer(data,many=True)
    return Response (serializers.data)

#Update Admin
@api_view(["PUT"])
def Update_Admin(request, id):
    try:
        data = Admin.objects.get(id=id)
    except Admin.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
    serializers = AdminSerializer(data, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=200)
    return Response(serializers.errors, status=400)

#Delete Admin
@api_view(["DELETE"])
def Delete_Admin(request,id):
    try:
        data=Admin.objects.get(id=id)
        data.delete()
        return Response ({"message":"Admin Delete Successfully"})
    except Admin.DoesNotExist:
        return Response ({"Error": "Not Found"}, status=404)



#Create Department
@api_view(["POST"])
def Create_Department(request):
    serializers=DepartmentSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response (serializers.data,status=201)
    return Response(serializers.errors,status=400)

#Read Department
@api_view(["GET"])
def Read_Department(request):
    data=Department.objects.all()
    serializers=DepartmentSerializer(data,many=True)
    return Response(serializers.data)

#Update Department
@api_view(["PUT"])
def Update_Department(request, id):
    try:
        data = Department.objects.get(id=id)
    except Department.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
    serializers = DepartmentSerializer(data, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=200)
    return Response(serializers.errors, status=400)

#Delete Department
@api_view(["DELETE"])
def Delete_Department(request,id):
    try:
        data = Department.objects.get(id=id)
        data.delete()
        return Response({"Message": "Department Deleted Successfully"})
    except Department.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)

#Delete Appointment
@api_view(["DELETE"])
def Delete_Appointment(request,id):
    try:
        data = Appointment.objects.get(id=id)
        data.delete()
        return Response({"Message": "Appointment Deleted Successfully"})
    except Appointment.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)

#Create Doctor
@api_view(["POST"])
def Create_Doctor(request):
    serializers=DoctorSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response (serializers.data,status=201)
    return Response(serializers.errors,status=400)
        
#Read Doctor
@api_view(["GET"])
def Read_Doctor(request):
    data=Doctor.objects.all()
    serializers=DoctorSerializer(data,many=True)
    return Response(serializers.data)

# Update Doctor
@api_view(["PUT"])
def Update_Doctor(request, id):
    try:
        data = Doctor.objects.get(id=id)
    except Doctor.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
    serializers = DoctorSerializer(data, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=200)
    return Response(serializers.errors, status=400)

#Delete Doctor
@api_view(["DELETE"])
def Delete_Doctor(request,id):
    try:
        data = Doctor.objects.get(id=id)
        data.delete()
        return Response({"Message": "Doctor Deleted Successfully"})
    except Doctor.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
    



#Create Patient
@api_view(["POST"])
def Create_Patient(request):
    serializers=PatientSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response (serializers.data,status=201)
    return Response(serializers.errors,status=400)

#Read Patient
@api_view(["GET"])
def Read_Patient(request):
    data=Patient.objects.all()
    serializers=PatientSerializer(data,many=True)
    return Response(serializers.data)

#Update Patient
@api_view(["PUT"])
def Update_Patient(request, id):
    try:
        data = Patient.objects.get(id=id)
    except Patient.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
    serializers = PatientSerializer(data, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=200)
    return Response(serializers.errors, status=400)

#Delete Patient
@api_view(["DELETE"])
def Delete_Patient(request,id):
    try:
        data = Patient.objects.get(id=id)
        data.delete()
        return Response({"Message": "Patient Deleted Successfully"})
    except Patient.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)


    
#Create Appointment
@api_view(["POST"])
def Create_Appointment(request):
    serializers=AppointmentSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data,status=201)
    return Response(serializers.errors,status=400)

#Read Appointment
@api_view(["GET"])
def Read_Appointment(request):
    data=Appointment.objects.all()
    serializers=AppointmentSerializer(data,many=True)
    return Response(serializers.data)

#Update Appointment
@api_view(["PUT"])
def Update_Appointment(request, id):
    try:
        data = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
    serializers = AppointmentSerializer(data, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=200)
    return Response(serializers.errors, status=400)    



#Create Prescription
@api_view(["POST"])
def Create_Prescription(request):
    serializers=PrescriptionSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response (serializers.data,status=201)
    return Response(serializers.errors,status=400)

#Read Prescription
@api_view(["GET"])
def Read_Prescription(request):
    data=Prescription.objects.all()
    serializers=PrescriptionSerializer(data,many=True)
    return Response(serializers.data)

#Update Prescription
@api_view(["PUT"])
def Update_Prescription(request, id):
    try:
        data = Prescription.objects.get(id=id)
    except Prescription.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
    serializers = PrescriptionSerializer(data, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=200)
    return Response(serializers.errors, status=400)

#Delete Prescription
@api_view(["DELETE"])
def Delete_Prescription(request,id):
    try:
        data = Prescription.objects.get(id=id)
        data.delete()
        return Response({"Message": "Prescription Deleted Successfully"})
    except Prescription.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)


#Create Billing
@api_view(["POST"])
def Create_Billing(request):
    serializers=BillingSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response (serializers.data,status=201)
    return Response(serializers.errors,status=400)

#Read Billing
@api_view(["GET"])
def Read_Billing(request):
    data=Billing.objects.all()
    serializers=BillingSerializer(data,many=True)
    return Response(serializers.data)

#Update Billing
@api_view(["PUT"])
def Update_Billing(request, id):
    try:
        data = Billing.objects.get(id=id)
    except Billing.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
    serializers = BillingSerializer(data, data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data, status=200)
    return Response(serializers.errors, status=400)

#Delete Billing
@api_view(["DELETE"])
def Delete_Billing(request,id):
    try:
        data = Billing.objects.get(id=id)
        data.delete()
        return Response({"Message": "Billing Deleted Successfully"})
    except Billing.DoesNotExist:
        return Response({"Error": "Not Found"}, status=404)
