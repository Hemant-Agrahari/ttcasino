import { useRouter } from 'next/router';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useTranslation } from 'react-i18next';
import { commonStaticProps } from '@/utils/translation';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import withAuth from '@/utils/withAuth';

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};

function FailedPayment() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="success-payment d-flex flex-column align-items-center justify-content-center vh-75">
      <div
        className="card shadow p-4 text-center  text-danger"
        style={{ width: '400px' }}
      >
        <div className="d-flex justify-content-center mb-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center bg-danger text-white"
            style={{ width: '60px', height: '60px' }}
          >
            <PriorityHighIcon style={{ fontSize: '2.5rem' }} />
          </div>
        </div>

        <h2 className="mb-3">{t('Payment Failed')}</h2>

        <p>{t('Oops! Something went wrong. Please try again.')}</p>

        <div className="d-flex flex-column gap-2 mt-4">
          <button
            className="modal-btn btn-gradient"
            onClick={() => router.push('/')}
          >
            {t('Go to Homepage')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(withAuth(FailedPayment)), {
  ssr: false,
});
