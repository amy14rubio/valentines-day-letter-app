import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './index.css';

export default function ValentinesFriendship() {
  const [recipientName, setRecipientName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showError, setShowError] = useState(false);
  const [letterMessage, setLetterMessage] = useState('');

  useEffect(() => {
    if (recipientName.trim().length < 2) {
      setLetterMessage('');
      setIsOpen(false);
      setShowLetter(false);
      setShowError(false);
      return;
    }

    let errorTimer;
    let openTimer;
    let letterTimer;

    const fetchLetter = async () => {
      const name = recipientName.trim().toLowerCase();
      const { data } = await supabase.from('letters').select('message').eq('name', name).single();

      if (data?.message) {
        setLetterMessage(data.message);
        setShowError(false);

        openTimer = setTimeout(() => setIsOpen(true), 300);
        letterTimer = setTimeout(() => setShowLetter(true), 650);

        return () => {
          clearTimeout(openTimer);
          clearTimeout(letterTimer);
        };
      } else {
        setLetterMessage('');
        setIsOpen(false);
        setShowLetter(false);
        errorTimer = setTimeout(() => setShowError(true), 3000);
      }
    };

    fetchLetter();

    return () => {
      clearTimeout(errorTimer);
    };
  }, [recipientName]);

  return (
    <div id='bg-container'>
      <div className='content-wrapper text-center w-full'>
        {/* Title */}
        {!showLetter && (
          <div className='title-container mb-8' style={{ opacity: isOpen ? 0 : 1 }}>
            <h1 className='tracking-[0.05em] font-h1-font text-[clamp(28px,6vw,42px)] text-title-color mb-1'>
              Happy Valentine's Day!
            </h1>
            <p className='font-p-font text-[clamp(16px,4vw,20px)] text-title-color text-italic'>
              ❤︎ Thank you for your friendship ❤︎
            </p>
          </div>
        )}

        {/* Envelope */}
        <div className='envelope-container'>
          <div
            className='envelope-body'
            style={{
              transform: showLetter ? 'translateY(50px)' : 'translateY(0)',
            }}
          >
            {/* Envelope Flap */}
            <div
              className={`envelope-flap ${isOpen ? 'open' : ''} absolute inset-0 h-[50%] w-full`}
            ></div>

            {/* Sticker */}
            <div
              className={`sticker absolute top-[30%] left-[60%] right-[0] w-[35%] h-[60%]`}
            ></div>

            {/* Envelope Labels */}
            <div
              className={`envelope-labels ${isOpen ? 'hidden' : ''} absolute z-3 text-left top-[45%] left-4`}
            >
              <div className='envelope-from'>From: Amyruth</div>
              <div className='envelope-to flex gap-2'>
                To:
                <input
                  type='text'
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder='your name'
                  className={`name-input ${showError ? 'border-error-color' : 'border-dark-red'} placeholder:text-dark-red border-b-2 rounded indent-3 outline-none w-[clamp(120px,30vw,180px)] mb-2 `}
                />
              </div>

              {/* Error message */}
              {showError && !isOpen && (
                <p className='error-message font-p-font text-[clamp(9px,1.7vw,15px)] text-dark-red text-italic absolute w-[150%]'>
                  Hmm, I don't have a letter for that name. Double-check your spelling?
                </p>
              )}
            </div>

            {/* Letter */}
            <div className={`letter ${isOpen ? 'open' : ''}`}>
              {showLetter && (
                <div className='letter-content'>
                  <h2 className='text-[clamp(10px,8vw,60px)] text-dark-red text-left mt-2 mb-2 font-text-font'>
                    Dear{' '}
                    {recipientName
                      .split(' ')[0]
                      .toLowerCase()
                      .replace(/^./, (char) => char.toUpperCase())}
                    ,
                  </h2>
                  <p className='whitespace-pre-line text-[clamp(8px,4vw,20px)] text-dark-red text-left font-letter-message-font leading-relaxed mb-4'>
                    {letterMessage}
                  </p>
                  <div className='text-[clamp(10px,5vw,40px)] text-dark-red font-text-font text-center leading-tight'>
                    With love, <br />
                    Amyruth Rubio
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
