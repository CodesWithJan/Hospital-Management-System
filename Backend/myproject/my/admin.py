from django.contrib import admin

from .models import Admin,Doctor,Department,Billing,Patient,Prescription,Appointment
# Register your models here.
admin.site.register(Admin)
admin.site.register(Doctor)
admin.site.register(Department)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Prescription)
admin.site.register(Billing)