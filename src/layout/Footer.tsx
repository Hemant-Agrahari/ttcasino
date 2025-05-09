import Link from 'next/link';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Logo from '../../public/assets/images/logo.png';
import { AffiliateModal } from '@/component/Affiliate';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import CustomMuiAccordion from '@/component/common/mui-component/CustomMuiAccordion';
import CustomMuiAccordionSummary from '@/component/common/mui-component/CustomMuiAccordionSummary';
import CustomMuiAccordionDetails from '@/component/common/mui-component/CustomMuiAccordionDetails';
import CustomImage from '@/component/common/CustomImage';
import { useGetCmsPageQuery } from '@/redux/cms/cmsSlice';
import useToggleModel from '@/customHooks/toggleModel';
import { Dialog } from '@mui/material';

interface _props {
  isSidebar: boolean;
}

const Footer: React.FC<_props> = ({ isSidebar }) => {
  const {
    open: openAffiliate,
    handleOpen: handleAffiliateOpen,
    handleClose: handleAffiliateClose,
  } = useToggleModel(false);
  const [expanded, setExpanded] = useState('');
  const { data: footerContent } = useGetCmsPageQuery(
    { cmsTag: 'footer' },
    { skip: false },
  );
  console.log(footerContent?.data.image, 'footercontent');

  const authToken = useAppSelector((state) => state.user.authToken);
  const { t } = useTranslation();
  const router = useRouter();

  //TODO: remove any type
  const handleChange = (panel: any) => (event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {footerContent?.data && (
        <footer
          className={`${isSidebar ? 'sideBarOpen' : ''} ${router.pathname === '/sport-bet' ? 'mt-0' : ''}`}
        >
          <div className="container">
            <div className="foo-linkSocial">
              <div className="fooLink-desktop">
                <div className="footer_links w-100 footer-line">
                  <div className="fooLink-col">
                    <div className="linkTitle">Quick Menu</div>
                    <ul>
                      <li>
                        <Link href="/promotion-center">{t('FAQs')}</Link>
                      </li>
                      <li>
                        <Link href="/ranking-vip#cashBack">
                          {t('How to: FICA')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/referral">{t('How to: Videos')}</Link>
                      </li>
                      <li>
                        <Link href="">{t('Responsible Gambling')}</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">{t('Terms and Conditions')}</Link>
                      </li>
                    </ul>
                    <div className="linkTitle">{t('Privacy Policy')}</div>
                  </div>
                </div>
                <div className="footer_links w-100 footer-line">
                  <div className="fooLink-col">
                    <div className="linkTitle">FEATURED PROMOS</div>
                    <ul>
                      <li>
                        <Link href="/promotion-center">{t('Welcome Bundles')}</Link>
                      </li>
                      <li>
                        <Link href="/ranking-vip#cashBack">
                          {t('Midweek Madness')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/referral">{t('Weekly Cashback')}</Link>
                      </li>
                      <li>
                        <Link href="">{t('200 Free Spins')}</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">{t('Multi Bet Bonus')}</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer_links w-100 footer-line">
                  <div className="fooLink-col">
                    <div className="linkTitle">FEATURED TERMS</div>
                    <ul>
                      <li>
                        <Link href="/promotion-center">{t('Promotions')}</Link>
                      </li>
                      <li>
                        <Link href="/ranking-vip#cashBack">
                          {t('Cashback')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/referral">{t('Referral')}</Link>
                      </li>
                      <li>
                        <Link href="">{t('Responsible Gambling')}</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">{t('Contact Us')}</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer_links w-100 footer-line">
                  <div className="fooLink-col">
                    <div className="linkTitle">CONNECT WITH US</div>
                    <span className="social_icons_media">
                      <Link href="/">
                        <CustomImage
                          src="/assets/images/telegram.svg"
                          alt={t('Facebook')}
                          width={32}
                          height={32}
                        />
                      </Link>
                    </span>
                    <span className="social_icons_media">
                      <Link href="/">
                        <CustomImage
                          src="/assets/images/telegram.svg"
                          alt={t('Facebook')}
                          width={32}
                          height={32}
                        />
                      </Link>
                    </span>
                    <span className="social_icons_media">
                      <Link href="/">
                        <CustomImage
                          src="/assets/images/telegram.svg"
                          alt={t('Facebook')}
                          width={32}
                          height={32}
                        />
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="social_icons_wrapper">
                  <div className="social_icons_contain_wrapper">
                    <div className="social_icons_contain">
                      <h6 className="social_icons_title">
                        {t('COMPLIANCE')}
                      </h6>
                      <div className="social_icons_media">
                        <Link href="/">
                          <CustomImage
                            src="/assets/images/telegram.svg"
                            alt={t('Facebook')}
                            width={32}
                            height={32}
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="social_icons_contain">
                      <h6 className="social_icons_title">
                        {t('Payment Gateway')}
                      </h6>
                      <div className="social_icons_media">
                        <Link href="/">
                          <CustomImage
                            src="/assets/images/payment_gateway-icon.png"
                            width={32}
                            height={32}
                            alt={t('payment Gateway')}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* mobile show  accordian */}
            <div className=" d-block d-md-none">
              <div className="fooLink-mobile">
                <CustomMuiAccordion
                  className="bg-none"
                  expanded={expanded === 'panel1'}
                  onChange={handleChange('panel1')}
                >
                  <CustomMuiAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <div className="title">CASINO BET</div>
                  </CustomMuiAccordionSummary>
                  <CustomMuiAccordionDetails>
                    <ul>
                      <li>
                        <Link href="/promotion-center">{t('Promotions')}</Link>
                      </li>
                      <li>
                        <Link href="/ranking-vip#cashBack">
                          {t('Cashback')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/referral">{t('Referral')}</Link>
                      </li>
                      <li>
                        <Link href="">{t('Responsible Gambling')}</Link>
                      </li>
                      <li>
                        <Link href="/contact-us">{t('Contact Us')}</Link>
                      </li>
                    </ul>
                  </CustomMuiAccordionDetails>
                </CustomMuiAccordion>
                <CustomMuiAccordion
                  className="bg-none"
                  expanded={expanded === 'panel5'}
                  onChange={handleChange('panel5')}
                >
                  <CustomMuiAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5-content"
                    id="panel5-header"
                  >
                    <div className="title">{t('Legal')}</div>
                  </CustomMuiAccordionSummary>
                  <CustomMuiAccordionDetails>
                    <ul>
                      <li>
                        <Link href="/privacy-policy?tab=1">
                          {t('Privacy Policy')}
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy?tab=0">
                          {t('Terms & Conditions')}
                        </Link>
                      </li>
                      {authToken ? (
                        <li onClick={handleAffiliateOpen}>
                          {t('Become an Affiliate')}
                        </li>
                      ) : null}
                      <li>
                        <Link href="/privacy-policy?tab=3">
                          {t('Betting Rules')}
                        </Link>
                      </li>
                    </ul>
                  </CustomMuiAccordionDetails>
                </CustomMuiAccordion>
              </div>
            </div>

            {/* mobile social section */}
            <div className=" d-block d-md-none">
              <div className="social_icons_wrapper_mobile">
                <div className="social_icons_contain">
                  <h6 className="social_icons_title">{t('Social Media')}</h6>
                  <div className="social_icons_media">
                    <Link href="/">
                      <CustomImage
                        src="/assets/images/telegram.svg"
                        alt={t('Facebook')}
                        width={32}
                        height={32}
                      />
                    </Link>
                  </div>
                </div>
                <div className="social_icons_contain">
                  <h6 className="social_icons_title">{t('Payment Gateway')}</h6>
                  <div className="social_icons_media">
                    <Link href="/">
                      <CustomImage
                        src="/assets/images/payment_gateway-icon.png"
                        width={32}
                        height={32}
                        alt={t('payment Gateway')}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* mobile logo */}
            <div className=" d-block d-md-none">
              <div className="fooSocial social">
                <Link href="/">
                  <CustomImage
                    src={
                      footerContent?.data?.image
                        ? footerContent.data.image
                        : Logo
                    }
                    width={147}
                    height={98}
                    alt="TT-Casino"
                    className="margin-bottom-10"
                  />
                </Link>

                <p
                  className="fooText"
                  dangerouslySetInnerHTML={{
                    __html: footerContent.data.content,
                  }}
                />
              </div>
            </div>
            <div className='footer-instructions'>
            No persons under the age of 18 years are permitted to gamble. SUPABETS ® is regulated by the Mpumalanga Economic Regulator (Licence) and supports responsible gambling. National Responsible Gambling Programme toll free counselling line 0800 006 008 or WHATSAPP HELP to 076 675 0710. Winners know when to stop. License no: 9-2-1-00055. No part of this site may be reproduced in whole or in part in any manner without the permission of Supabets Gaming Group. ©2024 All rights Reserved.
            </div>
            <div className='footer-instructions'>
            Although Portapa 2 (Pty) Ltd t/a SUPABETS ® and its proprietors make every effort to keep the information supplied on its website current and in accordance with gambling legislation and guidelines, it does not accept any liability for any damages, gambling addictions, side effects, adverse effects, medical complications, injury or death arising from the use of any information available on its website. By making use of the facilities on this site, the user warrants that he/she is older than 18 Years.
            </div>
          </div>
        </footer>
      )}
      <Dialog
        open={openAffiliate}
        className="affiliateModal"
        scroll="body"
        maxWidth="md"
      >
        <AffiliateModal handleCloseAffiliate={handleAffiliateClose} />
      </Dialog>
    </>
  );
};

export default Footer;
