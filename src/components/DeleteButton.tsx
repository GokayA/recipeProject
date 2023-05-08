import React from 'react';

interface DeleteButtonProps {
  text?: string;
  className?: string;
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  text = 'Delete',
  className,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default DeleteButton;
