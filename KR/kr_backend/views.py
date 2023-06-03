from datetime import datetime
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import ast
import json
from kr_backend.models import User


@csrf_exempt
def auth_view(request):
    body = ast.literal_eval(request.body.decode('utf-8'))
    email = body["email"]
    password = body["password"]
    print(email, password)
    try:
        user = User.objects.get(email=email)
        if user is not None and user.check_password(password):
            login(request, user)
            # data = {"status": "ok", "email": email}
            data = {"status": "ok", "id": user.id, "email": email, "first_name": user.first_name,
                    "last_name": user.last_name, "middle_name": user.middle_name}
            dump = json.dumps(data)
            response = HttpResponse(dump, content_type="application/json")

            return response
        else:
            data = {"status": "error", "error": "login failed"}
            dump = json.dumps(data)
            return HttpResponse(dump, content_type="application/json")

    except User.DoesNotExist:
        data = {"status": "error", "error": "does not exist"}
        dump = json.dumps(data)
        return HttpResponse(dump, content_type="application/json")


@csrf_exempt
# @login_required
def logout_view(request):
    logout(request)
    data = {"status": "ok"}
    dump = json.dumps(data)
    response = HttpResponse(dump, content_type="application/json")
    return response


@csrf_exempt
def register_view(request):
    print('123', request.body)

    body = ast.literal_eval(request.body.decode('utf-8'))
    email = body["email"]
    password = body["password"]
    last_name = body["last_name"]
    first_name = body["first_name"]
    middle_name = body["middle_name"]

    try:
        user = User.objects.get(email=email)
        # print(user)
        data = {"status": "exists"}
        dump = json.dumps(data)
        response = HttpResponse(dump, content_type="application/json")
    except User.DoesNotExist:
        user = User.objects.create_user(password=password, email=email, first_name=first_name,
                                        last_name=last_name, middle_name=middle_name)
        user.save()
        login(request, user)

        # data = {"status": "ok", "email": email}
        data = {"status": "ok", "id": user.id, "email": email, "first_name": user.first_name,
                "last_name": user.last_name, "middle_name": user.middle_name}
        dump = json.dumps(data)

        response = HttpResponse(dump, content_type="application/json")
    return response

