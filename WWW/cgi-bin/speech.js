var text = WScript.Arguments(0).replace(/%20/g, " ").replace(/\+/g, " ");
var outfile = WScript.Arguments(1);

var engine = WScript.CreateObject("Sapi.spvoice");
var wav = WScript.CreateObject("Sapi.SpFileStream");

wav.Format.Type = 49;
wav.Open(outfile, 3);
engine.AudioOutputStream = wav;
engine.Speak(text);
wav.Close();
