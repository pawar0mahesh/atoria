import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, Eye, EyeOff, Search, Filter, CheckCircle2, XCircle,
  Clock, Loader2, Image as ImageIcon, User, Building2, Hash,
  CreditCard, Calendar, TrendingUp, AlertCircle, X, LogOut,
  Zap, RefreshCw, ChevronDown, ExternalLink
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { PageTransition } from '../components/ui/Components';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const ADMIN_PASSWORD = 'atrio2024';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-surface-900 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-surface-900">Admin Panel</h1>
              <p className="text-sm text-surface-400 mt-1">ATRIO Payment Management</p>
            </div>

            <div className="bg-white rounded-2xl card-shadow border border-surface-200/60 p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
                      placeholder="Enter admin password"
                      className="w-full pl-10 pr-12 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-800 placeholder:text-surface-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {loginError && (
                    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {loginError}
                    </p>
                  )}
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Sign In
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}

function AdminDashboard({ onLogout }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setPayments(data);
      setLoading(false);
    }, (error) => {
      console.error('Firestore error:', error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    setActionLoading(id);
    try {
      await updateDoc(doc(db, 'payments', id), { status: newStatus, updatedAt: new Date() });
      toast.success(`Payment ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully`);
      setSelectedPayment(null);
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
    setActionLoading(null);
  };

  const filteredPayments = payments.filter(p => {
    const matchesSearch = !searchQuery ||
      p.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.utr?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: payments.length,
    pending: payments.filter(p => p.status === 'pending').length,
    approved: payments.filter(p => p.status === 'approved').length,
    rejected: payments.filter(p => p.status === 'rejected').length,
    revenue: payments.filter(p => p.status === 'approved').reduce((s, p) => s + (p.amount || 0), 0),
  };

  const statusColors = {
    pending: 'bg-amber-50 text-amber-600 border-amber-100',
    approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rejected: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-surface-50">
        {/* Header */}
        <div className="bg-white border-b border-surface-200/60 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-900 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-surface-900">ATRIO Admin</h1>
                <p className="text-xs text-surface-400">Payment Management</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-800 transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-surface-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Total Payments', value: stats.total, icon: CreditCard, color: 'bg-blue-50 text-blue-600' },
              { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-amber-50 text-amber-600' },
              { label: 'Approved', value: stats.approved, icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
              { label: 'Rejected', value: stats.rejected, icon: XCircle, color: 'bg-red-50 text-red-600' },
              { label: 'Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 border border-surface-200/60 card-shadow"
              >
                <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                <p className="text-xl font-bold text-surface-900">{stat.value}</p>
                <p className="text-xs text-surface-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search by name, business, or UTR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-surface-200 rounded-xl text-sm text-surface-800 placeholder:text-surface-400"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer capitalize ${
                    filterStatus === status
                      ? 'bg-surface-900 text-white'
                      : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-2xl card-shadow border border-surface-200/60 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 text-surface-300 animate-spin mx-auto mb-3" />
                <p className="text-sm text-surface-400">Loading payments...</p>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="p-12 text-center">
                <CreditCard className="w-10 h-10 text-surface-200 mx-auto mb-3" />
                <p className="text-sm text-surface-500 font-medium">No payments found</p>
                <p className="text-xs text-surface-400 mt-1">Payments will appear here when clients submit them</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-50 border-b border-surface-100">
                      <th className="text-left text-xs font-semibold text-surface-500 py-3 px-4">Client</th>
                      <th className="text-left text-xs font-semibold text-surface-500 py-3 px-4">Plan</th>
                      <th className="text-left text-xs font-semibold text-surface-500 py-3 px-4">Amount</th>
                      <th className="text-left text-xs font-semibold text-surface-500 py-3 px-4">UTR</th>
                      <th className="text-left text-xs font-semibold text-surface-500 py-3 px-4">Status</th>
                      <th className="text-left text-xs font-semibold text-surface-500 py-3 px-4">Date</th>
                      <th className="text-right text-xs font-semibold text-surface-500 py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment) => (
                      <motion.tr
                        key={payment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-surface-100 last:border-0 hover:bg-surface-50/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-surface-800">{payment.fullName || '—'}</p>
                            <p className="text-xs text-surface-400">{payment.businessName || '—'}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-surface-700 capitalize">{payment.planName || payment.plan}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm font-semibold text-surface-900">₹{(payment.amount || 0).toLocaleString()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs font-mono text-surface-600">{payment.utr || '—'}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${statusColors[payment.status] || statusColors.pending}`}>
                            {payment.status || 'pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs text-surface-400">
                            {payment.createdAt?.toDate?.()?.toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            }) || '—'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedPayment(payment)}
                              className="text-xs px-3 py-1.5 rounded-lg bg-surface-100 text-surface-600 hover:bg-surface-200 transition-colors cursor-pointer font-medium"
                            >
                              View
                            </button>
                            {payment.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(payment.id, 'approved')}
                                  disabled={actionLoading === payment.id}
                                  className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer font-medium disabled:opacity-50"
                                >
                                  {actionLoading === payment.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Approve'}
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(payment.id, 'rejected')}
                                  disabled={actionLoading === payment.id}
                                  className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer font-medium disabled:opacity-50"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Payment Detail Modal */}
        <AnimatePresence>
          {selectedPayment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedPayment(null)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white rounded-2xl card-shadow-lg border border-surface-200/60 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-surface-900">Payment Details</h3>
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-100 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-surface-400 mb-0.5">Full Name</p>
                      <p className="text-sm font-medium text-surface-800">{selectedPayment.fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-400 mb-0.5">Business</p>
                      <p className="text-sm font-medium text-surface-800">{selectedPayment.businessName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-400 mb-0.5">Plan</p>
                      <p className="text-sm font-medium text-surface-800 capitalize">{selectedPayment.planName || selectedPayment.plan}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-400 mb-0.5">Amount</p>
                      <p className="text-sm font-bold text-surface-900">₹{(selectedPayment.amount || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-400 mb-0.5">UTR / Ref</p>
                      <p className="text-sm font-mono text-surface-700">{selectedPayment.utr}</p>
                    </div>
                    <div>
                      <p className="text-xs text-surface-400 mb-0.5">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${statusColors[selectedPayment.status]}`}>
                        {selectedPayment.status}
                      </span>
                    </div>
                  </div>

                  {/* Screenshot */}
                  {selectedPayment.screenshotUrl && (
                    <div>
                      <p className="text-xs text-surface-400 mb-2">Payment Screenshot</p>
                      <a
                        href={selectedPayment.screenshotUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={selectedPayment.screenshotUrl}
                          alt="Payment screenshot"
                          className="w-full rounded-xl border border-surface-200 hover:opacity-90 transition-opacity"
                        />
                      </a>
                    </div>
                  )}

                  {/* Actions */}
                  {selectedPayment.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t border-surface-100">
                      <Button
                        variant="primary"
                        size="md"
                        className="flex-1 !bg-emerald-600 hover:!bg-emerald-700"
                        onClick={() => handleStatusUpdate(selectedPayment.id, 'approved')}
                        disabled={actionLoading === selectedPayment.id}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button
                        variant="secondary"
                        size="md"
                        className="flex-1 !text-red-600 !border-red-200 hover:!bg-red-50"
                        onClick={() => handleStatusUpdate(selectedPayment.id, 'rejected')}
                        disabled={actionLoading === selectedPayment.id}
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
