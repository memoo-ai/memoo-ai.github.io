import { useState } from 'react';
export const IconTwitter = ({ className, hoverColor = '#ff0000' }: { className: string; hoverColor?: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36.05 33.76"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
    >
      <g id="Design">
        <path
          style={{ fill: hovered ? hoverColor : '#fff', strokeWidth: 0 }}
          d="M.08,0h.18C3.73,0,7.19,0,10.66,0c.11,0,.18.03.24.12,2.97,3.98,5.94,7.95,8.91,11.92.04.05.07.1.12.16.09-.1.18-.19.27-.28,2.01-2.17,4.01-4.34,6.02-6.51,1.64-1.77,3.28-3.54,4.92-5.31.06-.07.13-.1.22-.1.96,0,1.92,0,2.88,0h.16c-4.36,4.71-8.7,9.4-13.04,14.09,4.9,6.55,9.79,13.09,14.7,19.65-.06,0-.11.01-.15.01-3.49,0-6.98,0-10.47,0-.09,0-.14-.04-.2-.11-3.25-4.34-6.5-8.69-9.74-13.03-.02-.03-.05-.06-.08-.11-.1.1-.19.2-.27.29-2,2.16-4,4.32-6,6.48-1.97,2.13-3.94,4.25-5.91,6.38-.04.05-.12.09-.18.09-.98,0-1.96,0-2.94,0-.03,0-.06,0-.12,0,4.68-5.05,9.33-10.08,14-15.12C9.36,12.42,4.73,6.22.08,0ZM31.39,31.43c-.03-.05-.05-.08-.08-.11-.82-1.09-1.63-2.18-2.45-3.27-3.02-4.03-6.03-8.07-9.05-12.1-3.37-4.5-6.73-9-10.09-13.5-.05-.07-.1-.1-.2-.1-1.55,0-3.1,0-4.65,0-.04,0-.08,0-.14,0,.04.06.07.09.09.13.38.5.76,1.01,1.13,1.51,2.76,3.69,5.52,7.38,8.28,11.08,4.05,5.42,8.1,10.83,12.15,16.25.06.08.12.11.22.11,1.54,0,3.08,0,4.62,0h.15Z"
        />
      </g>
    </svg>
  );
};

export const IconTelegram = ({ className, hoverColor = '#ff0000' }: { className: string; hoverColor?: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.24 33.89"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
    >
      <g id="Design">
        <g id="b3W9pD.tif">
          <path
            style={{ fill: hovered ? hoverColor : '#fff', strokeWidth: 0 }}
            d="M31.97,33.89c-.47-.08-.91-.26-1.33-.49-.26-.15-.49-.35-.73-.53-.6-.45-1.2-.9-1.8-1.35-.9-.68-1.81-1.36-2.71-2.04-.85-.64-1.7-1.28-2.55-1.92-.42-.32-.84-.63-1.26-.95-.07-.05-.11-.05-.17,0-.7.67-1.41,1.34-2.11,2.01-.55.52-1.1,1.05-1.65,1.57-.46.44-.92.89-1.4,1.32-.4.36-.87.5-1.4.29-.36-.14-.59-.42-.78-.74-.04-.08-.06-.15-.05-.24.07-.77.12-1.54.19-2.31.06-.8.13-1.6.2-2.4.07-.8.13-1.6.19-2.41,0-.08.05-.12.1-.17.5-.45.99-.9,1.49-1.35.95-.86,1.9-1.73,2.85-2.59.83-.75,1.65-1.5,2.48-2.25.6-.55,1.2-1.09,1.8-1.64.62-.56,1.24-1.12,1.85-1.68.88-.8,1.76-1.6,2.64-2.4.91-.83,1.83-1.67,2.74-2.5.58-.53,1.16-1.05,1.74-1.58.46-.41.91-.82,1.37-1.24.14-.13.27-.26.34-.45.05-.16-.01-.28-.17-.32-.17-.04-.33-.02-.5.01-.37.08-.7.26-1.02.46-.51.32-1.02.64-1.53.96-.56.35-1.13.7-1.69,1.05-.87.54-1.75,1.08-2.62,1.63-.82.51-1.63,1.02-2.45,1.52-.57.35-1.14.7-1.7,1.06-.76.47-1.52.95-2.28,1.42-.88.55-1.76,1.09-2.64,1.64-1.02.63-2.03,1.27-3.05,1.9-.92.57-1.84,1.14-2.76,1.71-.45.28-.9.56-1.35.84-.05.03-.1.04-.16.02-.96-.31-1.92-.62-2.88-.92-.87-.28-1.74-.55-2.61-.83-.87-.28-1.74-.56-2.61-.84-.25-.08-.5-.16-.75-.24-.36-.11-.68-.28-.94-.57-.32-.35-.35-.82-.1-1.22.24-.38.58-.64.97-.85.37-.19.78-.32,1.16-.47.64-.25,1.29-.5,1.93-.75.99-.38,1.98-.77,2.97-1.15.82-.32,1.64-.64,2.46-.96.78-.3,1.57-.61,2.35-.91.82-.32,1.65-.64,2.47-.96.62-.24,1.25-.48,1.87-.72.63-.24,1.26-.49,1.89-.74.79-.31,1.59-.61,2.38-.92.71-.28,1.43-.55,2.14-.83.75-.29,1.5-.58,2.24-.87.72-.28,1.43-.56,2.15-.84.62-.24,1.25-.48,1.87-.72.71-.28,1.43-.55,2.14-.83.99-.38,1.98-.77,2.97-1.15.79-.31,1.58-.61,2.37-.92.36-.14.72-.29,1.09-.4.43-.12.87-.2,1.32-.15.62.08,1.07.48,1.23,1.09.04.14.06.29.1.43v.9c-.04.26-.08.52-.13.78-.09.44-.18.88-.27,1.32-.16.78-.33,1.56-.49,2.33-.12.59-.25,1.18-.37,1.77-.21,1.01-.42,2.02-.63,3.03-.15.74-.31,1.48-.47,2.22-.16.75-.32,1.5-.48,2.25-.24,1.16-.48,2.32-.73,3.49-.19.93-.39,1.86-.59,2.78-.2.94-.39,1.88-.59,2.81-.16.78-.33,1.56-.49,2.33-.16.78-.33,1.56-.49,2.33-.09.44-.19.88-.28,1.32-.1.49-.2.97-.4,1.43-.17.39-.4.75-.76,1-.19.13-.41.2-.63.25h-.47Z"
          />
        </g>
      </g>
    </svg>
  );
};

