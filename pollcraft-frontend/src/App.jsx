import React, { useState, useEffect } from 'react';
import { BarChart3, Plus, Trash2, Users, Clock, TrendingUp, CheckCircle2, Circle } from 'lucide-react';

const API_URL = 'http://localhost:8080/api/polls';

// Confetti Component
function Confetti() {
    const [pieces, setPieces] = useState([]);

    useEffect(() => {
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];
        const newPieces = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDelay: Math.random() * 0.5,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
        }));
        setPieces(newPieces);

        const timer = setTimeout(() => setPieces([]), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map((piece) => (
                <div
                    key={piece.id}
                    className="absolute w-2 h-2 animate-confetti"
                    style={{
                        left: `${piece.left}%`,
                        top: '-10px',
                        backgroundColor: piece.backgroundColor,
                        animationDelay: `${piece.animationDelay}s`,
                        transform: `rotate(${piece.rotation}deg)`,
                    }}
                />
            ))}
            <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
        </div>
    );
}

// Tick Animation Component
function TickAnimation() {
    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-black/20">
            <div className="animate-tick-popup">
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <svg
                        className="w-24 h-24 text-green-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle
                            className="animate-tick-circle"
                            cx="12"
                            cy="12"
                            r="10"
                            strokeWidth="2"
                            fill="none"
                        />
                        <path
                            className="animate-tick-check"
                            d="M7 12l3 3 7-7"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <style>{`
        @keyframes tickPopup {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(5deg);
            opacity: 1;
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        
        @keyframes tickCircle {
          0% {
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 100 100;
            opacity: 1;
          }
        }
        
        @keyframes tickCheck {
          0% {
            stroke-dasharray: 0 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 100 100;
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
        
        .animate-tick-popup {
          animation: tickPopup 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), 
                     fadeOut 0.3s ease-out 1s forwards;
        }
        
        .animate-tick-circle {
          stroke-dasharray: 0 100;
          animation: tickCircle 0.5s ease-out 0.1s forwards;
        }
        
        .animate-tick-check {
          stroke-dasharray: 0 100;
          animation: tickCheck 0.3s ease-out 0.4s forwards;
        }
      `}</style>
        </div>
    );
}

