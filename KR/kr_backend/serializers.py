from . import models
from rest_framework import serializers
# from django_grpc_framework import proto_serializers
# import post_info_pb2


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'last_name', 'first_name', 'middle_name', 'email',)


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ('id', 'user', 'authors', 'title', 'annotation', 'date',)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = ('id', 'post', 'user', 'text', 'date',)


# class PostInfoProtoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.PostInfoView
#         fields = ('id_post', 'id_reviewer', 'id_poster', 'title', 'username_reviewer',)
