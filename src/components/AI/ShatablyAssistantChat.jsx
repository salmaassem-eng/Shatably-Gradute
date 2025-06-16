import React, { useState, useRef, useEffect } from 'react';
import photo from '../../assets/photochat.svg'
import userProfilePlaceholder from '../../assets/user.svg';
import chatProfile from '../../assets/chatProfile.svg'
import { Link } from 'react-router-dom';


const ShatablyAssistantChat = () => {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [inputMessage, setInputMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Save messages to localStorage whenever they change
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        // Cleanup function to revoke object URLs
        return () => {
            messages.forEach(msg => {
                if (msg.image) {
                    URL.revokeObjectURL(msg.image);
                }
            });
        };
    }, [messages]);

    const handleSendMessage = async (regeneratePrompt = null) => {
        const messageToSend = regeneratePrompt !== null ? regeneratePrompt : inputMessage;

        if (messageToSend.trim() === '' && !selectedImage && !regeneratePrompt) {
            alert('Please enter a message or select an image.');
            return;
        }

        setLoading(true);
        const newMessage = { sender: 'user', text: messageToSend, image: selectedImage ? URL.createObjectURL(selectedImage) : null };
        if (!regeneratePrompt) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }

        const formData = new FormData();
        formData.append('message', messageToSend);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await fetch('https://shatablyai.up.railway.app/chat/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to get response from AI.');
            }

            const data = await response.json();
            setMessages((prevMessages) => [...prevMessages, { sender: 'assistant', text: data.response, promptUsed: messageToSend }]);
        } catch (error) {
            console.error("Error sending message to AI:", error);
            setMessages((prevMessages) => [...prevMessages, { 
                sender: 'assistant', 
                text: 'Sorry, I encountered an error while processing your request. Please try again later.' 
            }]);
        } finally {
            setInputMessage('');
            setSelectedImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !loading) {
            handleSendMessage();
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const handleShare = () => {
        alert('Share functionality not yet implemented.');
    };

    const handleEdit = (index) => {
        const messageToEdit = messages[index];
        if (messageToEdit.sender === 'user') {
            setInputMessage(messageToEdit.text);
            setMessages(prevMessages => prevMessages.filter((_, i) => i !== index));
        }
    };

    const handleRegenerate = (index) => {
        const messageToRegenerate = messages[index];
        if (messageToRegenerate.sender === 'assistant' && messageToRegenerate.promptUsed) {
            setMessages(prevMessages => prevMessages.filter((_, i) => i <= index - 1)); // Remove current and subsequent assistant messages
            handleSendMessage(messageToRegenerate.promptUsed);
        } else if (messageToRegenerate.sender === 'user') {
            // If regenerating a user message, take its text as the prompt
            setMessages(prevMessages => prevMessages.filter((_, i) => i <= index));
            handleSendMessage(messageToRegenerate.text);
        }
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-[#0A252E] text-white p-4 ">
            <div className="w-full flex items-center justify-between py-4 relative">
                <Link
                    to="/ai"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#ccc] border-[#ccc] rounded-md hover:bg-[#124353] hover:text-[#ccc]"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </Link>
                <h1 className="text-3xl font-semibold absolute left-1/2 -translate-x-1/2">Shatably Assistant 🤖</h1>
            </div>
            <div className="flex-grow flex flex-col justify-end w-[800px] mt-[100px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex flex-col w-full ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        {/* Avatar and Name row */}


                        {/* Message bubble, aligned based on sender */}
                        <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg w-[390px] relative  ${msg.sender === 'user' ? 'bg-transperent' : 'bg-transperent'}`}>
                                <div className="flex items-center -ml-1 mb-2">
                                    {msg.sender === 'assistant' ? (
                                        <>
                                            <img src={chatProfile} alt="Profile" />
                                            <span className="text-lg font-medium ml-2"> Shatably Assistant </span>
                                        </>
                                    ) : (
                                        <>
                                            <img src={localStorage.getItem('userProfileImage') || userProfilePlaceholder} alt="You" className="w-8 h-8 rounded-full mr-2" />
                                            <span className="text-lg font-medium">You</span>
                                        </>
                                    )}
                                </div>
                                {msg.image && <img src={msg.image} alt="sent" className="max-w-full h-auto rounded-md mb-2" />}
                                {msg.text && <p>{msg.text}</p>}

                                <div className="flex -space-x-4 -ml-5 mt-2 text-sm opacity-80">
                                    {msg.sender === 'user' && (
                                        <>
                                            <button onClick={() => handleEdit(index)} className="flex items-center hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                Edit
                                            </button>
                                            <button onClick={() => handleCopy(msg.text)} className="flex items-center hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-4 3v5m-4-5h5a2 2 0 012 2v3m-4-3a2 2 0 00-2 2h2a2 2 0 002-2"></path></svg>
                                                Copy
                                            </button>
                                        </>
                                    )}
                                    {msg.sender === 'assistant' && (
                                        <>
                                            <button onClick={() => handleCopy(msg.text)} className="flex items-center hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m-4 3v5m-4-5h5a2 2 0 012 2v3m-4-3a2 2 0 00-2 2h2a2 2 0 002-2"></path></svg>
                                                Copy
                                            </button>
                                            <button onClick={handleShare} className="flex items-center hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.516 4.65M15.316 10.658A3 3 0 1118 12c0 .482-.114.938-.316 1.342m0-2.684l-6.516-4.65"></path></svg>
                                                Share
                                            </button>
                                            <button onClick={() => handleRegenerate(index)} className="flex items-center hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12c0 2.972 1.15 5.728 3.033 7.707M20 20v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H4"></path></svg>
                                                Regenerate
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {!loading && messages.length === 0 && (
                    <div className="flex flex-grow flex-col justify-center items-center text-center">
                        <p className="text-5xl font-medium ">Hey, nice to see you. What's new?</p>
                    </div>
                )}
                {loading && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-lg max-w-xs bg-[#124353]">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={`w-[800px] h-[145px] bg-gradient-to-t from-[#081D23] to-[#0E3441] rounded-[15px] flex justify-center ${messages.length > 0 ? 'mb-0' : 'mb-[150px]'}`}>
                <div className="relative flex justify-center items-center w-[774px] h-[110px] bg-gradient-to-t from-[#0A252E] to-[#113B49] rounded-[15px] m-auto shadow-lg">
                    <input
                        type="text"
                        placeholder="Message Shatably Assistant........"
                        className="bg-transparent text-xl w-[660px] border-none my-auto text-white opacity-90 placeholder:text-[#089ECC75] focus:outline-none pr-16"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                    />
                    <label htmlFor="image-upload" className="absolute right-4 top-1/2 -translate-y-1/2 mr-3 cursor-pointer bg-transparent border-none focus:outline-none">
                        <img src={photo} alt="add photo" className="w-6 h-6" />
                    </label>
                </div>
                {selectedImage && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-800 rounded-lg flex items-center">
                        <img src={URL.createObjectURL(selectedImage)} alt="selected" className="h-16 w-16 object-cover rounded mr-2" />
                        <p className="text-sm">{selectedImage.name}</p>
                        <button onClick={() => setSelectedImage(null)} className="ml-2 text-red-400">x</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShatablyAssistantChat; 