// 1. I prefer moving string constants to variables.
//    It reduces the chance of typos and makes the code more maintainable
const OSMOSIS = "Osmosis";
const ETHEREUM = "Ethereum";
const ARBITRUM = "Arbitrum";
const ZILLIQA = "Zilliqa";
const NEO = "Neo";

// 1. Define priority data here
const PRIORITIES = {
  [OSMOSIS]: 100,
  [ETHEREUM]: 50,
  [ARBITRUM]: 30,
  [ZILLIQA]: 20,
  [NEO]: 20,
  default: -99,
};

// 1. To improve the code, we need to add a type "Blockchain"
// 2. We can set "Blockchain" to string, but for more
//    specific typing, it's better to use constant types for the cryptos
type Blockchain =
  | typeof OSMOSIS
  | typeof ETHEREUM
  | typeof ARBITRUM
  | typeof ZILLIQA
  | typeof NEO;

// 1. Add the "blockchain" type to WalletBalance
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

// 1. It's better to use OOP inheritance to reduce redundant code and improve maintainability
// 2. Add a "priority" field
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number;
}

// 1. We don't use any props inside the component, so we can remove redundant typing (YAGNI)
// 2. Move destructuring here for cleaner code
const WalletPage = ({ ...rest }) => {
  const balances = useWalletBalances();
  const prices = prices();

  // 1. Add the input type
  // 2. Move string values to constant variables
  // 3. Refactor to use a better way of getting priority from object
  const getPriority = (blockchain: Blockchain): number => {
    return PRIORITIES[blockchain] || PRIORITIES.default;
  };

  // 1. Create a helper function to convert to USD
  const convertToUsd = (currency: string, amount: number): number => {
    return prices[currency] * amount;
  };

  // 1. Refactor conditionals in filter and sort for cleaner code
  // 2. Change filter to map function to combine filtering and formatting
  // 3. Also, add the priority field during mapping
  // 4. Change input types of sort from WalletBalance to FormattedWalletBalance
  // 5. Remove redundant "prices" dependency from useMemo dependencies
  // 6. Rename "sortedBalances" to "formattedSortedBalances"
  const formatedSortedBalances = useMemo(() => {
    return balances
      .map((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (balancePriority > -99 && balance.amount <= 0)
          return {
            ...balance,
            formatted: balance.amount.toFixed(),
            priority: balancePriority,
          };
      })
      .sort(
        (lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) =>
          rhs.priority - lhs.priority
      );
  }, [balances]);

  // 1. We want to map formatedSortedBalances not just sorted
  // 2. It's better not to use the index as the key; we need a unique value for that.
  //    Now we use "currency" and assume that it is unique, but it's better to use a unique ID
  // 3. There is no need for the rows constant
  // 4. Move the calculation of usdValue to a helper function
  return (
    <div {...rest}>
      {formatedSortedBalances.map((balance: FormattedWalletBalance) => (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={convertToUsd(balance.currency, balance.amount)}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};

// 1. Add export of the page
export default WalletPage;

// P.S. There could also be improvements by dividing the code into different files, but that's a different story ;)