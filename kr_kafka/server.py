import json
from json import dumps
import grpc
import smtplib
from kafka import KafkaProducer, KafkaConsumer, TopicPartition
from email.mime.text import MIMEText
from concurrent import futures
import email_pb2
import email_pb2_grpc


class EmailServiceServicer(email_pb2_grpc.EmailServiceServicer):

    def send_email(self, email, message):
        sender = "publication.review@mail.ru"
        password = "sNfnWhy1ZuhZYDF8M8Lx"
        try:
            server = smtplib.SMTP("smtp.mail.ru", 587)
            server.starttls()
            server.login(sender, password)
            msg = MIMEText(message)
            msg["email_from"] = "Publication Review"
            msg["Subject"] = "Новая рецензия на Вашу публикацию!"
            server.sendmail(sender, email, msg.as_string())
            server.quit()
            print("Сообщение доставлено!")
        except Exception as e:
            print(f"An error occurred when sending email: {e}")

    def GetEmail(self, request, context):
        kafka_server = 'localhost:29092'
        producer = KafkaProducer(bootstrap_servers=[kafka_server], api_version=(0, 11, 5),
                                 value_serializer=lambda x: x.encode('utf-8'))
        consumer = KafkaConsumer("my_topic_name", bootstrap_servers=[kafka_server], auto_offset_reset='earliest',
                                 group_id=None, api_version=(0, 11, 5))

        username_reviewer = request.username_reviewer
        title = request.title
        email = request.email

        message = f'{username_reviewer} оставил(а) рецензию на вашу публикацию "{title}"'
        print(666, message)

        producer.send("my_topic_name", value=message)
        producer.flush()

        tp = TopicPartition("my_topic_name", 0)
        consumer.poll()
        last_offset = consumer.end_offsets([tp])[TopicPartition(topic='my_topic_name', partition=0)]
        messages = []
        for msg in consumer:
            messages.append(msg.value.decode('utf-8'))
            if msg.offset == last_offset - 1:
                break
        consumer.close()
        self.send_email(email, messages[len(messages)-1])

        response = email_pb2.EmailResponse()
        response.status = 'Ok!'
        return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    print("Server is working")
    email_pb2_grpc.add_EmailServiceServicer_to_server(EmailServiceServicer(), server)
    server.add_insecure_port("localhost:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
