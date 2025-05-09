import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { commonStaticProps } from '@/utils/translation';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return commonStaticProps(locale!);
};
const Custom404Page = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <div className="not-found-box">
        <Image
          src="/assets/images/404-error-image.png"
          alt="404-image"
          width={500}
          height={100}
        />
        <div className="mt-3">
          <p className="error-message">
            {t('The page you are looking for does not exist.')}
          </p>
          <Link
            href="/"
            className="modal-btn btn-gradient error-404-button text-decoration-none"
          >
            {t('Go to Homepage')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Custom404Page), {
  ssr: false,
});
