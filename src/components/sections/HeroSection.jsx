import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Phone, Calendar, BarChart3, Bot, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-16 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 gradient-mesh" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-surface-200/60 text-[13px] font-medium text-surface-600 card-shadow">
                <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                <span>Trusted by 200+ modern businesses</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-bold text-surface-900 tracking-tight leading-[1.1] mb-6"
            >
              AI Receptionists{' '}
              <br className="hidden sm:block" />
              That Work{' '}
              <span className="gradient-text">24/7</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-surface-500 leading-relaxed mb-9 max-w-md"
            >
              Handle calls, appointments, lead qualification and customer conversations with intelligent AI voice agents. Never miss another customer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-3 mb-10 w-full sm:w-auto"
            >
              <Link to="/pricing" className="w-full sm:w-auto block">
                <Button variant="primary" size="lg" className="w-full">
                  Book Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing" className="w-full sm:w-auto block">
                <Button variant="secondary" size="lg" className="w-full">
                  <Play className="w-4 h-4" />
                  View Pricing
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-5 text-[13px] text-surface-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>No credit card required</span>
              </div>
              <span className="text-surface-300">•</span>
              <div className="flex items-center gap-2">
                <span>Setup in 5 minutes</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl card-shadow-lg border border-surface-200/60 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Bot className="w-4.5 h-4.5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-surface-900 leading-tight">AI Dashboard</h4>
                      <p className="text-[11px] text-surface-400">Real-time analytics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[11px] text-emerald-600 font-medium">Live</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Active Calls', value: '12', icon: Phone, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Appointments', value: '48', icon: Calendar, color: 'bg-purple-50 text-purple-600' },
                    { label: 'Conversion', value: '89%', icon: BarChart3, color: 'bg-emerald-50 text-emerald-600' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-surface-50 rounded-xl p-3">
                      <div className={`w-7 h-7 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
                        <stat.icon className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-lg font-bold text-surface-900 leading-tight">{stat.value}</p>
                      <p className="text-[10px] text-surface-400 font-medium mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Activity graph simulation */}
                <div className="bg-surface-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-surface-600">Call Activity</p>
                    <span className="text-[10px] text-surface-400">Last 7 days</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-14">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                        className="flex-1 rounded-md bg-gradient-to-t from-primary-500 to-primary-300"
                      />
                    ))}
                  </div>
                </div>

                {/* Recent calls */}
                <div className="space-y-2">
                  {[
                    { name: 'Dr. Sharma Clinic', time: '2 min ago', status: 'Appointment Booked' },
                    { name: 'Luxe Salon', time: '5 min ago', status: 'Lead Qualified' },
                    { name: 'TechFlow Agency', time: '12 min ago', status: 'Call Completed' },
                  ].map((call, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-surface-100"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-surface-100 flex items-center justify-center text-[11px] font-bold text-surface-500">
                          {call.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-surface-800">{call.name}</p>
                          <p className="text-[10px] text-surface-400">{call.time}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                        {call.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-white rounded-xl card-shadow p-3 border border-surface-200/60"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-800">New Call</p>
                    <p className="text-[10px] text-emerald-500">AI Answering...</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-3 -left-4 bg-white rounded-xl card-shadow p-3 border border-surface-200/60"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-800">Booking Confirmed</p>
                    <p className="text-[10px] text-primary-500">Tomorrow, 2:30 PM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
