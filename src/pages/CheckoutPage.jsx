
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Lock, CreditCard, Copy, Download, CheckCircle2,
  Upload, AlertCircle, ArrowLeft, Zap, QrCode, Building2,
  Phone, Mail, User, Briefcase, Hash, Image as ImageIcon,
  Loader2, Check, X, ChevronRight
} from 'lucide-react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PageTransition } from '../components/ui/Components';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import qrCodeImage from '../assets/photoQr.jpeg'; // Adjust path based on your folder structure


const planDetails = {
  starter: { name: 'Starter', price: 21186, features: ['100 AI Calls', 'Basic Receptionist', 'Call Summaries', 'Email Support'] },
  growth: { name: 'Growth', price: 27118, features: ['500 AI Calls', 'Appointment Booking', 'WhatsApp Integration', 'CRM Sync', 'Priority Support'] },
  enterprise: { name: 'Enterprise', price: 0, features: ['Unlimited AI Calls', 'Dedicated AI Flows', 'Multi-location Support', 'Advanced Analytics', 'API Integrations'] },
};

const UPI_ID = 'business@atrio';

export default function CheckoutPage() {
  const { plan } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const selectedPlan = planDetails[plan] || planDetails.starter;
  const gst = Math.round(selectedPlan.price * 0.18);
  const total = selectedPlan.price + gst;

  const [step, setStep] = useState('payment'); // payment | qr | verify | verifying | success
  const [formData, setFormData] = useState({ fullName: '', businessName: '', utr: '', screenshot: null });
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success('UPI ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateQR = () => {
    setStep('qr');
  };

  const handleVerifyPayment = () => {
    if (!paymentCompleted) {
      toast.error('Please complete the payment first');
      return;
    }
    setStep('verify');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be under 5MB');
        return;
      }
      setFormData({ ...formData, screenshot: file });
    }
  };
  console.log("checkout update fix");

