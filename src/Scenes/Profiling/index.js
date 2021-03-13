import React from "react";
import KYC from "./Components/Kyc";
import Dashboard from "../../Components/DashboardLayout";
import UserProfile from "./Components/User";

function Profiling(props) {
    const WalletPageSection = {
        kyc: (<KYC/>),
        userprofile: (<UserProfile/>),
        notfound: (null)
    };
    const matchSection = () => {
        const walletAction = props.match.params.action;
        console.log(walletAction)
        switch (walletAction) {
            case undefined:
                return WalletPageSection.userprofile;
            case 'userprofile':
                return WalletPageSection.userprofile;
            case 'kyc':
                return WalletPageSection.kyc;
            default:
                return WalletPageSection.notfound;
        }
    }

    return (
        <Dashboard>
            <div>
                <div className="walletWrapper">
                {matchSection()}
                </div>
            </div>
        </Dashboard>
    )
}
export default Profiling