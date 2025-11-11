package com.pollcraft_backend.controller;


import com.pollcraft_backend.DTO.PollRequest;
import com.pollcraft_backend.DTO.VoteRequest;
import com.pollcraft_backend.entity.Poll;
import com.pollcraft_backend.service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polls")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.OPTIONS})
public class PollController {

    @Autowired
    private PollService pollService;

    @GetMapping
    public ResponseEntity<List<Poll>> getAllPolls() {
        return ResponseEntity.ok(pollService.getAllPolls());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPollById(@PathVariable Long id) {
        return pollService.getPollById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Poll> createPoll(@RequestBody PollRequest pollRequest) {
        Poll createdPoll = pollService.createPoll(pollRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPoll);
    }

    @PostMapping("/{pollId}/vote")
    public ResponseEntity<Poll> vote(@PathVariable Long pollId, @RequestBody VoteRequest voteRequest) {
        try {
            Poll updatedPoll = pollService.vote(pollId, voteRequest.getOptionIds());
            return ResponseEntity.ok(updatedPoll);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoll(@PathVariable Long id) {
        pollService.deletePoll(id);
        return ResponseEntity.noContent().build();
    }
}
