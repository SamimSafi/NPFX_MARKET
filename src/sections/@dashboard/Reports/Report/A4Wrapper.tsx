import { Button } from '@mui/material';
import React, { useState } from 'react';
import useLocales from 'src/hooks/useLocales';

interface A4WrapperProps {
  children: React.ReactNode;
}

enum PageOrientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

export default function A4Wrapper({ children }: A4WrapperProps) {
  const { translate } = useLocales();
  const [orientation, setOrientation] = useState(PageOrientation.LANDSCAPE);

  const toggleOrientation = () => {
    setOrientation((prevOrientation) =>
      prevOrientation === PageOrientation.PORTRAIT
        ? PageOrientation.LANDSCAPE
        : PageOrientation.PORTRAIT
    );
  };

  const a4PageStyle: React.CSSProperties = {
    width: orientation === PageOrientation.LANDSCAPE ? '297mm' : '210mm',
    height: orientation === PageOrientation.LANDSCAPE ? '210mm' : '297mm',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: 'lightgray',
    border: '1px',
    borderColor: 'red',
  };

  return (
    <div>
      <Button sx={{ mb: 2 }} size="small" variant="contained" onClick={toggleOrientation}>
        {translate('User.ToggleOrientation')}
      </Button>
      <div style={a4PageStyle}>{children}</div>
    </div>
  );
}
