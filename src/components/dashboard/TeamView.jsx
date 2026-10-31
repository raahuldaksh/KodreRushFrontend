import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Shield, Code, Palette, Bug } from 'lucide-react';

export function TeamView({ tasks = [] }) {
  const members = [
    {
      name: 'Ashish Meena',
      role: 'Full-Stack Lead & Technical Architect',
      initials: 'AM',
      bg: 'bg-indigo-600',
      icon: Code,
      assignedTasks: tasks.filter((_, i) => i % 3 === 0).length,
      status: 'Active Now',
    },
    {
      name: 'Ritik Bhaiya',
      role: 'Hackathon Technical Lead & Judge',
      initials: 'RK',
      bg: 'bg-purple-600',
      icon: Shield,
      assignedTasks: tasks.filter((_, i) => i % 3 === 1).length,
      status: 'Reviewing Tasks',
    },
    {
      name: 'Rahul Sharma',
      role: 'Frontend UI/UX & Interaction Designer',
      initials: 'RS',
      bg: 'bg-blue-600',
      icon: Palette,
      assignedTasks: tasks.filter((_, i) => i % 3 === 2).length,
      status: 'Active Now',
    },
    {
      name: 'QA & Testing Bot',
      role: 'Automated Postman & API Test Suite',
      initials: 'QA',
      bg: 'bg-emerald-600',
      icon: Bug,
      assignedTasks: 2,
      status: 'Passing Checks',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Sprint Team Collaboration Roster
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Realtime workload allocation for CodeRush 5.0
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          4 Active Members
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member) => {
          const Icon = member.icon;
          return (
            <Card
              key={member.name}
              className="p-5 rounded-2xl border-slate-800/80 bg-[#0d1522]/80 backdrop-blur-md hover:border-slate-700 transition-all shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl ${member.bg} text-white font-bold text-sm shadow-md ring-2 ring-white/10`}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-indigo-400" />
                      {member.role}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {member.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>Assigned Tasks</span>
                <span className="font-bold text-white">{member.assignedTasks} Tasks</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default TeamView;
