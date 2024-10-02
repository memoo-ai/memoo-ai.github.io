import { useState, useEffect } from 'react';
import { Collection, CancelCollect } from '@/api/common';
import message from '@/components/IMessage';

const useFunctions = () => {
  //
  const collection = async (ticker: string, collection: boolean) => {
    try {
      const result = collection ? await CancelCollect(ticker) : await Collection(ticker);
      if (result) {
        message.success(collection ? 'Uncollect successfully!' : 'Collection Successful!');
      } else {
        message.error('Failed to collect!');
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
