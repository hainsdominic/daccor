import React from 'react';
import { newContextComponents } from '@drizzle/react-components';

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <>
      <h5>Set lease:</h5>
      <ContractForm drizzle={drizzle} contract="Housing" method="newLease"></ContractForm>
    </>
  );
};
