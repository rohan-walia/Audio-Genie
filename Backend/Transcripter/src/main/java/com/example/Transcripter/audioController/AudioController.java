package com.example.Transcripter.audioController;

import com.theokanning.openai.audio.CreateTranscriptionRequest;
import com.theokanning.openai.audio.TranscriptionResult;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Duration;

@RestController
@CrossOrigin
public class AudioController {


    @Value("${audioModel}")
    private String model;

    @Value("${audioPrompt}")
    private String prompt;

    @Value("${timeout}")
    private Integer timeoutSeconds;

    @Value("${responseFormat}")
    private String responseFormat;

    @Value("${token}")
    private String key;

    @PostMapping(value = "/audio", consumes = "multipart/form-data")
    public TranscriptionResult audioToText(@RequestParam(name = "audio") MultipartFile file) throws IOException {

        OpenAiService openAiService = new OpenAiService(key, Duration.ofSeconds(timeoutSeconds));
        CreateTranscriptionRequest createTranscriptionRequest = new CreateTranscriptionRequest();
        createTranscriptionRequest.setModel(model);
        createTranscriptionRequest.setPrompt(prompt);
        createTranscriptionRequest.setResponseFormat(responseFormat);

        return openAiService.createTranscription(createTranscriptionRequest, convert(file));
    }

    public static File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
