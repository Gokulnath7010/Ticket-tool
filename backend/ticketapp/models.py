from django.db import models

class Ticket(models.Model):
    sender_name = models.CharField(max_length=100)
    sender_email = models.EmailField()
    receiver_name = models.CharField(max_length=100)
    receiver_email = models.EmailField()
    subject = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(max_length=10, choices=[('high','high'),('medium','medium'),('low','low')], default='medium')
    status = models.CharField(max_length=20, default='raised')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class TicketAttachment(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
