/* eslint-disable max-params */
import { useState, useEffect } from 'react';
import { Collection, CancelCollect } from '@/api/common';
import message from '@/components/IMessage';

const useFunctions = () => {
  //
  const collection = async (
    ticker: string,
    collection: boolean,
    triggerRefresh?: Function,
    top = 105,
  ): Promise<void> => {
    try {
      const result = collection ? await CancelCollect(ticker) : await Collection(ticker);
      if (result) {
        // message.success(collection ? 'Uncollect successfully!' : 'Collection Successful!', {
        //   className: `!mt-[${top}px]`,
        // });
        triggerRefresh?.();
      } else {
        // message.error('Failed to collect!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    collection,
  };
};

export default useFunctions;
