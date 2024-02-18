import { useState, useEffect } from 'react';
import styles from '../../styles/modal.module.scss';

interface ModalProps {
  title: string;
  txt: string;
  onSubmit: (inputValue: string) => void;
}

const Modal: React.FC<ModalProps> = ({ title, txt, onSubmit }) => {

  const [isOpen, setIsOpen] = useState(true);

  const [inputValue, setInputValue] = useState('');


  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });



  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPosition]);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const modalStyles = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(false);
    onSubmit(inputValue);
    setInputValue('');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']} style={modalStyles}>
        <div className={styles['modal-header']} onMouseDown={handleMouseDown}>
          <h2>{title}</h2>
          <button className={styles['close-button']} onClick={() => setIsOpen(false)}>×</button>
        </div>
        <div className={styles['modal-body']}>
          {txt? <p>{txt}</p>: null}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="message for bottle"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
           send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
