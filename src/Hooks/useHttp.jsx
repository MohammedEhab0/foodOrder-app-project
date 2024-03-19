import { useState, useEffect, useCallback } from "react";
async function sendHttpRequest(url, config) {
  const respone = await fetch(url, config);
  const resData = await respone.json();

  if (!respone.ok) {
    throw new Error(
      resData.message || "something went wrong ,field to send a request "
    );
  }
  return resData;
}
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
