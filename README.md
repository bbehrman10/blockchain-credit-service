


# Blockchain Credit Service - EthDenver 2024 Submission

Ben Behrman, Dave Anderson

## Project Overview
Cryptocurrency markets and Web3 applications primarily operate within a cash-only economy, presenting significant hurdles for users who lack immediate access to digital assets. Additionally, the process of bridging between different blockchain networks can be complex and daunting for retail consumers, limiting their participation in the broader ecosystem. Furthermore,  users cannot leverage their existing credit histories with them on chain.

BCS (Blockchain Credit Service) addresses these challenges by offering a payment solution that bridges the gap between traditional fiat and digital assets. Through its platform, BCS provides users with an experience they are more accustomed to - credit cards - enabling them to transact in cryptocurrency without having to connect their wallet to a dApp. Users retain full custody of their assets, pay off a balance each month, and can rely upon the platform's verified vendor network keeping them safe from scams. 

## Technical Stack

### Frontend - Next, React,  EthersJS, MUI
In this demo build there are 3 components to the frontend:

 - User Dashboard
 - BCS Payment Popup
 - Sample Vendor

The dashboard is where a user will manage all of their credit accounts with BCS. They can apply for a new credit card, view recent transactions, and pay off their card balance.

The payment popup is a React component made to be installed and configured by any vendors in the BCS network. Through this registered "client" the vendor will provide data relevant to the transaction they want BCS to process (function signature). 

The vendor is purely here for demo purposes. It implements the BCS popup portal. It has a registered ID that links back to the BCS database for verification.

### API & Services - Node, Express, EthersJS
The service layer ultimately directs API calls to their proper destination, whether it's the database, the blockchain, or an external API and then returns the  result to the frontend.

### Data Layer - PostgreSQL, Solidity
The data layer features two different components:

- Database
- Smart Contracts

The database is responsible for holding onto BCS user, vendor, and credit transaction data. In a production build this is where any sensitive KYC data would need to be stored securely for regulatory compliance. Key models include: User, Card, CreditActivity, Statement, Vendor, VendorClient.

There is a main contract and a vault contract. The vault stores the digital assets for BSC while the main contract is what invokes a vendor's contract using a low level encoded function call with the balance from the vault.

## How It Works Together

Once a user has signed up for BCS and linked their crypto wallet, they can apply for a card. In a production build, this data will be submitted to a third party credit reporting agency. If accepted, a user is then granted a virtual credit card with a USD balance. 

They are then able to go to a vendor and use crypto as anyone else would just using the Pay with BCS option. Under the hood the payment popup submits a transaction to the BCS main smart contract which then calls the vendor's contract using the user's parameters. The vendor processes the transaction and in this case mints an NFT to the user's wallet. This transaction and the amount in USD is then stored in the database and the user's credit balance is adjusted.

Users can then view all of their crypto transactions on the dashboard and pay off their card's balance.

### Architecture
<img width="1079" alt="Screenshot 2024-03-02 at 8 40 49 AM" src="https://github.com/bbehrman10/blockchain-credit-service/assets/17752402/7b0aa4c4-b95e-49bd-bf15-5d483d5174d3">

### Collateralization

There are a variety of entities that can provide collateral on chain for users to draw from. DAOs, COOPs, Credit Unions, Non-profits, NGOs, and any corporate entity can engage existing or new constituents.

In addition to basic credit approval from traditional consumer credit rating agencies, each entity will be able to codify (in smart contract) additional parameters.  These parameters can be based on their existing organizational participation metrics, membership class. 

For example, a financial literacy organization can onboard its students with a 50 USD credit. As a student progresses through a financial literacy program, completing modules, their Blockchain Credit Service credit can increase 25 USD for each module they complete. 

### Roadmap

2024 Q2/Q3 
- Compliance: CARD Act, Consumer Financial Protection Bureau
- Collateralization: Find additional organizations to provide on-chain capital
- Merchant: Identify and interview and onboard 3 merchants
- Credit Score: Additional API integration for credit score data


2024 Q4 
- Compliance: Fair Credit Reporting Act compliance
- Credit Score: Achieve data reqs. for reporting back to Credit Agency API
- Merchant: Additional onboarding
- Collateralization: Org Dashboard with NFT & ZK driven credit limits


