const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldSection = `function DeliverySection() {
  return (
    <section className="section-padding bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border border-white/30 rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-white/20 rounded-full" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Instant Voucher Delivery via<br /><span className="text-emerald-200">WhatsApp &amp; Email</span>
        </h2>
        <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-10">
          No waiting for shipping. Your brand voucher code arrives in seconds \u2014 ready to redeem on the brand's website or app.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 max-w-lg mx-auto mb-10">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left"><h3 className="font-bold">WhatsApp</h3><p className="text-sm text-emerald-200">Voucher code in their chat</p></div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="text-left"><h3 className="font-bold">Email</h3><p className="text-sm text-emerald-200">Beautiful e-card with code</p></div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 text-emerald-200">
          <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span className="text-sm font-medium">Delivered in seconds</span></div>
          <div className="flex items-center gap-2"><Shield className="w-5 h-5" /><span className="text-sm font-medium">100% genuine codes</span></div>
          <div className="flex items-center gap-2"><Heart className="w-5 h-5" /><span className="text-sm font-medium">Free greeting card</span></div>
        </div>
      </div>
    </section>
  );
}`;

const newSection = `function DeliverySection() {
  return (
    <section className="section-padding bg-white text-gray-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-40 h-40 border border-emerald-200 rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-emerald-100 rounded-full" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Instant Voucher Delivery via<br /><span className="text-emerald-600">WhatsApp &amp; Email</span>
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
          No waiting for shipping. Your brand voucher code arrives in seconds \u2014 ready to redeem on the brand's website or app.
        </p>
        <div className="grid sm:grid-cols-2 gap-5 max-w-lg mx-auto mb-10">
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-green-500/20">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left"><h3 className="font-bold text-gray-800">WhatsApp</h3><p className="text-sm text-gray-500">Voucher code in their chat</p></div>
          </div>
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-blue-200 transition-colors">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-500/20">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="text-left"><h3 className="font-bold text-gray-800">Email</h3><p className="text-sm text-gray-500">Beautiful e-card with code</p></div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600">
          <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium">Delivered in seconds</span></div>
          <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium">100% genuine codes</span></div>
          <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium">Free greeting card</span></div>
        </div>
      </div>
    </section>
  );
}`;

if (code.includes(oldSection)) {
  code = code.replace(oldSection, newSection);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Replaced successfully');
} else {
  console.log('Could not find old section');
}
