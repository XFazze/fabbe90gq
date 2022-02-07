#!/usr/bin/python2
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/home/ubuntu/website/src/")

from config import secretKey
from mainscript import app as application
application.secret_key = secretKey
