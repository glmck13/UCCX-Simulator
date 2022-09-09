# UCCX_Simulator
How to create a stand-alone IVR simulator using Cisco's Unified Call Center Express (UCCX) sandbox
## Background
I've recently been working with Cisco's Interactive Voice Response (IVR) platform, a product called Unified Contact Center Express (UCCX).  Cisco provides so-called "Sandbox" environments free-of-charge that can be used to evaluate their solutions, and you can reserve one for UCCX [here](https://developer.cisco.com/docs/sandbox/#!collaboration).  Problem is, these sandboxes are essentially stand-alone: although you can VPN into the sandbox, the systems contained inside the sandbox cannot contact any outside system (at least I haven't discovered a way to do this!).  That makes designing an IVR solution pretty difficult.  First, and most importantly, UCCX needs to connect to an MRCP (Media Resource Control Protocol) server in order to process speech, i.e. either to perform text-to-speech (TTS) or speech-to-text (STT).  An IVR platform that can't speak is not very useful!  Second, IVR solutions often connect to other platforms to retrieve and update data.  In my case for example I'm trying to build a front-end to ServiceNow.  Thankfully I've come up with work-arounds for both of these these limitations, so it's possible to build a full-featured IVR simulator using Cisco's sandbox.
### Webserver
The first thing you'll need is a web server to process API calls and serve sound files.  I found a very small and functional server that's perfect for the job.  It's called TinyWeb, and was developed by Ritlabs.  You can download a copy from [their website](https://www.ritlabs.com/en/products/tinyweb/) 
### Scripting engines
Next you'll need some tools to write scripts.  Two good candidates are: Windows Scripting Host (WSH), and BusyBox.
  - **WSH** Windows Scripting Host is the remnant of the work Microsoft did on VisualBasic and JavaScipt. Each Windows build includes a tool called "cscript" that can execute scripts written in either of these languages.  You can read more about WSH [here](https://docs.microsoft.com/en-us/previous-versions/tn-archive/ee156603(v=technet.10)).
  - **BusyBox** This is a very lightwieght port of many of the Linux command line tools.  A Windows build is available [here](https://frippery.org/busybox/).
### Text-to-Speech engine
Lastly, you'll need some technology to perform text-to-speech (TTS).  What I didn't realize until quite recently is that Cisco does not supply a native TTS engine with UCCX: they expect you to configure an external Media Resource Control Protocol (MRCP) provider for these services.  That's hard to do in the sandbox, since the UCCX can't connect to any outside service provider.  Thankfully, I came up with a workaround: Microsoft's own speech API: [SAPI](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms723627(v=vs.85)). 
## Installation
Pick one of the Windows Servers in the sandbox to function as a simulator and RDP into it. Check that audio is enabled by opening up Control Panel -> Sound.  Next open a CMD window and do the following:  
1. mkdir C:\Simulator
2. Place a copy of BusyBox and TinyWeb (links provided above) in the Simulator folder
3. Run: busybox --install
4. Edit the Path variable to include the Simulator forder, e.g. set Path=C:\Simulator;%Path%
5. Run: cscript /H:CScript (the alternative is WScript, but that won't work for CGI applications) 
6. Copy the contents of the WWW folder in this repository to C:\Simulator
7. cd C:\Simulator\WWW\cgi-bin, then: mklink /h sim.js wrapper.js
## Reboot
On every reboot of the PC, you'll need to relaunch the webserver:  
1. cd C:\Simulator
2. tiny C:\Simulator\WWW 8000
## Test
Try accessing the following URL to verify everything is working: http://10.10.20.1X:8000/cgi-bin/sim.js?cmd=voice&arg1=This+is+a+test.  This should create a sound file called outxxxx.wav in the WWW\cdn folder, that you can listen to by opening: http://10.10.20.1X:8000/cdn/outxxxx.wav
