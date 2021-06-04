import {InvestmentPortfolioService} from "./InvestmentPortfolioService";

const investmentPortfolioService = new InvestmentPortfolioService()

export const newInvestment = (txHash ,data, callBack) => {
    let investObj ={
        contractAddress: data.contractAddress,
        amount: data.amount,
        transactionHash : txHash,
        contractType: data.contractType
    }
    investmentPortfolioService.addNewInvestment(investObj).then((res)=>{
        if(res.status === 200){
            callBack("PROCESSING_SUCCEED", txHash)
        }else{
            callBack("PROCESSING_FAILED", txHash)
        }
    })
};


export const transferInvestment = (txHash ,data, callBack) => {
    let investObj ={
        investmentId: data.investmentId,
        senderName: data.senderName,
        transactionHash : txHash,
        senderAddress: data.contractAddress,
        toId:data.toId
    }
    investmentPortfolioService.transferInvestment(investObj).then((res)=>{
        if(res.status === 200){
            callBack("", txHash)
        }else{
            callBack("PROCESSING_FAILED", txHash)
        }
    })
};

export const getUserInvestments = ( callBack) => {
    investmentPortfolioService.getUserInvestments().then(res => {
        if (res.status === 200 && res.data) {
            callBack("", res.data.data)
        }else{
            callBack("Failed to get investments")
        }
    }).catch(err => {
        console.log(err)
        callBack("Failed to get investments")
    });
};