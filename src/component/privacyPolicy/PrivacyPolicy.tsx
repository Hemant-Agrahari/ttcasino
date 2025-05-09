import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import CustomMuiAccordion from '@/component/common/mui-component/CustomMuiAccordion';
import CustomMuiAccordionSummary from '@/component/common/mui-component/CustomMuiAccordionSummary';
import CustomMuiAccordionDetails from '@/component/common/mui-component/CustomMuiAccordionDetails';
import Loader from '@/component/common/mui-component/Loader';
import CustomMuiTypography from '@/component/common/mui-component/CustomMuiTypography';
import CustomMuiTab from '../common/mui-component/CustomMuiTab';
import { useGetCmsPageQuery, useGetFaqQuery } from '@/redux/cms/cmsSlice';
interface _props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel: React.FC<_props> = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { tab } = router.query;
  const contentTypes: Record<string, string> = {
    0: 'termsAndCondition',
    1: 'privacyPolicy',
  };
  const [value, setValue] = useState<number>(0);
  const [expanded, setExpanded] = React.useState<number>(0);
  const { data: faqList, isLoading } = useGetFaqQuery();
  const { data: cmsContent, isLoading: isCmsLoading } = useGetCmsPageQuery({
    cmsTag: typeof tab === 'string' ? contentTypes[tab] : 'termsAndCondition',
  });

  const handleTabs = (event: React.SyntheticEvent, newValue: number) => {
    router.push(`/privacy-policy?tab=${newValue}`);
  };

  const handleChanges = (value: number) => {
    setExpanded((prev: number) => {
      if (value === prev) {
        return 0;
      } else {
        return value;
      }
    });
  };

  const titles = [
    'Terms & Conditions',
    'Privacy Policy',
    'FAQ',
    'Betting Rules',
  ];

  useEffect(() => {
    setValue(Number(tab));
  }, [tab]);

  const labLabels = [
    t('Terms & Conditions'),
    t('Privacy Policy'),
    t('Frequently Asked Questions'),
    t('Betting Rules'),
  ];

  const tabClassName = [
    'tabs-list mx-2 fs-28',
    'tabs-list mx-2 fs-28',
    'tabs-list mx-2 fs-28',
    'tabs-list mx-2 fs-28',
  ];

  return (
    <div className="privacyTems-page">
      {typeof tab === 'string' && (
        <div className="privacyPolicy-banner">
          <div className="container">
            <h1>{t(titles[Number(tab)])}</h1>
          </div>
        </div>
      )}

      <div className="container pt-5 mt-md-5">
        <Box className="w-100">
          <Box className="tabs-box">
            <CustomMuiTab
              value={Number(value)}
              onChange={handleTabs}
              tabsClassName="tabs-boxslist"
              tabLabels={labLabels}
              tabClassName={tabClassName}
            />
          </Box>
          <CustomTabPanel value={value} index={0}>
            <h2 className="fs-100 fw-medium">{t('Terms & Conditions')}</h2>
            {isCmsLoading ? (
              <Loader />
            ) : (
              cmsContent?.data?.content && (
                <div className=" pb-md-3 pb-0">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: cmsContent?.data?.content,
                    }}
                  ></p>
                </div>
              )
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <h2 className="fs-100 fw-medium">{t('Privacy Policy')}</h2>
            {isCmsLoading ? (
              <Loader />
            ) : (
              cmsContent?.data?.content && (
                <div className=" pb-md-3 pb-0">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: cmsContent?.data?.content,
                    }}
                  ></p>
                </div>
              )
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <h2 className="fs-100 fw-medium">
              {t('Frequently Asked Questions')}
            </h2>
            <div className="px-lg-5 w-100 pt-md-5 pt-3">
              {isLoading ? (
                <Loader />
              ) : (
                <div className="faq-accordian">
                  {faqList?.data &&
                    faqList.data.length > 0 &&
                    faqList.data.map((item, index: number) => {
                      return (
                        <CustomMuiAccordion
                          expanded={expanded === index + 1}
                          onChange={() => handleChanges(index + 1)}
                          key={index + 1}
                        >
                          <CustomMuiAccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                            className="d-flex flex-row-reverse"
                          >
                            {expanded === index ? (
                              <RemoveCircleOutlineIcon className="expand-collapse-icon" />
                            ) : (
                              <ControlPointIcon className="expand-collapse-icon" />
                            )}
                            <CustomMuiTypography
                              title={item?.question}
                              className="ms-4 text-white font-weight-500"
                            />
                          </CustomMuiAccordionSummary>
                          <CustomMuiAccordionDetails className="text-white">
                            <CustomMuiTypography
                              title={item?.answer}
                              className="accordion-answer-text"
                            />
                          </CustomMuiAccordionDetails>
                        </CustomMuiAccordion>
                      );
                    })}
                </div>
              )}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <h2 className="fs-100 fw-medium">{t('Betting Rules')}</h2>
            <div className="px-lg-5 w-100 pt-md-5 pt-3">
              <ol className="marker-40 ps-0 mb-0">
                <li className="mt-lg-5  mb-md-4 mt-3">
                  <div className="row gy-2">
                    <div className="col-md-4">
                      <p className="fw-semibold fs-40 text-white">Withdrawal</p>
                    </div>
                    <div className="col-md-8">
                      <p>
                        1.1. To participate in any betting activities, you must
                        be at least 18 years old. By placing a bet, you confirm
                        that you meet this age To participate in any betting
                        activities, you must be at least 18 years old. By
                        placing a bet, you confirm that you meet this age
                        requirement.
                      </p>
                      <ul className="ps-4 decimal-list">
                        <li className="list-style-decimal">
                          <p>
                            To participate in any betting activities, you must
                            be at least 18 years old. By placing a bet, you
                            confirm that you meet this age To participate in any
                            betting activities, you must be at least 18 years
                            old. By placing a bet, you confirm that you meet
                            this age requirement.
                          </p>
                        </li>
                        <li className="list-style-decimal">
                          <p>
                            To participate in any betting activities, you must
                            be at least 18 years old. By placing a bet, you
                            confirm that you meet this age To participate in any
                            betting activities, you must be at least 18 years
                            old. By placing a bet, you confirm that you meet
                            this age requirement.
                          </p>
                        </li>
                        <li className="list-style-decimal">
                          <p>
                            To participate in any betting activities, you must
                            be at least 18 years old. By placing a bet, you
                            confirm that you meet this age To participate in any
                            betting activities, you must be at least 18 years
                            old. By placing a bet, you confirm that you meet
                            this age requirement.
                          </p>
                        </li>
                      </ul>
                      <p>
                        1.2. To participate in any betting activities, you must
                        be at least 18 years old. By placing a bet, you confirm
                        that you meet this age To participate in any betting
                        activities, you must be at least 18 years old. By
                        placing a bet, you confirm that you meet this age
                        requirement.
                      </p>
                      <p>
                        1.3. To participate in any betting activities, you must
                        be at least 18 years old. By placing a bet, you confirm
                        that you meet this age To participate in any betting
                        activities, you must be at least 18 years old. By
                        placing a bet, you confirm that you meet this age
                        requirement.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mt-lg-5 mt-md-4 mt-3">
                  <div className="row gy-2">
                    <div className="col-md-4">
                      <p className="fw-semibold fs-40 text-white"> Deposit </p>
                    </div>
                    <div className="col-md-8">
                      <p>
                        To participate in any betting activities, you must be at
                        least 18 years old. By placing a bet, you confirm that
                        you meet this age
                      </p>
                      <ul className="ps-2 list-unstyled">
                        <li>
                          <p>
                            2.1. participate in any betting activities, you must
                            be at least 18
                          </p>
                        </li>
                        <li>
                          <p>
                            2.2. participate in any betting activities, you must
                            be at least 18
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="mt-lg-5 mt-md-4 mt-3">
                  <div className="row gy-2">
                    <div className="col-md-4">
                      <p className="fw-semibold fs-40 text-white">
                        Player Warranties
                      </p>
                    </div>
                    <div className="col-md-8">
                      <ul className="ps-2 list-unstyled">
                        <li>
                          <p>
                            3.1. To participate in any betting activities, you
                            must be at least 18 years old. By placing a bet, you
                            confirm that you meet this age
                          </p>
                        </li>
                        <li>
                          <p>
                            3.2. To participate in any betting activities, you
                            must be at least 18 years old. By placing a bet, you
                            confirm that you meet this age requirement. This
                            policy ensures compliance with legal gambling
                            standards and promotes responsible gaming practices.
                            Protecting minors from
                          </p>
                        </li>
                        <li>
                          <p>
                            3.3. To participate in any betting activities, you
                            must be at least 18 years old. By placing a bet, you
                            confirm that you meet this age requirement. This
                            policy ensures compliance with legal gambling
                            standards and promotes responsible gaming practices.
                            Protecting minors from
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="mt-lg-5 mt-md-4 mt-3">
                  <div className="row gy-2">
                    <div className="col-md-4">
                      <p className="fw-semibold fs-40 text-white">
                        Hipster ipsum
                      </p>
                    </div>
                    <div className="col-md-8">
                      <ul className="ps-2 list-unstyled">
                        <li>
                          <p>
                            4.1. To participate in any betting activities, you
                            must be at least 18 years old. By placing a bet, you
                            confirm that you meet this age
                          </p>
                        </li>
                        <li>
                          <p>
                            4.2. To participate in any betting activities, you
                            must be at least 18 years old. By placing a bet, you
                            confirm that you meet this age requirement. This
                            policy ensures compliance with legal gambling
                            standards and promotes responsible gaming practices.
                            Protecting minors from
                          </p>
                        </li>
                        <li>
                          <p>
                            4.3. To participate in any betting activities, you
                            must be at least 18 years old. By placing a bet, you
                            confirm that you meet this age requirement. This
                            policy ensures compliance with legal gambling
                            standards and promotes responsible gaming practices.
                            Protecting minors from
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="mt-lg-5  mb-md-4 mt-3">
                  <div className="row gy-2">
                    <div className="col-md-4">
                      <p className="fw-semibold fs-40 text-white">
                        Hipster ipsum tattooed brunch I&apos;m baby.
                      </p>
                    </div>
                    <div className="col-md-8">
                      <p>
                        To participate in any betting activities, you must be at
                        least 18 years old. By placing a bet, you confirm that
                        you meet this age To participate in any betting
                        activities, you must be at least 18 years old. By
                        placing a bet, you confirm that you meet this age
                        requirement.
                      </p>
                      <ul className="ps-4 decimal-list">
                        <li className="list-style-decimal">
                          <p>
                            To participate in any betting activities, you must
                            be at least 18 years old. By placing a bet, you
                            confirm that you meet this age To participate in any
                            betting activities, you must be at least 18 years
                            old. By placing a bet, you confirm that you meet
                            this age requirement.
                          </p>
                        </li>
                        <li className="list-style-decimal">
                          <p>
                            To participate in any betting activities, you must
                            be at least 18 years old. By placing a bet, you
                            confirm that you meet this age To participate in any
                            betting activities, you must be at least 18 years
                            old. By placing a bet, you confirm that you meet
                            this age requirement.
                          </p>
                        </li>
                        <li className="list-style-decimal">
                          <p>
                            To participate in any betting activities, you must
                            be at least 18 years old. By placing a bet, you
                            confirm that you meet this age To participate in any
                            betting activities, you must be at least 18 years
                            old. By placing a bet, you confirm that you meet
                            this age requirement.
                          </p>
                        </li>
                      </ul>
                      <p>
                        To participate in any betting activities, you must be at
                        least 18 years old. By placing a bet, you confirm that
                        you meet this age To participate in any betting
                        activities, you must be at least 18 years old. By
                        placing a bet, you confirm that you meet this age
                        requirement.
                      </p>
                      <p>
                        To participate in any betting activities, you must be at
                        least 18 years old. By placing a bet, you confirm that
                        you meet this age To participate in any betting
                        activities, you must be at least 18 years old. By
                        placing a bet, you confirm that you meet this age
                        requirement.
                      </p>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
