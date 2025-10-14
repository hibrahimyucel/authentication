"use client";
import { useAuth } from "@/lib/AuthProvider";
import { logout } from "../login/actions";
import ProtectedRoute from "@/lib/auth/auth-protected";

export default function Dashboard() {
  const { handleSignOut } = useAuth();
  return (
    <ProtectedRoute>
      <div className="flex w-full flex-col">
        <h1 className="bg-background border-diffcolor flex w-full border p-0.5 font-bold">
          Profil
        </h1>
        <div className="flex justify-end p-1">
          <button
            onClick={() => {
              logout().then(() => handleSignOut());
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
