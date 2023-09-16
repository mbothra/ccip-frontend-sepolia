import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';  // Adjust path accordingly
import styles from '../styles/Sepolia.module.css';
import { receiverAbi, contractAddress } from "./constants";
import AlertSnackbar from './AlertSnackbar';
import TransactionModal from './TransactionModal';
import { ethers } from 'ethers';
import Footer from './Footer'; // Adjust path accordingly

const CircleNumber = ({ number, text, subtext }) => {
    const circleStyle = {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#375bd2',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '8px',  // Adjusted spacing between the circle and the text
      fontWeight:'700',
      fontSize:'1.2em'
    };
  
    const textStyle = {
      maxWidth: '240px',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      color:'black',
      textAlign: 'center',
      marginBottom: '8px'  // Spacing between the text and the subtext
    };

    const subtextStyle = {
      maxWidth: '240px',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      color:'gray',
      fontSize: '12px',   // Smaller font size for subtext
      textAlign: 'center'
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 50px' }}>
        <div style={circleStyle}>{number}</div>
        <div style={textStyle}>{text}</div>
        <div style={subtextStyle}>{subtext}</div>
      </div>
    );
};



const Sepolia = () => {
    const [data, setData] = useState([]);
    const infuraRpcUrl = 'https://sepolia.infura.io/v3/84a22f268f104ea3b696699dfbc10a25'; // Replace with your Infura RPC URL
    const provider = new ethers.providers.JsonRpcProvider(infuraRpcUrl);
    const yourPrivateKey = 'f11ffe0c2a41fb52c9112793ce2fbad6ce48eaeca11b493421a26f7c234ec6fe'; // Replace with your private key
    const signer = new ethers.Wallet(yourPrivateKey, provider);

    const columns = [
        { label: 'Attendee Name', dataKey: 'name', width: 250 },
        { label: 'Total Amount Won', dataKey: 'amount', numeric: true, width: 250 },
        { label: 'Source Chain', dataKey: 'source',  width: 250 },
        { label: 'Destination Chain', dataKey: 'destination',  width: 250 },
        { label: 'Rank', dataKey: 'rank', width: 150 }
    ];
    
    const calculateRanks = (dataArray) => {
        const sortableArray = [...dataArray];  // Create a shallow copy of dataArray
    
        return sortableArray.sort((a, b) => {
            let b_amount = hexToNumber(b['amount']._hex);
            let a_amount = hexToNumber(a['amount']._hex);
            return b_amount - a_amount
        }).map((item, index) => {
            let rank;
            if (index === 0) rank = 'Highest';
            else if (index === 1) rank = 'Second Highest';
            else if (index === 2) rank = 'Third Highest';
            else rank = '';
    
            return { 'name': item['name'],'amount':hexToNumber(item['amount']._hex), 'source': 'Avalanche Fuji', 'destination': 'Ethereum Sepolia', rank };
        });
    };
    
    
    
    async function getWeb3Account() {
        const account = await signer.getAddress();
        const chainId = (await provider.getNetwork()).chainId;
        return {
            signer: signer,
            provider: provider,
            chainId: chainId,
            account: account
        };
    }
    
    const hexToNumber = (hex) => {
        return parseInt(hex, 16);
    };
             

    const getContractData = async () => {

        const { signer, provider, chainId, account } = await getWeb3Account();
        const contract = new ethers.Contract(contractAddress['11155111'], receiverAbi, provider);
        const receiverContract = contract.connect(signer);
        try {
            // Replace this with the actual method from your smart contract
            const rawData = await receiverContract.getAllNameAndAmounts();
            console.log("API call result:", rawData);
            const rankedData = calculateRanks(rawData);
            console.log(rawData)

            setData(prevData => {
                const existingNameAmountCombinations = new Set(prevData.map(item => `${item.name}-${item.amount}`));
                const newData = rankedData.filter(item => !existingNameAmountCombinations.has(`${item.name}-${item.amount}`));
                const updatedData = [...prevData, ...newData];
                
                localStorage.setItem('persistedDataNew', JSON.stringify(updatedData));
                return updatedData;
            });

        } catch (error) {
            console.error("Error calling API:", error);
        }

    };

    useEffect(() => {
        // Load data from localStorage when the component mounts
        const persistedData = localStorage.getItem('persistedDataNew');
        if (persistedData) {
            setData(JSON.parse(persistedData));
        }
    
        getContractData();  // Fetch data immediately when component mounts
    
        const interval = setInterval(() => {
            getContractData();
        }, 60000);  // Polls every minute
    
        return () => clearInterval(interval); // Clean up on component unmount
    }, []);
    

    return (
        <div>
        <div className={styles.container}>

            <h1>CCIP Leaderboard</h1>
            <p style={{color:'black'}}>Unveil your cross-chain score and collect your prize!</p>

            <div className="card" style={{display: 'flex', flexDirection: 'column', alignItems: 'center',marginBottom:'30px'}}>
                <h4 style={{color:'black', alignContent: 'center', marginLeft:'40px', marginBottom:'20px'}}>Prize Tiers</h4>


                <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', width: '1086px', }}>
                        <CircleNumber number={1} text="Long sleeve T-shirt" subtext="100 winners"/>
                        <CircleNumber number={2} text="Regular T-shirt" subtext="200 winners"/>
                        <CircleNumber number={3} text="Accessories" subtext="300 winners"/>
                        </div>           
                </div>


             <DataTable data={data} columns={columns} className={styles.table} />
            {/* <div className={styles.spacing}>
                <button className={styles.button} onClick={() => getContractData()}>Refresh Data</button>
            </div> */}
            <AlertSnackbar />
            <TransactionModal />
        </div>
        </div>
    
    );
};

export default Sepolia;
