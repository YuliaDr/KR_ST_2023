from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from . import serializers
from . import models


class UserListAPIView(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()


class PostListAPIView(viewsets.ModelViewSet):
    serializer_class = serializers.PostSerializer
    queryset = models.Post.objects.all()


class ReviewListAPIView(viewsets.ModelViewSet):
    serializer_class = serializers.ReviewSerializer
    queryset = models.Review.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["post"]


