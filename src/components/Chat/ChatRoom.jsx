import { FiSend, FiImage, FiMic, FiSmile } from 'react-icons/fi';
import Image from 'next/image';
import EmptyChat from './EmptyChat';
import EmptyChatRoom from '@/Images/EmptyChatRoom.png';
import { useState, useRef, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useScrollToBottom } from '../Hooks/useScrollToBottom';
import EmojiPicker from 'emoji-picker-react';
import { ReactMediaRecorder } from 'react-media-recorder';
import { CiVideoOn } from 'react-icons/ci';
import { MdOutlineLocalPhone } from 'react-icons/md';
import Modal from '../Modal';
import { IoClose } from 'react-icons/io5';
import FormLabel from '../FormLabel';

const ChatRoom = ({
  user,
  signedInUser,
  messages,
  pagination,
  onSend,
  onBack,
  handleViewMore,
  isLoadingMessages,
  resetPage,
  handleCallInitiation,
}) => {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [viewImage, setViewImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);

  const fileInputRef = useRef(null);
  const chatContainerRef = useScrollToBottom([isLoadingMessages]);
  const reversedMessages = messages;
  // const reversedMessages = messages?.slice().reverse();

  const startRecordingTimer = () => {
    const id = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
    setTimerId(id);
  };

  const stopRecordingTimer = () => {
    clearInterval(timerId);
  };

  const handleViewImage = (img) => {
    console.log(img);
    setViewImage((prev) => !prev);
    setImgUrl(img);
  };

  const handleSendAudio = () => {
    // send audioBlob
    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: 'Audio',
      file: audioBlob,
      type: 'audio',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    handleDiscardAudio();
    onSend(newMessage);
  };

  const handleDiscardAudio = () => {
    console.log('discarded');
    setAudioBlob(null);
    setRecordingTime(0);
    setIsRecording(false);
    setSelectedFile(null);
  };

  const handleSend = () => {
    if (audioBlob) {
      handleSendAudio();
      return;
    }
    if (!input.trim() && !selectedFile && !audioBlob) return;
    console.log('triggered');
    const newMessage = {
      id: messages.length + 1,
      sender: 'me',
      text: input.trim(),
      file: selectedFile,
      audio: audioBlob,
      type: selectedFile ? 'image' : 'text',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onSend(newMessage);
    setInput('');
    setSelectedFile(null);
    setAudioBlob(null);
    handleDiscardAudio();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleEmojiSelect = (emojiObject) => {
    if (!emojiObject?.emoji) return;
    setInput((prev) => prev + emojiObject.emoji);
    setEmojiPickerOpen(false);
  };

  console.log(reversedMessages, 'msg');

  return (
    <div className="flex flex-col h-[calc(100svh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <button
            type="button"
            onClick={onBack}
            className="md:hidden text-[#A20030] text-sm font-medium"
          >
            <IoIosArrowBack />
          </button>
          <Image
            width={40}
            height={40}
            src={user.image}
            alt={user.name}
            className="size-10 rounded-full object-cover"
          />
          <div>
            <h4 className="text-sm font-medium text-[#141414]">{user.name}</h4>
            {user?.participants?.is_online && (
              <span className="text-xs text-green-500">Online</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <CiVideoOn
            onClick={() => handleCallInitiation('video')}
            className="size-6 text-gray-700 cursor-pointer"
          />
          <MdOutlineLocalPhone
            onClick={() => handleCallInitiation('audio')}
            className="size-6 text-gray-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-3">
        {reversedMessages.length === 0 ? (
          <EmptyChat
            image={EmptyChatRoom}
            title="Start a Conversation"
            description={`Send a message to ${user.name}`}
            width="120"
            height="120"
          />
        ) : (
          <div className="space-y-4">
            {pagination?.has_more && (
              <div
                onClick={handleViewMore}
                className="text-center text-[#A20030] cursor-pointer"
              >
                View more
              </div>
            )}
            {reversedMessages.map((msg) => (
              <div
                key={msg?.id}
                className={`flex ${
                  msg?.user?.id === signedInUser?.id
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                    msg?.user?.id === signedInUser?.id
                      ? 'bg-[#A20030] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {(msg?.file || msg?.metadata) && (
                    <div className="mb-2 cursor-pointer">
                      <Image
                        onClick={() =>
                          handleViewImage(
                            msg?.file?.url || msg?.metadata?.file_url,
                          )
                        }
                        src={msg?.file?.url || msg?.metadata?.file_url}
                        alt="attachment"
                        width={150}
                        height={150}
                      />
                    </div>
                  )}
                  {/* {msg?.audio && (
                    <audio
                      controls
                      src={URL?.createObjectURL(msg.audio)}
                      className="mb-2"
                    />
                  )} */}
                  <p>{msg?.message}</p>
                  <span className="block text-[10px] text-right mt-1 opacity-60">
                    {msg?.created_at_human}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input & Controls */}
      <ReactMediaRecorder
        audio
        blobPropertyBag={{ type: 'audio/webm' }}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
          useEffect(() => {
            if (mediaBlobUrl && !audioBlob) {
              fetch(mediaBlobUrl)
                .then((res) => res.blob())
                .then((blob) => {
                  setAudioBlob(blob);
                  // setInput('Audio recorded');
                });
              setIsRecording(false);
            }
          }, [mediaBlobUrl]);

          const toggleRecording = () => {
            if (status !== 'recording') {
              setIsRecording(true);
              startRecordingTimer();
              // setInput('Recording...');
              startRecording();
            } else {
              stopRecording();
              stopRecordingTimer();
              handleDiscardAudio();
            }
          };

          return (
            <>
              <div className="px-4 py-3 border-t flex items-center gap-3 relative">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-500 cursor-pointer"
                >
                  <FiImage className="w-5 h-5" />
                </button>

                {/* Emoji Picker */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setEmojiPickerOpen((prev) => !prev)}
                  >
                    <FiSmile className="w-5 h-5 text-gray-500 cursor-pointer mt-1" />
                  </button>
                  {emojiPickerOpen && (
                    <div className="absolute bottom-12 left-0 z-10">
                      <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    </div>
                  )}
                </div>

                {/* Mic Button */}
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`text-gray-500 cursor-pointer ${
                    status === 'recording' ? 'animate-pulse text-red-500' : ''
                  }`}
                >
                  <FiMic className="w-5 h-5" />
                </button>

                {/* Input Field */}
                {isRecording ? (
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm text-gray-500">
                      {Math.floor(recordingTime / 60)}:
                      {String(recordingTime % 60).padStart(2, '0')}
                    </span>
                    <div className="flex justify-center space-x-[2px]  w-full">
                      {[...Array(50)].map((_, i) => (
                        <div
                          key={i}
                          className="w-[3px] bg-gray-500 rounded"
                          style={{
                            height: `${6 + Math.random() * 20}px`,
                            animation: `bounce ${0.6 + i * 0.1}s ease-in-out infinite alternate`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      handleDiscardAudio();
                      resetPage();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                    placeholder="Type a message..."
                    disabled={isRecording}
                    className="flex-1 px-4 py-2 border rounded-full text-sm text-gray-500 outline-none focus:ring-1 focus:ring-[#A20030]"
                  />
                )}

                {/* Send Button */}
                <button
                  onClick={() => {
                    handleSend();
                    isRecording && toggleRecording();
                  }}
                  className="text-white bg-[#A20030] hover:bg-[#870026] p-2 rounded-full cursor-pointer"
                >
                  <FiSend className="w-5 h-5" />
                </button>

                {/* File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />
              </div>
              {/* {audioBlob && (
                <div className="flex items-center gap-2 ml-2">
                  <audio
                    controls
                    src={URL.createObjectURL(audioBlob)}
                    className="w-40"
                  />
                  <IoClose
                    onClick={() => {
                      setAudioBlob(null);
                      setInput('');
                    }}
                    className="size-4 text-red-500 cursor-pointer"
                  />
                </div>
              )} */}
              {selectedFile && (
                <Modal
                  isOpen={selectedFile}
                  onClose={() => setSelectedFile(null)}
                  size="max-w-[705px] max-h-fit overflow-y-scroll"
                >
                  <div className="relative flex w-full h-96 items-center gap-2 ml-2 my-2">
                    <Image
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>

                  <FormLabel id="caption" name="caption" label="Caption" />
                  <input
                    id="caption"
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      // handleDiscardAudio();
                      resetPage();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                    placeholder="Type a message..."
                    disabled={isRecording}
                    className="flex-1 px-4 py-2 border rounded-full text-sm w-full mt-2 text-gray-500 outline-none focus:ring-1 focus:ring-[#A20030]"
                  />

                  <button
                    onClick={handleSend}
                    className="text-white bg-[#A20030] hover:bg-[#870026] py-4 rounded-full mt-5 w-full flex items-center justify-center gap-x-2 cursor-pointer"
                  >
                    Send <FiSend className="w-5 h-5" />
                  </button>
                </Modal>
              )}
              {viewImage && (
                <Modal
                  isOpen={viewImage}
                  onClose={() => handleViewImage(null)}
                  size="max-w-xl"
                >
                  <img
                    src={imgUrl}
                    alt="Image"
                    className="object-fill w-full text-black pr-1.5 max-h-[calc(100vh-150px)]"
                  />
                </Modal>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default ChatRoom;
