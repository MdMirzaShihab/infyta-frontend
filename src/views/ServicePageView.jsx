"use client";

import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { expertise } from "@/content/expertise";
import { getService } from "@/content/services";

const MotionLink = motion.create(Link);

function CheckIcon() {
  return (
    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ServicePageView({ service }) {
  const technologies = expertise.filter((item) => service.expertiseKeys.includes(item.key));
  const related = service.related.map(getService).filter(Boolean);
  const hasIncluded = service.included.length > 0;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-32">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            {service.name}
          </motion.h1>
          <p className="text-xl max-w-3xl">{service.heroSubtitle}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className={hasIncluded ? "lg:w-2/3" : "w-full"}>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Overview</h2>
              {service.overview.map((paragraph) => (
                <p key={paragraph} className="text-lg text-gray-600 mb-6">
                  {paragraph}
                </p>
              ))}

              {service.approach.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold mt-10 mb-6 text-gray-800">Our Approach</h3>
                  <div className="space-y-4">
                    {service.approach.map((step) => (
                      <div key={step} className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                          <CheckIcon />
                        </div>
                        <p className="ml-3 text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {hasIncluded && (
              <div className="lg:w-1/3">
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">What&apos;s Included</h3>
                  <div className="space-y-6">
                    {service.included.map((item) => (
                      <motion.div key={item.title} whileHover={{ x: 5 }} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <FaCheckCircle className="text-3xl text-blue-500" aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                          <p className="text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technologies & Certifications */}
      {technologies.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Technologies &amp; Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((item) => (
                <div key={item.key} className="bg-white p-8 rounded-xl border border-gray-200 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.certs.map((cert) => (
                      <span key={cert} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <summary className="text-lg font-semibold text-gray-800 cursor-pointer">{faq.question}</summary>
                  <p className="text-gray-600 mt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {related.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((item) => (
                <ServiceCard key={item.slug} service={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to discuss your project?</h2>
          <MotionLink
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </MotionLink>
        </div>
      </section>
    </div>
  );
}
