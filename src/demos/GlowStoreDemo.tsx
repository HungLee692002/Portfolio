import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Star, Heart, Grid, Plus, Minus, Trash2, ShoppingCart, User, CheckCircle2, ShieldCheck, ChevronRight, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  color: string;
  desc: string;
  tag: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function GlowStoreDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'shopping' | 'checkout' | 'success'>('shopping');
  
  // Checkout credentials Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const products: Product[] = [
    {
      id: 'glow-1',
      name: 'Hydrating Peptide Serum',
      category: 'DƯỠNG ẨM SÂU',
      price: 490000,
      rating: 4.9,
      reviews: 148,
      color: 'bg-indigo-900/30 border-indigo-500/20 text-indigo-400',
      desc: 'Serum peptide kết hợp HA đa phân tử tăng cường độ đàn hồi, cấp ẩm tầng sâu cho da căng bóng mịn màng.',
      tag: 'Bán chạy nhất'
    },
    {
      id: 'glow-2',
      name: 'Centella Recovery Gel',
      category: 'PHỤC HỒI DA',
      price: 380000,
      rating: 4.8,
      reviews: 94,
      color: 'bg-emerald-900/30 border-emerald-500/20 text-emerald-400',
      desc: 'Gel dưỡng chiết xuất từ rau má hữu cơ làm dịu kích ứng, phục hồi hàng rào bảo vệ da bị tổn thương lập tức.',
      tag: 'Khuyên dùng'
    },
    {
      id: 'glow-3',
      name: 'AHA/BHA Exfoliating Toner',
      category: 'LÀM SẠCH SÂU',
      price: 450000,
      rating: 4.7,
      reviews: 112,
      color: 'bg-purple-900/30 border-purple-500/20 text-purple-400',
      desc: 'Nước hoa hồng cân bằng nồng độ axit nhẹ nhàng tẩy sạch tế bào chết, làm thông thoáng lỗ chân lông, ngừa mụn cám.',
      tag: 'Bản nâng cấp'
    },
    {
      id: 'glow-4',
      name: 'Ceramide Barrier Cream',
      category: 'KHÓA ẨM CHUYÊN SÂU',
      price: 520000,
      rating: 4.9,
      reviews: 87,
      color: 'bg-amber-900/30 border-amber-500/20 text-amber-400',
      desc: 'Kem khóa ẩm chứa phức hợp 3 loại Ceramide thiết yếu, duy trì độ ẩm suốt 24 giờ kể cả trong môi trường điều hòa khô hanh.',
      tag: 'Mới ra mắt'
    }
  ];

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const qty = item.quantity + delta;
        return qty > 0 ? { ...item, quantity: qty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const getSubtotalWithDiscount = () => {
    const sub = getSubtotal();
    return discountApplied ? sub * 0.9 : sub;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'GLOW99') {
      setDiscountApplied(true);
    } else {
      alert('Mã giảm giá không chính xác!');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin giao nhận!');
      return;
    }
    setCheckoutStep('success');
  };

  const resetStore = () => {
    setCart([]);
    setCheckoutStep('shopping');
    setName('');
    setPhone('');
    setAddress('');
    setCoupon('');
    setDiscountApplied(false);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c221e] flex flex-col font-sans transition-colors duration-300">
      
      {/* Dynamic Cozy Store header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#ebdcd0]/60 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#dfb295] flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-semibold text-base text-[#4d3627] tracking-wider block">GLOW &STORE</span>
              <span className="text-[9px] text-[#9c8473] font-mono tracking-widest leading-none block">PREMIUM COSMETIC EXPERIENCE</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#faf8f5] transition-all cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 text-[#4d3627]" />
              {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                <span className="absolute top-1 right-1 bg-[#d97746] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        {checkoutStep === 'shopping' && (
          <div className="space-y-10 animate-fade-in">
            {/* Banner block */}
            <div className="bg-gradient-to-r from-[#ebdcd0] to-[#f5ebd9] rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-center items-start text-left min-h-[220px]">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none">
                <div className="w-56 h-56 rounded-full bg-orange-700/60 blur-3xl"></div>
              </div>

              <div className="max-w-md space-y-4 relative z-10">
                <span className="text-[10px] font-mono bg-white text-[#4d3627] font-semibold tracking-widest px-3 py-1 rounded-full uppercase">
                  Ưu đãi chào hè 2026
                </span>
                <h1 className="text-2xl sm:text-3.5xl font-bold font-display text-[#4d3627] leading-tight">
                  Tái Tạo Làn Da Khỏe Đẹp Trực Quan
                </h1>
                <p className="text-xs sm:text-sm text-[#7a5e4b] leading-relaxed">
                  Trải nghiệm công nghệ mua sắm 1 bước cực tốc cực kỳ mượt mà. Nhập mã quảng cáo <span className="font-bold underline text-[#d97746]">GLOW99</span> tại giỏ hàng để được trải nghiệm giảm giá ngay 10%.
                </p>
              </div>
            </div>

            {/* Product list */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#4d3627] font-display">Tất cả sản phẩm dược mỹ phẩm</h2>
                  <p className="text-xs text-[#9c8473]">Công thức thảo dược thiên nhiên phối hợp hoạt chất lâm sàng cao cấp</p>
                </div>
                <div className="text-xs font-mono text-[#9c8473] bg-[#f0eae4] px-3 py-1.5 rounded-full border border-[#ebdcd0]/70">
                  {products.length} Món
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-white border border-[#ebdcd0]/80 rounded-2xl p-5 hover:shadow-xl hover:shadow-[#dfb295]/10 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between">
                    
                    <div>
                      {/* Product abstract image placeholder */}
                      <div className="w-full h-36 rounded-xl bg-[#faf8f5] flex items-center justify-center p-3 mb-4 relative">
                        <span className="absolute top-2 left-2 text-[9px] font-mono font-medium uppercase tracking-wide bg-white/90 border border-amber-300 rounded-full px-2 py-0.5 text-amber-700">
                          {prod.tag}
                        </span>
                        
                        <div className={`w-14 h-24 rounded-lg flex flex-col justify-between p-2 shadow-sm border ${prod.color}`}>
                          <div className="text-[8px] font-mono truncate leading-none uppercase">{prod.category}</div>
                          <div className="h-0.5 w-4 bg-current"></div>
                          <div className="text-[7.5px] font-mono break-all font-bold tracking-tighter text-right">GLOW</div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono tracking-widest text-[#9c8473]">{prod.category}</span>
                      <h3 className="font-bold text-[#4d3627] text-sm mt-1 mb-1.5 leading-snug line-clamp-1">{prod.name}</h3>
                      <p className="text-[11px] text-[#7a5e4b] leading-relaxed line-clamp-2 mb-4 h-8">{prod.desc}</p>
                    </div>

                    <div>
                      {/* Pricing block */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#ebdcd0]/40">
                        <div>
                          <div className="text-[10px] text-[#9c8473] font-mono">ĐƠN GIÁ</div>
                          <div className="text-sm font-bold text-[#4d3627]">
                            {(prod.price).toLocaleString('vi-VN')}đ
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(prod)}
                          className="bg-[#4d3627] hover:bg-[#d97746] text-white p-2 rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {checkoutStep === 'checkout' && (
          <div className="max-w-2xl mx-auto bg-white border border-[#ebdcd0]/80 rounded-3xl p-6 sm:p-8 text-left space-y-6 animate-fade-in">
            <button
              onClick={() => setCheckoutStep('shopping')}
              className="inline-flex items-center gap-1.5 text-xs text-[#7a5e4b] hover:text-[#4d3627] font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> TRỞ LẠI MUA SẮM
            </button>

            <div>
              <h2 className="text-xl font-bold font-display text-[#4d3627] leading-tight">Nhập Thông Tin Giao Nhận & Đặt Hàng</h2>
              <p className="text-xs text-[#9c8473] mt-1">Giao hàng miễn phí toàn quốc cho đơn hàng từ 500k</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Checkout Form */}
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#7a5e4b]">Họ tên người nhận <span className="text-[#d97746]">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#ebdcd0] rounded-xl py-2 px-3 text-xs placeholder-[#9c8473] focus:outline-none focus:border-[#4d3627]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#7a5e4b]">Số điện thoại liên lạc <span className="text-[#d97746]">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx xxx xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#ebdcd0] rounded-xl py-2 px-3 text-xs placeholder-[#9c8473] focus:outline-none focus:border-[#4d3627]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#7a5e4b]">Địa chỉ giao hàng nhận <span className="text-[#d97746]">*</span></label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Địa chỉ số nhà, ngõ/hẻm, phường/xã, quận/huyện..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#faf8f5] border border-[#ebdcd0] rounded-xl py-2 px-3 text-xs placeholder-[#9c8473] focus:outline-none focus:border-[#4d3627]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d97746] hover:bg-[#4d3627] text-white text-xs font-bold py-3 rounded-xl shadow-lg transition-all cursor-pointer font-sans"
                >
                  XÁC NHẬN ĐẶT HÀNG (MOCK)
                </button>
              </form>

              {/* Order summary info */}
              <div className="bg-[#faf8f5] border border-[#ebdcd0]/70 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold text-[#4d3627] font-mono tracking-wide uppercase border-b border-[#ebdcd0]/60 pb-3">
                  TỔNG QUAN ĐƠN HÀNG ({cart.reduce((sum, item) => sum + item.quantity, 0)} món)
                </h4>

                <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center text-xs text-[#7a5e4b]">
                      <span className="truncate max-w-[150px]">{item.product.name} (x{item.quantity})</span>
                      <span className="font-mono font-semibold text-[#4d3627]">
                        {(item.product.price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#ebdcd0] pt-3.5 space-y-2">
                  <div className="flex justify-between text-xs text-[#7a5e4b]">
                    <span>Tạm tính:</span>
                    <span className="font-mono">{getSubtotal().toLocaleString('vi-VN')}đ</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-xs text-emerald-600 font-medium">
                      <span>Khuyến mãi (10%):</span>
                      <span className="font-mono">-{(getSubtotal() * 0.1).toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-[#7a5e4b]">
                    <span>Phí vận chuyển:</span>
                    <span className="text-[#a47b5e] font-mono uppercase">FREE</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-[#4d3627] border-t border-dashed border-[#ebdcd0] pt-2">
                    <span>Tổng thanh toán:</span>
                    <span className="font-mono text-base text-[#d97746]">
                      {getSubtotalWithDiscount().toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {checkoutStep === 'success' && (
          <div className="max-w-md mx-auto bg-white border border-[#ebdcd0]/80 rounded-3xl p-8 text-center space-y-6 animate-fade-in shadow-xl">
            <div className="w-16 h-16 bg-emerald-50 bg-emerald-100/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#4d3627] font-display">Đặt Hàng Thành Công!</h2>
              <p className="text-xs text-[#7a5e4b] leading-relaxed">
                Hệ thống Demo của nhà phát triển Hùng Lê đã tiếp nhận mã giao nhận. Đơn hàng ảo này sẽ được chuyển thành dạng lead sự kiện mượt mà trong hệ thống.
              </p>
            </div>

            <div className="bg-[#faf8f5] border border-[#ebdcd0]/60 p-4 rounded-xl text-left text-xs space-y-2 font-mono text-[#7a5e4b]">
              <div><span className="text-[#4d3627] font-bold">KHÁCH HÀNG:</span> {name}</div>
              <div><span className="text-[#4d3627] font-bold">ĐỊA CHỈ:</span> {address}</div>
              <div><span className="text-[#4d3627] font-bold">ĐƠN GIÁ:</span> {getSubtotalWithDiscount().toLocaleString('vi-VN')}đ</div>
            </div>

            <button
              onClick={resetStore}
              className="w-full bg-[#4d3627] hover:bg-[#d97746] text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer uppercase"
            >
              Trở lại Cửa hàng làm việc tiếp
            </button>
          </div>
        )}
      </div>

      {/* Cart Slider overlays */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-[#2c221e]/50 backdrop-blur-xs flex justify-end animate-fade-in text-left">
          <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-fade-in relative">
            
            {/* Slide heading */}
            <div className="bg-[#4d3627] text-white px-5 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#dfb295]" />
                <h3 className="font-bold font-display text-sm">Giỏ hàng của bạn</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[#ebdcd0] hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart core */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-[#9c8473] space-y-3">
                  <ShoppingCart className="w-12 h-12 stroke-1" />
                  <p className="text-xs">Giỏ hàng rỗng. Hãy thêm sản phẩm dưỡng da mượt mà thôi!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 border border-[#ebdcd0]/50 rounded-xl bg-[#faf8f5] relative">
                    <div className="w-12 h-16 rounded-lg bg-[#ebdcd0]/30 shrink-0 flex items-center justify-center p-1">
                      <div className={`w-6 h-10 rounded border ${item.product.color} shrink-0 text-[5px] flex flex-col justify-between p-0.5`}>
                        <span className="font-bold scale-75">GLOW</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-[#4d3627] text-xs leading-snug line-clamp-1">{item.product.name}</h4>
                      <div className="text-[10px] text-[#9c8473] font-mono">
                        {(item.product.price).toLocaleString('vi-VN')}đ / cái
                      </div>
                      
                      {/* Quantity handles */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="flex items-center border border-[#ebdcd0] bg-white rounded-md">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1)}
                            className="p-1 text-[#7a5e4b] hover:text-[#4d3627]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono px-2 text-[#4d3627]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1)}
                            className="p-1 text-[#7a5e4b] hover:text-[#4d3627]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 text-xs flex items-center gap-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Slider footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#ebdcd0] p-5 bg-[#faf8f5] space-y-4">
                {/* Coupon widget Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Mã giảm giá (GLOW99)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 bg-white border border-[#ebdcd0] py-2 px-3 text-xs rounded-xl focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#4d3627] hover:bg-[#ebdcd0] hover:text-[#4d3627] border border-[#4d3627] text-white text-xs px-4 py-2 rounded-xl transition-all font-semibold font-mono whitespace-nowrap cursor-pointer"
                  >
                    Áp Dụng
                  </button>
                </form>

                <div className="space-y-1.5 text-xs text-[#7a5e4b]">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span className="font-mono">{(getSubtotal()).toLocaleString('vi-VN')}đ</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Giảm giá (10%):</span>
                      <span className="font-mono">-{(getSubtotal() * 0.1).toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#4d3627] pt-2 border-t border-[#ebdcd0]/60">
                    <span>Tổng hàng thanh toán:</span>
                    <span className="font-mono text-[#d97746]">
                      {getSubtotalWithDiscount().toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5 pt-1">
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-white hover:bg-[#faf8f5] border border-[#ebdcd0] py-2.5 rounded-xl text-xs font-bold text-[#7a5e4b] cursor-pointer text-center whitespace-nowrap"
                  >
                    Tiếp tụC xem
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutStep('checkout');
                    }}
                    className="bg-[#d97746] hover:bg-[#4d3627] text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer text-center whitespace-nowrap"
                  >
                    Thanh toán đơn (1-step)
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
