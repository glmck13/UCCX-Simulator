import sys
import os
from win32com import client
from urllib.parse import parse_qs as cgi

form = cgi(os.getenv("QUERY_STRING", ""))

cmd = form.get("cmd", [""])[0]
arg1 = form.get("arg1", [""])[0]
outfile = "./cdn/out{}.wav".format(os.getpid())

print("Content-Type: text/plain\n")

if cmd == "cat":
	with open(outfile, "wb") as f:
		while True:
			line = sys.stdin.readline()
			if not line:
				break
			f.write(bytes.fromhex(line))
	print(outfile[1:])

elif cmd == "tts":
	engine = client.Dispatch("Sapi.spvoice")
	wav = client.Dispatch("Sapi.SpFileStream")
	wav.Format.Type = 49
	wav.Open(outfile, 3)
	engine.AudioOutputStream = wav
	engine.Speak(arg1)
	wav.Close()
	print(outfile[1:])
