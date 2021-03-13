import {InvestmentPortfolioService} from "./InvestmentPortfolioService";

const investmentPortfolioService = new InvestmentPortfolioService()

// Register UserService - return ok response on success
export const newInvestment = (txHash ,data, callBack) => {
    let investObj ={
        contractAddress: 'cosmos144guy8hgaslrwt4hmgz66nw5ger0wgzu0avld9',
        tokens: data.amount,
        transactionHash : txHash
    }
    investmentPortfolioService.addNewInvestment(investObj).then((res)=>{
        if(res.status === 200){
            callBack("PROCESSING_SUCCEED", txHash)
        }else{
            callBack("PROCESSING_FAILED", txHash)
        }
    })
};