from kr_backend import email_pb2_grpc
from kr_backend import email_pb2
import grpc


def send_email(username_reviewer, title, email):
    # NOTE(gRPC Python Team): .close() is possible on a channel and should be
    # used in circumstances in which the with statement does not fit the needs
    # of the code.
    print("Will try to greet world ...")
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = email_pb2_grpc.EmailServiceStub(channel)
        response = stub.GetEmail(email_pb2.EmailRequest(username_reviewer=username_reviewer, title=title, email=email))
    print("Greeter client received:", response.status)


# if __name__ == '__main__':
#     send_email()
