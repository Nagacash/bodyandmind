import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  variant?: 'solid' | 'outline';
  className?: string;
  id?: string;
  showArrow?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  href,
  type = 'button',
  variant = 'solid',
  className = '',
  id,
  showArrow = false,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 min-h-[44px] rounded-none text-xs sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all cursor-pointer group active:scale-[0.98]';

  const variantClasses =
    variant === 'solid'
      ? 'bg-accent hover:bg-accent-hover text-white shadow-xl hover:shadow-2xl'
      : 'border border-border text-gray-300 hover:text-white hover:bg-surface-elevated';

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href} id={id} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} id={id} onClick={onClick} className={classes}>
      {content}
    </button>
  );
};
