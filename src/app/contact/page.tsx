"use client";

import { FormEvent, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message");
        return;
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-linear-to-br from-[#f8f2e5] to-[#e8d5c4] dark:from-[#1a3a2e] dark:to-[#0d2818] py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#173b2b] dark:text-[#e8f5e9] mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-[#3d5a50] dark:text-[#a8d5b8] mb-2">
              We'd love to hear from you! Fill out the form below and we'll get
              back to you as soon as possible.
            </p>
            <p className="text-xs text-[#5a7a6f] dark:text-[#7a9f90]">
              📧 Email:{" "}
              <a
                href="mailto:info@eastafricawholesalefoods.com"
                className="font-semibold hover:text-[#d64b35] dark:hover:text-[#ff7f50] transition-colors"
              >
                info@eastafricawholesalefoods.com
              </a>
            </p>
          </div>

          {/* Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Custom Contact Form */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 border border-green-200 dark:border-green-900">
              {status === "success" && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 rounded-lg">
                  <p className="text-green-800 dark:text-green-300 font-semibold">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg">
                  <p className="text-red-800 dark:text-red-300 font-semibold">
                    ❌ {errorMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[#173b2b] dark:text-[#e8f5e9] mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-neutral-800 text-[#173b2b] dark:text-[#e8f5e9] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#173b2b] dark:text-[#e8f5e9] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-neutral-800 text-[#173b2b] dark:text-[#e8f5e9] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-[#173b2b] dark:text-[#e8f5e9] mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-neutral-800 text-[#173b2b] dark:text-[#e8f5e9] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#173b2b] dark:text-[#e8f5e9] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Your message here... (minimum 10 characters)"
                    className="w-full px-4 py-3 rounded-lg border border-green-300 dark:border-green-700 bg-white dark:bg-neutral-800 text-[#173b2b] dark:text-[#e8f5e9] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-green-800 hover:bg-green-900 disabled:bg-gray-400 dark:bg-green-700 dark:hover:bg-green-800 dark:disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>📧 Send Message</>
                  )}
                </button>

                <p className="text-xs text-[#5a7a6f] dark:text-[#7a9f90] text-center">
                  * Required fields
                </p>
              </form>
            </div>

            {/* Map and Address */}
            <div className="space-y-6">
              {/* Location Card */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 border border-green-200 dark:border-green-900">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">📍</div>
                  <div>
                    <h3 className="font-bold text-[#173b2b] dark:text-[#e8f5e9] text-lg">
                      Our Location
                    </h3>
                    <p className="text-sm text-[#3d5a50] dark:text-[#a8d5b8]">
                      10548 169 St NW
                      <br />
                      Edmonton, AB T5P 3X6
                      <br />
                      Canada
                    </p>
                  </div>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg overflow-hidden border border-green-200 dark:border-green-900 h-96">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2927.124907788895!2d-113.45680392345798!3d53.53706187109384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a028d4e0f8c18b%3A0x8c0f8c0f8c0f8c0f!2s10548%20169%20St%20NW%2C%20Edmonton%2C%20AB%20T5P%203X6!5e0!3m2!1sen!2sca!4v1234567890"
                />
              </div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl text-center border border-green-200 dark:border-green-900">
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-bold text-[#173b2b] dark:text-[#e8f5e9] mb-2">
                Email
              </h3>
              <a
                href="mailto:info@eastafricawholesalefoods.com"
                className="text-[#d64b35] dark:text-[#ff7f50] hover:underline text-sm"
              >
                info@eastafricawholesalefoods.com
              </a>
            </div>

            <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl text-center border border-green-200 dark:border-green-900">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="font-bold text-[#173b2b] dark:text-[#e8f5e9] mb-2">
                Response Time
              </h3>
              <p className="text-sm text-[#3d5a50] dark:text-[#a8d5b8]">
                Usually within 24 hours
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
