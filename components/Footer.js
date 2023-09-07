import React from 'react';
import styles from '../styles/Sepolia.module.css'; // Assuming you will have styles for this footer

const Footer = ({ data }) => {
  const tier1 = data.filter(item => item.amount >= 10 && item.amount <= 20).length;
  const tier2 = data.filter(item => item.amount > 20 && item.amount <= 30).length;
  const tier3 = data.filter(item => item.amount > 30 && item.amount <= 40).length;

  return (
    <div className={styles.footer}>
      <div className={styles.tier}>
        <h3>Tier 1</h3>
        <p>Prize: Long sleeve Tshirt (Limited)</p>
        <p>Amount: 10-20</p>
        <p>Winners: {tier1}</p>
      </div>
      <div className={styles.tier}>
        <h3>Tier 2</h3>
        <p>Prize: Chainlink Tshirts</p>
        <p>Amount: 20-30</p>
        <p>Winners: {tier2}</p>
      </div>
      <div className={styles.tier}>
        <h3>Tier 3</h3>
        <p>Prize: Caps, Sock, Accesories, etc.</p>
        <p>Amount: 30-40</p>
        <p>Winners: {tier3}</p>
      </div>
    </div>
  );
};

export default Footer;
