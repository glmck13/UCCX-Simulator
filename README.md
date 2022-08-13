# UCCX_Simulator
How to create a stand-alone IVR simulator using Cisco's Unified Call Center Express sandbox
## Background
I've recently been working with Cisco's Interactive Voice Response (IVR) platform, a product they call Unified Contact Center Express (UCCX).  Cisco provides so-called "Sandbox" environments free of charge that can be used to evaluate their solutions, and you can reserve one for UCCX [here](https://developer.cisco.com/docs/sandbox/#!collaboration).  Problem is, these sandboxes are essentially stand-alone: although you can VPN into the sandbox, the systems contained inside the sandbox cannot contact any outside system (at least I've not been able to find a way to do this!).  That makes designing an IVR solution pretty difficult.  First, and most importantly, UCCX needs to connect to an MRCP (Media Resource Control Protocol) server in order to process speech, i.e. either to perform text-to-speech (TTS) or speech-to-text (STT).  An IVR platform that can't speak is not very useful!  Second, IVR solutions often connect into other platforms to retrieve and update data.
## Tinyweb

## Windows Scripting Host (WSH)

## Busybox
