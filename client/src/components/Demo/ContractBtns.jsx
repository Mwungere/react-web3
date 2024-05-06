import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("?")
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const read = async () => {
    const value = await contract.methods.getGreeting().call({ from: accounts[0] });
    setOutputValue(value);
  };

  const write = async e => {
    if (inputValue === "") {
      return;
    }
    await contract.methods.setGreeting(inputValue).send({ from: accounts[0] });
  };

  return (
    <div>
      <p>{outputValue}</p>
      <button onClick={read}>
        read()
      </button>

        write(<input
          type="text"
          placeholder="..."
          value={inputValue}
          onChange={handleInputChange}
        />)
      <button onClick={write}>
        setGreeting
      </button>

    </div>
  );
}

export default ContractBtns;
