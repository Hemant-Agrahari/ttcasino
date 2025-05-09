import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import { useTranslation } from 'react-i18next';
import { commonStaticProps } from '@/utils/translation';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { CustomButton } from '@/component/common';
import withAuth from '@/utils/withAuth';

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

function SuccessPayment() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="success-payment  d-flex flex-column align-items-center justify-content-center ">
      <div className=" card shadow p-4 text-center text-success">
        <div className="d-flex justify-content-center mb-3">
          <div className="rounded-circle d-flex align-items-center justify-content-center bg-success text-white">
            <DoneIcon style={{ fontSize: '2.5rem' }} />
          </div>
        </div>

        <h2 className="mb-3 ">{t('Payment Successful!')}</h2>
        <p>
          {t(
            'Thank you for your purchase. Your transaction has been completed successfully.',
          )}
        </p>
        <CustomButton
          className="modal-btn btn-gradient mt-4"
          onClick={() => router.push('/')}
          type="button"
        >
          {t('Go to Homepage')}
        </CustomButton>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(withAuth(SuccessPayment)), {
  ssr: false,
});
