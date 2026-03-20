import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { logout } from "@/hooks/use-logout";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
  };

  return (
    <Button onClick={handleLogout} disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : <LogOut />}
      Logout
    </Button>
  );
};

export default LogoutButton;
