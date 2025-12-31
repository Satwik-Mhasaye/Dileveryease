import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  return (
    <section className="contact" id="contact">
      <div className="section-header">
        <h2>Contact Us</h2>
        <p>Get in touch with our team - we're here to help</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <div>
              <h4>Headquarters</h4>
              <p>123 Delivery Street<br />Transport City, TC 12345</p>
              <p>United States</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <div>
              <h4>Phone Support</h4>
              <p>Main: +1 (555) 123-4567</p>
              <p>Customer Service: +1 (555) 123-4568</p>
              <p>Driver Support: +1 (555) 123-4569</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h4>Email</h4>
              <p>General: info@swiftdeliver.com</p>
              <p>Support: support@swiftdeliver.com</p>
              <p>Business: business@swiftdeliver.com</p>
            </div>
          </div>

          <div className="contact-item">
            <i className="fas fa-clock"></i>
            <div>
              <h4>Business Hours</h4>
              <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-header">
            <h3>Send us a Message</h3>
            <p>Fill out the form below and we'll get back to you within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h4>Message Sent Successfully!</h4>
              <p>Thank you for contacting us. We'll respond to your inquiry within 24 hours.</p>
              <button
                className="btn btn-secondary"
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inquiryType">Inquiry Type</label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="business">Business Partnership</option>
                  <option value="driver">Driver Application</option>
                  <option value="billing">Billing Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Please provide details about your inquiry..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Additional Contact Information */}
      <div className="additional-contact">
        <div className="quick-contact">
          <h3>Need Immediate Help?</h3>
          <div className="quick-options">
            <div className="quick-item">
              <i className="fas fa-comments"></i>
              <h4>Live Chat</h4>
              <p>Available 24/7 for instant support</p>
              <button className="btn btn-outline">Start Chat</button>
            </div>

            <div className="quick-item">
              <i className="fas fa-question-circle"></i>
              <h4>FAQ</h4>
              <p>Find answers to common questions</p>
              <button className="btn btn-outline">View FAQ</button>
            </div>

            <div className="quick-item">
              <i className="fas fa-map-marked-alt"></i>
              <h4>Track Package</h4>
              <p>Real-time delivery tracking</p>
              <button className="btn btn-outline">Track Now</button>
            </div>
          </div>
        </div>

        <div className="social-media">
          <h3>Follow Us</h3>
          <p>Stay connected and get the latest updates</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
