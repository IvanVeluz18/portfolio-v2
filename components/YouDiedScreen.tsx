'use client';

interface Props {
  show: boolean;
  textVisible: boolean;
  subVisible: boolean;
  onDismiss: () => void;
}

export default function YouDiedScreen({
  show,
  textVisible,
  subVisible,
  onDismiss,
}: Props) {
  return (
    <div className={`ds-you-died-screen${show ? ' show' : ''}`}>
      <div className={`ds-you-died-text${textVisible ? ' fade-in' : ''}`}>
        Available for Hire
      </div>
      <div>
        <div
          className={`ds-you-died-sub${subVisible ? ' fade-in' : ''}`}
          onClick={onDismiss}
        >
          Return to Bonfire
        </div>
      </div>
    </div>
  );
}