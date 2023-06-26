import React, { useState, useEffect } from 'react';

interface IConnectProps {
  VC: any;
}

export const VCCard: React.FC<IConnectProps> = ({ VC }) => {
  const [credSubArr, setCredSubArr] = useState<Array<any>>([]);
  const [moreToggle, setMoreToggle] = useState<boolean>(false);

  useEffect(() => {
    const vcCredSub = JSON.stringify(VC.credentialSubject).substring(
      1,
      JSON.stringify(VC.credentialSubject).length - 1
    );
    setCredSubArr(vcCredSub.split(','));

    console.log(vcCredSub);
  }, []);

  const changeToggle = () => {
    setMoreToggle(!moreToggle);
  };

  return (
    <div className="grid bg-white p-3 max-w-xl break-all m-3">
      <b>Issuer:</b> <p>{VC.issuer.id}</p>
      <b>Subject:</b>
      <div className="p-2">
        {credSubArr.map((att, i) => (
          <React.Fragment key={i}>
            <a>{att.toString()}</a>
            <br />
          </React.Fragment>
        ))}
      </div>
      <b>Issuance Date:</b> {VC.issuanceDate}
      <br />
      {!moreToggle && (
        <>
          <b>Proof:</b> {VC.proof.jwt.substring(0, 50)}...
        </>
      )}
      {moreToggle && (
        <>
          <b>Proof:</b> {VC.proof.jwt}
        </>
      )}
      <br />
      {!moreToggle && (
        <button className="text-xl text-blue" onClick={changeToggle}>
          More...
        </button>
      )}
      {moreToggle && (
        <button className="text-xl text-blue" onClick={changeToggle}>
          Less...
        </button>
      )}
    </div>
  );
};
