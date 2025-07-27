"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaMapMarkedAlt, FaPhone } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container max-w-7xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-20 text-center">Contact Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* contact info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-secondary md:w-2/3">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FaEnvelope className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-bold">Email:</h3>
                <Link
                  href="mailto:soumavadas22@gmail.com"
                  className="text-secondary hover:text-primary"
                >
                  soumavadas22@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaPhone className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-bold">Phone:</h3>
                <Link
                  href="tel:+123456789"
                  className="text-secondary hover:text-primary"
                >
                  +123456789
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkedAlt className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-bold">Location:</h3>
                <p className="text-secondary hover:text-primary">
                  Kolkata(WB), IN
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* contact form */}
        <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                required
                value={formData.name}
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-md border placeholder:text-white/50 border-gray-300 dark:border-gray-700 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                required
                value={formData.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border placeholder:text-white/50 border-gray-300 dark:border-gray-700 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-none"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                id="message"
                name="message"
                placeholder="Enter your message"
                className="w-full px-4 py-2 rounded-md border placeholder:text-white/50 border-gray-300 dark:border-gray-700 bg-white dark:bg-dark focus:ring-2 focus:ring-primary focus:border-none"
              />
            </div>

            <button type="submit" className="w-full btn btn-primary">
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-500 text-center">
                Message sent successfully
              </p>
            )}

            {status === "error" && (
              <p className="text-red-500 text-center">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;