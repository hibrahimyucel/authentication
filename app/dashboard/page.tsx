"use client";
import { useAuth } from "@/authentication/context/authProvider";
import ProtectedRoute from "@/authentication/context/authProtected";
import { logout } from "@/authentication/actions/actions";
export default function Dashboard() {
  const { setUser } = useAuth();
  return (
    <ProtectedRoute>
      <div className="flex w-full flex-col">
        <h1 className="bg-background border-diffcolor flex w-full border p-0.5 font-bold">
          Profil
        </h1>
        <div className="flex justify-end p-1">
          <button
            onClick={() => {
              logout().then(() => setUser(null));
            }}
            className="bg-buttoncolor flex rounded-md p-2"
          >
            Logout
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
