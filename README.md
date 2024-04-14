# Audio-Genie

This web application seamlessly converts audio files into text using cutting-edge technology.

![image](https://github.com/rohan-walia/Audio-Genie/assets/104843997/96d964f6-3e3d-46ba-af0e-cccaebb1a079)

https://github.com/rohan-walia/Audio-Genie/assets/104843997/98bf61e8-1892-4f9a-8a34-1bd5b22af23a

## How It Works

1. Users upload an audio file (in any language).
2. The application processes the audio using the ChatGPT Whisper model.
3. The resulting text is displayed to the user.

## Local Setup Instructions

1. Clone this repository.
2. Replace the token with your OpenAI key in: `Backend/Transcripter/src/main/resources/application.properties`.
3. Run the Spring Boot application: `Backend/Transcripter/src/main/java/com/example/Transcripter/TranscripterApplication.java`.
4. Launch the UI: `Frontend/caption.html`.