const handleSubmitVerification = async (e) => {
  e.preventDefault();
  if (!formData.fullName || !formData.businessName || !formData.utr) {
    toast.error('Please fill all required fields');
    return;
  }

  if (!formData.screenshot) {
    toast.error('Please upload payment screenshot');
    return;
  }

  setStep('verifying');
  try {
    let screenshotUrl = '';
    if (formData.screenshot) {
      setUploading(true);
      const fileRef = ref(storage, `payment-screenshots/${Date.now()}_${formData.screenshot.name}`);
      await uploadBytes(fileRef, formData.screenshot);
      screenshotUrl = await getDownloadURL(fileRef);
      setUploading(false);
    }

    await addDoc(collection(db, 'payments'), {
      fullName: formData.fullName,
      businessName: formData.businessName,
      utr: formData.utr,
      screenshotUrl,
      plan: plan,
      planName: selectedPlan.name,
      amount: total,
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    // Remove this setTimeout - the animation component will handle the transition
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // setStep('success');
    
    toast.success('Payment details submitted successfully!');
  } catch (error) {
    console.error('Error submitting payment:', error);
    toast.error('Submission failed. Please try again.');
    setStep('verify');
  }
};

  if (step === 'verifying') return <VerifyingAnimation />;
  if (step === 'success') return <SuccessScreen plan={selectedPlan} navigate={navigate} />;

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen bg-surface-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/pricing')}
            className="flex items-center gap-2 text-sm text-surface-500 hover:text-surface-800 mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pricing
          </motion.button>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* LEFT: Invoice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl card-shadow border border-surface-200/60 p-6 sticky top-24">
                {/* Plan header */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-surface-100">
                  <div className="w-12 h-12 rounded-xl bg-surface-900 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-surface-900">ATRIO {selectedPlan.name}</h3>
                    <p className="text-xs text-surface-400">AI Receptionist Plan</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2.5 mb-6">
                  {selectedPlan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-surface-600">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Amount breakdown */}
                <div className="border-t border-surface-100 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Plan Price</span>
                    <span className="font-medium text-surface-800">
                      {selectedPlan.price > 0 ? `₹${selectedPlan.price.toLocaleString()}` : 'Custom'}
                    </span>
                  </div>
                  {selectedPlan.price > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-surface-500">GST (18%)</span>
                        <span className="font-medium text-surface-800">₹{gst.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-surface-100 pt-3 flex justify-between">
                        <span className="text-base font-semibold text-surface-900">Total</span>
                        <span className="text-xl font-bold text-surface-900">₹{total.toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Trust badges */}
                <div className="mt-6 pt-4 border-t border-surface-100">
                  <div className="flex items-center gap-2 text-xs text-surface-400 mb-2">
                    <Shield className="w-3.5 h-3.5" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-surface-400 mb-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Secure Payment Processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-surface-400">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>PCI DSS Compliant</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Payment Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-white rounded-2xl card-shadow border border-surface-200/60 p-6">
                      <h3 className="text-xl font-semibold text-surface-900 mb-2">Complete Payment</h3>
                      <p className="text-sm text-surface-400 mb-6">Total amount: <span className="font-bold text-surface-900">₹{total.toLocaleString()}</span></p>

                      {/* Payment options */}
                      <div className="space-y-3 mb-6">
                        <button
                          onClick={handleGenerateQR}
                          className="w-full flex items-center justify-between p-4 bg-surface-50 rounded-xl border-2 border-surface-200 hover:border-primary-400 transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                              <QrCode className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold text-surface-900">Pay with UPI QR</p>
                              <p className="text-xs text-surface-500">Scan QR code to pay instantly</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-surface-400 group-hover:text-primary-500" />
                        </button>

                        <div className="p-4 bg-surface-50 rounded-xl border border-surface-200">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-surface-900">Bank Transfer</p>
                              <p className="text-xs text-surface-500">Direct bank transfer</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm pl-15">
                            <div className="flex justify-between">
                              <span className="text-surface-500">Account Name:</span>
                              <span className="font-mono text-surface-800">ATRIO Technologies Pvt Ltd</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-surface-500">Account Number:</span>
                              <span className="font-mono text-surface-800">50200012345678</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-surface-500">IFSC:</span>
                              <span className="font-mono text-surface-800">HDFC0001234</span>
                            </div>
                          </div>
                          <button
                            onClick={handleCopyUPI}
                            className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-100 transition-colors border border-surface-200"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy Bank Details'}
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-surface-100 pt-4 mt-4">
                        <p className="text-center text-xs text-surface-400 mb-3">Or pay via UPI ID</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-surface-50 px-4 py-3 rounded-lg border border-surface-200 font-mono text-sm text-surface-800">
                            {UPI_ID}
                          </div>
                          <button
                            onClick={handleCopyUPI}
                            className="px-4 py-3 bg-surface-900 text-white rounded-lg text-sm font-medium hover:bg-surface-800 transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      <p className="text-center text-xs text-surface-400 mt-4">
                        Having trouble? Contact support at support@atrio.ai
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 'qr' && (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="bg-white rounded-2xl card-shadow border border-surface-200/60 p-6">
                      <button
                        onClick={() => setStep('payment')}
                        className="flex items-center gap-2 text-sm text-surface-400 hover:text-surface-700 mb-4 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>

                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-surface-900 mb-2">Scan to Pay</h3>
                        <p className="text-sm text-surface-400 mb-6">
                          Amount: <span className="font-bold text-surface-900">₹{total.toLocaleString()}</span>
                        </p>

                        {/* Real QR Code Image */}
                        <div className="flex justify-center mb-6">
                          <div className="p-4 bg-white rounded-2xl shadow-lg border border-surface-200">
                            <img 
                              src={qrCodeImage} 
                              alt="UPI Payment QR Code"
                              className="w-64 h-64 object-contain"
                            />
                          </div>
                        </div>

                        {/* UPI Details */}
                        <div className="bg-surface-50 rounded-xl p-4 mb-6">
                          <p className="text-xs text-surface-500 mb-1">Pay to UPI ID</p>
                          <p className="font-mono text-lg font-semibold text-surface-900">{UPI_ID}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <button
                            onClick={handleCopyUPI}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-surface-200 rounded-xl font-medium text-surface-700 hover:bg-surface-50 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            Copy UPI ID
                          </button>

                          <div className="mt-6 pt-4 border-t border-surface-100">
                            <label className="flex items-center justify-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={paymentCompleted}
                                onChange={(e) => setPaymentCompleted(e.target.checked)}
                                className="w-4 h-4 rounded border-surface-300 text-primary-500 focus:ring-primary-500"
                              />
                              <span className="text-sm text-surface-600">
                                I have completed the payment
                              </span>
                            </label>

                            <button
                              onClick={handleVerifyPayment}
                              disabled={!paymentCompleted}
                              className={`w-full mt-4 px-6 py-3 rounded-xl font-semibold transition-all ${
                                paymentCompleted
                                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                  : 'bg-surface-100 text-surface-400 cursor-not-allowed'
                              }`}
                            >
                              Verify Payment →
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-surface-400 mt-4">
                          After payment, check the box and click verify
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 'verify' && (
                  <motion.div
                    key="verify"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="bg-white rounded-2xl card-shadow border border-surface-200/60 p-6">
                      <button
                        onClick={() => setStep('qr')}
                        className="flex items-center gap-2 text-sm text-surface-400 hover:text-surface-700 mb-4 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to QR
                      </button>

                      <h3 className="text-lg font-semibold text-surface-900 mb-1">Verify Payment</h3>
                      <p className="text-sm text-surface-400 mb-6">Please upload payment screenshot for verification</p>

                      <form onSubmit={handleSubmitVerification} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-surface-700 mb-1.5">Full Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                            <input
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="Enter your full name"
                              className="w-full pl-10 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-800 placeholder:text-surface-400 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-surface-700 mb-1.5">Business Name *</label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                            <input
                              type="text"
                              required
                              value={formData.businessName}
                              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                              placeholder="Enter your business name"
                              className="w-full pl-10 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-800 placeholder:text-surface-400 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-surface-700 mb-1.5">UTR / Reference ID *</label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                            <input
                              type="text"
                              required
                              value={formData.utr}
                              onChange={(e) => setFormData({ ...formData, utr: e.target.value })}
                              placeholder="Enter UTR or transaction reference"
                              className="w-full pl-10 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-800 placeholder:text-surface-400 focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-surface-700 mb-1.5">Payment Screenshot *</label>
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full p-6 border-2 border-dashed border-surface-200 rounded-xl cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-all text-center"
                          >
                            {formData.screenshot ? (
                              <div className="flex items-center justify-center gap-3">
                                <ImageIcon className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm font-medium text-surface-700">{formData.screenshot.name}</span>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, screenshot: null }); }}
                                  className="text-surface-400 hover:text-red-500 cursor-pointer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                                <p className="text-sm text-surface-500">Click to upload screenshot</p>
                                <p className="text-xs text-surface-400 mt-1">PNG, JPG up to 5MB</p>
                              </>
                            )}
                          </div>
                        </div>

                        <Button type="submit" variant="primary" size="xl" className="w-full mt-4" disabled={uploading}>
                          {uploading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Shield className="w-5 h-5" />
                              Submit for Verification
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}

function VerifyingAnimation({ onComplete }) {
  const steps = [
    { label: 'Encrypting transaction details', delay: 0 },
    { label: 'Connecting to banking network', delay: 800 },
    { label: 'Verifying UTR reference', delay: 1600 },
    { label: 'Confirming payment receipt', delay: 2400 },
    { label: 'Activating your subscription', delay: 3200 },
  ];

  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Start each step with its delay
    steps.forEach((step, index) => {
      setTimeout(() => {
        setActiveStepIndex(prev => Math.max(prev, index));
      }, step.delay);
    });

    // After the last step completes, wait 1 second then trigger completion
    const totalDuration = steps[steps.length - 1].delay + 1000;
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      if (onComplete) {
        onComplete();
      }
    }, totalDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center max-w-md mx-auto px-6"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: animationComplete ? 0 : Infinity }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-surface-900 flex items-center justify-center shadow-xl"
        >
          {animationComplete ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          ) : (
            <Shield className="w-10 h-10 text-white" />
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          {animationComplete ? "Verification Complete!" : "Verifying Payment Securely"}
        </h2>
        <p className="text-sm text-surface-400 mb-10">
          {animationComplete 
            ? "Your payment has been successfully verified" 
            : "Please wait while we verify your transaction"}
        </p>

        <div className="space-y-4 text-left max-w-xs mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                activeStepIndex >= i ? 'bg-emerald-100' : 'bg-surface-100'
              }`}>
                {activeStepIndex >= i ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Loader2 className="w-3.5 h-3.5 text-surface-300 animate-spin" />
                )}
              </div>
              <span className={`text-sm transition-colors ${activeStepIndex >= i ? 'text-surface-700' : 'text-surface-400'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 w-full h-1.5 bg-surface-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: animationComplete ? '100%' : '100%' }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full"
          />
        </div>
        <p className="text-xs text-surface-400 mt-3">
          {animationComplete ? "Redirecting..." : "This may take a few moments"}
        </p>
      </motion.div>
    </div>
  );
}

function SuccessScreen({ plan, navigate }) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center max-w-md mx-auto px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-100 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-surface-900 mb-3">Payment Successful!</h2>
          <p className="text-surface-500 mb-2">
            Your {plan.name} plan has been activated. Welcome to ATRIO!
          </p>
          <p className="text-sm text-surface-400 mb-8">
            Our team will begin onboarding your AI receptionist within 24 hours. Check your email for next steps.
          </p>

          <div className="bg-surface-50 rounded-xl p-4 mb-8 border border-surface-100">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-surface-700">Onboarding Initiated</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/')}
            className="mx-auto"
          >
            Go to Homepage
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}