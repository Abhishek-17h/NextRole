import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session } = useSession(); 

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const superbaseAccessToken = await session.getToken({
        template: "supabase",
      });
      const data = await cb(superbaseAccessToken, options, ...args);
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error }; 
};

export default useFetch;
