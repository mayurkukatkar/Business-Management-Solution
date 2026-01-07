import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Calendar, DollarSign, Activity } from "lucide-react"
import { getDashboardStats, getTodaysTasks } from "@/actions/task-actions"

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const tasks = await getTodaysTasks();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leads}</div>
            <p className="text-xs text-muted-foreground">in current pipeline</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-Ups</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.followUps}</div>
            <p className="text-xs text-muted-foreground">need attention</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Due</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">due today or overdue</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.revenue}</div>
            <p className="text-xs text-muted-foreground">total this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>
                Your follow-ups and meetings scheduled for today.
              </CardDescription>
            </div>
            {/* Button to add task */}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">All caught up! No tasks for today.</p>
              ) : (
                tasks.map((task: any) => (
                  <div key={task._id} className="flex items-center gap-4 py-2 border-b last:border-0 hover:bg-muted/40 px-2 rounded-lg cursor-pointer">
                    <div className={`w-2 h-2 rounded-full ${new Date(task.dueDate) < new Date() ? 'bg-red-500' : 'bg-green-500'}`} />
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-sm">{task.title}</span>
                      {task.relatedLead && <span className="text-xs text-muted-foreground">Lead: {task.relatedLead.name}</span>}
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">
                      {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        {/* Recent Activity Placeholder */}
      </div>
    </div>
  )
}
