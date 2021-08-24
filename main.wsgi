#!/usr/bin/python3
import sys
import logging
from config import secret_key
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/home/pi/website/")

from mainscript import app as application
application.secret_key = secret_key
#huh