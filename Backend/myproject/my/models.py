from django.db import models

# Create your models here.
class Admin(models.Model):
    username=models.CharField(max_length=20)
    email=models.EmailField()
    password=models.CharField(max_length=128)

    def __str__(self):
        return self.username
    
class Department(models.Model):
    department_name = models.CharField(max_length=50)
    descriptions = models.CharField(max_length=100)

    def __str__(self):
        return self.department_name

class Doctor(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    experience = models.IntegerField()
    specialization = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Patient(models.Model):
    name=models.CharField(max_length=20)
    age=models.IntegerField()
    gender=models.CharField(max_length=20)
    phone=models.CharField(max_length=20)
    address=models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    patient=models.ForeignKey(Patient,on_delete=models.CASCADE)
    doctor=models.ForeignKey(Doctor,on_delete=models.CASCADE)
    date=models.DateField()
    time=models.TimeField()
    status=models.CharField(max_length=50,default="pending")

    def __str__(self):
        return self.patient.name

class Prescription(models.Model):
    patient=models.ForeignKey(Patient,on_delete=models.CASCADE)
    doctor=models.ForeignKey(Doctor,on_delete=models.CASCADE)
    medicine=models.CharField(max_length=100)
    dosage=models.CharField(max_length=50)

    def __str__(self):
        return self.patient.name

class Billing(models.Model):
    patient=models.ForeignKey(Patient,on_delete=models.CASCADE)
    amount=models.IntegerField()
    payment_status=models.CharField(max_length=20,default="pending")
    
    def __str__(self):
        return self.patient.name