export default function PollingApp() {
    const [polls, setPolls] = useState([]);
    const [currentView, setCurrentView] = useState('list');
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showTick, setShowTick] = useState(false);

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setPolls(data);
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    };

    const handleCreateClick = () => {
        setCurrentView('create');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedPoll(null);
    };

    const handlePollCreated = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        fetchPolls();
        setCurrentView('list');
    };

    const handleSelectPoll = (poll) => {
        setSelectedPoll(poll);
        setCurrentView('detail');
    };

    const handleVoteSuccess = () => {
        setShowTick(true);
        setTimeout(() => setShowTick(false), 1300);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {showConfetti && <Confetti />}
            {showTick && <TickAnimation />}

            {/* Professional Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">PollCraft</h1>
                                <p className="text-xs text-gray-500">Professional Polling Platform</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {currentView === 'list' && (
                                <button
                                    onClick={handleCreateClick}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Poll
                                </button>
                            )}
                            {(currentView === 'create' || currentView === 'detail') && (
                                <button
                                    onClick={handleBackToList}
                                    className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors"
                                >
                                    ← Back
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {currentView === 'create' && (
                    <CreatePollForm
                        onClose={handleBackToList}
                        onSuccess={handlePollCreated}
                    />
                )}

                {currentView === 'detail' && selectedPoll && (
                    <PollDetail
                        poll={selectedPoll}
                        onUpdate={fetchPolls}
                        onVoteSuccess={handleVoteSuccess}
                    />
                )}

                {currentView === 'list' && (
                    <PollList
                        polls={polls}
                        onSelectPoll={handleSelectPoll}
                        onDelete={fetchPolls}
                    />
                )}
            </main>
        </div>
    );
}

function PollList({ polls, onSelectPoll, onDelete }) {
    const handleDelete = async (pollId, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this poll?')) {
            try {
                await fetch(`${API_URL}/${pollId}`, { method: 'DELETE' });
                onDelete();
            } catch (error) {
                console.error('Error deleting poll:', error);
            }
        }
    };

    if (polls.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="bg-white rounded-xl shadow-sm p-12 max-w-md mx-auto border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No polls yet</h3>
                    <p className="text-gray-500 mb-6">Get started by creating your first poll</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Poll
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Active Polls</h2>
                <p className="text-gray-600 mt-1">Select a poll to participate and view results</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {polls.map((poll) => {
                    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voteCount, 0);
                    return (
                        <div
                            key={poll.id}
                            onClick={() => onSelectPoll(poll)}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-200 group"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                                            {poll.question}
                                        </h3>
                                        {poll.description && (
                                            <p className="text-sm text-gray-600 line-clamp-2">{poll.description}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={(e) => handleDelete(poll.id, e)}
                                        className="text-gray-400 hover:text-red-600 transition-colors ml-2 p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4" />
                                        <span className="font-medium">{totalVotes}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <TrendingUp className="w-4 h-4" />
                                        <span>{poll.options.length} options</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(poll.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                    View & Vote →
                  </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function PollDetail({ poll, onUpdate, onVoteSuccess }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [hasVoted, setHasVoted] = useState(false);
    const [currentPoll, setCurrentPoll] = useState(poll);

    const totalVotes = currentPoll.options.reduce((sum, opt) => sum + opt.voteCount, 0);

    const handleVote = async () => {
        if (selectedOptions.length === 0) return;

        try {
            const response = await fetch(`${API_URL}/${currentPoll.id}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ optionIds: selectedOptions }),
            });

            if (response.ok) {
                // Fetch updated poll data
                const updatedPollResponse = await fetch(`${API_URL}/${currentPoll.id}`);
                const updatedPoll = await updatedPollResponse.json();
                setCurrentPoll(updatedPoll);
                setHasVoted(true);
                onVoteSuccess();
                onUpdate();
            }
        } catch (error) {
            console.error('Error voting:', error);
            alert('Failed to submit vote. Please try again.');
        }
    };

    const toggleOption = (optionId) => {
        if (currentPoll.multipleChoice) {
            setSelectedOptions(prev =>
                prev.includes(optionId)
                    ? prev.filter(id => id !== optionId)
                    : [...prev, optionId]
            );
        } else {
            setSelectedOptions([optionId]);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Poll Header */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-8 text-white">
                    <h2 className="text-3xl font-bold mb-3">{currentPoll.question}</h2>
                    {currentPoll.description && (
                        <p className="text-indigo-100 text-lg mb-4">{currentPoll.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                            <Users className="w-4 h-4" />
                            <span className="font-medium">{totalVotes} votes</span>
                        </div>
                        {currentPoll.multipleChoice && (
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg font-medium">
                                Multiple Choice
                            </div>
                        )}
                        <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(currentPoll.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {/* Poll Options */}
                <div className="p-8">
                    <div className="space-y-3">
                        {currentPoll.options.map((option) => {
                            const percentage = totalVotes > 0 ? (option.voteCount / totalVotes) * 100 : 0;
                            const isSelected = selectedOptions.includes(option.id);
                            const isWinning = hasVoted && option.voteCount > 0 && option.voteCount === Math.max(...currentPoll.options.map(o => o.voteCount));

                            return (
                                <div key={option.id} className="relative">
                                    <button
                                        onClick={() => !hasVoted && toggleOption(option.id)}
                                        disabled={hasVoted}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                            hasVoted
                                                ? 'cursor-default bg-gray-50'
                                                : isSelected
                                                    ? 'border-indigo-600 bg-indigo-50'
                                                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {hasVoted && (
                                            <div
                                                className="absolute inset-0 bg-indigo-100 rounded-lg transition-all duration-500"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        )}

                                        <div className="relative flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                {!hasVoted ? (
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                        isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                                                    }`}>
                                                        {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                    </div>
                                                ) : (
                                                    isWinning ? (
                                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-gray-400" />
                                                    )
                                                )}
                                                <span className="font-medium text-gray-900">{option.text}</span>
                                            </div>
                                            {hasVoted && (
                                                <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-indigo-600">
                            {percentage.toFixed(1)}%
                          </span>
                                                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {option.voteCount}
                          </span>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {!hasVoted && (
                        <button
                            onClick={handleVote}
                            disabled={selectedOptions.length === 0}
                            className="group relative w-full mt-6 bg-gray-900 text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{selectedOptions.length === 0 ? 'Select an option to continue' : 'Submit Vote'}</span>
              </span>
                        </button>
                    )}

                    {hasVoted && (
                        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <p className="text-green-900 font-medium">Vote recorded successfully!</p>
                            </div>
                            <p className="text-green-700 text-sm mt-1 ml-7">Thank you for participating in this poll.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function CreatePollForm({ onClose, onSuccess }) {
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [multipleChoice, setMultipleChoice] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addOption = () => setOptions([...options, '']);

    const updateOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async () => {
        const validOptions = options.filter(opt => opt.trim());

        if (!question.trim()) {
            alert('Please provide a question');
            return;
        }

        if (validOptions.length < 2) {
            alert('Please provide at least 2 options');
            return;
        }

        setIsSubmitting(true);

        const pollData = {
            question: question.trim(),
            description: description.trim(),
            options: validOptions,
            multipleChoice: multipleChoice,
            expiresAt: null
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(pollData),
            });

            if (!response.ok) {
                throw new Error('Failed to create poll');
            }

            await response.json();
            onSuccess();
        } catch (error) {
            console.error('Error creating poll:', error);
            alert('Error creating poll. Please make sure the backend is running on http://localhost:8080');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
                    <h2 className="text-2xl font-bold">Create New Poll</h2>
                    <p className="text-indigo-100 mt-1">Fill in the details to create your poll</p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Poll Question <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="e.g., What's your favorite programming language?"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add additional context or details..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Options <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-3">
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => updateOption(index, e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                    />
                                    {options.length > 2 && (
                                        <button
                                            onClick={() => removeOption(index)}
                                            className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addOption}
                            className="mt-3 text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center space-x-1"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Option</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                            type="checkbox"
                            id="multipleChoice"
                            checked={multipleChoice}
                            onChange={(e) => setMultipleChoice(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="multipleChoice" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Allow multiple answers
                        </label>
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="group relative flex-1 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg transition-all disabled:opacity-50 shadow-lg overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10">
                {isSubmitting ? 'Creating...' : 'Create Poll'}
              </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
