import { useEffect, useState } from "react";
import { type UserData } from "../typings";

function useGithubUser(userName: string) {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userName) return;

    const fetchUser = async () => {
      setData(null);

      setLoading(true);

      try {
        const response = await fetch(
          `https://api.github.com/users/${userName}`,
        );

        const data = await response.json();

        if (!response.ok) {
          setError(true);
          return;
        }

        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    setError(false);
  }, [userName]);

  return { data, loading, error };
}

export default useGithubUser;
