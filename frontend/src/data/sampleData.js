const userData = {
  userId: "user123",
  userName: "John Doe",
  cards: [
    {
      cardId: "card1",
      cardNumber: "**** **** **** 1111",
      creditLimit: 10000, // Credit limit in USD
      balance: 3000, // Current balance in USD
      rewards: 100, // Current rewards points
      dueDate: "2024-02-29", // Due date for the current billing cycle
      statementBalance: 2000, // Statement balance for the previous billing cycle
      transactions: [
        { transactionId: "tx1-1", date: "2024-01-10", type: "purchase", amount: 0.5, usdEquivalent: 600, category: "Entertainment", vendor: "Netflix" },
        { transactionId: "tx1-2", date: "2024-01-15", type: "purchase", amount: 0.7, usdEquivalent: 840, category: "Shopping", vendor: "Amazon" },
        { transactionId: "tx1-3", date: "2024-02-01", type: "repayment", amount: 1, usdEquivalent: 1200, category: "Repayment", vendor: "Repayment" },
        // Additional transactions for card1
        { transactionId: "tx1-4", date: "2024-02-05", type: "purchase", amount: 0.2, usdEquivalent: 300, category: "Utilities", vendor: "Utility Company" },
        { transactionId: "tx1-5", date: "2024-02-10", type: "purchase", amount: 0.35, usdEquivalent: 525, category: "Groceries", vendor: "Supermarket" },
        { transactionId: "tx1-6", date: "2024-02-15", type: "repayment", amount: 0.8, usdEquivalent: 960, category: "Repayment", vendor: "Repayment" },
        { transactionId: "tx1-7", date: "2024-02-20", type: "purchase", amount: 0.1, usdEquivalent: 150, category: "Entertainment", vendor: "Spotify" },
        { transactionId: "tx1-8", date: "2024-02-25", type: "purchase", amount: 0.25, usdEquivalent: 375, category: "Dining", vendor: "Restaurant" },
      ],
    },
    {
      cardId: "card2",
      cardNumber: "**** **** **** 2222",
      creditLimit: 5000, // Credit limit in USD
      balance: 1000, // Current balance in USD
      rewards: 50, // Current rewards points
      dueDate: "2024-02-29", // Due date for the current billing cycle
      statementBalance: 800, // Statement balance for the previous billing cycle
      transactions: [
        { transactionId: "tx2-1", date: "2024-01-20", type: "purchase", amount: 0.3, usdEquivalent: 360, category: "Food & Beverage", vendor: "Starbucks" },
        { transactionId: "tx2-2", date: "2024-02-05", type: "repayment", amount: 0.5, usdEquivalent: 600, category: "Repayment", vendor: "Repayment" },
        // Additional transactions for card2
        { transactionId: "tx2-3", date: "2024-02-07", type: "purchase", amount: 0.45, usdEquivalent: 675, category: "Online Services", vendor: "Amazon Prime" },
        { transactionId: "tx2-4", date: "2024-02-12", type: "purchase", amount: 0.12, usdEquivalent: 180, category: "Utilities", vendor: "Internet Provider" },
        { transactionId: "tx2-5", date: "2024-02-18", type: "repayment", amount: 0.6, usdEquivalent: 720, category: "Repayment", vendor: "Repayment" },
        { transactionId: "tx2-6", date: "2024-02-22", type: "purchase", amount: 0.33, usdEquivalent: 495, category: "Transport", vendor: "Uber" },
        { transactionId: "tx2-7", date: "2024-02-28", type: "purchase", amount: 0.28, usdEquivalent: 420, category: "Clothing", vendor: "Zara" },
      ],
    },
  ],
  wallets: [
    {
      id: "wallet1",
      address: "0xb794f5ea0ba39494ce839613fffba74279579268",
      label: "Main Wallet"
    },
    {
      id: "wallet2",
      address: "0xb794f5ea0ba39494ce839613fffba74279579269",
      label: "Savings Wallet"
    },
    {
      id: "wallet3",
      address: "0xb794f5ea0ba39494ce839613fffba74279579270",
      label: "Trading Wallet"
    },
    {
      id: "wallet4",
      address: "0xb794f5ea0ba39494ce839613fffba74279579271",
      label: "Gift Wallet"
    }
  ],
};

export default userData;
