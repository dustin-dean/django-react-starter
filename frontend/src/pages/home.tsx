import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>HomePage</h1>
      <p>{user?.username}</p>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}

export default HomePage;
