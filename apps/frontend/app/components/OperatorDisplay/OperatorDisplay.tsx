import React from 'react';

interface OperatorDisplayProps {
  categoryName: string;
  operatorImageUrl: string;
  operatorName: string;
}

const OperatorDisplay: React.FC<OperatorDisplayProps> = ({ categoryName, operatorImageUrl, operatorName }) => {
  return (
    <>
      {categoryName ? (
        <h2 className="text-lg font-semibold my-4 flex items-center">
          Pilih {categoryName} :
          {operatorImageUrl && (
            <img
              src={operatorImageUrl}
              alt={operatorName}
              className="ml-2 h-6 w-auto"
            />
          )}
          {!operatorImageUrl && operatorName && (
            <span className="ml-2 text-red-500 text-2xl">{operatorName}</span>
          )}
        </h2>
      ) : null}
    </>
  );
};

export default OperatorDisplay;