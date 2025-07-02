
const StatsSection = () => {
  const stats = [
    { value: "10M+", label: "Lines of Code Reviewed" },
    { value: "50K+", label: "Bugs Prevented" },
    { value: "99.9%", label: "Uptime" },
    { value: "500+", label: "Teams Trust Us" }
  ];

  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
