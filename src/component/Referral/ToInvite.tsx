import React from 'react';
import InvitePartner from './InvitePartner';
import AwardsIssued from './AwardsIssued';
import LeaderBoard from './LeaderBoard';
import CommissionSection from './CommissionSection';
import InvitationBonus from './InvitationBonus';
import { referralData } from '@/types/player';

interface _props {
  referralData: referralData;
}

const ToInvite: React.FC<_props> = ({ referralData }) => {
  return (
    <>
      <InvitePartner referralData={referralData} />
      {/* <AwardsIssued /> */}
      <InvitationBonus />
      {/* <CommissionSection /> */}
      {/* <LeaderBoard /> */}
    </>
  );
};

export default ToInvite;
