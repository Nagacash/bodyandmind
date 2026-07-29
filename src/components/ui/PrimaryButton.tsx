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
    'inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer group active:scale-[0.98]';

  const variantClasses =
    variant === 'solid'
      ? 'bg-[#8E7B62] hover:bg-[#A08C71] text-[#0F0F0F] shadow-xl hover:shadow-2xl'
      : 'border border-[#222222] text-gray-300 hover:text-white hover:bg-[#1A1A1A]';

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
