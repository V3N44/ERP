import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const goals = [
  {
    title: "Reach Monthly Sales Target",
    current: 75000,
    target: 100000,
    progress: 75,
    timeLeft: "10 days left",
    color: "bg-emerald-500"
  },
  {
    title: "Inventory Management",
    current: 4000,
    target: 10000,
    progress: 40,
    timeLeft: "20 days left",
    color: "bg-blue-500"
  },
  {
    title: "Acquire New Diagnostic Tools",
    current: 6000,
    target: 10000,
    progress: 60,
    timeLeft: "1 month left",
    color: "bg-cyan-500"
  },
  {
    title: "Expand Showroom Space",
    current: 12500,
    target: 50000,
    progress: 25,
    timeLeft: "2 months left",
    color: "bg-red-500"
  }
];

export const FinancialGoals = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-heading text-center text-teal-600">
          Progress of Financial Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <div
              key={goal.title}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-heading font-semibold text-gray-800">
                  {goal.title}
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {goal.timeLeft}
                </span>
              </div>
              <div className="mb-2">
                <Progress
                  value={goal.progress}
                  className="h-2"
                  indicatorClassName={goal.color}
                />
              </div>
              <div className="text-sm font-medium text-gray-600">
                ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};