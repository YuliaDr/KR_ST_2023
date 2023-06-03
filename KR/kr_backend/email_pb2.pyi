from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class EmailRequest(_message.Message):
    __slots__ = ["email", "title", "username_reviewer"]
    EMAIL_FIELD_NUMBER: _ClassVar[int]
    TITLE_FIELD_NUMBER: _ClassVar[int]
    USERNAME_REVIEWER_FIELD_NUMBER: _ClassVar[int]
    email: str
    title: str
    username_reviewer: str
    def __init__(self, username_reviewer: _Optional[str] = ..., title: _Optional[str] = ..., email: _Optional[str] = ...) -> None: ...

class EmailResponse(_message.Message):
    __slots__ = ["status"]
    STATUS_FIELD_NUMBER: _ClassVar[int]
    status: str
    def __init__(self, status: _Optional[str] = ...) -> None: ...
