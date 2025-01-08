export const Button = ({ className = '', variant = 'default', children, ...props }) => {
    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50'
    };
  
    return (
      <button
        className={`px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };