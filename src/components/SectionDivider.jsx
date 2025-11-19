import './SectionDivider.css';

const SectionDivider = ({ variant = 'default', className = '' }) => {
  const classes = ['section-divider', `section-divider--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} aria-hidden="true" />;
};

export default SectionDivider;

