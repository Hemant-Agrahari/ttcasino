interface IconWrapperProps {
    width?: string | number;
    height?: string | number;
    fill?: string;
    className?: string;
    children: React.ReactNode;
  }
  
  const IconWrapper: React.FC<IconWrapperProps> = ({
    width = 24,
    height = 24,
    fill = "currentColor",
    className = "",
    children,
  }) => {
    return (
      <svg
        width={width}
        height={height}
        fill={fill}
        className={className}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    );
  };
  
  export default IconWrapper;
