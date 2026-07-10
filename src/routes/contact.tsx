import { createFileRoute, Link } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { useState } from 'react'

// Define the campus type based on the requirements
interface Campus {
  id: number
  name: string
  address: string
  phone: string
  email: string
  instagram: string
  service_times: {
    sunday?: string
    wednesday?: string
    phone?: string
    email?: string
    ig?: string
  }
  // Add any other fields that might be in the database
  [key: string]: any
}

export const Route = createFileRoute('/contact')({
  component: Contact,
  loader: async () => {
    const { data: campuses } = await supabase
      .from('campuses')
      .select('*')
    return { campuses }
  }
})

function Contact() {
  const { campuses } = Route.useLoaderData<{ campuses: Campus[] | null }>()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }])
      
      if (error) throw error
      
      setFormStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background min-h-screen text-ink">
      <div className="container-page py-12">
        <h1 className="text-4xl font-display text-grace mb-12">Contact Us</h1>
        
        {/* Contact Form */}
        <div className="mb-12">
          <h2 className="text-2xl font-display text-grace mb-6">Get In Touch</h2>
          {formStatus === 'success' && (
            <div className="bg-grace/10 border border-grace/20 rounded-lg p-4 mb-6">
              <p className="text-grace">Thank you for your message! We'll get back to you soon.</p>
            </div>
          )}
          {formStatus === 'error' && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400">Sorry, there was an error sending your message. Please try again.</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-background border border-white/5 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-ink-muted mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-background border border-white/5 rounded-lg text-ink"
                  required
                />
              </div>
              <div>
                <label className="block text-ink-muted mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-background border border-white/5 rounded-lg text-ink"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-ink-muted mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-background border border-white/5 rounded-lg text-ink"
              />
            </div>
            <div className="mb-6">
              <label className="block text-ink-muted mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-background border border-white/5 rounded-lg text-ink"
                rows="5"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-grace text-background py-3 px-6 rounded-lg font-display hover:bg-grace/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Campuses */}
        <div>
          <h2 className="text-2xl font-display text-grace mb-8">Our Campuses</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {campuses?.map((campus: Campus) => {
              const serviceTimes = campus.service_times || {}
              return (
                <div key={campus.id} className="bg-background border border-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-display text-grace mb-4">{campus.name}</h3>
                  <p className="mb-2"><strong>Address:</strong> {campus.address}</p>
                  <p className="mb-2"><strong>Phone:</strong> <a href={`tel:${campus.phone}`} className="text-grace">{campus.phone}</a></p>
                  <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${campus.email}`} className="text-grace">{campus.email}</a></p>
                  {campus.instagram && (
                    <p className="mb-2"><strong>Instagram:</strong> <a href={`https://instagram.com/${campus.instagram}`} className="text-grace">@{campus.instagram}</a></p>
                  )}
                  {serviceTimes.sunday && <p className="mb-2"><strong>Sunday Service:</strong> {serviceTimes.sunday}</p>}
                  {serviceTimes.wednesday && <p className="mb-2"><strong>Wednesday Service:</strong> {serviceTimes.wednesday}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}