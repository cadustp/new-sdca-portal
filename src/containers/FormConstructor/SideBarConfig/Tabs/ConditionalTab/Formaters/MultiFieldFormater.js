  const multiFieldFormater = ({operatorField ,baseQuestion, fieldToCompare}) => {

    const defaultConditions = { [operatorField]: [{ var: baseQuestion }, fieldToCompare] };

    return defaultConditions
  };
  
  export default multiFieldFormater;