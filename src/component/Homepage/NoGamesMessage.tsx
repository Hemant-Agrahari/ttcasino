import { useTranslation } from 'react-i18next';

interface _props {
  isShowHeading?: boolean;
  gameName?: {
    type: string;
    subType: string;
  };
}

export const NoGamesMessage: React.FC<_props> = ({
  isShowHeading = false,
  gameName,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {isShowHeading ? (
        <div className="d-flex flex-row tab-title">
          <h4 className="text-capitalize text-white font-weight-700">
            {gameName?.subType
              ? `${gameName.type} / ${gameName.subType}`
              : gameName && gameName.type}
          </h4>
        </div>
      ) : null}

      <h3 className="d-flex justify-content-center my-5 text-white">
        {t('No Games Found')}!
      </h3>
    </>
  );
};
