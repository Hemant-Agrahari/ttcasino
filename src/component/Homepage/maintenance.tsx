import { useTranslation } from 'react-i18next';

interface Props {
  rootClass?: string;
}

const Maintenance: React.FC<Props> = ({ rootClass }) => {
  const { t } = useTranslation();
  return (
    <h3
      className={`d-flex justify-content-center align-items-center text-center text-secondary my-5 h-30vh ${rootClass}`}
    >
      {t('Games is temporarily under maintenance')}!
    </h3>
  );
};

export default Maintenance;
