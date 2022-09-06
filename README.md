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
Pick one of the Windows Servers in the sandbox to function as the simulator.  Here's how to set it up:  
1. mkdir C:\Simulator
2. Place a copy of the BusyBox and TinyWeb executables (links provided above) in this folder
3. Run: busybox --install
4. Edit the Path variable in the environment: C:\Simulator;%Path%
5. Open a CMD window with amdin privilege and run: cscript /H:CScript
6. Copy the contents of the WWW folder in this repository to C:\Simulator
7. 
