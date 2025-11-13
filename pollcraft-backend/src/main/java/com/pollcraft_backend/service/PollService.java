package com.pollcraft_backend.service;

import com.pollcraft_backend.DTO.PollRequest;
import com.pollcraft_backend.entity.Poll;
import com.pollcraft_backend.entity.PollOption;
import com.pollcraft_backend.repository.PollOptionRepository;
import com.pollcraft_backend.repository.PollRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private PollOptionRepository pollOptionRepository;

    public List<Poll> getAllPolls() {
        return pollRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Poll> getPollById(Long id) {
        return pollRepository.findById(id);
    }

    @Transactional
    public Poll createPoll(PollRequest pollRequest) {
        Poll poll = new Poll();
        poll.setQuestion(pollRequest.getQuestion());
        poll.setDescription(pollRequest.getDescription());
        poll.setMultipleChoice(pollRequest.isMultipleChoice());
        poll.setExpiresAt(pollRequest.getExpiresAt());

        for (String optionText : pollRequest.getOptions()) {
            PollOption option = new PollOption(optionText);
            poll.addOption(option);
        }

        return pollRepository.save(poll);
    }

    @Transactional
    public Poll vote(Long pollId, List<Long> optionIds) {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new IllegalArgumentException("Poll not found"));

        if (!poll.isMultipleChoice() && optionIds.size() > 1) {
            throw new IllegalArgumentException("Single choice poll cannot have multiple votes");
        }

        for (Long optionId : optionIds) {
            PollOption option = pollOptionRepository.findById(optionId)
                    .orElseThrow(() -> new IllegalArgumentException("Option not found"));

            if (!option.getPoll().getId().equals(pollId)) {
                throw new IllegalArgumentException("Option does not belong to this poll");
            }

            option.incrementVoteCount();
            pollOptionRepository.save(option);
        }

        return pollRepository.findById(pollId).get();
    }

    public void deletePoll(Long id) {
        pollRepository.deleteById(id);
    }
}