export const IconProfile = ({ className, hoverColor = '#ff0000' }: { className: string; hoverColor?: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
    >
      <rect width="46" height="46" rx="10" fill={hovered ? '#2A2C3A' : '#CC0000'} />
      <path
        d="M8 23.7707C8 23.1907 8 22.6107 8 22.0207C8.02 21.9307 8.04 21.8307 8.05 21.7407C8.14 20.4007 8.42 19.0907 8.88 17.8307C11.48 10.6607 19.05 6.62067 26.47 8.43067C34.13 10.3007 39.03 17.9607 37.53 25.6907C36.95 28.6507 35.61 31.2207 33.49 33.3607C31.26 35.6107 28.59 37.0207 25.46 37.5607C24.9 37.6607 24.33 37.7107 23.77 37.7907H22.02C21.63 37.7407 21.23 37.7007 20.84 37.6507C17.9 37.2407 15.31 36.0607 13.08 34.1007C10.47 31.7907 8.83 28.9107 8.23 25.4607C8.13 24.9007 8.08 24.3307 8 23.7707ZM12.96 31.4607C13.93 28.0207 16.08 25.6807 19.36 24.3507C15.91 21.8707 15.99 17.4107 18.25 14.9607C20.57 12.4307 24.5 12.1907 27.02 14.4507C28.38 15.6707 29.13 17.2007 29.16 19.0307C29.19 21.2607 28.24 23.0207 26.42 24.3707C28.03 24.9807 29.38 25.8907 30.5 27.1407C31.63 28.3907 32.39 29.8407 32.82 31.4807C36.77 27.1007 37.56 19.3907 32.53 13.9907C27.42 8.48067 19 8.30067 13.67 13.5507C8.38 18.7607 8.74 26.7007 12.96 31.4607ZM23.13 36.0507C23.43 36.0307 23.97 36.0007 24.51 35.9307C27.01 35.6307 29.23 34.6707 31.18 33.0907C31.25 33.0307 31.3 32.8807 31.29 32.7807C31.19 31.9507 30.95 31.1507 30.59 30.3907C29.19 27.3907 26.22 25.4707 22.86 25.4807C21.05 25.4807 19.4 26.0207 17.94 27.0907C16 28.5207 14.84 30.4307 14.49 32.8307C14.48 32.9107 14.54 33.0307 14.61 33.0807C17.02 35.0207 19.78 35.9907 23.12 36.0407L23.13 36.0507ZM22.9 23.6807C25.39 23.6807 27.41 21.6507 27.42 19.1707C27.42 16.6907 25.38 14.6307 22.89 14.6407C20.4 14.6407 18.34 16.7107 18.37 19.1807C18.4 21.6707 20.42 23.6907 22.9 23.6807Z"
        fill="white"
      />
    </svg>
  );
};
