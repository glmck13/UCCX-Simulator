# UCCX_Simulator
How to create a stand-alone IVR simulator using Cisco's Unified Call Center Express (UCCX) sandbox
# Background
I've recently been working with Cisco's Interactive Voice Response (IVR) platform, a product called Unified Contact Center Express (UCCX).  Cisco provides so-called "Sandbox" environments free-of-charge that can be used to evaluate their solutions, and you can reserve one for UCCX [here](https://developer.cisco.com/docs/sandbox/#!collaboration).  Problem is, these sandboxes are essentially stand-alone: although you can VPN into the sandbox, the systems contained inside the sandbox cannot contact any outside system (at least I haven't discovered a way to do this!).  That makes designing an IVR solution pretty difficult.  First, and most importantly, UCCX needs to connect to an MRCP (Media Resource Control Protocol) server in order to process speech, i.e. either to perform text-to-speech (TTS) or speech-to-text (STT).  An IVR platform that can't speak is not very useful!  Second, IVR solutions often connect to other platforms to retrieve and update data.  In my case, for example, I'm trying to build a front-end to ServiceNow.  Thankfully I've come up with work-arounds for both of these limitations, so it's possible to build a full-featured IVR simulator using Cisco's sandbox.  

The first thing you'll need is a web server to process API calls and serve sound files.  I found a very small and functional server that's perfect for the job.  It's called TinyWeb, developed by Ritlabs.  You can download a copy from [their website](https://www.ritlabs.com/en/products/tinyweb/)  

Next you'll need some tools to write scripts.  Two good candidates are: Windows Scripting Host (WSH), and BusyBox.
  - **WSH** Windows Scripting Host is the remnant of the work Microsoft did on VisualBasic and JavaScipt. Each Windows build includes a tool called "cscript" that can execute scripts written in either of these languages.  You can read more about WSH [here](https://docs.microsoft.com/en-us/previous-versions/tn-archive/ee156603(v=technet.10)).
  - **BusyBox** This is a very lightwieght port of many of the Linux command line tools.  A Windows build is available [here](https://frippery.org/busybox/).  

Lastly, you'll need some technology to perform text-to-speech (TTS).  What I didn't realize until quite recently is that Cisco does not supply a native TTS engine with UCCX: they expect you to configure an external Media Resource Control Protocol (MRCP) provider for these services.  That's hard to do in the sandbox, since the UCCX can't connect to any outside service provider.  Thankfully, I came up with a workaround: Microsoft's own speech API: [SAPI](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/ms723627(v=vs.85)). 
# Installation
Pick one of the Windows Servers in the sandbox to function as a simulator and RDP into it. Check that audio is enabled by opening up Control Panel -> Sound.  Next open a CMD window and do the following:  
1. mkdir C:\Simulator
2. Place a copy of BusyBox and TinyWeb (links provided above) in the Simulator folder
3. Run: busybox --install
4. Edit the Path variable to include the Simulator folder, e.g. set Path=C:\Simulator
5. Run: cscript /H:CScript (the alternative is WScript, but that won't work for CGI applications) 
6. Copy the contents of the WWW folder in this repository to C:\Simulator
7. cd C:\Simulator\WWW\cgi-bin, then: mklink /h sim.js wrapper.js

On every reboot of the PC, you'll need to relaunch the webserver:  
1. cd C:\Simulator
2. tiny C:\Simulator\WWW 8000

When you're finished, try accessing the following URL to verify everything is working: http://10.10.20.1X:8000/cgi-bin/sim.js?cmd=voice&arg1=This+is+a+test.  This should create a sound file called outxxxx.wav in the WWW\cdn folder, that you can listen to by opening: http://10.10.20.1X:8000/cdn/outxxxx.wav  

# UCCX IVR Setup
Here are the steps to configure an IVR application in the sandbox.  We'll use extension 8000 to trigger execution of sim.aef:
1. Upload the sim.aef script included in this repository to UCCX by clicking on Applications -> Script Management -> Upload Scripts
2. Configure a Call Control Group (CCG) by clicking on Subsystems -> Cisco Unified CM Telephony -> Call Control Group -> Add New:
    - Description (can be anything): **MYDEMO_CCG**
    - Number Of CTI Ports (# of concurrent calls): **2**
    - Device Name Prefix (can be anything): **uccx**
    - Starting Directory Number (an available DN in UCM, but not the trigger!): **7000**
    - Device Pool (select from menu): **uccx_pool**
    - DN Calling Search Space (select from menu): **css_UCCX**
    - Location (select from menu): **Hub_None**
    - Partition (select from menu): **UCCX Partition**
3. Add an Application by clicking on Applications -> Application Management -> Add New:
    - Application Type (select from menu): **Cisco Script Application**
    - Name (can be anything): **MYDEMO_IVR**
    - Maximum Number of Sessions (# of concurrent calls): **2**
    - Script (select from menu): **sim.aef**
    - Description (can be anything): **MYDEMO_IVR**
4. Add a Trigger by clicking on Add new trigger (on left panel):
    - Trigger Type (select from menu): **Unified CM Telephony Trigger**
    - Directory Number (an available DN in UCM, but not the CCG!): **8000**
    - Device Name (can be anything): **MYDEMO_IVR**
    - Description (can be anything): **MYDEMO_IVR**
    - Call Control Group (select from menu): **MYDEMO_CCG**

When finished, try testing your app by logging into on of the Windows servers, starting Jabber, and callin extension 8000.  If all goes well you'll be greeted with the message: "Enter ticket number".  Enjoy!
