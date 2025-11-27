from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .serializer import LoginSerializer, TicketSerializer
from .models import Ticket


class Login(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = authenticate(username=email, password=password)

        if not user:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)

        return Response({
            'token': str(refresh.access_token),
            'refresh': str(refresh)
        })


class TicketCreate(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TicketList(APIView):
    def get(self, request):
        tickets = Ticket.objects.all().order_by('-id')
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)


class TicketDetail(APIView):
    def get(self, request, pk):
        try:
            ticket = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response({"detail": "Not found"}, status=404)

        serializer = TicketSerializer(ticket)
        return Response(serializer.data)


class TicketStatusUpdate(APIView):
    def patch(self, request, pk):
        try:
            ticket = Ticket.objects.get(pk=pk)
        except Ticket.DoesNotExist:
            return Response({"detail": "Not found"}, status=404)

        ticket.status = request.data.get("status", ticket.status)
        ticket.save()

        return Response({"status": ticket.status}, status=200)
