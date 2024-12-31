import "@/app/globals.scss";

export const metadata = {
  title: "Authentication",
  description: "Authentication pages",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overlay-container">
      <div className="auth-container">{children}</div>
    </div>
  );
}
