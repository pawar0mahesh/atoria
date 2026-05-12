import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../ui/Components';
import {
  Phone, Calendar, BarChart3, MessageSquare,
  TrendingUp, PhoneIncoming, PhoneOutgoing,
  CheckCircle2, Timer,
} from 'lucide-react';

const activeCalls = [
  { name: 'Radiance Skin Clinic', agent: 'AI Agent Luna', duration: '2:34', status: 'In Progress', type: 'inbound' },
  { name: 'Bloom Hair Studio', agent: 'AI Agent Nova', duration: '1:12', status: 'Qualifying Lead', type: 'inbound' },
  { name: 'Swift Logistics', agent: 'AI Agent Aria', duration: '0:45', status: 'Booking Apt.', type: 'outbound' },
];

const recentAppointments = [
  { client: 'Arun Mehta', service: 'Consultation', time: '10:30 AM', date: 'Today' },
  { client: 'Priya Sharma', service: 'Follow-up', time: '2:00 PM', date: 'Today' },
  { client: 'Ravi Kumar', service: 'Demo Call', time: '4:30 PM', date: 'Tomorrow' },
  { client: 'Sneha Patel', service: 'Onboarding', time: '11:00 AM', date: 'Tomorrow' },
];

const leadStatuses = [
  { name: 'Hot Leads', count: 24, color: 'bg-red-100 text-red-600', bar: 'bg-red-400' },
  { name: 'Warm Leads', count: 58, color: 'bg-amber-100 text-amber-600', bar: 'bg-amber-400' },
  { name: 'Nurturing', count: 112, color: 'bg-blue-100 text-blue-600', bar: 'bg-blue-400' },
  { name: 'Converted', count: 89, color: 'bg-emerald-100 text-emerald-600', bar: 'bg-emerald-400' },
];

export default function DashboardPreview() {
  return (
    <SectionWrapper id="dashboard-preview" className="bg-surface-50/60">
      <SectionHeader
        badge="Dashboard Preview"
        title="Your AI command center"
        description="Monitor every call, appointment, and lead from a single powerful dashboard."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl mx-auto bg-white rounded-2xl card-shadow-lg border border-surface-200/60 overflow-hidden"
      >
        {/* Dashboard header */}
        <div className="px-5 py-3.5 border-b border-surface-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs font-medium text-surface-400 ml-1.5">dashboard.atrio.ai</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium text-emerald-600">All systems operational</span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
            {[
              { label: 'Total Calls Today', value: '156', change: '+12%', icon: Phone, color: 'text-blue-600 bg-blue-50' },
              { label: 'Appointments Booked', value: '48', change: '+8%', icon: Calendar, color: 'text-purple-600 bg-purple-50' },
              { label: 'Active Conversations', value: '12', change: 'Live', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Avg Response Time', value: '1.8s', change: '-0.3s', icon: Timer, color: 'text-amber-600 bg-amber-50' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-surface-50/80 rounded-xl p-4 border border-surface-100/80"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-xl font-bold text-surface-900">{stat.value}</p>
                <p className="text-[11px] text-surface-400 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>

         <div className="grid lg:grid-cols-3 gap-5 items-stretch">
            {/* Active Calls */}
            <div className="lg:col-span-2 bg-surface-50/80 rounded-xl p-4 sm:p-5 border border-surface-100/80">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[13px] font-semibold text-surface-800 flex items-center gap-2">
                  <PhoneIncoming className="w-4 h-4 text-primary-500" />
                  Active AI Conversations
                </h4>
                <span className="text-[11px] text-surface-400">3 active</span>
              </div>
              <div className="space-y-2.5">
                {activeCalls.map((call, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-white rounded-lg p-3 border border-surface-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                      <div>
                        <p className="text-[13px] font-medium text-surface-800">{call.name}</p>
                        <p className="text-[11px] text-surface-400">{call.agent}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] text-surface-500 font-mono">{call.duration}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 font-medium hidden sm:inline-flex">
                        {call.status}
                      </span>
                      {call.type === 'inbound' ? (
                        <PhoneIncoming className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <PhoneOutgoing className="w-3.5 h-3.5 text-blue-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Lead Pipeline */}
            <div className="bg-surface-50/80 rounded-xl p-4 sm:p-5 border border-surface-100/80">
              <h4 className="text-[13px] font-semibold text-surface-800 flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary-500" />
                Lead Pipeline
              </h4>
              <div className="space-y-4">
                {leadStatuses.map((lead, i) => (
                  <motion.div
                    key={lead.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-surface-600">{lead.name}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${lead.color}`}>
                        {lead.count}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(lead.count / 120) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 + i * 0.08 }}
                        className={`h-full rounded-full ${lead.bar}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="mt-5 bg-surface-50/80 rounded-xl p-4 sm:p-5 border border-surface-100/80">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[13px] font-semibold text-surface-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                Upcoming Appointments
              </h4>
              <span className="text-xs text-primary-600 font-medium cursor-pointer hover:underline">View All</span>
            </div>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-200/80">
                    <th className="text-left text-[11px] font-medium text-surface-400 pb-3 pl-1">Client</th>
                    <th className="text-left text-[11px] font-medium text-surface-400 pb-3">Service</th>
                    <th className="text-left text-[11px] font-medium text-surface-400 pb-3">Time</th>
                    <th className="text-left text-[11px] font-medium text-surface-400 pb-3">Date</th>
                    <th className="text-left text-[11px] font-medium text-surface-400 pb-3 pr-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((apt, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.06 }}
                      className="border-b border-surface-100/80 last:border-0"
                    >
                      <td className="py-3 text-[13px] font-medium text-surface-800 pl-1">{apt.client}</td>
                      <td className="py-3 text-[13px] text-surface-500">{apt.service}</td>
                      <td className="py-3 text-[13px] text-surface-500 font-mono">{apt.time}</td>
                      <td className="py-3 text-[13px] text-surface-500">{apt.date}</td>
                      <td className="py-3 pr-1">
                        <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          Confirmed
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
