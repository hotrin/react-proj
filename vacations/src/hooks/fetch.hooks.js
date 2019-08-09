import {useState,useEffect} from 'react'
  
function useFetch(url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [err,setErr] = useState(false);

  async function fetchUrl() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (e) {
        setErr(true);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => { fetchUrl(); }, []);

  return [data, loading, err];

}

export {useFetch};
