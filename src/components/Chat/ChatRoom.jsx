import { FiSend, FiImage, FiMic, FiSmile } from 'react-icons/fi';
import Image from 'next/image';
import EmptyChat from './EmptyChat';
import EmptyChatRoom from '@/Images/EmptyChatRoom.png';
import { useState, useRef, useEffect } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useScrollToBottom } from '../Hooks/useScrollToBottom';
import EmojiPicker from 'emoji-picker-react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { CiVideoOn } from 'react-icons/ci';
import { MdOutlineLocalPhone } from 'react-icons/md';
import Modal from '../Modal';
import { IoClose } from 'react-icons/io5';
import FormLabel from '../FormLabel';

// NOTE: This is a defensive, drop-in replacement for the original ChatRoom component.
// Main goals:
// - avoid invalid hook usage (moved away from render-prop hooks)
// - safe defaults for `messages` and `messages.length`
// - consistent message shape (use `message` for text, and `file` for attachments)
// - robust handling of local Blob URLs so previews work (uses <img> / <audio> / <video> instead of next/image)
// - timers use refs (avoids stale state issues) and are cleaned up on unmount
// - don't discard recorded audio automatically when stopping recording

const ChatRoom = ({
  user,
  signedInUser,
  messages = [],
  pagination,
  onSend,
  onBack,
  handleViewMore,
  isLoadingMessages,
  resetPage,
  handleCallInitiation,
}) => {
  // State
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const chatContainerRef = useScrollToBottom([isLoadingMessages]);

  // Use the hook variant so hooks are called at top-level (no hooks inside render props)
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: { type: 'audio/webm' },
    });

  // Ensure `messages` is always an array before using .length etc.
  const safeMessages = Array.isArray(messages) ? messages : [];

  // Keep a stable preview URL for the selected file (so modal can use it without creating multiple object URLs)
  useEffect(() => {
    if (!selectedFile) {
      setSelectedFilePreview(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setSelectedFilePreview(url);
    return () => {
      URL.revokeObjectURL(url);
      setSelectedFilePreview(null);
    };
  }, [selectedFile]);

  // Convert recorder's mediaBlobUrl (blob:) into a real Blob object
  // useEffect(() => {
  //   if (!mediaBlobUrl) return;
  //   // fetch the blob and store it so we can send it later
  //   fetch(mediaBlobUrl)
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       setAudioBlob(blob);
  //     })
  //     .catch((err) => {
  //       console.error('Failed to fetch media blob url:', err);
  //     });
  // }, [mediaBlobUrl]);

  // Convert recorder's mediaBlobUrl (blob:) into a real Blob object
  useEffect(() => {
    if (!mediaBlobUrl) return;

    fetch(mediaBlobUrl)
      .then((res) => res.blob())
      .then((blob) => {
        setAudioBlob(blob);

        // ✅ Immediately send the audio once the blob is ready
        const newMessage = {
          id: (safeMessages?.length ?? 0) + 1,
          sender: 'me',
          message: 'Audio',
          file: blob,
          type: 'audio',
          created_at_human: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        onSend?.(newMessage);
        resetPage?.();
        setRecordingTime(0);
      })
      .catch((err) => {
        console.error('Failed to fetch media blob url:', err);
      });
  }, [mediaBlobUrl]);

  // Reset certain states when messages are reloading
  useEffect(() => {
    setInput('');
    setSelectedFile(null);
    setAudioBlob(null);
    discardAudio();
    // we intentionally DO NOT manipulate recording timer here
  }, [isLoadingMessages]);

  // Timer helpers using ref
  const startRecordingTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((p) => p + 1);
    }, 1000);
  };

  const stopRecordingTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecordingTimer();
    };
  }, []);

  const toggleRecording = () => {
    if (status !== 'recording') {
      startRecording();
      startRecordingTimer();
    } else {
      stopRecording();
      stopRecordingTimer();
      // DO NOT discard audio here — we want to keep it so user can preview/send
    }
  };

  const discardAudio = () => {
    // If we created an object URL for audio preview (not stored here), we'd revoke it here.
    setAudioBlob(null);
    setRecordingTime(0);
  };

  // Handle sending audio
  const handleSendAudio = () => {
    if (!audioBlob) return;

    const newMessage = {
      id: (safeMessages?.length ?? 0) + 1,
      sender: 'me',
      message: 'Audio',
      file: audioBlob,

      type: 'audio',
      created_at_human: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setTimeout(() => {
      onSend?.(newMessage);
    }, 2000);

    // Reset local state after sending — we keep the object URL until the browser frees it.
    setAudioBlob(null);
    setInput('');
    resetPage?.();
  };

  const handleSend = () => {
    // If there's recorded audio, prioritize sending it
    console.log(input, 'input');
    console.log(selectedFile, 'selectedFile');
    console.log(selectedFilePreview, 'selectedFilePreview');
    console.log(audioBlob, 'audioBlob');
    if (audioBlob) {
      handleSendAudio();
      return;
    }

    if (!input.trim() && !selectedFile) return;

    const fileObj = selectedFile
      ? {
          url:
            selectedFilePreview ||
            (selectedFile && URL.createObjectURL(selectedFile)),
          raw: selectedFile,
          name: selectedFile.name,
          mime: selectedFile.type,
        }
      : null;

    const newMessage = {
      id: (safeMessages?.length ?? 0) + 1,
      sender: 'me',
      message: input.trim() || (fileObj ? '' : ''),
      file: selectedFile,
      type: fileObj
        ? fileObj.mime?.startsWith('video/')
          ? 'video'
          : 'image'
        : 'text',
      created_at_human: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onSend?.(newMessage);

    // Clear
    setInput('');
    setSelectedFile(null);
    resetPage?.();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
    // Close emoji picker if open
    setEmojiPickerOpen(false);
  };

  const handleEmojiSelect = (emojiData) => {
    // emoji-picker-react typically passes (emojiObject, event)
    const emoji = emojiData?.emoji ?? (emojiData?.native || '');
    if (!emoji) return;
    setInput((p) => p + emoji);
    setEmojiPickerOpen(false);
  };

  // image viewer
  const [viewImage, setViewImage] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const handleViewImage = (img) => {
    setImgUrl(img);
    setViewImage(Boolean(img));
  };

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
          {user?.image ? (
            <Image
              width={40}
              height={40}
              src={user.image}
              alt={user.name}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200" />
          )}

          <div>
            <h4 className="text-sm font-medium text-[#141414]">{user?.name}</h4>
            {user?.participants?.is_online && (
              <span className="text-xs text-green-500">Online</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3 pr-4">
          <CiVideoOn
            onClick={() => handleCallInitiation?.('video')}
            className="size-6 text-gray-700 cursor-pointer"
          />
          <MdOutlineLocalPhone
            onClick={() => handleCallInitiation?.('audio')}
            className="size-6 text-gray-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-3">
        {safeMessages.length === 0 ? (
          <EmptyChat
            image={EmptyChatRoom}
            title="Start a Conversation"
            description={`Send a message to ${user?.name ?? 'this user'}`}
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

            {safeMessages.map((msg) => {
              const isMe =
                msg?.user?.id === signedInUser?.id || msg?.sender === 'me';
              const fileUrl = msg?.file?.url || msg?.metadata?.file_url;

              return (
                <div
                  key={msg?.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                      isMe
                        ? 'bg-[#A20030] text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {/* Attachment preview (only render when we actually have a file URL or raw blob) */}
                    {fileUrl && msg?.type !== 'audio' && (
                      <div className="mb-2 cursor-pointer">
                        {/* use plain <img> to support blob: and external urls without Next/Image constraints */}
                        <img
                          onClick={() => handleViewImage(fileUrl)}
                          src={fileUrl}
                          alt="attachment"
                          style={{
                            width: 150,
                            height: 150,
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}

                    {/* Audio / Video */}
                    {(msg?.type === 'audio' ||
                      msg?.metadata?.file_type === 'audio/webm') && (
                      <audio
                        controls
                        src={msg?.file?.url || msg?.metadata?.file_url}
                        className="mb-2"
                      />
                    )}

                    {msg?.type === 'video' && (
                      <video
                        controls
                        src={
                          msg?.file?.url ||
                          (msg?.file?.raw
                            ? URL.createObjectURL(msg.file.raw)
                            : undefined)
                        }
                        className="mb-2"
                        style={{ maxWidth: 300 }}
                      />
                    )}

                    <p>{msg?.message ?? msg?.text ?? ''}</p>
                    <span className="block text-[10px] text-right mt-1 opacity-60">
                      {msg?.created_at_human}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input & Controls */}
      <div className="px-4 py-3 border-t flex items-center gap-3 relative">
        <button
          type="button"
          onClick={() => document.getElementById('chat-file-input')?.click()}
          className="text-gray-500 cursor-pointer"
        >
          <FiImage className="w-5 h-5" />
        </button>

        {/* Emoji Picker */}
        <div className="relative">
          <button type="button" onClick={() => setEmojiPickerOpen((p) => !p)}>
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
          className={`text-gray-500 cursor-pointer ${status === 'recording' ? 'animate-pulse text-red-500' : ''}`}
        >
          <FiMic className="w-5 h-5" />
        </button>

        {/* Input Field or Recording UI */}
        {status === 'recording' ? (
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm text-gray-500">
              {Math.floor(recordingTime / 60)}:
              {String(recordingTime % 60).padStart(2, '0')}
            </span>
            <div className="flex justify-center space-x-[2px]  w-full">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-gray-500 rounded"
                  style={{
                    height: `${6 + Math.random() * 20}px`,
                    animation: `bounce ${0.6 + i * 0.05}s ease-in-out infinite alternate`,
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
              discardAudio();
              resetPage?.();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type a message..."
            disabled={status === 'recording'}
            className="flex-1 px-4 py-2 border rounded-full text-sm text-gray-500 outline-none focus:ring-1 focus:ring-[#A20030]"
          />
        )}

        {/* Send Button */}
        <button
          // disabled={!audioBlob}
          onClick={() => {
            handleSend();
            if (status === 'recording') toggleRecording();
          }}
          className="text-white bg-[#A20030] hover:bg-[#870026] p-2 rounded-full cursor-pointer"
        >
          <FiSend className="w-5 h-5" />
        </button>

        {/* File Input (hidden) */}
        <input
          id="chat-file-input"
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Selected file preview modal */}
      {selectedFile && (
        <Modal
          isOpen={Boolean(selectedFile)}
          onClose={() => setSelectedFile(null)}
          size="max-w-[705px] max-h-fit overflow-y-scroll"
        >
          <div className="relative flex w-full h-96 items-center gap-2 ml-2 my-2">
            {selectedFilePreview ? (
              // use <img> here for blob support
              <img
                src={selectedFilePreview}
                alt="Preview"
                className="rounded-lg object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-lg" />
            )}
          </div>

          <FormLabel id="caption" name="caption" label="Caption" />
          <input
            id="caption"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              resetPage?.();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type a message..."
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

      {/* Image viewer modal */}
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
    </div>
  );
};

export default ChatRoom;
