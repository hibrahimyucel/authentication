import api from "../actions/api";
import { useAuth } from "../context/authProvider";

const useRefreshToken = () => {
  const { setToken } = useAuth();

  const refresh = async () => {
    const response = await api.get("/me", {
      withCredentials: true,
    });
    setToken(response.data.accessToken);

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
