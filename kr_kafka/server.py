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

    def send_email(self, email, message, retry_count):
        sender = "publication.review@mail.ru"
        password = "sNfnWhy1ZuhZYDF8M8Lx"
        print(3)
        try:
            print(4)
            server = smtplib.SMTP("smtp.mail.ru", 587)
            server.starttls()
            print(9)
            server.login(sender, password)
            print(10, message)
            msg = MIMEText(message)
            msg["email_from"] = "Publication Review"
            msg["Subject"] = "Новая рецензия на Вашу публикацию!"
            print(11, msg)
            server.sendmail(sender, email, msg.as_string())
            print(12)
            server.quit()
            print("Сообщение доставлено!")
        except Exception as e:
            print(f"An error occurred when sending email: {e}")
            # if retry_count < 2:
            #     retry_count += 1
            #     sleep(5)
            #     self.send_email(message, retry_count=retry_count)
            # else:
            #     context.set_details(error_msg)
            #     context.set_code(StatusCode.INTERNAL)
            #     raise RpcError(f'Failed to send email. Error: {e}')


    async def GetEmail(self, request, context):
        print(5)

        print(1)
        kafka_server = 'localhost:29092'
        producer = KafkaProducer(bootstrap_servers=[kafka_server], api_version=(0, 11, 5),
                                 value_serializer=lambda x: x.encode('utf-8'))
        # consumer = KafkaConsumer("my_topic_name", bootstrap_servers=[kafka_server], auto_offset_reset='earliest',
        #                          enable_auto_commit=True, group_id='my_group_id', api_version=(0c,11,5),
        #                          value_deserializer=lambda x: x.decode('utf-8'))
        consumer = KafkaConsumer("my_topic_name", bootstrap_servers=[kafka_server], auto_offset_reset='earliest',
                                 group_id=None, api_version=(0, 11, 5))
        print(2)

        username_reviewer = request.username_reviewer
        title = request.title
        email = request.email
        print(6)
        # nin = str(pin)

        # message = f"id_card:{id_card}|number_card:{number_card}|cvc:{cvc}|pin:{pin}|contract_id:{contract_id}"
        message = f'{username_reviewer} оставил(а) рецензию на вашу публикацию "{title}"'
        print(666, message)

        producer.send("my_topic_name", value=message)
        print(7)
        producer.flush()
        print(8)

        tp = TopicPartition("my_topic_name", 0)
        print(21)
        # consumer.assign([tp])
        consumer.poll()
        print(22)
        # consumer.seek_to_end()
        last_offset = consumer.end_offsets([tp])[TopicPartition(topic='my_topic_name', partition=0)]
        print(23, last_offset)
        # last_offset = consumer.position(tp)
        # consumer.poll()
        # consumer.seek_to_end()
        messages = []
        print(13, messages)
        for msg in consumer:
            print(msg.value)
            print(msg.value.decode('utf-8'))
            messages.append(msg.value.decode('utf-8'))
            print(14, messages)
            if msg.offset == last_offset - 1:
                break
        consumer.close()
        print(20)
        print(messages)
        print(15, messages)
        print(16, messages[len(messages)-1])
        self.send_email(email, messages[len(messages)-1], 0)

        response = email_pb2.EmailResponse()
        response.status = 'Ok!'
        # if nin == '1':
        return response
        #     # response_msg = msg.value
        #     # id_card, number_card, cvc, pin, contract_id = response_msg.split("|")
        #     response = email_pb2.EmailResponse()
        #     response.status = 'Ok!'
        # # if nin == '1':
        #     print(12, msg.value)
        #     self.send_email(email, msg.value, 0)
        #     # consumer = []
        #     return response

        # print("Server get request: ", request)
        # response = email_pb2.EmailResponse()
        # response.status = 'Ok!'

        # return response


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    print("Server is working")
    email_pb2_grpc.add_EmailServiceServicer_to_server(EmailServiceServicer(), server)
    server.add_insecure_port("localhost:50051")
    server.start()
    server.wait_for_termination()


if __name__ == "__main__":
    serve()
