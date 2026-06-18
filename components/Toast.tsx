'use client';

interface Props {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: Props) {
  return (
    <div className={`ds-toast${visible ? ' show' : ''}`}>
      {message}
    </div>
  );
}