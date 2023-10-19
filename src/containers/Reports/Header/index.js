import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import ExportIcon from '../../../components/shared/Icons/ExportIcon';
import useFormatDateHeader from 'src/hooks/useFormatDateHeader';

function Header({intl,startDate, endDate, buttonLabel, buttonAction}){
  const [title, setTitle] = useState("");
  const headerTitle = useFormatDateHeader({
    intl,
    textId: 'reports.title',
    startDate,
    endDate
  }) 

  useEffect(() => {
    setTitle(headerTitle)
  },[startDate,endDate])
  
  return (
    <div className="sc-header">
      <p id="page-title">{title}</p>
      <div className="buttons">
        <Button
          fullWidth
          variant="outlined"
          onClick={buttonAction}
        >
          <ExportIcon />
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}

export default Header;