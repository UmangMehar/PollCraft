package com.pollcraft_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PollRequest {

    private String question;
    private String description;
    private List<String> options;
    private boolean multipleChoice;
    private LocalDateTime expiresAt;
}