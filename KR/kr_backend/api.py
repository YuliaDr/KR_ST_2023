from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import viewsets, status
from rest_framework.response import Response

from . import serializers
from . import models


class UserListAPIView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly,]
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()


class PostListAPIView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly,]

    serializer_class = serializers.PostSerializer
    queryset = models.Post.objects.all()

    # def create(self, request):
    #     print("1 ", self.request.authenticators)
    #     return Response(status=status.HTTP_200_OK, data='...')


class ReviewListAPIView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly,]

    serializer_class = serializers.ReviewSerializer
    queryset = models.Review.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["post"]

    # def create(self, request):
    #     print("2 ", self.request.successful_authenticator)
    #     return Response(status=status.HTTP_200_OK, data='...')


