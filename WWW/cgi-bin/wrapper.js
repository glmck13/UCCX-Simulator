var sh = WScript.CreateObject("WScript.Shell");
var exec = sh.Exec("sh " + WScript.ScriptName.replace(".js", "") + ".sh");
var line;
while (!exec.StdOut.atEndOfStream) {
	line = exec.StdOut.ReadLine();
	WScript.Echo(line);
}
