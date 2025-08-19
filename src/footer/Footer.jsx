import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Logo and Description */}
                <div>
                    <div className='font-bold text-3xl mb-2'>
                        JUST DV
                    </div>
                    <p className="text-sm leading-relaxed">
                        This data visualization system transforms complex datasets into interactive and insightful visual representations. Designed for efficiency and scalability.
                    </p>
                </div>

                {/* Company Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-white">Company</h2>
                    <ul className="space-y-2">
                        {['About Us', 'Terms & Conditions', 'Privacy Policy', 'Contact Us'].map((item, index) => (
                            <li key={index}>
                                <a href="#" className="hover:text-blue-400 transition duration-300">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Blog Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-white">Blog</h2>
                    <ul className="space-y-2">
                        {[
                            'Getting Started With DV',
                            'What Is DV And When to Use It?',
                            'How Charts Help Productivity?',
                            '5 Tips to Make Responsive',
                            'See More'
                        ].map((item, index) => (
                            <li key={index}>
                                <a href="#" className="hover:text-blue-400 transition duration-300">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-white">Connect With Us</h2>
                    <div className="flex space-x-4">
                        <div class="max-w-xl mx-auto">
                            <div class="flex items-center mt-1">
                                <input type="email" id="input-9" class="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-blue-500 focus:outline-none rounded shadow-sm" placeholder="user@mail.com" />
                                <button class="h-10 px-4 text-sm bg-blue-500 border border-l-0 border-blue-500 rounded-r shadow-sm text-blue-50 hover:text-white hover:bg-blue-400 hover:border-blue-400 focus:outline-none">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} JUST DV. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
