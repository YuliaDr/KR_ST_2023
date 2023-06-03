from django.urls import path

from kr_backend.consumers import Consumer

websocket_urlpatterns = [
    path('ws/postinfo/', Consumer.as_asgi()),
]
