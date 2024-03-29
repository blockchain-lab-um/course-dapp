import React, { useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

const override = `
  display: block;
  margin: 0 auto;
  border-color: #05386b;
`;

interface IConnectProps {
  loading: boolean;
  msg: string;
}

export const Spinner: React.FC<IConnectProps> = ({ loading, msg }) => {
  let [color, setColor] = useState('#05386b');

  return (
    <div className="sweet-loading pt-5">
      {loading && <div className="text-blue p-3 text-2xl pb-6">{msg}</div>}
      <CircleLoader color={color} loading={loading} css={override} size={100} />
    </div>
  );
};

export default Spinner;
