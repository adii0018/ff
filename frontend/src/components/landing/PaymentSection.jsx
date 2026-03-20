import { motion } from "framer-motion";
import { QrCode, CreditCard, Receipt, BadgeCheck, Upload, Send } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: QrCode,
    title: "Host Uploads QR Code",
    desc: "Tournament host uploads their UPI/payment QR code when creating the tournament.",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Player Scans & Pays",
    desc: "Players scan the QR code and pay the entry fee via any UPI app.",
  },
  {
    step: "03",
    icon: Receipt,
    title: "Submit Transaction ID",
    desc: "After payment, players submit their transaction ID as proof of payment.",
  },
  {
    step: "04",
    icon: BadgeCheck,
    title: "Host Verifies & Confirms",
    desc: "Host verifies the transaction and confirms the player's registration.",
  },
];

export default function PaymentSection() {
  return (
    <section id="payment" className="py-24 section-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-yellow-500 text-sm font-bold tracking-[0.3em] uppercase mb-3 block">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            SECURE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">PAYMENT</span>{" "}
            SYSTEM
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Simple QR-based payment flow — fast, transparent, and secure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-orange-500/30 via-yellow-500/50 to-orange-500/30" />

          {steps.map(({ step, icon: Icon, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-dark rounded-xl p-6 text-center relative"
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {step}
              </div>
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4 mt-3">
                <Icon className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem" }}>
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual UI mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="card-dark rounded-2xl p-8 border border-orange-500/20">
            <h3 className="text-center text-white font-bold mb-6 text-lg flex items-center justify-center gap-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <CreditCard className="w-5 h-5 text-orange-400" /> PAYMENT VERIFICATION
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* QR mockup */}
              <div className="flex-shrink-0 text-center">
                <div className="w-32 h-32 bg-white rounded-xl p-2 flex items-center justify-center mx-auto">
                  <QrCode className="w-24 h-24 text-black" strokeWidth={1.5} />
                </div>
                <p className="text-gray-500 text-xs mt-2">Scan to Pay</p>
              </div>

              {/* Form mockup */}
              <div className="flex-1 w-full space-y-3">
                <div>
                  <label className="text-gray-500 text-xs block mb-1 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> Entry Fee
                  </label>
                  <div className="bg-black/40 border border-orange-500/20 rounded-lg px-4 py-2.5 text-orange-400 font-bold">
                    ₹50
                  </div>
                </div>
                <div>
                  <label className="text-gray-500 text-xs block mb-1 flex items-center gap-1">
                    <Receipt className="w-3 h-3" /> Transaction ID
                  </label>
                  <div className="bg-black/40 border border-gray-700 rounded-lg px-4 py-2.5 text-gray-500 text-sm">
                    Enter UPI transaction ID...
                  </div>
                </div>
                <div>
                  <label className="text-gray-500 text-xs block mb-1 flex items-center gap-1">
                    <Upload className="w-3 h-3" /> Payment Screenshot
                  </label>
                  <div className="bg-black/40 border border-dashed border-gray-700 rounded-lg px-4 py-2.5 text-gray-600 text-sm text-center flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" /> Upload screenshot
                  </div>
                </div>
                <button className="btn-primary w-full py-2.5 rounded-lg text-sm flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Registration
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
