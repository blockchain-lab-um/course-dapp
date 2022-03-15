import React, { useState } from 'react';
import { css } from '@emotion/react';
import CircleLoader from 'react-spinners/CircleLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #006d77;
`;

interface IConnectProps {
  loading: boolean;
}

export const Spinner: React.FC<IConnectProps> = ({ loading }) => {
  let [color, setColor] = useState('#006D77');

  return (
    <div className="sweet-loading">
      <CircleLoader color={color} loading={loading} css={override} size={100} />
    </div>
  );
};

export default Spinner;
