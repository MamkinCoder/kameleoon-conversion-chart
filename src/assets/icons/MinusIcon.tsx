type IconProps = React.SVGProps<SVGSVGElement>;

const MinusIcon: React.FC<IconProps> = (props) => (
  <svg
    width="11"
    height="1.375"
    viewBox="0 0 11 1.375"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0L0 1.375L11 1.375L11 0L0 0Z" />
  </svg>
);

export default MinusIcon;
