# UCCX_Simulator
How to create a stand-alone IVR simulator using Cisco's Unified Call Center Express sandbox
## Background
I've recently been working with Cisco's Interactive Voice Response (IVR) platform, a product called Unified Contact Center Express (UCCX).  Cisco provides so-called "Sandbox" environments free-of-charge that can be used to evaluate their solutions, and you can reserve one for UCCX [here](https://developer.cisco.com/docs/sandbox/#!collaboration).  Problem is, these sandboxes are essentially stand-alone: although you can VPN into the sandbox, the systems contained inside the sandbox cannot contact any outside system (at least I haven't discovered a way to do this!).  That makes designing an IVR solution pretty difficult.  First, and most importantly, UCCX needs to connect to an MRCP (Media Resource Control Protocol) server in order to process speech, i.e. either to perform text-to-speech (TTS) or speech-to-text (STT).  An IVR platform that can't speak is not very useful!  Second, IVR solutions often connect to other platforms to retrieve and update data.  In my case for example I'm trying to build a front-end to ServiceNow.  Thankfully I've come up with work-arounds for both of these these limitations, so it's possible to build a full-featured IVR simulator using Cisco's sandbox.
## Tinyweb
The first thing you'll need is a web server to process API calls and serve sound files.  I found a very small and functional server called TinyWeb developed by Ritlabs.  You can download a copy from [their website](https://www.ritlabs.com/en/products/tinyweb/) 
## Windows Scripting Host (WSH)

## Busybox
