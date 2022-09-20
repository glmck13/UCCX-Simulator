var ScriptRunning = true;
var Pause = 100;
var Timeout = 10000;

function callbackRecognition(StreamNumber, StreamPosition, RecognitionType, Result) {
  WScript.Echo("Reco: ", Result.PhraseInfo.GetText(), ".", RecognitionType);
}

function callbackStartStream(StreamNumber, StreamPosition) {
  WScript.Echo("Start: ", StreamNumber, StreamPosition);
}

function callbackEndStream(StreamNumber, StreamPosition, StreamReleased) {
  WScript.Echo("End: ", StreamNumber, StreamPosition, StreamReleased);
  ScriptRunning = false;
}

var infile = WScript.Arguments(0);
var engine = WScript.CreateObject("SAPI.SpInProcRecoContext", "callback");
var recognizer = engine.Recognizer;
var grammer = engine.CreateGrammar(1);

if (infile == '-') {
	var category = WScript.CreateObject("SAPI.SpObjectTokenCategory");
	category.SetId('HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Speech\\AudioInput');
	var token = WScript.CreateObject("SAPI.SpObjectToken");
	token.SetId(category.Default);
	recognizer.AudioInput = token;
}
else {
	var wav = WScript.CreateObject("SAPI.SpFileStream");
	wav.Format.Type = 49;
	wav.Open(infile, 0);
	recognizer.AudioInputStream = wav;
}

grammer.DictationLoad();
grammer.DictationSetState(1);

for (; ScriptRunning && Timeout > 0; Timeout -= Pause) {
  WScript.Sleep(Pause);
}
