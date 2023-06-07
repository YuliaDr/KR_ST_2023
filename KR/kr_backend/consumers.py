import json
from channels.generic.websocket import AsyncWebsocketConsumer

from .client import send_email
# from .models import PostInfoView
# from asgiref.sync import sync_to_async

users = {}

# @sync_to_async
# def get_postinfo(id_rev, id_post):
#     return PostInfoView.objects.filter(id_reviewer=id_rev, id_post=id_post)[0]


class Consumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        k = -1
        for key, value in users.items():
            if value == self.channel_name:
                k = key
        if k != -1:
            del users[k]
        print(321, users)

    async def receive(self, text_data):
        print(json.loads(text_data))
        content = json.loads(text_data)
        if content['event'] == 'connection':
            print('Connection')
            users[content['user']] = self.channel_name
            print(users)
        if content['event'] == 'notification':
            print('Message')
            if content['id_poster'] in users:
                response_data = {'title': content['title'], 'username_reviewer': content['username_reviewer']}

                new_event = {
                    'type': 'notify_message',
                    'text': json.dumps(response_data)

                }
                await self.channel_layer.send(users[content['id_poster']], new_event)

            else:
                print("Not connected")
                send_email(username_reviewer=content['username_reviewer'],
                           title=content['title'],
                           email=content['email'])

    async def notify_message(self, event):
        print(333, event)
        await self.send(event['text'])


