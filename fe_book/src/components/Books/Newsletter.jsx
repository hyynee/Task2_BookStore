import React, { useState } from 'react';
import Title from './Title';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true);
            setIsLoading(false);
            setEmail('');
        }, 1500);
    };

    return (
        <section className="relative overflow-hidden">
            {/* Background with gradient and pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="max-w-3xl mx-auto">
                    {/* Main content card */}
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 shadow-lg">
                        {/* Header */}
                        <div className="text-center mb-6 lg:mb-8">
                            <Title
                                title="Subscribe to Our Newsletter"
                                subtitle="Stay updated with new arrivals, discounts, and book recommendations."
                            />
                        </div>

                        {/* Subscription Form */}
                        {!isSubscribed ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex flex-col lg:flex-row items-stretch gap-3 max-w-xl mx-auto">
                                    {/* Email Input */}
                                    <div className="relative flex-1">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                                            placeholder="Enter your email"
                                            required
                                        />
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>

                                    {/* Subscribe Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading || !email}
                                        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-md hover:shadow-blue-500/25 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Subscribing...
                                                </>
                                            ) : (
                                                <>
                                                    Subscribe
                                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                    </button>
                                </div>

                                {/* Benefits */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 max-w-lg mx-auto">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-xs">Exclusive Discounts</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs">New Arrivals</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-xs">No Spam</span>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            /* Success State */
                            <div className="text-center space-y-4 max-w-sm mx-auto">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Thank You!</h3>
                                    <p className="text-gray-300 text-sm">You've successfully subscribed to our bookstore newsletter. Check your inbox for a confirmation email.</p>
                                </div>
                                <button
                                    onClick={() => setIsSubscribed(false)}
                                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline text-sm"
                                >
                                    Subscribe another email
                                </button>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="mt-6 pt-4 border-t border-white/10">
                            <p className="text-gray-400 text-xs text-center max-w-md mx-auto">
                                By subscribing, you agree to our{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 underline">
                                    Privacy Policy
                                </a>{' '}
                                and consent to receive updates. You can unsubscribe at any time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;