#!/usr/bin/python3
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/home/pi/website/")

from config import secret_key
from mainscript import app as application
application.secret_key = secret_key