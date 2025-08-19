import React from "react";

const ContactUs = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-[#00acc1] px-4 relative overflow-hidden">
      {/* Decorative background (optional) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#00acc140_1px,transparent_1px)] [background-size:30px_30px] opacity-20"></div>

      {/* Main content container */}
      <div className="relative mt-10 mb-10 z-10 w-full max-w-6xl flex flex-col lg:flex-row bg-black/50 backdrop-blur-lg rounded-3xl overflow-hidden shadow-[0_0_40px_5px_#00acc1] border border-[#00acc1]/20">
        
        {/* Map Section */}
        <div className="lg:w-1/2 h-[400px] lg:h-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="h-full w-full"
          ></iframe>
        </div>

        {/* Contact Info */}
        <div className="lg:w-1/2 p-10 space-y-6 text-white">
          <div>
            <h2 className="text-3xl font-bold mb-2 tracking-wide text-[#00acc1]">Visit Our Location</h2>
            <p className="text-[#00acc1]/80">
              We're here to help you. Reach out to us for any queries or support.
            </p>
          </div>

          <div className="border-t border-[#00acc1]/30 pt-4">
            <h3 className="text-lg font-semibold text-[#00acc1]">Our Address</h3>
            <p className="text-[#00acc1]/70 mt-1">
              Shakti Mata Nagar gali no. 3, near Kharbi Square, Nagpur
            </p>
          </div>

          <div className="border-t border-[#00acc1]/30 pt-4">
            <h3 className="text-lg font-semibold text-[#00acc1]">Working Hours</h3>
            <p className="text-[#00acc1]/70 mt-1">Mon - Fri: 9am - 5pm</p>
            <p className="text-[#00acc1]/70">Sat: 10am - 4pm</p>
            <p className="text-[#00acc1]/70">Sun: Closed</p>
          </div>

          <div className="border-t border-[#00acc1]/30 pt-4">
            <h3 className="text-lg font-semibold text-[#00acc1]">Contact</h3>
            <p className="text-[#00acc1]/70 mt-1">Email: aniketkapse100@gmail.com</p>
            <p className="text-[#00acc1]/70">Phone: +91-8080663833</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
