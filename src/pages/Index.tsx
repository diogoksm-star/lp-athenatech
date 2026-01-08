import { SalesPage } from "@/components/funnel/SalesPage";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(244 100% 63% / 0.3), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30vh] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at bottom, hsl(188 100% 50% / 0.2), transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <SalesPage />
    </div>
  );
};

export default Index;
