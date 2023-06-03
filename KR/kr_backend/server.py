# import os
# print(os.environ)
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', "KR.settings")
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'KR/settings')
#
# import django
# django.setup()

import grpc
from concurrent import futures
import post_info_pb2
import post_info_pb2_grpc
# from models import PostInfoView


class PostInfoServiceServicer(post_info_pb2_grpc.PostInfoServiceServicer):
    def GetPostInfo(self, request, context):
        print("Server get request: ", request)
        # queryset = PostInfoView.objects.filter(id_reviewer=request.id_reviewer, id_post=request.id_post)[0]
        # print("Queryset: ", queryset)
        # response = post_info_pb2.PostInfo()
        # response.id_poster = queryset.id_poster
        # response.title = queryset.title
        # response.username_reviewer = queryset.username_reviewer
        response = 'Hello'
        print("Server send response: ", response)

        return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    print("Server is working")
    post_info_pb2_grpc.add_PostInfoServiceServicer_to_server(PostInfoServiceServicer(), server)
    server.add_insecure_port("localhost:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
