from django.urls import path
from .views import Login, TicketCreate, TicketList, TicketDetail, TicketStatusUpdate

urlpatterns = [
    path('login/', Login.as_view()),

    path('tickets/create/', TicketCreate.as_view()),
    path('tickets/', TicketList.as_view()),
    path('tickets/<int:pk>/', TicketDetail.as_view()),
    path('tickets/<int:pk>/update-status/', TicketStatusUpdate.as_view()),
]
