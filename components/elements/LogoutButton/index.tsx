import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { logout } from "@/hooks/use-logout";
import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/navigation";

const { signOut } = createAuthClient();

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); 
          router.refresh(); 
        },
      },
    });
    setLoading(false);
  };

  return (
    <Button onClick={handleLogout} disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : <LogOut />}
      Logout
    </Button>
  );
};

export default LogoutButton;
